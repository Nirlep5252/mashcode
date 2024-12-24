import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useCodeEditorSettings } from "@/stores/code-editor-settings-store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDynamicDashboardLayout } from "@/stores/dynamic-dashboard";
import { Switch } from "@/components/ui/switch";

const editorThemes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "High Contrast", value: "hc-black" },
  { label: "High Contrast Light", value: "hc-light" },
] as const;

interface Props {}

export const CodeEditorSettings: React.FC<Props> = () => {
  const { theme, setTheme, vimMode, setVimMode } = useCodeEditorSettings();
  const { resetMatchLayout, resetPracticeLayout } = useDynamicDashboardLayout();

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex flex-col gap-2">
        <div className="ml-1">Editor Theme</div>
        <Select onValueChange={(value: typeof theme) => setTheme(value)}>
          <SelectTrigger>
            {editorThemes.find((t) => t.value === theme)?.label || theme}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Theme</SelectLabel>
              {editorThemes.map((theme) => (
                <SelectItem value={theme.value} key={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex items-center justify-between gap-2">
        <div className="ml-1">Vim Mode</div>
        <Switch checked={vimMode} onCheckedChange={setVimMode} />
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
