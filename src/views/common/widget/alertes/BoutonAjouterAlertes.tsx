import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getLibelle } from "../Text";

export const BoutonAjouterAlertes: React.FC<any> = () => {
  return (
    <div className="BoutonAjouterAlertes">
      <FontAwesomeIcon
        icon={faPlusCircle}
        className="IconeBoutonAjoutAlertes"
        title={getLibelle("Ajouter une alerte")}
      />
    </div>
  );
};
