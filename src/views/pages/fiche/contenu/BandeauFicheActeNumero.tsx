import React from "react";
import "./scss/Bandeau.scss";
import { IBandeauFiche } from "../../../../model/etatcivil/fiche/IBandeauFiche";

export interface BandeauFicheActeNumeroProps {
  dataBandeau: IBandeauFiche;
}

export const BandeauFicheActeNumero: React.FC<BandeauFicheActeNumeroProps> = props => {
  const data = props.dataBandeau;
  return (
    <div className="InfoImportante LigneNumeroActe">
      <div>{`${data.categorie.toLocaleUpperCase()} N° ${data.annee} - ${
        data.numero
      }`}</div>
    </div>
  );
};
