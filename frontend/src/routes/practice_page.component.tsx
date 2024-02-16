import { usePracticeQuestionDetails } from "@/queries/practice_questions";
export const component = function PracticePage() {
  const { data: questionDetails, isLoading: isQuestionDetailsLoading } = usePracticeQuestionDetails();
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
        <div className="w - 1/3 flex flex-col items-center justify-center gap-10">
        <h1 className={"text-4xl font-bold"}>Practice</h1>
        <p className={"text-lg font-bold"}>Solve the following question to improve your problem solving skills</p>
        <p className="text-2xl">{isQuestionDetailsLoading ? "Loading question..." : questionDetails ? 
          <div>
            <h2 className= "font-bold">{questionDetails.problem_title}</h2>
            <div dangerouslySetInnerHTML={{ __html: questionDetails.problem_statement }}></div>
          </div>
         : "Error while fetching question"}</p>
        </div>
    </div>
  );
};