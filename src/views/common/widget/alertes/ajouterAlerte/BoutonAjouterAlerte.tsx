import { RECEContextData } from "@core/contexts/RECEContext";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
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
    if (
      utilisateurConnecte.estHabilitePour({ unDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC], pourIdTypeRegistre: idTypeRegistre }) ||
      utilisateurConnecte.estHabilitePour({
        unDesDroits: [Droit.DELIVRER, Droit.DELIVRER_COMEDEC],
        surLePerimetre: Perimetre.TOUS_REGISTRES
      })
    ) {
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
      <FaPlusCircle
        className="IconeBoutonAjoutAlerte"
        title="Ajouter une alerte"
        aria-label="Ajouter une alerte"
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
