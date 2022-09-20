import {
  AddAlerteActeApiHookParameters,
  useAddAlerteActeApiHook
} from "@hook/alertes/AddAlerteActeHookApi";
import {
  DeleteAlerteActeApiHookParameters,
  useDeleteAlerteActeApiHook
} from "@hook/alertes/DeleteAlerteActeHookApi";
import { officierDroitConsulterSurLeTypeRegistreOuDroitMEAE } from "@model/agent/IOfficier";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { FenetreExterneUtil } from "@util/FenetreExterne";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { IAjouterAlerteFormValue } from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { OperationLocaleEnCours } from "@widget/attente/OperationLocaleEnCours";
import { BarreNavigationSuivPrec } from "@widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import React, { useCallback, useEffect, useState } from "react";
import { IFicheActe } from "../../../model/etatcivil/acte/IFicheActe";
import { FicheUtil, TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { IBandeauFiche } from "../../../model/etatcivil/fiche/IBandeauFiche";
import { BoutonCreationRDD } from "./BoutonCreationRDD/BoutonCreationRDD";
import { BandeauAlertesActe } from "./contenu/BandeauAlertesActe";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { BandeauFicheActeNumero } from "./contenu/BandeauFicheActeNumero";
import { BandeauFicheRcRcaPacsNumero } from "./contenu/BandeauFicheRcRcaPacsNumero";
import { setFiche } from "./FicheUtils";
import { useFichePageApiHook } from "./hook/FichePageApiHook";
import "./scss/FichePage.scss";

export interface IIndex {
  value: number;
}
export interface FichePageProps {
  estConsultation?: boolean;
  dataFicheIdentifiant: string;
  datasFiches: IDataFicheProps[];
  index: IIndex;
  numeroRequete?: string;
  fenetreExterneUtil?: FenetreExterneUtil;
  provenanceRequete?: string;
  nbLignesTotales: number;
  nbLignesParAppel: number;
  getLignesSuivantesOuPrecedentes?: (
    ficheIdentifiant: string,
    lien: string
  ) => void;
}

export interface IDataFicheProps {
  identifiant: string;
  categorie: TypeFiche;
  lienSuivant?: string;
  lienPrecedent?: string;
}

export const FichePage: React.FC<FichePageProps> = ({
  estConsultation,
  dataFicheIdentifiant,
  datasFiches,
  numeroRequete,
  index,
  fenetreExterneUtil,
  provenanceRequete = "",
  nbLignesTotales,
  nbLignesParAppel,
  getLignesSuivantesOuPrecedentes
}) => {
  const [actualisationInfosFiche, setActualisationInfosFiche] =
    useState<boolean>(false);
  const [dataFicheCourante, setDataFicheCourante] = useState<
    IDataFicheProps | undefined
  >(datasFiches[getIndexLocal(index.value, nbLignesParAppel)]);

  // index courant sur la totalité des données
  const [indexCourant, setIndexCourant] = useState<number>(index.value);

  useEffect(() => {
    setDataFicheCourante(
      datasFiches[getIndexLocal(indexCourant, nbLignesParAppel)]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasFiches]);

  // (*) Permet de résoudre le pb de la fenêtre fiche déjà ouverte
  // Si l'utilisateur clique sur une fenêtre fiche déjà ouverte (et qu'il a déjà navigué dedans) alors l'index aura changé (cf. onClickOnLine RMCTableauActes par exemple ),
  //   on peut ainsi mettre à jour l'index courant avec l'index passé en props
  // A noté que ce useEffect passe après le précédent et qu'il écrase donc la dataFicheCourante précédemment mise à jour par le useEffect ci-dessus
  useEffect(() => {
    setIndexCourant(index.value);
    setDataFicheCourante(
      datasFiches[getIndexLocal(index.value, nbLignesParAppel)]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const { dataFicheState } = useFichePageApiHook(
    actualisationInfosFiche,
    dataFicheCourante?.categorie,
    dataFicheCourante?.identifiant,
    estConsultation
  );

  const { bandeauFiche, panelsFiche, alertes, visuBoutonAlertes } = setFiche(
    dataFicheCourante,
    dataFicheState.data
  );

  // Obligatoire pour les styles qui sont chargés dynamiquement
  useEffect(() => {
    if (
      dataFicheState.data &&
      dataFicheState.data.id === dataFicheCourante?.identifiant
    ) {
      if (dataFicheState.data != null) {
        const event = new CustomEvent("refreshStyles");
        if (window.top) {
          window.top.dispatchEvent(event);
        }
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

  const obtenirFicheSuivante = useCallback(
    (idxLocal: number, idx: number) => {
      if (
        getLignesSuivantesOuPrecedentes &&
        dataFicheCourante?.lienSuivant &&
        passageALaPlageSuivante(idxLocal, idx)
      ) {
        // On est en dehors de la plage courante (ie datasFiches) il faut faire un appel serveur pour obtenir la plage suivante
        getLignesSuivantesOuPrecedentes(
          dataFicheIdentifiant,
          dataFicheCourante.lienSuivant
        );
      } else {
        setDataFicheCourante(datasFiches[idxLocal]);
      }
    },
    [
      dataFicheCourante,
      dataFicheIdentifiant,
      datasFiches,
      getLignesSuivantesOuPrecedentes
    ]
  );

  const obtenirFichePrecedente = useCallback(
    (idx: number, idxLocal: number) => {
      if (
        getLignesSuivantesOuPrecedentes &&
        dataFicheCourante?.lienPrecedent &&
        passageALaPlagePrecedente(idx, nbLignesParAppel)
      ) {
        // On est en dehors de la plage courante (ie datasFiches) il faut faire un appel serveur pour obtenir la plage précédente
        getLignesSuivantesOuPrecedentes(
          dataFicheIdentifiant,
          dataFicheCourante.lienPrecedent
        );
      } else {
        setDataFicheCourante(datasFiches[idxLocal]);
      }
    },
    [
      dataFicheCourante,
      dataFicheIdentifiant,
      datasFiches,
      getLignesSuivantesOuPrecedentes,
      nbLignesParAppel
    ]
  );

  const setIndexFiche = useCallback(
    (idx: number) => {
      if (
        dataFicheCourante &&
        datasFiches &&
        idx >= 0 &&
        idx < nbLignesTotales
      ) {
        const estSuivant = idx > indexCourant;
        const idxLocal = getIndexLocal(idx, nbLignesParAppel);
        if (estSuivant) {
          obtenirFicheSuivante(idxLocal, idx);
        } else {
          obtenirFichePrecedente(idx, idxLocal);
        }
      }
      setIndexCourant(idx);
    },
    [
      dataFicheCourante,
      datasFiches,
      indexCourant,
      nbLignesParAppel,
      nbLignesTotales,
      obtenirFichePrecedente,
      obtenirFicheSuivante
    ]
  );

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
        idActe
      });
    },
    []
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

  const acte = dataFicheState?.data
    ? (dataFicheState.data as IFicheActe)
    : undefined;

  return (
    <div className="FichePage">
      {bandeauFiche && panelsFiche && dataFicheState && dataFicheCourante ? (
        <>
          <BandeauFiche
            dataBandeau={bandeauFiche}
            elementNumeroLigne={getElementNumeroLigne(
              bandeauFiche,
              dataFicheCourante.categorie
            )}
          />

          <div className="barreNavigationSuivPrec">
            <BarreNavigationSuivPrec
              index={indexCourant}
              max={nbLignesTotales}
              setIndex={setIndexFiche}
            />
          </div>
          {dataFicheCourante.categorie === TypeFiche.ACTE && (
            <>
              <BandeauAlertesActe
                alertes={alertes}
                idTypeRegistre={acte?.registre.id}
                ajouterAlerteCallBack={ajouterAlerteCallBack}
                supprimerAlerteCallBack={supprimerAlerteCallBack}
                afficherBouton={visuBoutonAlertes}
              />
              {acte &&
                !officierDroitConsulterSurLeTypeRegistreOuDroitMEAE(
                  acte.registre?.type?.id
                ) &&
                gestionnaireFeatureFlag.estActif(
                  FeatureFlag.FF_DELIV_EC_PAC
                ) && (
                  <BoutonCreationRDD
                    label="Demander la délivrance"
                    labelPopin={`Vous allez demander la délivrance de cet acte. Souhaitez-vous continuer ?`}
                    acte={acte}
                    numeroFonctionnel={numeroRequete}
                  />
                )}
            </>
          )}
          {panelsFiche?.panels?.map((panel: SectionPanelProps, idx: number) => (
            <AccordionRece
              key={`accordion-rece-${idx}`}
              panel={panel}
              index={idx}
              expanded={
                panelsFiche.panelParDefaut
                  ? idx === panelsFiche.panelParDefaut
                  : idx === 0
              }
              titre={panel?.title}
              disabled={panel?.panelAreas.every(
                (pa: SectionPanelAreaProps) => !pa.value && !pa.parts
              )}
            />
          ))}
        </>
      ) : (
        <OperationLocaleEnCours visible={true} />
      )}
    </div>
  );
};

/**
 * Passage à la plage suivante si le prochain index local est 0 et que ce n'est pas le 0 du tout début
 */
function passageALaPlageSuivante(idxLocal: number, indexCourant: number) {
  return idxLocal === 0 && indexCourant !== idxLocal;
}

/**
 *  Passage à la plage précédente si l'index local précédent était 0
 */
function passageALaPlagePrecedente(
  indexCourant: number,
  nbLignesParAppel: number
) {
  return getIndexLocal(indexCourant + 1, nbLignesParAppel) === 0;
}

/**
 * Retourne l'index local à la "plage" courante (ie "datasFiches").
 * En effet, "indexCourant" est l'index sur la totalité des données mais dépasse peut être la taille de datasFiches
 */
function getIndexLocal(index: number, nbLignesParAppel: number) {
  return index % nbLignesParAppel;
}

function getElementNumeroLigne(bandeau: IBandeauFiche, categorie: TypeFiche) {
  return FicheUtil.isActe(categorie) ? (
    <BandeauFicheActeNumero dataBandeau={bandeau} />
  ) : (
    <BandeauFicheRcRcaPacsNumero dataBandeau={bandeau} />
  );
}
