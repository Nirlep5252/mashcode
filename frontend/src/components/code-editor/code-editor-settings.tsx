import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useCodeEditorSettings } from "@/stores/code-editor-settings-store";
import * as themes from "@uiw/codemirror-themes-all";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDynamicDashboardLayout } from "@/stores/dynamic-dashboard";

const allThemes = Object.keys(themes).filter(
  (val) => !val.startsWith("defaultSettings") && !val.endsWith("Init")
) as unknown as (keyof typeof themes)[];

interface Props {}

export const CodeEditorSettings: React.FC<Props> = () => {
  const { theme, setTheme } = useCodeEditorSettings();
  const { resetMatchLayout, resetPracticeLayout } = useDynamicDashboardLayout();

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex flex-col gap-2">
        <div className="ml-1">Editor Theme</div>
        <Select
          onValueChange={(value) =>
            setTheme(value as (typeof allThemes)[number])
          }
        >
          <SelectTrigger>{theme}</SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Theme</SelectLabel>
              {allThemes.map((theme) => (
                <SelectItem value={theme} key={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex flex-col gap-2">
        <div className="ml-1">Reset Layouts</div>
        <div className="flex items-center justify-center gap-2 w-full">
          <Button
            onClick={() => {
              resetPracticeLayout();
            }}
            className="w-1/2"
            variant="destructive"
          >
            Reset Practice Page Layout
          </Button>
          <Button
            onClick={() => {
              resetMatchLayout();
            }}
            className="w-1/2"
            variant="destructive"
          >
            Reset Match Page Layout
          </Button>
        </div>
      </Label>
    </div>
  );
};
