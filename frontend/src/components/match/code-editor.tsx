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
import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import * as themes from "@uiw/codemirror-themes-all";
import {
  loadLanguage,
  langNames,
  langs,
} from "@uiw/codemirror-extensions-langs";

loadLanguage("c");
loadLanguage("cpp");
loadLanguage("clojure");
loadLanguage("csharp");
loadLanguage("cobol");
loadLanguage("commonLisp");
loadLanguage("d");
loadLanguage("erlang");
loadLanguage("fortran");
loadLanguage("go");
loadLanguage("groovy");
loadLanguage("haskell");
loadLanguage("java");
loadLanguage("javascript");
loadLanguage("kotlin");
loadLanguage("lua");
loadLanguage("objectiveC");
loadLanguage("octave");
loadLanguage("pascal");
loadLanguage("perl");
loadLanguage("php");
loadLanguage("python");
loadLanguage("r");
loadLanguage("ruby");
loadLanguage("rust");
loadLanguage("scala");
loadLanguage("sql");
loadLanguage("swift");
loadLanguage("typescript");

// http://localhost:2358/languages
const judge0Languages = {
  75: langs.c(),
  76: langs.cpp(),
  48: langs.c(),
  52: langs.cpp(),
  49: langs.c(),
  53: langs.cpp(),
  50: langs.c(),
  54: langs.cpp(),
  86: langs.clojure(),
  51: langs.csharp(),
  77: langs.cobol(),
  55: langs.commonLisp(),
  56: langs.d(),
  58: langs.erlang(),
  59: langs.fortran(),
  60: langs.go(),
  88: langs.groovy(),
  61: langs.haskell(),
  62: langs.java(),
  63: langs.javascript(),
  78: langs.kotlin(),
  64: langs.lua(),
  79: langs.objectiveC(),
  66: langs.octave(),
  67: langs.pascal(),
  85: langs.perl(),
  68: langs.php(),
  70: langs.python(),
  71: langs.python(),
  80: langs.r(),
  72: langs.ruby(),
  73: langs.rust(),
  81: langs.scala(),
  82: langs.sql(),
  83: langs.swift(),
  74: langs.typescript(),
};

const EXTENSIONS: { [key: string]: LanguageSupport[] } = {
  python: [python()],
  javascript: [javascript()],
  cpp: [cpp()],
  "c++": [cpp()],
  java: [java()],
};

const allThemes = Object.keys(themes).filter(
  (val) => !val.startsWith("defaultSettings") && !val.endsWith("Init")
) as unknown as (keyof typeof themes)[];

interface Props {
  onSubmit: (value: string) => void;
  onRun: (value: string) => void;
}

export const CodeEditor: React.FC<Props> = (props) => {
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState<(typeof allThemes)[number]>("vscodeDark");
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
                <SelectItem value={lang} key={lang}>
                  {lang[0].toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            setTheme(value as (typeof allThemes)[number])
          }
        >
          <SelectTrigger>{theme}</SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Theme</SelectLabel>
              {allThemes.map((theme) => (
                <SelectItem value={theme} key={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-3 absolute z-50 bg-background right-2 bottom-2 p-2 rounded-lg">
        <Button variant="outline" onClick={() => props.onRun(text)}>
          Run
        </Button>
        <Button variant="default" onClick={() => props.onSubmit(text)}>
          Submit
        </Button>
      </div>

      <CodeMirror
        value={text}
        onChange={(newValue) => setText(newValue)}
        theme={themes[theme] as Extension}
        extensions={EXTENSIONS[language]}
        basicSetup={{
          autocompletion: true,
          foldGutter: true,
          tabSize: 4,
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
