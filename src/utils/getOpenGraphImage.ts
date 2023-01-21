import fs from 'fs';
import { createHash } from 'crypto';
import { chromium } from 'playwright';

export default async function getOpenGraphImage(query) {
    const baseUrl = 'https://og-image-generator-olive.vercel.app'
    const path = new URLSearchParams(query).toString();
    const url = `${baseUrl}?${path}`;
    const ogImageDir = `./public/images/og`;
    const imgName = `${decodeURI(query.title)}.png`;
    const imagePath = `${ogImageDir}/${imgName}`;
    const publicPath = encodeURI(`${baseUrl}/images/og/${imgName}`);

    try {
        fs.statSync(imagePath);
        return publicPath;
    } catch (e) {
        console.log(`generating og image for ${publicPath}`);
    }

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle' });
    const buffer = await page.screenshot({ type: 'png' });
    await browser.close();

    fs.mkdirSync(ogImageDir, { recursive: true });
    fs.writeFileSync(imagePath, buffer);

    return publicPath;
}