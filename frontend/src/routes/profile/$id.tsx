import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$id")({
  component: Profile,
});

function Profile() {
  return <></>;
}
