import { useCompositionReponseSansDelivranceCSApi } from "@hook/composition/CompositionReponseSansDelivranceCSHook";
import {
  IStockerDocumentCreerActionMajStatutRequeteParams,
  useStockerDocumentCreerActionMajStatutRequete
} from "@hook/requete/StockerDocumentCreerActionMajStatutRequete";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { Orientation } from "@model/composition/enum/Orientation";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import { EMimeType } from "../../../../ressources/EMimeType";

export function useReponseSansDelivranceCS(
  libelleAction: string,
  statutRequete: StatutRequete,
  reponseSansDelivranceCS?: IReponseSansDelivranceCS,
  requeteId?: string
) {
  const [resultat, setResultat] = useState<{
    requeteId: string;
    uuidDocumentReponse: string;
  } | null>(null);

  const [stockerDocumentCreerActionMajStatutRequeteParams, setStockerDocumentCreerActionMajStatutRequeteParams] =
    useState<IStockerDocumentCreerActionMajStatutRequeteParams>();

  // 1- Réponse négative demandée: appel api composition
  const compositionData = useCompositionReponseSansDelivranceCSApi(reponseSansDelivranceCS?.fichier, reponseSansDelivranceCS?.contenu);

  // 2- Création du document réponse (après appel 'useCompositionReponseSansDelivranceCSMariageApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    if (compositionData && reponseSansDelivranceCS?.fichier) {
      setStockerDocumentCreerActionMajStatutRequeteParams({
        documentReponsePourStockage: {
          contenu: compositionData.contenu,
          nom: reponseSansDelivranceCS?.fichier,
          mimeType: EMimeType.APPLI_PDF,
          typeDocument: DocumentDelivrance.idDepuisCode(reponseSansDelivranceCS.fichier),
          nbPages: compositionData.nbPages,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse,

        libelleAction,
        statutRequete,
        requeteId
      });
    }
  }, [compositionData]);

  // 3- Stockage du document réponse une fois celui-ci créé
  // 4- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 5- Mise à jour du status de la requête + création d'une action
  const uuidDocumentReponse = useStockerDocumentCreerActionMajStatutRequete(stockerDocumentCreerActionMajStatutRequeteParams);

  // 6- Une fois la requête mise à jour et l'action créé, changement de page
  useEffect(() => {
    if (requeteId && uuidDocumentReponse) {
      setResultat({
        requeteId,
        uuidDocumentReponse
      });
    }
  }, [uuidDocumentReponse]);

  return resultat;
}
