import React from "react";
import { TypeFiche } from "../../../../../../model/etatcivil/enum/TypeFiche";
import { InscriptionRcUtil } from "../../../../../../model/etatcivil/enum/TypeInscriptionRc";
import { IInscriptionLiee } from "../../../../../../model/etatcivil/rcrca/IInscriptionLiee";
import { LienFiche } from "../../../LienFiche";

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
