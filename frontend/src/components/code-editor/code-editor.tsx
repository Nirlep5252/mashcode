import { useState } from "react";

import { Button } from "@/components/ui/button";

import CodeMirror from "@uiw/react-codemirror";
import * as themes from "@uiw/codemirror-themes-all";
import { loadLanguage, langs } from "@uiw/codemirror-extensions-langs";
import { Loader2Icon, SettingsIcon } from "lucide-react";
import { useSourceCodeStore } from "@/stores/source-code";
import { useCodeEditorSettings } from "@/stores/code-editor-settings-store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { CodeEditorSettings } from "@/components/code-editor/code-editor-settings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { judge0Languages } from "@/lib/judge0/languages";

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

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (sourceCode: string, languageId: number) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRun: (sourceCode: string, languageId: number) => Promise<any>;
  codeId: string;
}

export const CodeEditor: React.FC<Props> = (props) => {
  const { language, setLanguage, theme } = useCodeEditorSettings();
  const { sourceCodeMap, setSourceCode } = useSourceCodeStore();
  const sourceCode = sourceCodeMap?.[props.codeId] || "";

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="flex gap-2 flex-row absolute z-40 bg-background right-2 bottom-2 p-2 rounded-lg">
        <Dialog>
          <DialogTrigger>
            <SettingsIcon />
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-6">
            <DialogHeader className="font-bold text-xl">Settings</DialogHeader>
            <CodeEditorSettings />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-row gap-3 absolute z-40 bg-background left-2 bottom-2 p-2 rounded-lg">
        <Select onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger>
            {
              judge0Languages.find((lang) => lang.id === parseInt(language))
                ?.name
            }
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Language</SelectLabel>
              {judge0Languages.map((lang) => (
                <SelectItem value={lang.id.toString()} key={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
