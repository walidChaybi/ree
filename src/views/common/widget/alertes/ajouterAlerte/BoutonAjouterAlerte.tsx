import { RECEContextData } from "@core/contexts/RECEContext";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE } from "@model/agent/IOfficier";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext, useState } from "react";
import { IAjouterAlerteFormValue, PopinAjouterAlertes } from "./contenu/PopinAjouterAlertes";

interface BoutonAjouterAlerteProps {
  ajouterAlerteCallBack: (value: IAjouterAlerteFormValue) => void;
  idTypeRegistre?: string;
  disableScrollLock?: boolean;
}

export const BoutonAjouterAlerte: React.FC<BoutonAjouterAlerteProps> = ({ ajouterAlerteCallBack, idTypeRegistre, disableScrollLock }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);
  const { utilisateurConnecte } = useContext(RECEContextData);

  const onClick = (): void => {
    if (officierDroitDelivrerSurLeTypeRegistreOuDroitMEAE(utilisateurConnecte, idTypeRegistre)) {
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
        title={"Ajouter une alerte"}
        onClick={onClick}
      />
      <PopinAjouterAlertes
        open={isOpen}
        onClosePopin={onClosePopin}
        onSubmit={onSubmit}
        disableScrollLock={disableScrollLock}
      />
      <ConfirmationPopin
        disablePortal={true}
        estOuvert={hasMessageBloquant}
        messages={["Vous n'avez pas les droits pour ajouter une alerte."]}
        boutons={[
          {
            label: "OK",
            action: () => {
              setHasMessageBloquant(false);
            }
          }
        ]}
      />
    </div>
  );
};
