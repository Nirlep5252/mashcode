import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import UserMenu from "@/components/user/user-menu";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between fixed z-20 w-[70%]">
      <div className="left flex items-center justify-center gap-6">
        <Link to="/">
          <div className="logo text-xl font-bold text-foreground">mashcode</div>
        </Link>
        <div className="links flex items-center justify-center gap-2 text-sm">
          <Link to="/dashboard">
            <Button variant="ghost">dashboard</Button>
          </Link>
          <Link to="/practice">
            <Button variant="ghost">practice</Button>
          </Link>
        </div>
      </div>
      <div className="right flex items-center justify-center gap-4">
        <ThemeToggle />
        <UserMenu />
      </div>
    </div>
  );
}
