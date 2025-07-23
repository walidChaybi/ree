import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { ETypeInscriptionRc } from "@model/etatcivil/enum/ETypeInscriptionRc";
import { IInscriptionLiee } from "@model/etatcivil/rcrca/IInscriptionLiee";
import React from "react";
import { LienFiche } from "../../../LienFiche";

interface IInscriptionsLieesProps {
  inscriptionsLiees: IInscriptionLiee[];
}

export const InscriptionsLiees: React.FC<IInscriptionsLieesProps> = props => {
  return (
    <span>
      {props.inscriptionsLiees.map((inscription, index) => (
        <span key={`inscription-liees-lien-${inscription.numero}`}>
          {`${ETypeInscriptionRc[inscription.typeInscription]} (${"RC n°"}`}
          <LienFiche
            identifiant={inscription.id}
            categorie={ETypeFiche.RC}
            numero={`${inscription.annee} - ${inscription.numero}`}
          />

          {`)${index !== props.inscriptionsLiees.length - 1 ? ", " : ""}`}
        </span>
      ))}
    </span>
  );
};
