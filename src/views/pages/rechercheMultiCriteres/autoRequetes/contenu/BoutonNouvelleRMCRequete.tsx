import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./../scss/BoutonNouvelleRMCRequete.scss";
import { PopinNouvelleRMCRequete } from "./PopinNouvelleRMCRequete";

interface BoutonNouvelleRMCRequeteProps {
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequeteForm<keyof typeof ETypeRequete | ""> | null>>;
  setCriteresRechercheRequete: React.Dispatch<React.SetStateAction<ICriteresRMCRequete | undefined>>;
}

export const BoutonNouvelleRMCRequete: React.FC<BoutonNouvelleRMCRequeteProps> = ({ setValuesRMCRequete, setCriteresRechercheRequete }) => {
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
      <BoutonDoubleSubmit
        onClick={handleClickNouvelleRMC}
        aria-label={"Nouvelle recherche multi critères"}
      >
        <FaSearch
          aria-label="Nouvelle requête RMC"
          className="loupeChampsRecherche"
        />
      </BoutonDoubleSubmit>
      <PopinNouvelleRMCRequete
        open={showWaitState}
        onClose={closePopin}
        setValuesRMCRequete={setValuesRMCRequete}
        setCriteresRechercheRequete={setCriteresRechercheRequete}
      />
    </>
  );
};
