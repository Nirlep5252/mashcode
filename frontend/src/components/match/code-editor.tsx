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

import CodeMirror from "@uiw/react-codemirror";
import * as themes from "@uiw/codemirror-themes-all";
import { loadLanguage, langs } from "@uiw/codemirror-extensions-langs";
import { Loader2Icon } from "lucide-react";
import { useSourceCodeStore } from "@/stores/source-code";
import { useCodeEditorSettings } from "@/stores/code-editor-settings";

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
const supportedLanguages = {
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
const judge0LanguagesNames = [
  {
    id: 75,
    name: "C (Clang 7.0.1)",
  },
  {
    id: 76,
    name: "C++ (Clang 7.0.1)",
  },
  {
    id: 48,
    name: "C (GCC 7.4.0)",
  },
  {
    id: 52,
    name: "C++ (GCC 7.4.0)",
  },
  {
    id: 49,
    name: "C (GCC 8.3.0)",
  },
  {
    id: 53,
    name: "C++ (GCC 8.3.0)",
  },
  {
    id: 50,
    name: "C (GCC 9.2.0)",
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
  },
  {
    id: 86,
    name: "Clojure (1.10.1)",
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
  },
  {
    id: 77,
    name: "COBOL (GnuCOBOL 2.2)",
  },
  {
    id: 55,
    name: "Common Lisp (SBCL 2.0.0)",
  },
  {
    id: 56,
    name: "D (DMD 2.089.1)",
  },
  {
    id: 58,
    name: "Erlang (OTP 22.2)",
  },
  {
    id: 59,
    name: "Fortran (GFortran 9.2.0)",
  },
  {
    id: 60,
    name: "Go (1.13.5)",
  },
  {
    id: 88,
    name: "Groovy (3.0.3)",
  },
  {
    id: 61,
    name: "Haskell (GHC 8.8.1)",
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
  },
  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
  },
  {
    id: 78,
    name: "Kotlin (1.3.70)",
  },
  {
    id: 64,
    name: "Lua (5.3.5)",
  },
  {
    id: 79,
    name: "Objective-C (Clang 7.0.1)",
  },
  {
    id: 66,
    name: "Octave (5.1.0)",
  },
  {
    id: 67,
    name: "Pascal (FPC 3.0.4)",
  },
  {
    id: 85,
    name: "Perl (5.28.1)",
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
  },
  {
    id: 70,
    name: "Python (2.7.17)",
  },
  {
    id: 71,
    name: "Python (3.8.1)",
  },
  {
    id: 80,
    name: "R (4.0.0)",
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
  },
  {
    id: 73,
    name: "Rust (1.40.0)",
  },
  {
    id: 81,
    name: "Scala (2.13.2)",
  },
  {
    id: 82,
    name: "SQL (SQLite 3.27.2)",
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
  },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
  },
];

const allThemes = Object.keys(themes).filter(
  (val) => !val.startsWith("defaultSettings") && !val.endsWith("Init")
) as unknown as (keyof typeof themes)[];

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (sourceCode: string, languageId: number) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRun: (sourceCode: string, languageId: number) => Promise<any>;
  codeId: string;
}

export const CodeEditor: React.FC<Props> = (props) => {
  const { language, setLanguage, theme, setTheme } = useCodeEditorSettings();
  const { sourceCodeMap, setSourceCode } = useSourceCodeStore();
  const sourceCode = sourceCodeMap?.[props.codeId] || "";

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="flex gap-2 flex-row absolute z-50 bg-background left-2 bottom-2 p-2 rounded-lg">
        <Select onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger>
            {
              judge0LanguagesNames.find(
                (lang) => lang.id === parseInt(language)
              )?.name
            }
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Language</SelectLabel>
              {judge0LanguagesNames.map((lang) => (
                <SelectItem value={lang.id.toString()} key={lang.id}>
                  {lang.name}
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
        <Button
          disabled={isRunning}
          variant="outline"
          onClick={async () => {
            setIsRunning(true);
            await props.onRun(sourceCode, parseInt(language));
            setIsRunning(false);
          }}
        >
          {isRunning ? <Loader2Icon className="animate-spin" /> : "Run"}
        </Button>
        <Button
          disabled={isSubmitting}
          variant="default"
          onClick={async () => {
            setIsSubmitting(true);
            await props.onSubmit(sourceCode, parseInt(language));
            setIsSubmitting(false);
          }}
        >
          {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Submit"}
        </Button>
      </div>

      <CodeMirror
        value={sourceCode}
        onChange={(newValue) => setSourceCode(props.codeId, newValue)}
        // @ts-expect-error stfu bitch i know what i am doing
        theme={themes[theme]}
        // @ts-expect-error - this is stupid but it works, fuck you typescript
        extensions={[supportedLanguages[parseInt(language)]]}
        basicSetup={{
          autocompletion: true,
          foldGutter: true,
          tabSize: 4,
        }}
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          fontSize: "20px",
        }}
        placeholder={"Please enter the code."}
        minHeight="100%"
      />
    </div>
  );
};
