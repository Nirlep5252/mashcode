import test from "node:test";
import assert from "node:assert/strict";
import { pickMatchPair } from "@/domain/matchmaking";

test("pickMatchPair picks oldest two users in same mode", () => {
  const now = Date.now();
  const pair = pickMatchPair([
    { entryId: "1", userId: "a", mode: "duel_casual", joinedAt: new Date(now + 2000) },
    { entryId: "2", userId: "b", mode: "duel_ranked", joinedAt: new Date(now + 3000) },
    { entryId: "3", userId: "c", mode: "duel_casual", joinedAt: new Date(now + 1000) },
    { entryId: "4", userId: "d", mode: "duel_casual", joinedAt: new Date(now + 1500) },
  ]);

  assert.ok(pair);
  assert.equal(pair?.[0].userId, "c");
  assert.equal(pair?.[1].userId, "d");
});

test("pickMatchPair returns null when no compatible pairs", () => {
  const pair = pickMatchPair([
    { entryId: "1", userId: "a", mode: "duel_casual", joinedAt: new Date() },
    { entryId: "2", userId: "b", mode: "duel_ranked", joinedAt: new Date() },
  ]);

  assert.equal(pair, null);
});
