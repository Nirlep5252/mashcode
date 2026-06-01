import { Hono } from "hono";
import { cors } from "hono/cors";
import { upgradeWebSocket, websocket } from "hono/bun";
import {
  decodeClientMessage,
  encodeServerMessage
} from "@mashcode/realtime-protocol";

const app = new Hono();

const websocketPayloadToString = async (
  data: string | Blob | ArrayBufferLike
): Promise<string> => {
  if (typeof data === "string") {
    return data;
  }

  if (data instanceof Blob) {
    return data.text();
  }

  return new TextDecoder().decode(new Uint8Array(data));
};

app.use(
  "*",
  cors({
    origin: Bun.env.WEB_ORIGIN ?? "http://localhost:3000",
    credentials: true
  })
);

app.get("/health", (c) => {
  return c.json({
    ok: true,
    service: "api",
    time: new Date().toISOString()
  });
});

app.get(
  "/ws",
  upgradeWebSocket(() => {
    return {
      onOpen: (_event, ws) => {
        ws.send(
          encodeServerMessage({
            type: "connection.accepted",
            serverTime: new Date().toISOString()
          })
        );
      },
      onMessage: async (event, ws) => {
        try {
          const payload = await websocketPayloadToString(event.data);
          const message = decodeClientMessage(payload);

          if (message.type === "heartbeat") {
            ws.send(
              encodeServerMessage({
                type: "system.heartbeat_ack",
                clientTime: message.clientTime,
                serverTime: new Date().toISOString()
              })
            );
          }
        } catch {
          ws.send(
            encodeServerMessage({
              type: "match.error",
              code: "invalid_message",
              message: "WebSocket message did not match the MashCode protocol."
            })
          );
        }
      }
    };
  })
);

const port = Number(Bun.env.API_PORT ?? Bun.env.PORT ?? 4000);

console.log(`MashCode API listening on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
  websocket
};
