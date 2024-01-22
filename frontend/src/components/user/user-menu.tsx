import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/queries/auth";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";

export default function UserMenu() {
  const { data: user, isLoading, isError } = useUser();

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : isError || !user ? (
        <a href={`/api/login?redirect=${window.location.href}`}>
          <Button variant="ghost">Login</Button>
        </a>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center">
            <Button size="icon" variant="ghost">
              <img
                className="rounded-full"
                src={user.avatar_url}
                alt={user?.login}
                width={40}
                height={40}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="w-full justify-start px-2 cursor-pointer"
              asChild
            >
              <Link to="/profile">
                <UserIcon className="h-5 w-5" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full justify-start px-2 cursor-pointer"
              onClick={() => {
                window.localStorage.removeItem("ghToken");
                window.location.reload();
              }}
            >
              <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
