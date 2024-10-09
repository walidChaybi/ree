import { CONFIG_POST_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PostRequeteMiseAJourApiConfig";
import { RECEContextData } from "@core/contexts/RECEContext";
import {
  AddAlerteActeApiHookParameters,
  useAddAlerteActeApiHook
} from "@hook/alertes/AddAlerteActeHookApi";
import {
  DeleteAlerteActeApiHookParameters,
  useDeleteAlerteActeApiHook
} from "@hook/alertes/DeleteAlerteActeHookApi";
import {
  officierDroitConsulterSurLeTypeRegistreOuDroitMAE,
  officierHabiliterPourLeDroit
} from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import {
  EOptionMiseAJourActe,
  OptionMiseAJourActe
} from "@model/etatcivil/enum/OptionMiseAJourActe";
import { OrigineActe } from "@model/etatcivil/enum/OrigineActe";
import { TitulaireRequeteMiseAJour } from "@model/requete/ITitulaireRequeteMiseAJour";
import { SousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import {
  ID,
  ID_ACTE,
  URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE_ID,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import { FenetreExterneUtil } from "@util/FenetreExterne";
import { logError } from "@util/LogManager";
import { UN } from "@util/Utils";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { AccordionRece } from "@widget/accordion/AccordionRece";
import { IAjouterAlerteFormValue } from "@widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { OperationLocaleEnCours } from "@widget/attente/OperationLocaleEnCours";
import { BoutonMenu } from "@widget/boutonMenu/BoutonMenu";
import { BarreNavigationSuivPrec } from "@widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import useFetchApi from "../../../hooks/FetchApiHook";
import { FicheUtil, TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { BoutonCreationRDD } from "./BoutonCreationRDD/BoutonCreationRDD";
import { setFiche } from "./FicheUtils";
import { BandeauAlertesActe } from "./contenu/BandeauAlertesActe";
import { BandeauFiche } from "./contenu/BandeauFiche";
import { BandeauFicheActeNumero } from "./contenu/BandeauFicheActeNumero";
import { BandeauFicheRcRcaPacsNumero } from "./contenu/BandeauFicheRcRcaPacsNumero";
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
  nbLignesTotales,
  nbLignesParAppel,
  getLignesSuivantesOuPrecedentes
}) => {
  const navigate = useNavigate();
  const [actualisationInfosFiche, setActualisationInfosFiche] =
    useState<boolean>(false);
  const [dataFicheCourante, setDataFicheCourante] = useState<
    IDataFicheProps | undefined
  >(datasFiches[getIndexLocal(index.value, nbLignesParAppel)]);
  const [optionMiseAJour, setOptionMiseAJour] =
    useState<EOptionMiseAJourActe | null>(null);
  // index courant sur la totalité des données
  const [indexCourant, setIndexCourant] = useState<number>(index.value);

  const { appelApi: appelPostRequeteMiseAJour } = useFetchApi(
    CONFIG_POST_REQUETE_MISE_A_JOUR
  );

  useEffect(() => {
    setDataFicheCourante(
      datasFiches[getIndexLocal(indexCourant, nbLignesParAppel)]
    );
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
  }, [index]);

  const { utilisateurConnecte } = useContext(RECEContextData);

  const { dataFicheState } = useFichePageApiHook(
    actualisationInfosFiche,
    dataFicheCourante?.categorie,
    dataFicheCourante?.identifiant,
    estConsultation
  );

  const { bandeauFiche, panelsFiche, alertes, visuBoutonAlertes } = setFiche(
    utilisateurConnecte,
    dataFicheCourante,
    dataFicheState.data
  );

  const droitsMiseAJour = useMemo(() => {
    const droitMentions = officierHabiliterPourLeDroit(
      utilisateurConnecte,
      Droit.METTRE_A_JOUR_ACTE
    );
    const droitAnalyseMarginale = officierHabiliterPourLeDroit(
      utilisateurConnecte,
      Droit.MODIFIER_ANALYSE_MARGINALE
    );

    return {
      autorise:
        OrigineActe.estRece(
          OrigineActe.getEnumFor(dataFicheState?.data?.origine)
        ) &&
        (droitMentions || droitAnalyseMarginale),
      mentions: droitMentions,
      AnalyseMarginale: droitAnalyseMarginale
    };
  }, [dataFicheState]);

  useEffect(() => {
    const idActe = dataFicheState?.data?.id;
    if (!(optionMiseAJour && idActe)) {
      return;
    }

    const estAnalyseMarginale =
      optionMiseAJour === EOptionMiseAJourActe.ANALYSE_MARGINALE;
    const sousTypeOptionMiseAJour =
      OptionMiseAJourActe.getSousType(optionMiseAJour);

    appelPostRequeteMiseAJour({
      parametres: {
        body: {
          idActeMAJ: idActe,
          choixMAJ: estAnalyseMarginale
            ? "MAJ_ACTE_ANALYSE_MARGINALE"
            : "MAJ_ACTE_APPOSER_MENTION",
          sousType: sousTypeOptionMiseAJour.nom,
          titulaires: TitulaireRequeteMiseAJour.listeDepuisDonneesFiche(
            dataFicheState.data.titulaires
          )
        }
      },
      apresSucces: reponse => {
        const urlNavigation = (() => {
          switch (true) {
            case estAnalyseMarginale:
              return URL_REQUETE_MISE_A_JOUR_ANALYSE_MARGINALE_ID;
            case SousTypeMiseAJour.estRMAC(sousTypeOptionMiseAJour):
              return URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID;
            default:
              return URL_REQUETE_MISE_A_JOUR_MENTIONS_AUTRE_ID;
          }
        })()
          .replace(ID, reponse.id)
          .replace(ID_ACTE, idActe);

        navigate(urlNavigation);
      },
      apresErreur: erreur => {
        logError({
          error: erreur,
          messageUtilisateur:
            "Impossible d'accéder à la requete de mise a jour de l'acte"
        });
      },
      finalement: () => setOptionMiseAJour(null)
    });
  }, [optionMiseAJour]);

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
        if (idx > indexCourant) {
          obtenirFicheSuivante(getIndexLocal(idx, nbLignesParAppel), idx);
        } else {
          obtenirFichePrecedente(idx, getIndexLocal(idx, nbLignesParAppel));
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
        complementDescription: value?.complementDescription
      });
    },
    [dataFicheState]
  );

  const alerte = useAddAlerteActeApiHook(ajouterAlerteActeApiHookParameters);
  useEffect(() => {
    if (alerte) {
      setActualisationInfosFiche(!actualisationInfosFiche);
    }
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
  }, [resultatSuppressionAlerte]);

  return (
    <div className="FichePage">
      {bandeauFiche && panelsFiche && dataFicheState && dataFicheCourante ? (
        <>
          <BandeauFiche
            dataBandeau={bandeauFiche}
            elementNumeroLigne={
              FicheUtil.isActe(dataFicheCourante.categorie) ? (
                <BandeauFicheActeNumero dataBandeau={bandeauFiche} />
              ) : (
                <BandeauFicheRcRcaPacsNumero dataBandeau={bandeauFiche} />
              )
            }
          />

          {datasFiches.length > UN && (
            <div className="barreNavigationSuivPrec">
              <BarreNavigationSuivPrec
                index={indexCourant}
                max={nbLignesTotales}
                setIndex={setIndexFiche}
              />
            </div>
          )}

          {dataFicheCourante.categorie === TypeFiche.ACTE && (
            <div className="headerFichePage">
              <BandeauAlertesActe
                alertes={alertes}
                idTypeRegistre={dataFicheState.data?.registre?.type?.id}
                ajouterAlerteCallBack={ajouterAlerteCallBack}
                supprimerAlerteCallBack={supprimerAlerteCallBack}
                afficherBouton={visuBoutonAlertes}
                disableScrollLock={true}
              />
              {droitsMiseAJour.autorise && (
                <BoutonMenu
                  boutonLibelle="Mettre à jour"
                  className="menuMettreAJour"
                  options={OptionMiseAJourActe.commeOptions({
                    mentions: droitsMiseAJour.mentions,
                    analyseMarginale: droitsMiseAJour.AnalyseMarginale
                  })}
                  onClickOption={option =>
                    setOptionMiseAJour(option as EOptionMiseAJourActe)
                  }
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  disableScrollLock={true}
                />
              )}
              {dataFicheState.data &&
                !officierDroitConsulterSurLeTypeRegistreOuDroitMAE(
                  utilisateurConnecte,
                  dataFicheState.data.registre?.type?.id
                ) &&
                gestionnaireFeatureFlag.estActif(
                  FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
                ) && (
                  <BoutonCreationRDD
                    label="Demander la délivrance"
                    labelPopin={`Vous allez demander la délivrance de cet acte. Souhaitez-vous continuer ?`}
                    acte={dataFicheState.data}
                    numeroFonctionnel={numeroRequete}
                  />
                )}
            </div>
          )}

          {panelsFiche?.panels.map((panel: SectionPanelProps, idx: number) => (
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
