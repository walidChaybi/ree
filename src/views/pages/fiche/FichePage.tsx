import React, { useEffect } from "react";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { useFichePageApiHook } from "./hook/FichePageApiHook";
import { AccordionRece } from "../../common/widget/accordion/AccordionRece";
import { FenetreExterneUtil } from "../../common/util/FenetreExterne";
import { BandeauFicheRcRcaPacsNumero } from "./contenu/BandeauFicheRcRcaPacsNumero";
import { BandeauFicheActeNumero } from "./contenu/BandeauFicheActeNumero";
import { FicheUtil, TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { AlerteActe } from "./hook/constructionComposants/acte/AlerteActeUtils";
import { BarreNavigationSuivPrec } from "../../common/widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";

export interface FichePageProps {
  dataFicheIdentifiant: string;
  dataFicheCategorie: TypeFiche;
  datasFiches?: IDataFicheProps[];
  index?: number;
  fenetreExterneUtil?: FenetreExterneUtil;
}

export interface IDataFicheProps {
  identifiant: string;
  categorie: TypeFiche;
}

export const FichePage: React.FC<FichePageProps> = props => {
  const [dataFicheCourante, setDataFicheCourante] = React.useState<
    IDataFicheProps
  >({
    identifiant: props.dataFicheIdentifiant,
    categorie: props.dataFicheCategorie
  });

  const [indexCourant, setIndexCourant] = React.useState<number>(
    props.index != null ? props.index : 0
  );

  const { dataFicheState } = useFichePageApiHook(
    dataFicheCourante.categorie,
    dataFicheCourante.identifiant
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

  function setIndexFiche(index: number) {
    if (props.datasFiches && index >= 0 && index < props.datasFiches.length) {
      setDataFicheCourante(props.datasFiches[index]);
      setIndexCourant(index);
    }
  }

  return (
    <div>
      {/* Le Bandeau */}
      {dataFicheState.dataBandeau && (
        <BandeauFiche
          dataBandeau={dataFicheState.dataBandeau}
          elementNumeroLigne={getElementNumeroLigne()}
        />
      )}
      <BarreNavigationSuivPrec
        index={indexCourant}
        max={props.datasFiches ? props.datasFiches.length : 0}
        setIndex={setIndexFiche}
      />
      {/* Le bandeau d'ajout d'alerte pour les actes */}
      {FicheUtil.isActe(props.dataFicheCategorie) && <AlerteActe />}
      {/* Les Accordéons */}
      {dataFicheState.fiche && <AccordionRece {...dataFicheState.fiche} />}
    </div>
  );

  function getElementNumeroLigne() {
    return FicheUtil.isActe(props.dataFicheCategorie) ? (
      <BandeauFicheActeNumero dataBandeau={dataFicheState.dataBandeau} />
    ) : (
      <BandeauFicheRcRcaPacsNumero dataBandeau={dataFicheState.dataBandeau} />
    );
  }
};
