import fs from 'fs';
import { createHash } from 'crypto';
import { chromium } from 'playwright';

export default async function getOpenGraphImage(query) {
    const baseUrl = 'https://og-image-generator-olive.vercel.app'
    const path = new URLSearchParams(query).toString();
    const url = `${baseUrl}?${path}`;
    const ogImageDir = `./public/images/og`;
    const imagePath = `${ogImageDir}/${query.title}.png`;
    const publicPath = `${baseUrl}/images/og/${query.title}.png`;

    try {
        fs.statSync(imagePath);
        return publicPath;
    } catch (e) {
        console.log(`generating og image for ${path}`);
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