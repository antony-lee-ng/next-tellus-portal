import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

import next from "next";
import { queueHandler } from "../lib/QueueHandler";
import {
  createHttpServer,
  createHttpsServer,
} from "../lib/server/createServer";
import { loadCerts } from "../lib/server/loadCerts";

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || (dev ? "3000" : "443"), 10);
const hostname = "localhost";

// // when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const ServerCallback = async () => {
  const URL =
    port === 443 ? `https://${hostname}` : `http://${hostname}:${port}`;
  console.log(`-> Ready on ${URL}`);

  // start queue
  await queueHandler.start();
};

(async () => {
  try {
    await app.prepare();
    console.log(process.env.DEV_ENDPOINT);
    if (process.env.NODE_ENV === "production") {
      const { key, cert } = loadCerts();
      createHttpsServer(
        {
          hostname,
          port,
          requestHandler: handle,
          httpsOptions: {
            key,
            cert,
          },
        },
        ServerCallback
      );
    } else {
      createHttpServer(
        { hostname, port, requestHandler: handle },
        ServerCallback
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
