import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { getLibelle } from "@util/Utils";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React from "react";
import { PopinNouvelleRMCActeInscription } from "./PopinNouvelleRMCActeInscription";
import "./scss/BoutonNouvelleRMCActeInscription.scss";

interface BoutonNouvelleRMCActeInscriptionProps {
  nouvelleRMCActeInscription: (values: any) => void;
  popinAffichee: boolean;
  setPopinAffichee: (affichee: boolean) => void;
  titulaires?: ITitulaireRequete[];
}

export const BoutonNouvelleRMCActeInscription: React.FC<
  BoutonNouvelleRMCActeInscriptionProps
> = props => {
  const handleClickNouvelleRMC = () => {
    props.setPopinAffichee(true);
  };

  return (
    <>
      <BoutonDoubleSubmit onClick={handleClickNouvelleRMC}>
        <FontAwesomeIcon className="loupeChampsRecherche" icon={faSearch} />
        {getLibelle("Nouvelle recherche multi-critères")}
      </BoutonDoubleSubmit>

      <PopinNouvelleRMCActeInscription
        open={props.popinAffichee}
        setPopinAffichee={props.setPopinAffichee}
        nouvelleRMCActeInscription={props.nouvelleRMCActeInscription}
        titulaires={props.titulaires}
      />
    </>
  );
};
