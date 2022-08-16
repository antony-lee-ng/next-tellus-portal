import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { tellusAPI } from "src/lib/TellusAPI";
import { logger } from "../../lib/logger";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      throw new Error("Method is not POST...");
    }

    console.log(req.body);

    const data = await tellusAPI.createCall(req.body, true);

    res.status(200).json(data);
  } catch (err) {
    if (err instanceof AxiosError) {
      logger.error((err as AxiosError).response.data);
    }
    res.status(500).json({ statusCode: 500, message: (err as Error).message });
  }
};

export default handler;
