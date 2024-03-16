import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

const EXTENSIONS: { [key: string]: LanguageSupport[] } = {
  python: [python()],
  javascript: [javascript()],
  cpp: [cpp()],
  "c++": [cpp()],
  java: [java()],
};

const THEMES: { [key: string]: Extension } = {
  vscodeDark: vscodeDark,
  githubDark: githubDark,
  githubLight: githubLight,
};

export const CodeEditor: React.FC = () => {
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("githubDark");
  const [text, setText] = useState("#Enter your code here...");
  return (
  <div className="flex flex-col h-full items-center justify-center p-6">
          <div className="flex flex-row gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant={"ghost"}>
                  {language[0].toUpperCase() + language.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel inset>Select Language</DropdownMenuLabel>
                {Object.keys(EXTENSIONS).map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                  >
                    {lang[0].toUpperCase() + lang.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">
              Run
            </Button>
            <Button variant="default">Submit</Button>
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
          <CodeMirror
            value={text}
            onChange={(newValue) => setText(newValue)}
            theme={THEMES[theme]}
            extensions={EXTENSIONS[language]}
            basicSetup={{
              autocompletion: true,
            }}
            style={{
              width: "100%",
              height: "100%",
              overflow: "scroll",
            }}
            minHeight="100%"
          />
        </div>
  );
};
