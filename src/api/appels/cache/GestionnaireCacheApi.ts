import { Decret, IDecret } from "../../../model/etatcivil/commun/IDecret";
import { logError } from "../../../views/common/util/LogManager";
import { storeRece } from "../../../views/common/util/storeRece";
import {
  getTousLesUtilisateurs,
  getToutesLesEntiteRattachement
} from "../agentApi";
import { getToutesLesDecrets } from "../etatcivilApi";

const PLAGE_IMPORT = 100;

export class GestionnaireCacheApi {
  static chargerTousLesUtilisateurs() {
    return GestionnaireCacheApi.chargerTousLesUtilisateursPourLaPage(0);
  }

  static chargerToutesLesEntites() {
    return GestionnaireCacheApi.chargerToutesLesEntitesPourLaPage(0);
  }

  private static async chargerTousLesUtilisateursPourLaPage(page: number) {
    try {
      const utilisateurs = await getTousLesUtilisateurs(
        `${page}-${PLAGE_IMPORT}`,
        true
      );
      storeRece.listeUtilisateurs = [
        ...storeRece.listeUtilisateurs,
        ...utilisateurs.body.data
      ];
      if (
        utilisateurs.headers &&
        utilisateurs.headers.link.indexOf(`rel="next"`) >= 0
      ) {
        GestionnaireCacheApi.chargerTousLesUtilisateursPourLaPage(page + 1);
      }
    } catch (error) {
      GestionnaireCacheApi.gereErreur(
        error,
        "Impossible de récupérer les utilisateurs"
      );
    }
  }

  private static async chargerToutesLesEntitesPourLaPage(page: number) {
    try {
      const entites = await getToutesLesEntiteRattachement(
        `${page}-${PLAGE_IMPORT}`
      );
      storeRece.listeEntite = [...storeRece.listeEntite, ...entites.body.data];
      if (entites.headers && entites.headers.link.indexOf(`rel="next"`) >= 0) {
        GestionnaireCacheApi.chargerToutesLesEntitesPourLaPage(page + 1);
      }
    } catch (error) {
      GestionnaireCacheApi.gereErreur(
        error,
        "Impossible de récupérer les entités"
      );
    }
  }

  public static async chargerTousLesDecrets() {
    try {
      const decrets = await getToutesLesDecrets();
      storeRece.decrets = GestionnaireCacheApi.mapDecrets(decrets.body.data);
    } catch (error) {
      GestionnaireCacheApi.gereErreur(
        error,
        "Impossible de récupérer les décrets"
      );
    }
  }

  private static mapDecrets(decrets: any): IDecret[] {
    return decrets.map(
      (d: any) =>
        ({
          ...d,
          type: Decret.getEnumTypeDecretFrom(d.type),
          document: Decret.getEnumDocumentDecretFrom(d.document)
        } as IDecret)
    );
  }

  private static gereErreur(error: any, message: string) {
    logError({
      messageUtilisateur: message,
      error
    });
  }
}
