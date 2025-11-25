import { postAjoutPieceJustificativeAUneRequeteCreation } from "@api/appels/requeteApi";
import { TUuidSuiviDossierParams } from "@model/params/TUuidSuiviDossierParams";

import { useEffect } from "react";
import { useParams } from "react-router";
import AfficherMessage, { estTableauErreurApi } from "../../../../../utils/AfficherMessage";
import { PieceJointe } from "../../../../../utils/FileUtils";

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

export const useAjoutPieceJustificativeToRequete = (params?: IAjoutPieceJustificativeToRequeteParams): void => {
  const { idRequeteParam } = useParams<TUuidSuiviDossierParams>();

  useEffect(() => {
    if (params && idRequeteParam) {
      postAjoutPieceJustificativeAUneRequeteCreation(idRequeteParam, mapParamsVersAjoutPieceJustificativeDto(params))
        .then(res => {
          AfficherMessage.succes("Enregistrement de la pièce justificative effectué avec succès !");
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible d'ajouter cette pièce justificative à la requête", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : [],
            fermetureAuto: true
          });
        });
    }
  }, [params, idRequeteParam]);
};

const mapParamsVersAjoutPieceJustificativeDto = (params: IAjoutPieceJustificativeToRequeteParams): IAjoutPieceJustificativeDto => {
  const file = params.file?.base64File;
  return {
    nom: file?.fileName || "",
    mimeType: file?.mimeType || "",
    extension: file?.extension || "",
    taille: file?.taille.toString() || "",
    contenu: file?.base64String || "",
    idDocument: params.categoriePJ
  };
};
