import { ImageResponse } from "next/og";
export const alt = "exégeomai — Scripture has depths. Coming soon.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0B1120",
          color: "white",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 25, color: "#FDD223", marginBottom: 65 }}>
          exégeomai · COMING SOON
        </div>
        <div style={{ fontSize: 68, letterSpacing: -3 }}>
          Scripture has depths.
        </div>
        <div
          style={{
            fontSize: 56,
            letterSpacing: -2,
            color: "#FDD223",
            marginTop: 8,
          }}
        >
          Get ready to discover them.
        </div>
        <div style={{ fontSize: 22, color: "#CBD5E1", marginTop: 55 }}>
          Join the waiting list · exegeomai.app
        </div>
      </div>
    ),
    size,
  );
}
