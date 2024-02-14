import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const component = function Practice() {
  return (
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="w - 1/3 flex flex-col items-center justify-center gap-10">
      <div className="previous-matches w-full flex column">
        <Card className={"w-[380px] min-h-[400px]"}>
          <CardHeader>
            <CardTitle>Unsolved Questions</CardTitle>
          </CardHeader>
          <CardContent className={"flex items-center justify-center"}>
              
          </CardContent>
        </Card>
      </div>
      <Button size={"lg"} className={"font-bold scale-150 text-lg"}>
          Practice
      </Button>
      </div>
    </div>
  );
};
