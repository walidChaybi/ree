import React from "react";
import "./sass/AlertesActes.scss";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface AlerteActeProps {
}

export const AlerteActe: React.FC<AlerteActeProps> = () => {
  return (<div className="AlertesActes">
    <FontAwesomeIcon
        icon={faPlusCircle}
        className="IconeBoutonAjoutAlertes Disabled"
        title="Ajouter une alerte"
        data-testid="IconeBoutonAjoutAlertes"
        aria-labelledby="Ajouter une alerte"
    />
  </div>);
};

