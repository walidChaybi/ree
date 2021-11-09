import { useEffect, useState } from "react";
import { Orientation } from "../../../../../../../model/composition/enum/Orientation";
import { IReponseSansDelivranceCS } from "../../../../../../../model/composition/IReponseSansDelivranceCS";
import { DocumentDelivrance } from "../../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../../../model/requete/v2/IDocumentReponse";
import { MimeType } from "../../../../../../../ressources/MimeType";
import { useCompositionReponseSansDelivranceCSApi } from "../../../../../../common/hook/v2/composition/CompositionReponseSansDelivranceCSHook";
import { useStockerDocumentCreerActionMajStatutRequete } from "../../../../../../common/hook/v2/requete/StockerDocumentCreerActionMajStatutRequete";

export function useReponseSansDelivranceCS(
  requeteId: string,
  libelleAction: string,
  statutRequete: StatutRequete,
  reponseSansDelivranceCS?: IReponseSansDelivranceCS
) {
  const [resultat, setResultat] = useState<any>();

  const [documentsReponsePourStockage, setDocumentsReponsePourStockage] =
    useState<IDocumentReponse | undefined>();

  // 1- Réponse négative demandée: appel api composition
  const contenuComposition = useCompositionReponseSansDelivranceCSApi(
    reponseSansDelivranceCS?.fichier,
    reponseSansDelivranceCS?.contenu
  );

  // 2- Création du document réponse (après appel 'useCompositionReponseSansDelivranceCSMariageApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    if (contenuComposition) {
      setDocumentsReponsePourStockage({
        contenu: contenuComposition,
        nom: reponseSansDelivranceCS?.fichier,
        mimeType: MimeType.APPLI_PDF,
        typeDocument:
          DocumentDelivrance.getCourrierNonDelivranceAttestationPacsUUID(),
        nbPages: 1,
        orientation: Orientation.PORTRAIT
      } as IDocumentReponse);
    }
  }, [contenuComposition, reponseSansDelivranceCS]);

  // 3- Stockage du document réponse une fois celui-ci créé
  // 4- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 5- Mise à jour du status de la requête + création d'une action
  const uuidDocumentReponse = useStockerDocumentCreerActionMajStatutRequete(
    libelleAction,
    statutRequete,
    documentsReponsePourStockage,
    requeteId
  );

  // 6- Une fois la requête mise à jour et l'action créé, changement de page
  useEffect(
    () => {
      if (requeteId && uuidDocumentReponse) {
        setResultat({
          requeteId,
          uuidDocumentReponse
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uuidDocumentReponse]
  );

  return resultat;
}
