import React from "react";
import { IInscriptionLie } from "../../../../../../model/ficheRcRca/FicheRcInterfaces";
import { LienFiche } from "../../../LienFiche";
import "./sass/InscriptionsLiees.scss";

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
          {`${inscription.typeInscription} (${"RC n°"}`}
          <LienFiche
            identifiant={inscription.idInscription}
            categorie={"rc"}
            numero={inscription.numero}
          />

          {`)${index !== props.inscriptionsLiees.length - 1 ? ", " : ""}`}
        </span>
      ))}
    </div>
  );
};
