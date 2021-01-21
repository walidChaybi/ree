import React, { useEffect } from "react";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { useFichePageApiHook } from "./hook/FichePageApiHook";
import { AccordionRece } from "../../common/widget/accordion/AccordionRece";
import { FenetreExterneUtil } from "../../common/util/FenetreExterne";
import { BandeauFicheRcRcaPacsNumero } from "./contenu/BandeauFicheRcRcaPacsNumero";
import { BandeauFicheActeNumero } from "./contenu/BandeauFicheActeNumero";
import { FicheUtil, TypeFiche } from "../../../model/etatcivil/TypeFiche";

export interface FichePageProps {
  dataFiche: IDataFicheProps;
  fenetreExterneUtil?: FenetreExterneUtil;
}

export interface IDataFicheProps {
  identifiant: string;
  categorie: TypeFiche;
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
      dataFicheState.dataBandeau
    ) {
      props.fenetreExterneUtil.ref.document.title =
        dataFicheState.dataBandeau.titreFenetre;
    }
  }, [dataFicheState, props.fenetreExterneUtil]);

  return (
    <div>
      {/* Le Bandeau */}
      {dataFicheState.dataBandeau && (
        <BandeauFiche
          dataBandeau={dataFicheState.dataBandeau}
          elementNumeroLigne={getElementNumeroLigne()}
        ></BandeauFiche>
      )}
      {/* Les Accordéons */}
      {dataFicheState.fiche && <AccordionRece {...dataFicheState.fiche} />}
    </div>
  );

  function getElementNumeroLigne() {
    return FicheUtil.isActe(props.dataFiche.categorie) ? (
      <BandeauFicheActeNumero
        dataBandeau={dataFicheState.dataBandeau}
      ></BandeauFicheActeNumero>
    ) : (
      <BandeauFicheRcRcaPacsNumero
        dataBandeau={dataFicheState.dataBandeau}
      ></BandeauFicheRcRcaPacsNumero>
    );
  }
};
