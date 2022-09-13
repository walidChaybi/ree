import { mappingUtilisateurs } from "@model/agent/IUtilisateur";
import { Decret, IDecret } from "@model/etatcivil/commun/IDecret";
import { logError } from "@util/LogManager";
import { storeRece } from "@util/storeRece";
import { triListeObjetsSurPropriete } from "@util/Utils";
import {
  getTousLesUtilisateurs,
  getToutesLesEntiteRattachement
} from "../agentApi";
import { getToutesLesDecrets } from "../etatcivilApi";

const PLAGE_IMPORT = 100;

export class GestionnaireCacheApi {
  static async chargerTousLesUtilisateurs() {
    await GestionnaireCacheApi.chargerTousLesUtilisateursPourLaPage(0);
    triListeObjetsSurPropriete(storeRece.listeUtilisateurs, "nom");
  }

  static chargerToutesLesEntites() {
    return GestionnaireCacheApi.chargerToutesLesEntitesPourLaPage(0);
  }

  private static async chargerTousLesUtilisateursPourLaPage(page: number) {
    try {
      const utilisateurs = await getTousLesUtilisateurs(
        `${page}-${PLAGE_IMPORT}`,
        false
      );
      storeRece.listeUtilisateurs = [
        ...storeRece.listeUtilisateurs,
        ...mappingUtilisateurs(utilisateurs.body.data)
      ];
      if (
        utilisateurs.headers &&
        utilisateurs.headers.link.indexOf(`rel="next"`) >= 0
      ) {
        await GestionnaireCacheApi.chargerTousLesUtilisateursPourLaPage(
          page + 1
        );
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
