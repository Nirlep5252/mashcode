import { MatchHistoryList } from "@/components/match/match-history/match-history-list";
import { PracticeHistory } from "@/components/practice/practice-history";
import { useCurrentUser } from "@/queries/user";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile/")({
  component: Profile,
});

function Profile() {
  // TODO: replace this with database user so that we can have rating, matches, etc...
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return (
      <div className={"w-full h-screen flex items-center justify-around"}>
        <Loader2Icon size={50} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return <div>Error loading profile</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-6 bg-card p-4 rounded-lg shadow-sm">
          <div className="flex gap-4 items-center">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">
                {user?.login || "No username"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Joined {format(new Date(user?.created_at || ""), "MMMM yyyy")}
              </p>
            </div>
          </div>

          <div className="flex gap-6 ml-auto">
            <div className="text-center">
              <p className="text-2xl font-bold">{user?.rating || 1000}</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user?.total_matches || 0}</p>
              <p className="text-sm text-muted-foreground">Matches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user?.total_practice || 0}</p>
              <p className="text-sm text-muted-foreground">Problems</p>
            </div>
          </div>
        </div>

        {/* History Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <MatchHistoryList />
          </div>
          <div className="w-full">
            <PracticeHistory user_id={user?.id || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
