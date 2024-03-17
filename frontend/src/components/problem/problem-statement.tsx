import { usePracticeQuestion } from "@/queries/practice";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Props {
  problemId: string;
}

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
      return <></>;
    }
    if (domNode.type === "tag" && domNode.name === "p") {
      if (
        domNode.children[0] &&
        domNode.children[0].type === "text" &&
        (domNode.children[0].data == "Input:" ||
          domNode.children[0].data == "Output:")
      ) {
        return domNode.children[0].data;
      }
    }
  },
};

export const ProblemStatement: React.FC<Props> = ({ problemId }) => {
  const { data: questionDetails, isLoading: isQuestionDetailsLoading } =
    usePracticeQuestion({
      variables: {
        id: problemId,
      },
    });

  if (isQuestionDetailsLoading) {
    return <>Loading...</>;
  }

  if (!questionDetails) {
    return <>Error fetching problem statement</>;
  }

  return (
    <div className="p-6">
      <div className="font-bold text-3xl mb-4 text-center">
        {questionDetails.problem_title}
      </div>
      <div className="text-lg">
        {parse(questionDetails.problem_statement, options)}
      </div>
      <div className="text-xl font-semibold mt-4">Input</div>
      <div>{parse(questionDetails.problem_input, options)}</div>
      <div className="text-xl font-semibold mt-4">Output</div>
      <div>{parse(questionDetails.problem_output, options)}</div>
      <div className="text-xl font-semibold mt-4">Constraints</div>
      <div>{parse(questionDetails.problem_constraints, options)}</div>
    </div>
  );
};
