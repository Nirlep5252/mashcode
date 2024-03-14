import { createFileRoute } from "@tanstack/react-router";
import { Layout, Model, TabNode, IJsonModel } from "flexlayout-react";
import "flexlayout-react/style/dark.css";

import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { LanguageSupport } from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

import { usePracticeQuestion } from "@/queries/practice";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import React, { useState } from "react";

export const Route = createFileRoute("/practice/submit")({
  component: Submit,
});

const layout: IJsonModel = {
  global: { tabEnableClose: false },
  borders: [],
  layout: {
    type: "row",
    weight: 50,
    children: [
      {
        type: "tabset",
        weight: 100,
        selected: 0,
        children: [
          {
            type: "tab",
            name: "Problem Statement",
            component: "problemStatement",
          },
        ],
      },
      {
        type: "row",
        children: [
          {
            type: "tabset",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Code",
                component: "codeEditor",
              },
            ],
          },
          {
            type: "tabset",
            weight: 50,
            selected: 0,
            children: [
              {
                type: "tab",
                name: "Example Cases",
                component: "exampleCases",
              },
              {
                type: "tab",
                name: "Status",
                component: "status",
              },
            ],
          },
        ],
      },
    ],
  },
};

const model = Model.fromJson(layout);

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

function Submit() {
  const { data: questionDetails, isLoading: isQuestionDetailsLoading } =
    usePracticeQuestion({
      variables: {
        id: "1",
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
        if (domNode.children[0] && domNode.children[0].type === "text") {
          const text = domNode.children[0].data;
          return <h1 className="text-lg font-bold">{text}</h1>;
        }
      }
      if (domNode.type === "tag" && domNode.name === "p") {
        console.log(domNode.children);
        if (
          domNode.children[0] &&
          domNode.children[0].type === "text" &&
          (domNode.children[0].data == "Input:" ||
            domNode.children[0].data == "Output:")
        ) {
          const text = domNode.children[0].data;
          //console.log(text);
          return <p className="text-md font-semibold">{text}</p>;
        }
      }
    },
  };
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("githubDark");
  const [text, setText] = useState("#Enter your code here...");
  const factory = (node: TabNode) => {
    if (node.getComponent() === "text") {
      return <div>Text Component</div>;
    }
    if (node.getComponent() === "problemStatement") {
      return (
        <div className="flex h-[650px] justify-center p-6 overflow-scroll">
          <p className="text-md">
            {isQuestionDetailsLoading ? (
              "Loading question..."
            ) : questionDetails ? (
              <div>
                <h2 className="font-bold text-2xl mb-2 text-center">
                  {questionDetails.problem_title}
                </h2>
                <div>{parse(questionDetails.problem_statement, options)}</div>
                <div>{parse(questionDetails.problem_input, options)}</div>
                <div>{parse(questionDetails.problem_output, options)}</div>
                <div>{parse(questionDetails.problem_constraints, options)}</div>
              </div>
            ) : (
              "Error while fetching question"
            )}
          </p>
        </div>
      );
    }
    if (node.getComponent() === "codeEditor") {
      return (
        <div className="flex h-full items-center justify-center p-6">
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
    }
    if (node.getComponent() === "exampleCases") {
      return (
        <div className="flex h-full items-baseline pl-4 pt-2 overflow-scroll">
          <p className="text-sm">
            {isQuestionDetailsLoading ? (
              "Loading sample test case..."
            ) : questionDetails ? (
              <div>{parse(questionDetails.problem_examples, options)}</div>
            ) : (
              "Error while fetching question"
            )}
          </p>
        </div>
      );
    }
    if (node.getComponent() === "status") {
      return <div>Status</div>;
    }
  };
  return <Layout model={model} factory={factory} />;
}
