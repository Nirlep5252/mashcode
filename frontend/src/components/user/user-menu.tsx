import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
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
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <img
                className="rounded-full"
                src={user.avatar_url}
                alt={user?.login}
                width={36}
                height={36}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-36 flex-col px-2">
            <div className="flex flex-col">
              <Link to="/profile">
                <Button
                  size="sm"
                  className="w-full justify-start px-2"
                  variant="ghost"
                >
                  <UserIcon className="h-5 w-5" />
                  Profile
                </Button>
              </Link>
              <Button
                size="sm"
                className="w-full justify-start px-2"
                variant="ghost"
                onClick={() => {
                  window.localStorage.removeItem("ghToken");
                  window.location.reload();
                }}
              >
                <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
