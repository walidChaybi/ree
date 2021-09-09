import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { getLibelle } from "../../Text";
import {
  IAjouterAlerteFormValue,
  PopinAjouterAlertes
} from "./contenu/PopinAjouterAlertes";

export interface BoutonAjouterAlerteProps {
  ajoutAlertePossible: boolean;
  ajouterAlerteCallBack: (value: IAjouterAlerteFormValue) => void;
}

export const BoutonAjouterAlerte: React.FC<BoutonAjouterAlerteProps> = ({
  ajoutAlertePossible,
  ajouterAlerteCallBack
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = (): void => {
    ajoutAlertePossible === true && setIsOpen(true);
  };

  const onClosePopin = (): void => {
    setIsOpen(false);
  };

  const onSubmit = (value: IAjouterAlerteFormValue): void => {
    setIsOpen(false);
    ajouterAlerteCallBack(value);
  };

  return (
    <div className="BoutonAjouterAlerte">
      <FontAwesomeIcon
        icon={faPlusCircle}
        className={`IconeBoutonAjoutAlerte ${
          ajoutAlertePossible === false ? "Disabled" : ""
        }`}
        title={getLibelle("Ajouter une alerte")}
        onClick={onClick}
      />
      <PopinAjouterAlertes
        open={isOpen}
        onClosePopin={onClosePopin}
        onSubmit={onSubmit}
      />
    </div>
  );
};
