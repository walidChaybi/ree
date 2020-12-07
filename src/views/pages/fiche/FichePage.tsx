import React, { useEffect } from "react";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { useFichePageApiHook } from "./hook/FichePageApiHook";
import { AccordionRece } from "../../common/widget/accordion/AccordionRece";

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

  // Obligatoire pour les styles qui sont chargés dynamiquement
  useEffect(() => {
    if (dataFicheState != null) {
      const event = new CustomEvent("refreshStyles");
      window.top.dispatchEvent(event);
    }
  }, [dataFicheState]);

  return (
    <div>
      {/* Le Bandeau */}
      {dataFicheState.dataBandeau && (
        <BandeauFiche dataBandeau={dataFicheState.dataBandeau}></BandeauFiche>
      )}
      {/* Les Accordéons */}
      {dataFicheState.ficheRc && (
        <AccordionRece panels={dataFicheState.ficheRc.panels} />
      )}
    </div>
  );
};
