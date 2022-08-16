import https from "https";
import http from "http";
import { RequestHandler } from "next/dist/server/next";
import { parse } from "url";

interface IHttpOptions {
  hostname: string;
  port: number;
  requestHandler: RequestHandler;
}

interface IHttpsOptions extends IHttpOptions {
  httpsOptions: https.ServerOptions;
}

export const createHttpServer = (
  { port, requestHandler }: IHttpOptions,
  cb: () => Promise<void>
) => {
  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);
      requestHandler(req, res, parsedUrl);
    })
    .listen(port, cb);
};

export const createHttpsServer = (
  { port, requestHandler, httpsOptions }: IHttpsOptions,
  cb: () => Promise<void>
) => {
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url!, true);
      requestHandler(req, res, parsedUrl);
    })
    .listen(port, cb);
};
