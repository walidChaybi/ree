import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button } from "reakit/Button";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { getLibelle } from "../../../common/widget/Text";
import { PopinNouvelleRMCActeInscription } from "./PopinNouvelleRMCActeInscription";
import "./scss/BoutonNouvelleRMCActeInscription.scss";

interface BoutonNouvelleRMCActeInscriptionProps
  extends DialogDisclosureHTMLProps {
  nouvelleRMCActeInscription: (values: any) => void;
}

export const BoutonNouvelleRMCActeInscription: React.FC<BoutonNouvelleRMCActeInscriptionProps> = ({
  nouvelleRMCActeInscription
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
        nouvelleRMCActeInscription={nouvelleRMCActeInscription}
      />
    </>
  );
};
