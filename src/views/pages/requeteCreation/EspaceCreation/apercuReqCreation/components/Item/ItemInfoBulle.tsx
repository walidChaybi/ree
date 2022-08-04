import { InfoRounded } from "@material-ui/icons";
import React from "react";
import { estRenseigne } from "../../../../../../common/util/Utils";

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
