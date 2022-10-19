import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { formatLigne } from "@util/Utils";
import React from "react";
import "./scss/ConteneurRetractable.scss";

interface TitreProps {
  titre: string;
  pleinEcran: boolean;
  setPleinEcran: (pleinEcran: boolean) => void;
  className?: string;
}

const ConteneurRetractable: React.FC<TitreProps> = props => {
  const className = formatLigne(
    [props.className, "component", props.pleinEcran && "is-closed"],
    " "
  );

  return (
    <div className={className}>
      <div
        className="header"
        onClick={() => props.setPleinEcran(!props.pleinEcran)}
      >
        <span className={props.pleinEcran ? "vertical" : ""}>
          {props.titre}
        </span>
        <div className="icon">
          {props.pleinEcran ? <ArrowForwardIos /> : <ArrowBackIos />}
        </div>
      </div>
      <div className="body">{props.children}</div>
    </div>
  );
};

export default ConteneurRetractable;
