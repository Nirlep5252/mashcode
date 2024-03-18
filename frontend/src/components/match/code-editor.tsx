import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

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
    <div className="flex flex-col h-full items-center justify-center">
      <div className="flex gap-2 flex-row absolute z-50 bg-background left-2 bottom-2 p-2 rounded-lg">
        <Select onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger>
            {language[0].toUpperCase() + language.slice(1)}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Language</SelectLabel>
              {Object.keys(EXTENSIONS).map((lang) => (
                <SelectItem
                  value={lang}
                  key={lang}
                >
                  {lang[0].toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setTheme(value)}>
          <SelectTrigger>{theme}</SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Theme</SelectLabel>
              {Object.keys(THEMES).map((theme) => (
                <SelectItem
                  value={theme}
                  key={theme}
                >
                  {theme}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-3 absolute z-50 bg-background right-2 bottom-2 p-2 rounded-lg">
        <Button variant="outline">Run</Button>
        <Button variant="default">Submit</Button>
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
