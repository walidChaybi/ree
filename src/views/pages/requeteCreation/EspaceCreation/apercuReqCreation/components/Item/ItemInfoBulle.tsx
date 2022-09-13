import { InfoRounded } from "@material-ui/icons";
import { estRenseigne } from "@util/Utils";
import React from "react";

interface ItemInfoBulleProps {
  label?: string;
  texte?: string;
  visible?: boolean;
}

export const ItemInfoBulle: React.FC<ItemInfoBulleProps> = ({
  texte,
  visible = estRenseigne(texte),
  ...props
}) =>
  visible ? (
    <div className="infoBulle">
      {props.label}

      <div className="icon" title={texte}>
        <InfoRounded />
      </div>
    </div>
  ) : (
    <></>
  );
