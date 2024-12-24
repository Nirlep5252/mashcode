import { useState } from "react";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
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

// Monaco language mapping for Judge0 language IDs
const languageMap: { [key: number]: string } = {
  75: "c",
  76: "cpp",
  48: "c",
  52: "cpp",
  49: "c",
  53: "cpp",
  50: "c",
  54: "cpp",
  86: "clojure",
  51: "csharp",
  77: "cobol",
  55: "lisp",
  56: "d",
  58: "erlang",
  59: "fortran",
  60: "go",
  88: "groovy",
  61: "haskell",
  62: "java",
  63: "javascript",
  78: "kotlin",
  64: "lua",
  79: "objective-c",
  66: "matlab",
  67: "pascal",
  85: "perl",
  68: "php",
  70: "python",
  71: "python",
  80: "r",
  72: "ruby",
  73: "rust",
  81: "scala",
  82: "sql",
  83: "swift",
  74: "typescript",
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

  const [currentCode, setCurrentCode] = useState<string>(sourceCode);
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
            await props.onRun(currentCode, parseInt(language));
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
            await props.onSubmit(currentCode, parseInt(language));
            setIsSubmitting(false);
          }}
        >
          {isSubmitting ? <Loader2Icon className="animate-spin" /> : "Submit"}
        </Button>
      </div>

      <Editor
        value={sourceCode}
        onChange={(value) => {
          setCurrentCode(value || "");
          setSourceCode(props.codeId, value || "");
        }}
        theme={theme === "dark" ? "vs-dark" : "light"}
        language={languageMap[parseInt(language)] || "plaintext"}
        options={{
          minimap: { enabled: false },
          fontSize: 20,
          automaticLayout: true,
          tabSize: 4,
          scrollBeyondLastLine: false,
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          wordBasedSuggestions: "currentDocument",
          parameterHints: { enabled: true },
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showClasses: true,
            showFunctions: true,
            showVariables: true,
            showModules: true,
            showIcons: true,
            showFiles: true,
          },
          snippetSuggestions: "top",
          hover: { enabled: true },
          formatOnPaste: true,
          formatOnType: true,
        }}
        height="100%"
        width="100%"
      />
    </div>
  );
};
