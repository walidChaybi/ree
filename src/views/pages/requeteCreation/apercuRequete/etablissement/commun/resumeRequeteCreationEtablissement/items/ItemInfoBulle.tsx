import { estRenseigne } from "@util/Utils";
import React from "react";
import { MdInfo } from "react-icons/md";

interface ItemInfoBulleProps {
  label?: string;
  texte?: string;
  visible?: boolean;
}

export const ItemInfoBulle: React.FC<ItemInfoBulleProps> = ({ texte, visible = estRenseigne(texte), ...props }) =>
  visible ? (
    <div className="infoBulle">
      {props.label}

      <div
        className="icon"
        title={texte}
        aria-label={texte}
      >
        <MdInfo aria-hidden />
      </div>
    </div>
  ) : (
    <></>
  );
