// // API：获取所有 Markdown 数据
// app.get("/api/markdown", (req, res) => {

// });

// // API：保存 Markdown 数据
// app.post("/api/markdown", (req, res) => {
//   const { markdownList } = req.body; // 接收客户端传来的 Markdown 数据

//   if (!Array.isArray(markdownList)) {
//     return res.status(400).json({ error: "Invalid data format" });
//   }

//   fs.writeFileSync(dataFile, JSON.stringify(markdownList, null, 2), "utf-8");
//   res.json({ message: "Markdown data saved successfully" });
// });
