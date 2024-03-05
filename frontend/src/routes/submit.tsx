import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button.tsx";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { LanguageSupport } from "@codemirror/language";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { Code } from "lucide-react";

export const Route = createFileRoute("/submit")({
  component: Submit,
});

const EXTENSIONS: { [key: string]: LanguageSupport[] } = {
  markdown: [markdown()],
  python: [python()],
  javascript: [javascript()],
  typescript: [javascript()],
  cpp: [cpp()],
  "c++": [cpp()],
  html: [html()],
  json: [json()],
  java: [java()],
};

const THEMES: { [key: string]: any } = {
  vscodeDark: vscodeDark,
  githubDark: githubDark,
  githubLight: githubLight,
};

function Submit() {
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("githubDark");
  const [text, setText] = useState("Enter your code here...");
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div
        className={"w-full flex flex-col items-center justify-center gap-10"}
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-7xl rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <div className="flex h-[650px] items-center justify-center p-6">
              <span className="font-semibold">Problem Statement</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={5}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Customisations</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center p-6">
                  <CodeMirror
                    value={text}
                    onChange={(newValue) => setText(newValue)}
                    theme={THEMES[theme]}
                    extensions={EXTENSIONS[language]}
                    basicSetup={{ autocompletion: true }}
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "scroll",
                    }}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={20}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Output</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
