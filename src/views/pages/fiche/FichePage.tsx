import React, { useEffect, useState } from "react";
import { FicheUtil, TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { IBandeauFiche } from "../../../model/etatcivil/fiche/IBandeauFiche";
import { FenetreExterneUtil } from "../../common/util/FenetreExterne";
import { AccordionRece } from "../../common/widget/accordion/AccordionRece";
import { BarreNavigationSuivPrec } from "../../common/widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import { AlerteActe } from "./contenu/AlerteActe";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { BandeauFicheActeNumero } from "./contenu/BandeauFicheActeNumero";
import { BandeauFicheRcRcaPacsNumero } from "./contenu/BandeauFicheRcRcaPacsNumero";
import { setFiche } from "./FicheUtils";
import { useFichePageApiHook } from "./hook/FichePageApiHook";

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
    dataFicheCourante.identifiant,
    indexCourant
  );

  const { bandeauFiche, ajouterAlerte, panelsFiche } = setFiche(
    dataFicheCourante,
    dataFicheState.data
  );

  // Obligatoire pour les styles qui sont chargés dynamiquement
  useEffect(() => {
    if (
      dataFicheState.data &&
      dataFicheState.data.id === dataFicheCourante.identifiant
    ) {
      if (dataFicheState.data != null) {
        const event = new CustomEvent("refreshStyles");
        window.top.dispatchEvent(event);
      }
      if (props.fenetreExterneUtil && bandeauFiche) {
        props.fenetreExterneUtil.ref.document.title = bandeauFiche.titreFenetre;
      }
    }
  }, [
    dataFicheState.data,
    props.fenetreExterneUtil,
    bandeauFiche,
    dataFicheCourante
  ]);

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
      {dataFicheState && (
        <AlerteActe
          dataFiche={dataFicheState.data}
          ajouterAlerte={ajouterAlerte}
        />
      )}
      {/* Les Accordéons */}
      {panelsFiche &&
        panelsFiche.panels.map((panel, index) => (
          <AccordionRece
            key={`accordion-rece-${index}`}
            panel={panel}
            index={index}
            defaultExpanded={index === 0}
            titre={panel.title}
            disabled={panel?.panelAreas.every(pa => !pa.value && !pa.parts)}
          />
        ))}
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
