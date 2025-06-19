import { IBandeauFiche } from "@model/etatcivil/fiche/IBandeauFiche";
import React from "react";
import "./scss/Bandeau.scss";

interface BandeauFicheActeNumeroProps {
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
