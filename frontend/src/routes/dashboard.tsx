import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/queries/user";
import { createFileRoute, Link } from "@tanstack/react-router";
import AuthError from "@/components/auth-error";
import { MatchHistoryList } from "@/components/match/match-history/match-history-list";
import { Leaderboard } from "@/components/leaderboard";
import { Loader2Icon } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  if (isUserLoading) {
    return <Loader2Icon className="aniamte-spin" />;
  }

  if (!user) {
    return <AuthError />;
  }

  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex items-center justify-between bg-card p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.login}!</h1>
            <p className="text-muted-foreground mt-2">
              Ready for your next challenge?
            </p>
          </div>
          <Link to={"/match/queue"}>
            <Button size="lg" className="text-lg font-semibold px-8">
              Start Match
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Match History Section */}
          <div className="lg:col-span-8">
            <MatchHistoryList />
          </div>

          {/* Leaderboard Section */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <Leaderboard />
              {/* Quick Actions */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-col gap-3">
                  <Link to="/practice" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      Practice Problems
                    </Button>
                  </Link>
                  <Link to="/profile" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
