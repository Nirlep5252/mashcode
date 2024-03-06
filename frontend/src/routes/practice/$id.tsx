import { createFileRoute, useParams } from "@tanstack/react-router";
import React, { useState } from "react";
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

import { usePracticeQuestion } from "@/queries/practice";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import parse, { HTMLReactParserOptions } from "html-react-parser";

export const Route = createFileRoute("/practice/$id")({
  component: PracticePage,
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

function PracticePage() {
  const { id } = useParams({
    strict: true,
    from: "/practice/$id",
  });
  const { data: questionDetails, isLoading: isQuestionDetailsLoading } =
    usePracticeQuestion({
      variables: {
        id,
      },
    });
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (
        domNode.type === "tag" &&
        domNode.name === "span" &&
        domNode.attribs.class.includes("math")
      ) {
        const isInline = domNode.attribs.class.includes("inline");
        const mathComponent = isInline ? InlineMath : BlockMath;
        const latexString =
          domNode.children[0].type === "text" ? domNode.children[0].data : "";
        return React.createElement(mathComponent, { children: latexString });
      }
      if (domNode.type === "tag" && domNode.name === "h1") {
        if(domNode.children[0] && domNode.children[0].type === "text"){
          const text = domNode.children[0].data;
          return <h1 className="text-lg font-bold">{text}</h1>;
        }
      }
      // if(domNode.type === "tag" && domNode.name === "p"){
      //   if(domNode.children[1] && domNode.children[1].type === "text" && (domNode.children[1].data == "Input" || domNode.children[1].data == "Output")){ 
      //     const text = domNode.children[1].data;
      //     console.log(text);
      //     return <p className="text-xl font-semibold">{text}</p>;
      //   }
      // }
    },
  };
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("githubDark");
  const [text, setText] = useState("#Enter your code here...");
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
            <div className="flex h-[650px] justify-center p-6 overflow-scroll">
              <p className="text-md">
                {isQuestionDetailsLoading ? (
                  "Loading question..."
                ) : questionDetails ? (
                  <div>
                    <h2 className="font-bold text-2xl mb-2 text-center">
                      {questionDetails.problem_title}
                    </h2>
                    <div>
                      {parse(questionDetails.problem_statement, options)}
                    </div>
                    <div>
                      {parse(questionDetails.problem_input, options)}
                    </div>
                    <div>{parse(questionDetails.problem_output, options)}</div>
                    <div>
                      {parse(questionDetails.problem_constraints, options)}
                    </div>
                  </div>
                ) : (
                  "Error while fetching question"
                )}
              </p>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={10}>
                <div className="flex h-full items-center justify-center p-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={"ghost"}>
                        {language[0].toUpperCase() + language.slice(1)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel inset>
                        Select Language
                      </DropdownMenuLabel>
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
                  <Button variant={"ghost"}>Submit</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={"ghost"}>{theme}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel inset>Select Theme</DropdownMenuLabel>
                      {Object.keys(THEMES).map((theme) => (
                        <DropdownMenuItem
                          key={theme}
                          onClick={() => setTheme(theme)}
                        >
                          {theme}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={65}>
                <div className="flex h-full items-center justify-center p-6">
                  <CodeMirror
                    value={text}
                    onChange={(newValue) => setText(newValue)}
                    theme={THEMES[theme]}
                    extensions={EXTENSIONS[language]}
                    basicSetup={
                      {
                        autocompletion: true,
                      }
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "scroll",
                    }}
                    minHeight="100%"
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={25}>
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-baseline pl-4 pt-2 overflow-scroll">
                      <p className="text-sm">
                        {
                          isQuestionDetailsLoading ? "Loading question..." :
                          questionDetails ? 
                          <div>
                            {parse(questionDetails.problem_examples, options)}
                          </div>
                          : "Error while fetching question"
                        }
                      </p>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <p>
                        Status 
                      </p>
                    </div>
                  </ResizablePanel>
                  </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
