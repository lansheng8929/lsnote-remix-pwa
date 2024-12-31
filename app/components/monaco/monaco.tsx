"use client";

import React from "react";
import * as monaco from "monaco-editor";

function Monaco() {
  React.useEffect(() => {
    monaco.editor.create(document.getElementById("monaco")!, {
      value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
        "\n"
      ),
      language: "javascript",
    });
  });

  return <div id="monaco" />;
}

export default Monaco;
