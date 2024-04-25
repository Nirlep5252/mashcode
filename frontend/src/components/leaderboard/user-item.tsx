import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const LeaderboardUserItem: React.FC<
  GithubUser & {
    rating: number;
  }
> = (user) => {
  return (
    <Link
      key={user.id}
      className={"w-full"}
      to={`/profile/$id`}
      params={{
        id: user.id.toString(),
      }}
    >
      <Button
        className={"w-full flex items-center justify-between"}
        variant={"ghost"}
        key={user.id}
        size={"lg"}
      >
        <div className={"flex justify-center items-center gap-3"}>
          <Avatar className={"h-8 w-8"}>
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>{user.login.slice(0, 1)}</AvatarFallback>
          </Avatar>
          {user.login}
        </div>
        <div className={"rating"}>{user.rating}</div>
      </Button>
    </Link>
  );
};
