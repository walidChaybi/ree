import React from "react";

export interface IVisionneusePdfProps {
  infoBulle: string;
  url: string;
  zoomPageFit?: boolean;
}

export const VisionneusePdf: React.FC<IVisionneusePdfProps> = ({ infoBulle, url, zoomPageFit = true }) => (
  <div style={{ overflow: "hidden" }}>
    <iframe
      title={infoBulle}
      src={`${url}${zoomPageFit ? "#zoom=page-fit" : ""}`}
      style={{
        overflow: "hidden",
        height: "100vh",
        width: "100%",
        border: 0
      }}
    ></iframe>
  </div>
);
