import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { CONFIG_POST_MAJ_STATUT_ET_ACTION } from "@api/configurations/requete/actions/PostMajStatutEtActionConfigApi";
import { RECEContextActions, RECEContextData } from "@core/contexts/RECEContext";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { IRequete } from "@model/requete/IRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import Edit from "@mui/icons-material/Edit";
import { RMCRequetesAssocieesResultats } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import {
  URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID,
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
  URL_RECHERCHE_REQUETE
} from "@router/ReceUrls";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Bouton from "../../composants/commun/bouton/Bouton";
import PageChargeur from "../../composants/commun/chargeurs/PageChargeur";
import OngletsBouton from "../../composants/commun/onglets/OngletsBouton";
import ResumeDetailsRequete from "../../composants/pages/requetesConsulaire/commun/ResumeDetailsRequete";
import ConteneurVoletEdition from "../../composants/pages/requetesDelivrance/editionRequete/ConteneurVoletEdition";
import useFetchApi from "../../hooks/api/FetchApiHook";
import { useTitreDeLaFenetre } from "../../hooks/utilitaires/TitreDeLaFenetreHook";
import AfficherMessage, { estTableauErreurApi } from "../../utils/AfficherMessage";

enum ECleOngletPage {
  DESCRIPTION = "description"
}

const PageRequeteCreationTranscriptionPriseEnCharge: React.FC = () => {
  useTitreDeLaFenetre("Aperçu requête transcription (prise en charge)");
  const { idRequeteParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { utilisateurConnecte } = useContext(RECEContextData);
  const { setIsDirty } = useContext(RECEContextActions);

  const [requete, setRequete] = useState<IRequeteCreationTranscription | null>(null);
  const [ongletActif, setOngletActif] = useState<ECleOngletPage>(ECleOngletPage.DESCRIPTION);

  const estModeConsultation = useMemo<boolean>(() => location.pathname.includes(URL_RECHERCHE_REQUETE), [location.pathname]);
  const { appelApi: appelApiGetDetail } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
  const { appelApi: appelApiMajStatutEtAction, enAttenteDeReponseApi: enAttenteMajStatutEtAction } =
    useFetchApi(CONFIG_POST_MAJ_STATUT_ET_ACTION);

  const afficherBoutonModifierRequete = useMemo(() => {
    const statutActuel = requete?.statutCourant?.statut?.libelle ?? "";

    return (
      requete &&
      SousTypeCreation.estRCTC(requete?.sousType) &&
      utilisateurConnecte.id === requete?.idUtilisateur &&
      ![StatutRequete.EN_TRAITEMENT.libelle, StatutRequete.A_SIGNER.libelle].includes(statutActuel)
    );
  }, [requete, utilisateurConnecte]);

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
          isConsultationHistoriqueAction: false
        }
      },
      apresSucces: data => {
        setRequete(mappingRequeteCreation(data) as IRequeteCreationTranscription);
        setIsDirty(false);
      },
      apresErreur: erreurs => {
        AfficherMessage.erreur("Une erreur est survenue lors de la récupération des informations de l'acte", { erreurs });
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
        navigate(URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID.replace(":idRequeteParam", requete.id));
      },
      apresErreur: erreurs =>
        AfficherMessage.erreur("Impossible de démarrer le traitement du projet d'acte.", {
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

                <div className="mb-4 mr-4 mt-4">
                  {!estModeConsultation && (
                    <div className="mt-2">
                      <RMCRequetesAssocieesResultats requete={requete as IRequete} />
                    </div>
                  )}
                </div>
              </ConteneurVoletEdition>
            </div>

            <div className="w-[65%]">{/* Réservé pour l'implémentation future */}</div>
          </>
        )}
      </div>

      {requete && (
        <div className="mt-4 flex justify-between">
          <div>
            {afficherBoutonModifierRequete && (
              <Bouton
                title="Modifier la requête"
                className="flex w-fit"
                lienVers={URL_MES_REQUETES_CONSULAIRE_MODIFIER_RCTC_ID.replace(":idRequete", requete.id)}
              >
                <Edit className="mr-2" /> {"MODIFIER LA REQUÊTE"}
              </Bouton>
            )}
          </div>

          <Bouton
            className="shrink-0"
            title="Créer le projet d'acte"
            onClick={onClickOnCreerProjetActe}
            disabled={enAttenteMajStatutEtAction}
          >
            Créer le projet d'acte
          </Bouton>
        </div>
      )}
    </div>
  );
};

export default PageRequeteCreationTranscriptionPriseEnCharge;
