import React, { useEffect } from "react";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { useFichePageApiHook } from "./hook/FichePageApiHook";
import { AccordionRece } from "../../common/widget/accordion/AccordionRece";
import { FenetreExterneUtil } from "../../common/util/FenetreExterne";

export interface FichePageProps {
  dataFiche: IDataFicheProps;
  fenetreExterneUtil?: FenetreExterneUtil;
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

    if (
      props.fenetreExterneUtil &&
      dataFicheState != null &&
      dataFicheState.ficheRc
    ) {
      props.fenetreExterneUtil.ref.document.title =
        dataFicheState.ficheRc.title;
    }
  }, [dataFicheState, props.fenetreExterneUtil]);

  return (
    <div>
      {/* Le Bandeau */}
      {dataFicheState.dataBandeau && (
        <BandeauFiche dataBandeau={dataFicheState.dataBandeau}></BandeauFiche>
      )}
      {/* Les Accordéons */}
      {dataFicheState.ficheRc && <AccordionRece {...dataFicheState.ficheRc} />}
    </div>
  );
};
