import React from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { usePracticeQuestion } from "@/queries/practice.ts";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/practice/$id")({
  component: PracticePage,
});

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
              <div>{parse(questionDetails.problem_statement, options)}</div>
              <div>{parse(questionDetails.problem_input, options)}</div>
              <div>{parse(questionDetails.problem_output, options)}</div>
              <div>{parse(questionDetails.problem_constraints, options)}</div>
              <div>{parse(questionDetails.problem_examples, options)}</div>
            </div>
          ) : (
            "Error while fetching question"
          )}
        </p>
      </div>
    </div>
  );
}
