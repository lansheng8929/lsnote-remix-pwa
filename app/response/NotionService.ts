import {
  Client,
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client";

class NotionService {
  public notion: Client;
  private databaseId = process.env.NOTION_DATABASE || "";
  private notionToken = process.env.NOTION_TOKEN || "";

  constructor() {
    this.notion = new Client({ auth: this.notionToken });
  }

  /**
   * 通用的 Notion 请求方法，带有错误处理
   * @param requestFn 请求函数
   * @param args 请求参数
   * @returns 请求结果，或抛出错误
   */
  async notionRequest<T>(
    requestFn: (...args: any[]) => Promise<any>,
    ...args: any[]
  ): Promise<T> {
    try {
      const response = await requestFn(...args);
      return response;
    } catch (error: unknown) {
      if (isNotionClientError(error)) {
        // 根据不同的错误类型处理
        switch (error.code) {
          case ClientErrorCode.RequestTimeout:
            console.error("请求超时，请重试");
            break;
          case APIErrorCode.ObjectNotFound:
            console.error("请求对象未找到");
            break;
          case APIErrorCode.Unauthorized:
            console.error("未经授权的请求");
            break;
          // 可以根据需要添加其他 Notion 的错误处理
          default:
            console.error("其他notion错误：", error.code);
        }
      } else {
        console.error("未知错误:", error);
      }
      throw error; // 将错误抛出，方便调用方进一步处理
    }
  }

  /**
   * 封装 Notion 数据库查询方法
   * @param databaseId 数据库 ID
   * @param filter 过滤条件
   * @param sorts 排序条件
   */
  async queryDatabase<T>(
    filter?: any,
    sorts?: any,
    start_cursor?: string,
    page_size?: number
  ) {
    return this.notionRequest<T>(
      this.notion.databases.query.bind(this.notion.databases),
      {
        database_id: this.databaseId,
        filter,
        sorts,
        start_cursor,
        page_size,
      }
    );
  }

  // 可以添加更多封装的方法，如创建页面、更新页面等
  async createPage(properties: any) {
    return this.notionRequest(
      this.notion.pages.create.bind(this.notion.pages),
      { properties }
    );
  }
}

const notionService = new NotionService();
export default notionService;
