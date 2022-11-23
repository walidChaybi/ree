import { InfoRounded } from "@material-ui/icons";
import React from "react";

interface InfoBulleProps {
  label?: string;
  texte?: string;
  visible?: boolean;
}

export const InfoBulle: React.FC<InfoBulleProps> = ({
  texte,
  visible = false,
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
