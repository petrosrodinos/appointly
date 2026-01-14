import { NextResponse } from "next/server";
import axios from "axios";

const SITE_URL = process.env.NEXT_PUBLIC_LANDING_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  try {
    const res = await axios.get(`${API_BASE_URL}/accounts/providers`);
    const providers = res.data || [];

    const urls = providers.map((p: any) => `
      <url>
        <loc>${SITE_URL}/${p.slug}</loc>
        <lastmod>${new Date(p.updated_at).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
    `).join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${SITE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${urls}
    </urlset>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error: any) {
    console.error("Failed to generate sitemap:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
