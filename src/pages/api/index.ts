import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import { createHash } from 'crypto';
import { chromium } from 'playwright';
import getOpenGraphImage from "../../utils/getOpenGraphImage"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const publicPath = await getOpenGraphImage(req.query);
    res.status(200).send(publicPath);
}
