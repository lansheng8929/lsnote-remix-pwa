import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import path from "path";
import fs from "fs";
import { LoaderCircle } from "lucide-react";
import {
  useActionData,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
import MdEditor from "react-markdown-editor-lite";
import { ClientOnly } from "remix-utils/client-only";
import "react-markdown-editor-lite/lib/index.css";

const DATA_DIR = path.join(process.cwd(), "data");

export async function loader({ request }: LoaderFunctionArgs) {
  const files = await fs.promises.readdir(DATA_DIR, { withFileTypes: true });

  const markdownFiles = files.filter((file) => file.name.endsWith(".md"));

  const markdownContents = await Promise.all(
    markdownFiles.map(async (file) => {
      const filePath = path.join(DATA_DIR, file.name);
      const content = await fs.promises.readFile(filePath, "utf-8");
      return { fileName: file.name, content };
    })
  );

  return Response.json({ list: markdownContents });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action")?.toString() || "";

  if (action === "delete") {
    const fileName = formData.get("fileName")?.toString() || "";

    const filePath = path.join(DATA_DIR, fileName);

    await fs.promises.access(filePath);
    await fs.promises.unlink(filePath);

    return Response.json({ ok: true });
  }
  if (action === "add") {
    const markdown = formData.get("markdown")?.toString() || "[]";
    const markdownList = JSON.parse(markdown);
    // console.log(markdownList);

    if (!Array.isArray(markdownList)) {
      return Response.json({ ok: false }, { status: 400 });
    }

    markdownList.forEach((list) => {
      const DATA_FILE = path.join(process.cwd(), "data", `${list.fileName}.md`);
      fs.writeFileSync(DATA_FILE, list.content, "utf-8");
    });

    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 400 });
}

export default function Index() {
  const data = useLoaderData<any>();
  const actionData = useActionData<any>();
  const [searchParams, setSearchParams] = useSearchParams();

  const submit = useSubmit();

  const [markdownList, setMarkdownList] = React.useState<
    {
      fileName: string;
      content: string;
    }[]
  >(data.list || []);
  const [newMarkdown, setNewMarkdown] = React.useState<{
    fileName: string;
    content: string;
  } | null>(null);

  const handleSaveMarkdown = () => {
    if (newMarkdown && newMarkdown.content.trim() === "") return;

    submit(
      {
        action: "add",
        markdown: JSON.stringify([
          { fileName: uuidv4(), content: newMarkdown!.content },
        ]),
      },
      { method: "POST" }
    );
  };

  const handleDeleteMarkdown = (fileName: string) => {
    submit({ action: "delete", fileName }, { method: "POST" });
  };

  const handleImageUpload = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target!.result);
      };
      reader.readAsDataURL(file);
    });
  };

  React.useEffect(() => {
    if (actionData && actionData.ok) {
      window.location.reload();
    }
  }, [actionData]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600">
          LSNOTE
        </h1>

        <div className="max-h-[500px] overflow-auto resize-y">
          <iframe
            className="h-full w-full"
            src="https://markdown.com.cn/"
          ></iframe>
        </div>

        <div className="mt-6">
          <ClientOnly fallback={<LoaderCircle className=" animate-spin" />}>
            {() => (
              <>
                <MdEditor
                  className="w-full min-h-[300px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  renderHTML={(text) => (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      urlTransform={(value: string) => value}
                    >
                      {text}
                    </ReactMarkdown>
                  )}
                  onChange={({ html, text }) => {
                    setNewMarkdown({ fileName: "", content: text });
                  }}
                  onImageUpload={handleImageUpload}
                  // onCustomImageUpload={onCustomImageUpload}
                />
              </>
            )}
          </ClientOnly>

          <button
            onClick={handleSaveMarkdown}
            className="w-full mt-3 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transition duration-200"
          >
            添加 Markdown
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {markdownList.length === 0 ? (
            <p className="text-gray-500 text-center">目前没有 Markdown 内容</p>
          ) : (
            markdownList.map((list, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition duration-200 max-h-[200px] overflow-auto"
              >
                <div className="flex justify-between items-start">
                  <div className="prose max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      urlTransform={(value: string) => value}
                    >
                      {list.content}
                    </ReactMarkdown>
                  </div>
                  <div className="space-x-2 ml-4">
                    <button
                      onClick={() => handleDeleteMarkdown(list.fileName)}
                      className="text-red-600 hover:text-red-800 focus:outline-none transition duration-150"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
