import axios, { AxiosError, AxiosInstance } from "axios";
import { join } from "path";
import { loadConfig } from "./config";
import { logger } from "./logger";
import { queueHandler } from "./QueueHandler";
import { formSchema } from "./schema";
import { outputFile } from "fs-extra";
import { readFile } from "fs/promises";

export interface IServices {
  result: {
    sys_id: string;
    name: string;
  }[];
}
export class TellusAPI {
  private instance: AxiosInstance;
  path: string;
  constructor() {
    const { ENDPOINT, USERNAME, PASSWORD } = loadConfig(process.env.NODE_ENV);
    this.instance = axios.create({
      baseURL: ENDPOINT,
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });
    this.path = process.env.DATA_PATH || "./data/";
  }

  async createCall(formData: Record<any, any>, addToQueueIfFail: boolean) {
    try {
      logger.info("creating call");
      const { data } = await this.instance.post<{
        result: { number: string; success: boolean };
      }>(
        `/api/global/external_portal/create`,
        await formSchema.validate(formData)
      );
      logger.info(`Created ${data.result.number}`);
      return data;
    } catch (err) {
      logger.error((err as Error).message);
      // WARNING: This can trigger recursive
      if (addToQueueIfFail) {
        await queueHandler.add(formData);
        throw new Error("Added to queue");
      } else {
        const errMsg = `Failed to create call ${(err as Error).message}`;
        logger.error(errMsg);
        throw new Error(errMsg);
      }
    }
  }

  async fetchServices(): Promise<IServices> {
    const path = join(this.path, "services.json");
    try {
      logger.info("fetchServices init");
      const { data } = await this.instance.get<IServices>(
        "/api/now/table/cmdb_ci_service",
        {
          params: {
            sysparm_query: "",
            sysparm_fields: "name,sys_id",
            sysparm_limit: 10,
          },
        }
      );

      // Save the data, if the endpoint goes down
      await outputFile(path, JSON.stringify(data));

      logger.info(`Saved services to -> ${join(this.path, "services.json")}`);

      return data;
    } catch (err) {
      logger.error(`fetchServices failed: ${(err as Error).message}`);
      // @ts-ignore
      logger.error((err as AxiosError).config);

      return JSON.parse(await readFile(path, "utf-8")) || { result: [] };
    }
  }
}

export const tellusAPI = new TellusAPI();
