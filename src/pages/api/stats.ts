import { NextApiRequest, NextApiResponse } from "next";
import { formSchema } from "src/lib/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST" && req.body) {
      throw new Error("Method is not POST...");
    }
    res.json(await formSchema.validate(req.body));
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
