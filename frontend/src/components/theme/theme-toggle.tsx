import { useThemeStore } from "@/stores/theme";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const themeStore = useThemeStore();

  return (
    <>
      <Button variant="ghost" onClick={themeStore?.toggleDark}>
        {themeStore?.dark ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </Button>
    </>
  );
}
