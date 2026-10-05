import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${site.name}: product, e-commerce and analytics`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f6f2",
          color: "#16150f",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, color: "#57544b", textTransform: "uppercase" }}>
          {site.name} · {site.location}
        </div>
        <div style={{ display: "flex", fontSize: 72, lineHeight: 1.08, maxWidth: 980, letterSpacing: -1.5 }}>
          I build digital products using data, technology and consumer insight.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: "#57544b" }}>
          <div style={{ width: 48, height: 3, background: "#1f5e4b" }} />
          {site.disciplines.join("  ×  ")}
        </div>
      </div>
    ),
    size,
  );
}
