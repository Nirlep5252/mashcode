import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

export const Route = createFileRoute("/submit")({
  component: Submit,
});

function Submit() {
    const [language, setLanguage] = useState("javascript");
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="w - 1/2 flex flex-col items-center justify-center gap-10">
        <Card className={"w-[960px] min-h-[500px]"}>
          <CardHeader>
            <CardTitle>Submit your solution</CardTitle>
            <CardContent>
              <Editor
                height="70vh"
                defaultLanguage="javascript"
                defaultValue="// write your code here"
                language= {language}
              />
              <select
                className="w-1/3 mt-4"
                onChange={(e) => setLanguage(e.target.value)}
                >
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                </select>
              <Button size={"sm"} className={"font-bold scale-150"}>
                Submit
              </Button>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}