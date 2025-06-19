import { postAjoutPieceJustificativeAUneRequeteCreation } from "@api/appels/requeteApi";
import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";
import { PieceJointe } from "@util/FileUtils";
import { logError } from "@util/LogManager";
import messageManager from "@util/messageManager";
import { useEffect } from "react";
import { useParams } from "react-router";

interface IAjoutPieceJustificativeDto {
  nom: string;
  mimeType: string;
  extension: string;
  taille: string;
  contenu: string;
  idDocument: string;
}

interface IAjoutPieceJustificativeToRequeteParams {
  categoriePJ: string;
  file?: PieceJointe;
}

export function useAjoutPieceJustificativeToRequete(params?: IAjoutPieceJustificativeToRequeteParams): void {
  const { idRequeteParam } = useParams<TUuidSuiviDossierParams>();

  useEffect(() => {
    if (params && idRequeteParam) {
      postAjoutPieceJustificativeAUneRequeteCreation(idRequeteParam, mapParamsVersAjoutPieceJustificativeDto(params))
        .then(res => {
          messageManager.showSuccessAndClose("Enregistrement de la pièce justificative effectué avec succès !");
        })
        .catch(e => {
          logError({
            error: e,
            messageUtilisateur: "Impossible d'ajouter cette pièce justificative à la requête"
          });
        });
    }
  }, [params, idRequeteParam]);
}

function mapParamsVersAjoutPieceJustificativeDto(params: IAjoutPieceJustificativeToRequeteParams): IAjoutPieceJustificativeDto {
  const file = params.file?.base64File;
  return {
    nom: file?.fileName || "",
    mimeType: file?.mimeType || "",
    extension: file?.extension || "",
    taille: file?.taille.toString() || "",
    contenu: file?.base64String || "",
    idDocument: params.categoriePJ
  };
}
