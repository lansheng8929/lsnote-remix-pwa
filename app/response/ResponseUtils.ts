export enum CodeEnum {
  // 成功
  SUCCESS = 200, // 请求成功
  CREATED = 201, // 创建成功
  ACCEPTED = 202, // 请求已接受但尚未处理

  // 重定向
  MOVED_PERMANENTLY = 301, // 资源已永久移动
  FOUND = 302, // 资源临时移动

  // 客户端错误
  BAD_REQUEST = 400, // 请求无效
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 资源未找到
  METHOD_NOT_ALLOWED = 405, // 方法不被允许
  CONFLICT = 409, // 请求冲突
  UNPROCESSABLE_ENTITY = 422, // 请求格式正确但无法处理

  // 服务器错误
  INTERNAL_SERVER_ERROR = 500, // 内部服务器错误
  NOT_IMPLEMENTED = 501, // 尚未实现
  BAD_GATEWAY = 502, // 网关错误
  SERVICE_UNAVAILABLE = 503, // 服务不可用
  GATEWAY_TIMEOUT = 504, // 网关超时
}

export default class ResponseUtils {
  static ok<T = any>(data: T, message: string = 'Success'): CustomResponseType<T> {
    return {
      code: CodeEnum.SUCCESS,
      message,
      data,
    }
  }

  static fail(message: string): CustomResponseType {
    return {
      code: CodeEnum.BAD_REQUEST,
      message,
      data: null,
    }
  }
}
