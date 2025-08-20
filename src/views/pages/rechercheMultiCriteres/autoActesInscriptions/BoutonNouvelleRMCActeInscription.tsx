import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { PopinNouvelleRMCActeInscription } from "./PopinNouvelleRMCActeInscription";
import "./scss/BoutonNouvelleRMCActeInscription.scss";

interface BoutonNouvelleRMCActeInscriptionProps {
  nouvelleRMCActeInscription: (values: any) => void;
  popinAffichee: boolean;
  setPopinAffichee: (affichee: boolean) => void;
  titulaires?: ITitulaireRequete[];
}

export const BoutonNouvelleRMCActeInscription: React.FC<BoutonNouvelleRMCActeInscriptionProps> = props => {
  const handleClickNouvelleRMC = () => {
    props.setPopinAffichee(true);
  };

  return (
    <>
      <BoutonDoubleSubmit onClick={handleClickNouvelleRMC}>
        <FaSearch
          className="loupeChampsRecherche"
          aria-hidden
        />
        {"Nouvelle recherche multi-critères"}
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
