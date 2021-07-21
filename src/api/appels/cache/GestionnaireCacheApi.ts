import { logError } from "../../../views/common/util/LogManager";
import { storeRece } from "../../../views/common/util/storeRece";
import {
  getTousLesUtilisateurs,
  getToutesLesEntiteRattachement
} from "../agentApi";

const PLAGE_IMPORT = 100;

export class GestionnaireCacheApi {
  static chargerTousLesUtilisateurs() {
    return GestionnaireCacheApi.chargerTousLesUtilisateursPourLaPage(0);
  }

  static chargerToutesLesEntites() {
    return GestionnaireCacheApi.chargerToutesLesEntitesPourLaPage(0);
  }

  private static chargerTousLesUtilisateursPourLaPage(page: number) {
    return getTousLesUtilisateurs(`${page}-${PLAGE_IMPORT}`, true)
      .then(utilisateurs => {
        storeRece.listeUtilisateurs = [
          ...storeRece.listeUtilisateurs,
          ...utilisateurs.body.data
        ];
        if (utilisateurs.headers.link.indexOf(`rel="next"`) > 0) {
          GestionnaireCacheApi.chargerTousLesUtilisateursPourLaPage(page + 1);
        }
      })
      .catch(error => {
        GestionnaireCacheApi.gereErreur(
          error,
          "Impossible de récupérer les utilisateurs"
        );
      });
  }

  private static chargerToutesLesEntitesPourLaPage(page: number) {
    return getToutesLesEntiteRattachement(`${page}-${PLAGE_IMPORT}`)
      .then(entites => {
        storeRece.listeEntite = [
          ...storeRece.listeEntite,
          ...entites.body.data
        ];
        if (entites.headers.link.indexOf(`rel="next"`) > 0) {
          GestionnaireCacheApi.chargerToutesLesEntitesPourLaPage(page + 1);
        }
      })
      .catch(error => {
        GestionnaireCacheApi.gereErreur(
          error,
          "Impossible de récupérer les entités"
        );
      });
  }

  private static gereErreur(error: any, message: string) {
    logError({
      messageUtilisateur: message,
      error
    });
  }
}
