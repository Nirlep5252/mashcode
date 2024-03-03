import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_URL } from "@/lib/constants";
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
        <a href={`${API_URL}/login?redirect=${window.location.href}`}>
          <Button variant="ghost">Login</Button>
        </a>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="flex items-center justify-center"
          >
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
                window.location.href = "/";
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
