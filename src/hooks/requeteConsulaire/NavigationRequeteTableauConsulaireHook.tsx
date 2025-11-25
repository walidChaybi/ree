import { CONFIG_POST_MAJ_STATUT_REQUETE_CONSULAIRE } from "@api/configurations/requete/consulaire/PostRequeteCreationMiseAJourStatusConfigApi";
import { IRequeteTableauConsulaire } from "@model/requete/IRequeteTableauConsulaire";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useNavigate } from "react-router";
import LiensRECE from "../../router/LiensRECE";
import {
  INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE,
  INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET
} from "../../router/infoPages/InfoPagesEspaceConsulaire";
import AfficherMessage from "../../utils/AfficherMessage";
import useFetchApi from "../api/FetchApiHook";

const useNavigationRequeteTableauConsulaire = () => {
  const navigate = useNavigate();
  const { appelApi: postCreationActionEtMiseAjourStatut, enAttenteDeReponseApi } = useFetchApi(CONFIG_POST_MAJ_STATUT_REQUETE_CONSULAIRE);

  const naviguerVersRequeteConsulaire = ({ idRequete, statut }: IRequeteTableauConsulaire) => {
    switch (statut) {
      case StatutRequete.A_TRAITER.libelle:
        postCreationActionEtMiseAjourStatut({
          parametres: {
            query: {
              idRequete,
              libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
              statutRequete: StatutRequete.getKey(StatutRequete.PRISE_EN_CHARGE)
            }
          },
          apresSucces: () => {
            navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url, { idRequeteParam: idRequete }));
          },
          apresErreur: erreurs => {
            console.error("Erreur lors de la mise à jour du statut:", erreurs);
            AfficherMessage.erreur("Impossible de prendre en charge la requête", { erreurs, fermetureAuto: true });
          }
        });
        break;

      case StatutRequete.PRISE_EN_CHARGE.libelle:
        navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url, { idRequeteParam: idRequete }));
        break;

      case StatutRequete.A_SIGNER.libelle:
      case StatutRequete.EN_TRAITEMENT.libelle:
        navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET.url, { idRequeteParam: idRequete }));
        break;

      default:
        AfficherMessage.erreur(`Statut non reconnu: "${statut}"`, { fermetureAuto: true });
    }
  };

  return { naviguerVersRequeteConsulaire, enAttenteDeReponseApi };
};

export default useNavigationRequeteTableauConsulaire;
