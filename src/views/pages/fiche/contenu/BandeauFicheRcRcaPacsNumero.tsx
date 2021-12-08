import React from "react";
import { IBandeauFiche } from "../../../../model/etatcivil/fiche/IBandeauFiche";
import { jointAvec } from "../../../common/util/Utils";
import "./scss/Bandeau.scss";

export interface BandeauFicheRcRcaPacsNumeroProps {
  dataBandeau: IBandeauFiche;
}

export const BandeauFicheRcRcaPacsNumero: React.FC<BandeauFicheRcRcaPacsNumeroProps> = props => {
  const data = props.dataBandeau;
  function getPrenomNom() {
    const nomsPrenoms = data.personnes.map(
      personne => `${personne.prenom} ${personne.nom}`
    );

    return jointAvec(nomsPrenoms, " et ");
  }
  return (
    <>
      <div className="LigneNumeroRcRcaPacs">
        <div>{`${data.categorie.toLocaleUpperCase()} N° ${data.annee} - ${
          data.numero
        }`}</div>
        <div className="statusFiche">
          {data.statutsFiche != null && data.statutsFiche.length > 0 && (
            <>{`Statut de la fiche : ${data.statutsFiche[0].statut}`}</>
          )}
        </div>
      </div>
      <div className="LignePrenomNom">{getPrenomNom()}</div>
    </>
  );
};
