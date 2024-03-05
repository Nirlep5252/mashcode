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
import { Button } from "@/components/ui/button.tsx";
import {
  githubDark,
  githubLight, 
} from "@uiw/codemirror-theme-github";
import{
  vscodeDark,
} from "@uiw/codemirror-theme-vscode";
import { LanguageSupport } from "@codemirror/language";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

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
  const [text, setText] = useState("");
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="w - 1/3 flex flex-col items-center justify-center gap-10">
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant={"ghost"}>
                {language[0].toUpperCase() + language.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel inset>Select Language</DropdownMenuLabel>
              {Object.keys(EXTENSIONS).map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                  {lang[0].toUpperCase() + lang.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant={"ghost"}>{theme}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel inset>Select Theme</DropdownMenuLabel>
              {Object.keys(THEMES).map((theme) => (
                <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
                  {theme}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="editor w-full flex column">
          <CodeMirror
            value={text}
            onChange={(newValue) => setText(newValue)}
            theme={THEMES[theme]}
            extensions={EXTENSIONS[language]}
            basicSetup={{ autocompletion: true }}
            minWidth={"500px"}
            minHeight={"500px"}
          />
        </div>
        <Button size={"sm"} className={"font-bold scale-150 text-lg"}>
          Submit
        </Button>
      </div>
    </div>
  );
}
