import { CONFIG_POST_MAJ_STATUT_REQUETE_CONSULAIRE } from "@api/configurations/requete/consulaire/PostRequeteCreationMiseAJourStatusConfig";
import { IRequeteTableauConsulaire } from "@model/requete/IRequeteTableauConsulaire";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import messageManager from "@util/messageManager";
import { useNavigate } from "react-router";
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
            navigate(URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID.replace(":idRequeteParam", idRequete));
          },
          apresErreur: erreurs => {
            console.error("Erreur lors de la mise à jour du statut:", erreurs);
            messageManager.showErrorAndClose("Impossible de prendre en charge la requête");
          }
        });
        break;

      case StatutRequete.PRISE_EN_CHARGE.libelle:
        navigate(URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID.replace(":idRequeteParam", idRequete));
        break;

      case StatutRequete.A_SIGNER.libelle:
      case StatutRequete.EN_TRAITEMENT.libelle:
        navigate(URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID.replace(":idRequeteParam", idRequete));
        break;

      default:
        messageManager.showErrorAndClose(`Statut non reconnu: "${statut}"`);
    }
  };

  return { naviguerVersRequeteConsulaire, enAttenteDeReponseApi };
};

export default useNavigationRequeteTableauConsulaire;
