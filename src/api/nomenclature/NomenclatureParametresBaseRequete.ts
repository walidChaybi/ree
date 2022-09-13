import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { logError } from "@util/LogManager";
import { getParametresBaseRequete } from "../appels/requeteApi";

export async function peupleParametresBaseRequete() {
  if (!ParametreBaseRequete.contientEnums()) {
    try {
      const parametres = await getParametresBaseRequete();
      ParametreBaseRequete.clean();
      for (const data of parametres.body.data) {
        ParametreBaseRequete.addEnum(
          data.cle,
          new ParametreBaseRequete(
            data.fichierB64 ? data.fichierB64 : data.valeur
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur:
          "Impossible de charger les paramètres de la base requête",
        error
      });
    }
  }
}
