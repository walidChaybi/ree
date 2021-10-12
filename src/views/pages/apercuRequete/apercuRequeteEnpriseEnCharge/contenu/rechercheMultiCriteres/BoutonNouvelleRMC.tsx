import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button } from "reakit/Button";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { IRMCActeInscription } from "../../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { getLibelle } from "../../../../../common/widget/Text";
import { ICriteresRecherche } from "../../../../rechercheMultiCriteres/acteInscription/hook/RMCInscriptionApiHook";
import { PopinNouvelleRMC } from "./PopinNouvelleRMC";
import "./scss/BoutonNouvelleRMC.scss";

interface BoutonNouvelleRMCProps extends DialogDisclosureHTMLProps {
  setValuesRMC: React.Dispatch<React.SetStateAction<IRMCActeInscription>>;
  setNouvelleRecherche: React.Dispatch<React.SetStateAction<boolean>>;
  setCriteresRechercheActe: React.Dispatch<
    React.SetStateAction<ICriteresRecherche | undefined>
  >;
  setCriteresRechercheInscription: React.Dispatch<
    React.SetStateAction<ICriteresRecherche | undefined>
  >;
}

export const BoutonNouvelleRMC: React.FC<BoutonNouvelleRMCProps> = props => {
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

      <PopinNouvelleRMC
        open={showWaitState}
        onClose={closePopin}
        setValuesRMC={props.setValuesRMC}
        setNouvelleRecherche={props.setNouvelleRecherche}
        setCriteresRechercheActe={props.setCriteresRechercheActe}
        setCriteresRechercheInscription={props.setCriteresRechercheInscription}
      />
    </>
  );
};
