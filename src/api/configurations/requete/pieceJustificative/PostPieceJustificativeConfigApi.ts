/* v8 ignore start A TESTER 03/25 */
import { REQUETE_API } from "@api/ApiDisponibles";
import { TConfigurationApi } from "@model/api/Api";

const URI = "/requetes/:idRequete/piecejustificative";

interface IPieceJustificativeDto {
  id?: string;
  nom: string;
  mimeType?: string;
  extension?: string;
  taille: number;
  referenceSwift?: string;
  conteneurSwift?: string;
  contenu: string;
  typePieceJustificative?: string;
}

export const CONFIG_POST_PIECE_JUSTIFICATIVE: TConfigurationApi<typeof URI, IPieceJustificativeDto> = {
  api: REQUETE_API,
  methode: "POST",
  uri: URI
};
/* v8 ignore end */
