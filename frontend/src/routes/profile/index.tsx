import { useCurrentUser } from "@/queries/user";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile/")({
  component: Profile,
});

function Profile() {
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
    <div className={"w-full h-screen flex items-center justify-around"}>
      <div className="flex flex-col gap-2 w-full justify-center h-screen max-h-[80vh]">
        <div className="flex w-full h-1/4">
          <div className="flex gap-10">
            {user?.avatar_url && (
              <div className="flex mt-4">
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  className="w-32 h-32 rounded-lg"
                />
              </div>
            )}
            <h1 className="pt-5 text-2xl text-center font-semibold">
              {user?.login || "No username"}
            </h1>
          </div>
        </div>
        <div className="flex h-3/4 gap-2">
          <div className="border-2 rounded-lg w-1/2">2</div>
          <div className="border-2 rounded-lg w-1/2">3</div>
        </div>
      </div>
    </div>
  );
}
