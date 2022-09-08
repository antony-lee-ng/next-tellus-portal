import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: process.env.LOG_PATH || "../../logs/combined.log",
    }),
  ],
});
