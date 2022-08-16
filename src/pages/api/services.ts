import { NextApiRequest, NextApiResponse } from "next";
import { tellusAPI } from "src/lib/TellusAPI";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await tellusAPI.fetchServices();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
