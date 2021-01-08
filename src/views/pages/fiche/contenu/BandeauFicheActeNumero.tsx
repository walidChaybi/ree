import React from "react";
import "./sass/Bandeau.scss";
import { IBandeauFiche } from "../../../../model/etatcivil/FicheInterfaces";

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
