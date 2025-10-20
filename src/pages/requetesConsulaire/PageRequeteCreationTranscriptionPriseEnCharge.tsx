import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { CONFIG_POST_MAJ_STATUT_ET_ACTION } from "@api/configurations/requete/actions/PostMajStatutEtActionConfigApi";
import { CONFIG_POST_PRENDRE_EN_CHARGE } from "@api/configurations/requete/creation/PostPrendreEnChargeRequeteTranscriptionConfigApi";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { Droit } from "@model/agent/enum/Droit";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { useContext, useEffect, useMemo, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router";
import AccessibleAvecDroits from "../../composants/commun/accessibleAvecDroits/AccessibleAvecDroits";
import Bouton from "../../composants/commun/bouton/Bouton";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import OngletsBouton from "../../composants/commun/onglets/OngletsBouton";
import HistoriqueActionsRequete from "../../composants/commun/suivi/HistoriqueActionsRequete";
import ResumeDetailsRequete from "../../composants/pages/requetesConsulaire/commun/ResumeDetailsRequete";
import ConteneurVoletEdition from "../../composants/pages/requetesDelivrance/editionRequete/ConteneurVoletEdition";
import { RECEContextActions, RECEContextData } from "../../contexts/RECEContextProvider";
import useFetchApi from "../../hooks/api/FetchApiHook";
import LiensRECE from "../../router/LiensRECE";
import {
  INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET,
  INFO_PAGE_MODIFICATION_REQUETE_TRANSCRIPTION_COURRIER,
  INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER
} from "../../router/infoPages/InfoPagesEspaceConsulaire";
import AfficherMessage, { estTableauErreurApi } from "../../utils/AfficherMessage";

enum ECleOngletPage {
  DESCRIPTION = "description"
}

const PageRequeteCreationTranscriptionPriseEnCharge: React.FC = () => {
  const { idRequeteParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const [requete, setRequete] = useState<IRequeteCreationTranscription | null>(null);
  const [ongletActif, setOngletActif] = useState<ECleOngletPage>(ECleOngletPage.DESCRIPTION);

  const estModeConsultation = useMemo<boolean>(() => LiensRECE.estPageConsultation(), [location.pathname]);
  const { appelApi: appelApiGetDetail } = useFetchApi(CONFIG_GET_DETAIL_REQUETE, true);
  const { appelApi: appelApiMajStatutEtAction, enAttenteDeReponseApi: enAttenteMajStatutEtAction } =
    useFetchApi(CONFIG_POST_MAJ_STATUT_ET_ACTION);

  const { appelApi: appelApiPrendreEnCharge, enAttenteDeReponseApi: enAttentePriseEnCharge } = useFetchApi(CONFIG_POST_PRENDRE_EN_CHARGE);
  const afficherBoutonModifierRequete =
    requete &&
    SousTypeCreation.estRCTC(requete?.sousType) &&
    utilisateurConnecte.idService === requete?.idService &&
    ![StatutRequete.EN_TRAITEMENT.libelle, StatutRequete.A_SIGNER.libelle].includes(requete?.statutCourant?.statut?.libelle ?? "");

  const afficherBoutonPrendreEnCharge =
    requete &&
    utilisateurConnecte.idService === requete?.idService &&
    requete?.statutCourant?.statut?.libelle !== StatutRequete.PRISE_EN_CHARGE.libelle;

  useEffect(() => {
    if (!idRequeteParam) {
      navigate(-1);
      return;
    }

    appelApiGetDetail({
      parametres: {
        path: {
          idRequete: idRequeteParam
        },
        query: {
          isConsultationHistoriqueAction: true
        }
      },
      apresSucces: data => {
        setRequete(mappingRequeteCreation(data) as IRequeteCreationTranscription);
        setIsDirty(false);
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération de la requête", { erreurs });
        navigate(-1);
      }
    });
  }, []);

  const onClickOnCreerProjetActe = () => {
    if (!requete?.id) {
      return;
    }

    appelApiMajStatutEtAction({
      parametres: {
        query: {
          idRequete: requete.id,
          libelleAction: "Saisie du projet",
          statutRequete: StatutRequete.getKey(StatutRequete.EN_TRAITEMENT)
        }
      },
      apresSucces: () => {
        navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET.url, { idRequeteParam: requete.id }), {
          replace: true
        });
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de créer le projet d'acte.", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
          fermetureAuto: true
        })
    });
  };

  const onClickOnPrendreEnCharge = () => {
    if (!requete?.id) {
      return;
    }

    appelApiPrendreEnCharge({
      parametres: {
        path: {
          idRequete: requete.id
        }
      },
      apresSucces: () => {
        appelApiGetDetail({
          parametres: {
            path: {
              idRequete: requete.id
            },
            query: {
              isConsultationHistoriqueAction: true
            }
          },
          apresSucces: data => {
            setRequete(mappingRequeteCreation(data) as IRequeteCreationTranscription);
            setIsDirty(false);
          },
          apresErreur: erreurs => {
            AfficherMessage.erreur("Une erreur est survenue lors de la récupération des informations de la requête.", { erreurs });
            navigate(-1);
          }
        });
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de mettre à jour le statut de la requête.", {
          erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
          fermetureAuto: true
        })
    });
  };

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex gap-8">
        {!requete ? (
          <PageChargeur />
        ) : (
          <>
            {/* Partie gauche - 35% */}
            <div className="flex w-[35%] flex-col">
              <OngletsBouton<ECleOngletPage>
                onglets={[
                  {
                    cle: ECleOngletPage.DESCRIPTION,
                    libelle: "Description de la requête"
                  }
                ]}
                cleOngletActif={ongletActif}
                changerOnglet={setOngletActif}
              />

              <ConteneurVoletEdition
                estActif={ongletActif === ECleOngletPage.DESCRIPTION}
                estScrollable
              >
                <ResumeDetailsRequete
                  requete={requete}
                  nombreColonnes={2}
                />

                <HistoriqueActionsRequete actions={requete.actions} />

                <AccessibleAvecDroits auMoinsUnDesDroits={[Droit.CONSULTER]}>
                  <div className="mb-4 mr-4 mt-4">
                    {!estModeConsultation && (
                      <div className="mt-2">
                        <RMCRequetesAssocieesResultats requete={requete as IRequete} />
                      </div>
                    )}
                  </div>
                </AccessibleAvecDroits>
              </ConteneurVoletEdition>
            </div>

            <div className="w-[65%]">{/* Réservé pour l'implémentation future */}</div>
          </>
        )}
      </div>

      {requete && (
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-4">
            <Bouton
              className="uppercase"
              title="Saisir une nouvelle requête"
              lienVers={LiensRECE.genererLien(INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER.url)}
            >
              {"Saisir une nouvelle requête"}
            </Bouton>

            {afficherBoutonModifierRequete && (
              <Bouton
                title="Modifier la requête"
                className="flex w-fit items-center"
                lienVers={LiensRECE.genererLien(INFO_PAGE_MODIFICATION_REQUETE_TRANSCRIPTION_COURRIER.url, { idRequeteParam: requete.id })}
              >
                <MdEdit
                  className="mr-2"
                  aria-hidden
                />{" "}
                {"MODIFIER LA REQUÊTE"}
              </Bouton>
            )}

            {afficherBoutonPrendreEnCharge && (
              <Bouton
                title="Prendre en charge"
                className="flex w-fit"
                onClick={onClickOnPrendreEnCharge}
                disabled={enAttentePriseEnCharge}
              >
                {"PRENDRE EN CHARGE"}
              </Bouton>
            )}
          </div>

          <Bouton
            title="Créer le projet d'acte"
            onClick={onClickOnCreerProjetActe}
            disabled={enAttenteMajStatutEtAction}
          >
            {"Créer le projet d'acte"}
          </Bouton>
        </div>
      )}
    </div>
  );
};

export default PageRequeteCreationTranscriptionPriseEnCharge;
