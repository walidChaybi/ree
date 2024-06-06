import { getServiceParId, IService } from "@model/agent/IService";
import { mappingUtilisateurs } from "@model/agent/IUtilisateur";
import { Decret, IDecret } from "@model/etatcivil/commun/IDecret";
import { logError } from "@util/LogManager";
import { storeRece } from "@util/storeRece";
import { triListeObjetsSurPropriete } from "@util/Utils";
import { getTousLesServices, getTousLesUtilisateurs } from "../agentApi";
import { getToutesLesDecrets } from "../etatcivilApi";

const PLAGE_IMPORT = 100;

export class GestionnaireCacheApi {
  static async chargerTousLesUtilisateurs() {
    await GestionnaireCacheApi.chargerTousLesUtilisateursPourLaPage(0);
    triListeObjetsSurPropriete(storeRece.listeUtilisateurs, "nom");
  }

  static chargerTousLesServices() {
    return GestionnaireCacheApi.chargerTousLesServicesPourLaPage(0);
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

  private static async chargerTousLesServicesPourLaPage(page: number) {
    try {
      const services = await getTousLesServices(`${page}-${PLAGE_IMPORT}`);
      storeRece.listeServices = [
        ...storeRece.listeServices,
        ...services.body.data.filter(
          (service: IService) => !getServiceParId(service.idService)
        )
      ];
      if (
        services.headers &&
        services.headers.link.indexOf(`rel="next"`) >= 0
      ) {
        GestionnaireCacheApi.chargerTousLesServicesPourLaPage(page + 1);
      }
    } catch (error) {
      GestionnaireCacheApi.gereErreur(
        error,
        "Impossible de récupérer les services"
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
