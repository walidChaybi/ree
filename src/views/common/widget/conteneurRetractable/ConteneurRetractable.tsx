import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { formatLigne } from "@util/Utils";
import React, { useMemo, useState } from "react";
import "./scss/ConteneurRetractable.scss";

interface TitreProps {
  titre: string;
  initConteneurFerme?: boolean;
  className?: string;
  estADroite?: boolean;
}

const ConteneurRetractable: React.FC<React.PropsWithChildren<TitreProps>> = ({ initConteneurFerme = true, ...props }) => {
  const [conteneurFerme, setConteneurFerme] = useState<boolean>(initConteneurFerme);

  const className = useMemo(
    () => formatLigne([props.className, "component", conteneurFerme ? "is-closed" : "is-open", props.estADroite && "a-droite"], " "),
    [props.className, props.estADroite, conteneurFerme]
  );

  return (
    <div className={className}>
      <div
        className="header"
        onClick={() => setConteneurFerme(!conteneurFerme)}
      >
        <span className={conteneurFerme ? "vertical" : ""}>{props.titre}</span>
        <div className="icon">{props.estADroite ? <ArrowBackIos /> : <ArrowForwardIos />}</div>
      </div>
      <div className="body">{!conteneurFerme ? props.children : null}</div>
    </div>
  );
};

export default ConteneurRetractable;
