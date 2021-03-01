import React from "react";
import { IInscriptionLiee } from "../../../../../../model/etatcivil/fiche/IInscriptionLiee";
import { LienFiche } from "../../../LienFiche";
import { InscriptionRcUtil } from "../../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { TypeFiche } from "../../../../../../model/etatcivil/enum/TypeFiche";

interface IInscriptionsLieesProps {
  inscriptionsLiees: IInscriptionLiee[];
}

export const InscriptionsLiees: React.FC<IInscriptionsLieesProps> = props => {
  return (
    <span>
      {props.inscriptionsLiees.map((inscription, index) => (
        <span key={`inscription-liees-lien-${inscription.numero}`}>
          {`${InscriptionRcUtil.getLibelle(
            inscription.typeInscription
          )} (${"RC n°"}`}
          <LienFiche
            identifiant={inscription.id}
            categorie={TypeFiche.RC}
            numero={`${inscription.annee} - ${inscription.numero}`}
          />

          {`)${index !== props.inscriptionsLiees.length - 1 ? ", " : ""}`}
        </span>
      ))}
    </span>
  );
};
