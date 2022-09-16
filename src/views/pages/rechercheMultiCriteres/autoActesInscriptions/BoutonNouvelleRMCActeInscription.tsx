import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLibelle } from "@util/Utils";
import React from "react";
import { Button } from "reakit/Button";
import { DialogDisclosureHTMLProps } from "reakit/Dialog";
import { PopinNouvelleRMCActeInscription } from "./PopinNouvelleRMCActeInscription";
import "./scss/BoutonNouvelleRMCActeInscription.scss";

interface BoutonNouvelleRMCActeInscriptionProps
  extends DialogDisclosureHTMLProps {
  nouvelleRMCActeInscription: (values: any) => void;
  popinAffichee: boolean;
  setPopinAffichee: (affichee: boolean) => void;
}

export const BoutonNouvelleRMCActeInscription: React.FC<
  BoutonNouvelleRMCActeInscriptionProps
> = props => {
  const handleClickNouvelleRMC = () => {
    props.setPopinAffichee(true);
  };

  return (
    <>
      <Button onClick={handleClickNouvelleRMC}>
        <FontAwesomeIcon className="loupeChampsRecherche" icon={faSearch} />
        {getLibelle("Nouvelle recherche multi-critères")}
      </Button>

      <PopinNouvelleRMCActeInscription
        open={props.popinAffichee}
        setPopinAffichee={props.setPopinAffichee}
        nouvelleRMCActeInscription={props.nouvelleRMCActeInscription}
      />
    </>
  );
};
