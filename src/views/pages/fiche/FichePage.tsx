import React, { useEffect, useState } from "react";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { useFichePageApiHook } from "./hook/FichePageApiHook";
import { AccordionRece } from "../../common/widget/accordion/AccordionRece";
import { FenetreExterneUtil } from "../../common/util/FenetreExterne";
import { BandeauFicheRcRcaPacsNumero } from "./contenu/BandeauFicheRcRcaPacsNumero";
import { BandeauFicheActeNumero } from "./contenu/BandeauFicheActeNumero";
import { FicheUtil, TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import AlerteActe from "./hook/constructionComposants/acte/AlerteActe";
import { BarreNavigationSuivPrec } from "../../common/widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import { IBandeauFiche } from "../../../model/etatcivil/fiche/IBandeauFiche";
import { setFiche } from "./FicheUtils";

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
  const [dataFicheCourante, setDataFicheCourante] = useState<IDataFicheProps>({
    identifiant: props.dataFicheIdentifiant,
    categorie: props.dataFicheCategorie
  });

  const [indexCourant, setIndexCourant] = useState<number>(
    props.index != null ? props.index : 0
  );

  const { dataFicheState } = useFichePageApiHook(
    dataFicheCourante.categorie,
    dataFicheCourante.identifiant
  );

  const { bandeauFiche, alerteVisible, panelsFiche } = setFiche(
    dataFicheCourante.categorie,
    dataFicheState.data
  );

  // Obligatoire pour les styles qui sont chargés dynamiquement
  useEffect(() => {
    if (dataFicheState != null && dataFicheState.data != null) {
      const event = new CustomEvent("refreshStyles");
      window.top.dispatchEvent(event);
    }
    if (props.fenetreExterneUtil && bandeauFiche) {
      props.fenetreExterneUtil.ref.document.title = bandeauFiche.titreFenetre;
    }
  }, [dataFicheState, props.fenetreExterneUtil, bandeauFiche]);

  function setIndexFiche(index: number) {
    if (props.datasFiches && index >= 0 && index < props.datasFiches.length) {
      setDataFicheCourante(props.datasFiches[index]);
      setIndexCourant(index);
    }
  }

  return (
    <div>
      {/* Le Bandeau */}
      {bandeauFiche && (
        <BandeauFiche
          dataBandeau={bandeauFiche}
          elementNumeroLigne={getElementNumeroLigne(
            bandeauFiche,
            props.dataFicheCategorie
          )}
        />
      )}
      <BarreNavigationSuivPrec
        index={indexCourant}
        max={props.datasFiches ? props.datasFiches.length : 0}
        setIndex={setIndexFiche}
      />
      {/* Le bandeau d'ajout d'alerte pour les actes */}
      {alerteVisible && <AlerteActe />}
      {/* Les Accordéons */}
      {panelsFiche && <AccordionRece {...panelsFiche} />}
    </div>
  );
};

function getElementNumeroLigne(bandeau: IBandeauFiche, categorie: TypeFiche) {
  return FicheUtil.isActe(categorie) ? (
    <BandeauFicheActeNumero dataBandeau={bandeau} />
  ) : (
    <BandeauFicheRcRcaPacsNumero dataBandeau={bandeau} />
  );
}
