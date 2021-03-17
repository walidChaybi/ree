import React from "react";
import "./sass/AlertesActes.scss";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLibelle } from "../../../../../common/widget/Text";
import WithHabilitation from "../../../../../common/util/habilitation/WithHabilitation";

const AlerteActe: React.FC = () => {
  return (
    <div className="AlertesActes">
      <FontAwesomeIcon
        icon={faPlusCircle}
        className="IconeBoutonAjoutAlertes Disabled"
        title={getLibelle("Ajouter une alerte")}
        data-testid="IconeBoutonAjoutAlertes"
        aria-labelledby="Ajouter une alerte"
      />
    </div>
  );
};

export default WithHabilitation(AlerteActe, "AlerteActe");
