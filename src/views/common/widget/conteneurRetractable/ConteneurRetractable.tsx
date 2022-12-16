import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { formatLigne } from "@util/Utils";
import React, { useState } from "react";
import "./scss/ConteneurRetractable.scss";

interface TitreProps {
  titre: string;
  initConteneurFerme?: boolean;
  className?: string;
  estADroite?: boolean;
}

const ConteneurRetractable: React.FC<TitreProps> = ({
  initConteneurFerme = true,
  ...props
}) => {
  const [conteneurFerme, setConteneurFerme] =
    useState<boolean>(initConteneurFerme);

  const className = formatLigne(
    [
      props.className,
      "component",
      conteneurFerme ? "is-closed" : "is-open",
      props.estADroite && "a-droite"
    ],
    " "
  );

  return (
    <div className={className}>
      <div
        className="header"
        onClick={() => setConteneurFerme(!conteneurFerme)}
      >
        <span className={conteneurFerme ? "vertical" : ""}>{props.titre}</span>
        <div className="icon">
          {props.estADroite === conteneurFerme ? (
            <ArrowBackIos />
          ) : (
            <ArrowForwardIos />
          )}
        </div>
      </div>
      <div className="body">{props.children}</div>
    </div>
  );
};

export default ConteneurRetractable;
