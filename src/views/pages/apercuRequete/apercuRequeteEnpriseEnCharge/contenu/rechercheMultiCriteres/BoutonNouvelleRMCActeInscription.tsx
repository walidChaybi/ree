import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button } from "reakit/Button";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { IRMCActeInscription } from "../../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { getLibelle } from "../../../../../common/widget/Text";
import { ICriteresRechercheActeInscription } from "../../../../rechercheMultiCriteres/acteInscription/hook/RMCActeInscriptionUtils";
import { PopinNouvelleRMCActeInscription } from "./PopinNouvelleRMCActeInscription";
import "./scss/BoutonNouvelleRMCActeInscription.scss";

interface BoutonNouvelleRMCActeInscriptionProps
  extends DialogDisclosureHTMLProps {
  setValuesRMCActeInscription: React.Dispatch<
    React.SetStateAction<IRMCActeInscription>
  >;
  setNouvelleRMCActeInscription: React.Dispatch<React.SetStateAction<boolean>>;
  setCriteresRechercheActe: React.Dispatch<
    React.SetStateAction<ICriteresRechercheActeInscription | undefined>
  >;
  setCriteresRechercheInscription: React.Dispatch<
    React.SetStateAction<ICriteresRechercheActeInscription | undefined>
  >;
}

export const BoutonNouvelleRMCActeInscription: React.FC<BoutonNouvelleRMCActeInscriptionProps> = ({
  setValuesRMCActeInscription,
  setNouvelleRMCActeInscription,
  setCriteresRechercheActe,
  setCriteresRechercheInscription
}) => {
  const [showWaitState, setShowWaitState] = useState<boolean>(false);
  const closePopin = useCallback(
    (showPopin: boolean) => {
      if (showWaitState && showPopin === false) {
        setShowWaitState(showPopin);
      }
    },
    [showWaitState]
  );

  const handleClickNouvelleRMC = () => {
    setShowWaitState(true);
  };

  return (
    <>
      <Button onClick={handleClickNouvelleRMC}>
        <FontAwesomeIcon className="loupeChampsRecherche" icon={faSearch} />
        {getLibelle("Nouvelle recherche multi-critères")}
      </Button>

      <PopinNouvelleRMCActeInscription
        open={showWaitState}
        onClose={closePopin}
        setValuesRMCActeInscription={setValuesRMCActeInscription}
        setNouvelleRMCActeInscription={setNouvelleRMCActeInscription}
        setCriteresRechercheActe={setCriteresRechercheActe}
        setCriteresRechercheInscription={setCriteresRechercheInscription}
      />
    </>
  );
};
