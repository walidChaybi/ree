import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLibelle } from "@util/Utils";
import React, { useState } from "react";
import {
  IAjouterAlerteFormValue,
  PopinAjouterAlertes
} from "./contenu/PopinAjouterAlertes";

export interface BoutonAjouterAlerteProps {
  ajouterAlerteCallBack: (value: IAjouterAlerteFormValue) => void;
}

export const BoutonAjouterAlerte: React.FC<BoutonAjouterAlerteProps> = ({
  ajouterAlerteCallBack
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = (): void => {
    setIsOpen(true);
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
        className={`IconeBoutonAjoutAlerte`}
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
