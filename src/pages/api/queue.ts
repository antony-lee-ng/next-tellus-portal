import { NextApiRequest, NextApiResponse } from "next";
import { queueHandler } from "../../lib/QueueHandler";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await queueHandler.start();
    res.json({
      status: "OK",
    });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
