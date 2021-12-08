import React from "react";
import { IBandeauFiche } from "../../../../model/etatcivil/fiche/IBandeauFiche";
import "./scss/Bandeau.scss";

export interface BandeauFicheActeNumeroProps {
  dataBandeau: IBandeauFiche;
}

export const BandeauFicheActeNumero: React.FC<BandeauFicheActeNumeroProps> = props => {
  const data = props.dataBandeau;
  return (
    <div className="LigneNumeroActe">
      <div data-testid="titreBandeau">{data.registre}</div>
    </div>
  );
};
