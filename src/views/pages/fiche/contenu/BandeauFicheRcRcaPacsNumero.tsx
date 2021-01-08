import React from "react";
import "./sass/Bandeau.scss";
import { IBandeauFiche } from "../../../../model/etatcivil/FicheInterfaces";

export interface BandeauFicheRcRcaPacsNumeroProps {
  dataBandeau: IBandeauFiche;
}

export const BandeauFicheRcRcaPacsNumero: React.FC<BandeauFicheRcRcaPacsNumeroProps> = props => {
  const data = props.dataBandeau;
  return (
    <div className="InfoImportante LigneNumero">
      <div>{`${data.categorie.toLocaleUpperCase()} N° ${data.annee} - ${
        data.numero
      }`}</div>
      <div className="statusFiche">
        {data.statutsFiche != null && data.statutsFiche.length > 0 && (
          <>{`Statut de la fiche : ${data.statutsFiche[0].statut}`}</>
        )}
      </div>
    </div>
  );
};
