import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import React from "react";

interface TitreProps {
  pleinEcran: boolean;
  setPleinEcran: (pleinEcran: boolean) => void;
  label: string;
}

const ApercuReqCreationTitre: React.FC<TitreProps> = props => {
  return (
    <div
      className="titrePartie"
      onClick={() => props.setPleinEcran(!props.pleinEcran)}
    >
      {props.pleinEcran && (
        <div className="pleinEcran">
          <ArrowForwardIos />
        </div>
      )}
      <span className={`${props.pleinEcran ? "vertical" : ""}`}>
        {props.label}
      </span>
      {!props.pleinEcran && (
        <div className="pasPleinEcran">
          <ArrowBackIos />
        </div>
      )}
    </div>
  );
};

export default ApercuReqCreationTitre;
