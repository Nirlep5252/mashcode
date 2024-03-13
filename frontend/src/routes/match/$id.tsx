import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/match/$id")({
  component: Match,
});

function Match() {
  return (
    <>
      <div></div>
    </>
  );
}
