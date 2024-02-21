import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { usePracticeQuestionDetails } from "@/queries/practice_questions";
export const component = function PracticePage() {
  const { data: questionDetails, isLoading: isQuestionDetailsLoading } =
    usePracticeQuestionDetails();
  const problemStatementHTML = questionDetails ? questionDetails.problem_statement : "";
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name === "span" && domNode.attribs.class.includes("math")) {
        const isInline = domNode.attribs.class.includes("inline");
        const mathComponent = isInline ? InlineMath : BlockMath;
        const latexString = domNode.children[0].type === "text" ? domNode.children[0].data : "";
        return React.createElement(mathComponent, { children: latexString });
      }
    },
  };
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="w - 1/3 flex flex-col items-center justify-center gap-10">
        <h1 className={"text-4xl font-bold"}>Practice</h1>
        <p className={"text-lg font-bold"}>
          Solve the following question to improve your problem solving skills
        </p>
        <p className="text-2xl">
          {isQuestionDetailsLoading ? (
            "Loading question..."
          ) : questionDetails ? (
            <div>
              <h2 className="font-bold">{questionDetails.problem_title}</h2>
              {parse(problemStatementHTML,options)}
            </div>
          ) : (
            "Error while fetching question"
          )}
        </p>
      </div>
    </div>
  );
};
