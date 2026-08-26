import { ImageResponse } from "next/og"

export const alt = "Blog de Felipe Miiller"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ color: "#94a3b8", display: "flex", fontSize: 30 }}>FELIPE MIILLER</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24 }}>Blog</div>
        <div style={{ color: "#cbd5e1", display: "flex", fontSize: 34, marginTop: 18 }}>
          Desenvolvimento, análise e ideias práticas.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
