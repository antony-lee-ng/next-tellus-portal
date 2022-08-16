import { logger } from "./logger";
import { configSchema } from "./schema";

export const loadConfig = (NODE_ENV: "development" | "production" | "test") => {
  const isProd = NODE_ENV === "production";
  const USERNAME = isProd
    ? process.env.TELLUS_USERNAME
    : process.env.DEV_TELLUS_USERNAME;
  const PASSWORD = isProd
    ? process.env.TELLUS_PASSWORD
    : process.env.DEV_TELLUS_PASSWORD;
  const ENDPOINT = isProd
    ? process.env.TELLUS_ENDPOINT
    : process.env.DEV_TELLUS_ENDPOINT;

  logger.info(`Loaded Endpoint: ${ENDPOINT}`);

  return configSchema.parse({
    ENDPOINT,
    USERNAME,
    PASSWORD,
  });
};
