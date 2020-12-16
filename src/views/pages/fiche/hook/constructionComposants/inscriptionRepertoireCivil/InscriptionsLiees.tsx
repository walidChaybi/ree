import React from "react";
import { IInscriptionLie } from "../../../../../../model/etatcivil/FicheRcInterfaces";
import { LienFiche } from "../../../LienFiche";
import "./sass/InscriptionsLiees.scss";
import { InscriptionRcUtil } from "../../../../../../model/etatcivil/InscriptionRc";

interface IInscriptionsLieesProps {
  inscriptionsLiees: IInscriptionLie[];
}

export const InscriptionsLiees: React.FC<IInscriptionsLieesProps> = props => {
  return (
    <div className="inscriptionsLiees">
      {props.inscriptionsLiees.map((inscription, index) => (
        <span
          key={`inscription-liees-lien-${inscription.numero}`}
          className="inscriptionsLiees separationInscription"
        >
          {`${InscriptionRcUtil.getLibelle(
            inscription.typeInscription
          )} (${"RC n°"}`}
          <LienFiche
            identifiant={inscription.id}
            categorie={"rc"}
            numero={`${inscription.annee} - ${inscription.numero}`}
          />

          {`)${index !== props.inscriptionsLiees.length - 1 ? ", " : ""}`}
        </span>
      ))}
    </div>
  );
};
