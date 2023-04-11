import React from "react";

export interface IVisionneusePdfProps {
  infoBulle: string;
  url: string;
  zoomPageFit?: boolean; // = true par défaut cf. defaultProps
}

export const VisionneusePdf: React.FC<IVisionneusePdfProps> = props => {
  const url = props.zoomPageFit ? props.url + "#zoom=page-fit" : props.url;
  return (
    <div style={{ overflow: "hidden" }}>
      <iframe
        title={props.infoBulle}
        src={url}
        style={{
          overflow: "hidden",
          height: "100vh",
          width: "100%",
          border: 0
        }}
      ></iframe>
    </div>
  );
};

VisionneusePdf.defaultProps = {
  zoomPageFit: true
};
