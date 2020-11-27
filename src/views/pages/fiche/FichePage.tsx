import React from "react";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { useFichePageApiHook } from "./hook/FichePageApiHook";

export interface FichePageProps {
  dataFiche: IDataFicheProps;
}

export interface IDataFicheProps {
  identifiant: string;
  categorie: string;
}

export const FichePage: React.FC<FichePageProps> = props => {
  const { dataFicheState } = useFichePageApiHook(
    props.dataFiche.categorie,
    props.dataFiche.identifiant
  );

  return (
    <div>
      {/* Le Bandeau */}
      {dataFicheState?.dataBandeau != null && (
        <BandeauFiche dataBandeau={dataFicheState.dataBandeau}></BandeauFiche>
      )}
      {/* Les Accordéons */}
    </div>
  );
};
