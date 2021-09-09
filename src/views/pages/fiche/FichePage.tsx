import React, { useCallback, useEffect, useState } from "react";
import { FicheUtil, TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { IBandeauFiche } from "../../../model/etatcivil/fiche/IBandeauFiche";
import {
  AddAlerteActeApiHookParameters,
  useAddAlerteActeApiHook
} from "../../common/hook/v2/alertes/AddAlerteActeHookApi";
import {
  DeleteAlerteActeApiHookParameters,
  useDeleteAlerteActeApiHook
} from "../../common/hook/v2/alertes/DeleteAlerteActeHookApi";
import { FenetreExterneUtil } from "../../common/util/FenetreExterne";
import { AccordionRece } from "../../common/widget/accordion/AccordionRece";
import { IAjouterAlerteFormValue } from "../../common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { BarreNavigationSuivPrec } from "../../common/widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import { SectionPanelProps } from "../../common/widget/section/SectionPanel";
import { SectionPanelAreaProps } from "../../common/widget/section/SectionPanelArea";
import { BandeauAlertesActe } from "./contenu/BandeauAlertesActe";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { BandeauFicheActeNumero } from "./contenu/BandeauFicheActeNumero";
import { BandeauFicheRcRcaPacsNumero } from "./contenu/BandeauFicheRcRcaPacsNumero";
import { setFiche } from "./FicheUtils";
import { useFichePageApiHook } from "./hook/FichePageApiHook";

export interface FichePageProps {
  dataFicheIdentifiant: string;
  dataFicheCategorie: TypeFiche;
  datasFiches?: IDataFicheProps[];
  index: number;
  fenetreExterneUtil?: FenetreExterneUtil;
  provenanceRequete?: string;
  ajoutAlertePossible?: boolean;
}

export interface IDataFicheProps {
  identifiant: string;
  categorie: TypeFiche;
}

export const FichePage: React.FC<FichePageProps> = ({
  dataFicheIdentifiant,
  dataFicheCategorie,
  datasFiches,
  index,
  fenetreExterneUtil,
  provenanceRequete = "",
  ajoutAlertePossible = false
}) => {
  const [
    actualisationInfosFiche,
    setActualisationInfosFiche
  ] = useState<boolean>(false);
  const [dataFicheCourante, setDataFicheCourante] = useState<IDataFicheProps>({
    identifiant: dataFicheIdentifiant,
    categorie: dataFicheCategorie
  });

  const [indexCourant, setIndexCourant] = useState<number>(index);

  const { dataFicheState } = useFichePageApiHook(
    dataFicheCourante.categorie,
    dataFicheCourante.identifiant,
    indexCourant,
    actualisationInfosFiche
  );

  const { bandeauFiche, panelsFiche, alertes, visuAlertes } = setFiche(
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
      if (fenetreExterneUtil && bandeauFiche) {
        fenetreExterneUtil.ref.document.title = bandeauFiche.titreFenetre;
      }
    }
  }, [
    dataFicheState.data,
    fenetreExterneUtil,
    bandeauFiche,
    dataFicheCourante
  ]);

  function setIndexFiche(idx: number) {
    if (datasFiches && idx >= 0 && idx < datasFiches.length) {
      setDataFicheCourante(datasFiches[idx]);
      setIndexCourant(idx);
    }
  }

  /* Ajout d'une alerte */
  const [
    ajouterAlerteActeApiHookParameters,
    setAjouterAlerteActeApiHookParameters
  ] = useState<AddAlerteActeApiHookParameters>();

  const ajouterAlerteCallBack = useCallback(
    (value: IAjouterAlerteFormValue) => {
      setAjouterAlerteActeApiHookParameters({
        idActe: dataFicheState?.data?.id,
        idTypeAlerte: value?.idTypeAlerte,
        complementDescription: value?.complementDescription,
        provenanceRequete
      });
    },
    [dataFicheState, provenanceRequete]
  );

  const alerte = useAddAlerteActeApiHook(ajouterAlerteActeApiHookParameters);
  useEffect(() => {
    if (alerte) {
      setActualisationInfosFiche(!actualisationInfosFiche);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerte]);

  /* Suppression d'une alerte */
  const [
    deleteAlerteActeApiHookParameters,
    setDeleteAlerteActeApiHookParameters
  ] = useState<DeleteAlerteActeApiHookParameters>();

  const supprimerAlerteCallBack = useCallback(
    (idAlerteActe: string, idActe: string) => {
      setDeleteAlerteActeApiHookParameters({
        idAlerteActe,
        idActe,
        provenanceRequete
      });
    },
    [provenanceRequete]
  );

  const resultatSuppressionAlerte = useDeleteAlerteActeApiHook(
    deleteAlerteActeApiHookParameters
  );
  useEffect(() => {
    if (resultatSuppressionAlerte) {
      setActualisationInfosFiche(!actualisationInfosFiche);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatSuppressionAlerte]);

  return (
    <>
      {bandeauFiche && panelsFiche && dataFicheState && (
        <>
          <BandeauFiche
            dataBandeau={bandeauFiche}
            elementNumeroLigne={getElementNumeroLigne(
              bandeauFiche,
              dataFicheCategorie
            )}
          />
          <BarreNavigationSuivPrec
            index={indexCourant}
            max={datasFiches ? datasFiches.length : 0}
            setIndex={setIndexFiche}
          />
          {visuAlertes === true && (
            <BandeauAlertesActe
              alertes={alertes}
              ajoutAlertePossible={ajoutAlertePossible}
              ajouterAlerteCallBack={ajouterAlerteCallBack}
              supprimerAlerteCallBack={supprimerAlerteCallBack}
            />
          )}
          {panelsFiche?.panels?.map((panel: SectionPanelProps, idx: number) => (
            <AccordionRece
              key={`accordion-rece-${idx}`}
              panel={panel}
              index={idx}
              expanded={idx === 0}
              titre={panel?.title}
              disabled={panel?.panelAreas.every(
                (pa: SectionPanelAreaProps) => !pa.value && !pa.parts
              )}
            />
          ))}
        </>
      )}
    </>
  );
};

function getElementNumeroLigne(bandeau: IBandeauFiche, categorie: TypeFiche) {
  return FicheUtil.isActe(categorie) ? (
    <BandeauFicheActeNumero dataBandeau={bandeau} />
  ) : (
    <BandeauFicheRcRcaPacsNumero dataBandeau={bandeau} />
  );
}
