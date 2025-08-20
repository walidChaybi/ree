import React from "react";
import { MdInfo } from "react-icons/md";

interface InfoBulleProps {
  label?: string;
  texte?: string;
  visible?: boolean;
}

export const InfoBulle: React.FC<InfoBulleProps> = ({ texte, visible = false, ...props }) =>
  visible ? (
    <div className="infoBulle">
      {props.label}

      <div
        className="icon"
        title={texte}
      >
        <MdInfo
          className="ml-1 text-xl"
          aria-hidden
        />
      </div>
    </div>
  ) : (
    <></>
  );
