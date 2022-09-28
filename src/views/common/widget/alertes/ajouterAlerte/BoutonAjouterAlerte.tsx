import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE } from "@model/agent/IOfficier";
import { getLibelle } from "@util/Utils";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useState } from "react";
import {
  IAjouterAlerteFormValue,
  PopinAjouterAlertes
} from "./contenu/PopinAjouterAlertes";

export interface BoutonAjouterAlerteProps {
  ajouterAlerteCallBack: (value: IAjouterAlerteFormValue) => void;
  idTypeRegistre?: string;
}

export const BoutonAjouterAlerte: React.FC<BoutonAjouterAlerteProps> = ({
  ajouterAlerteCallBack,
  idTypeRegistre
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const onClick = (): void => {
    if (officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE(idTypeRegistre)) {
      setIsOpen(true);
    } else {
      setHasMessageBloquant(true);
    }
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
      <ConfirmationPopin
        disablePortal={true}
        isOpen={hasMessageBloquant}
        messages={[
          getLibelle("Vous n'avez pas les droits pour ajouter une alerte.")
        ]}
        boutons={[
          {
            label: getLibelle("OK"),
            action: () => {
              setHasMessageBloquant(false);
            }
          }
        ]}
      />
    </div>
  );
};
