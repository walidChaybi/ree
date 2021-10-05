import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import { Button } from "reakit/Button";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import "./../scss/BoutonNouvelleRMCRequete.scss";
import { PopinNouvelleRMCRequete } from "./PopinNouvelleRMCRequete";

interface BoutonNouvelleRMCRequeteProps extends DialogDisclosureHTMLProps {
  setNouvelleRMCRequete: React.Dispatch<React.SetStateAction<boolean>>;
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequete>>;
  setCriteresRechercheRequete: React.Dispatch<
    React.SetStateAction<ICriteresRMCRequete | undefined>
  >;
}

export const BoutonNouvelleRMCRequete: React.FC<BoutonNouvelleRMCRequeteProps> = ({
  setNouvelleRMCRequete,
  setValuesRMCRequete,
  setCriteresRechercheRequete
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
        <FontAwesomeIcon
          aria-label="NouvelleRMCRequete"
          className="loupeChampsRecherche"
          icon={faSearch}
        />
      </Button>
      <PopinNouvelleRMCRequete
        open={showWaitState}
        onClose={closePopin}
        setNouvelleRMCRequete={setNouvelleRMCRequete}
        setValuesRMCRequete={setValuesRMCRequete}
        setCriteresRechercheRequete={setCriteresRechercheRequete}
      />
    </>
  );
};
