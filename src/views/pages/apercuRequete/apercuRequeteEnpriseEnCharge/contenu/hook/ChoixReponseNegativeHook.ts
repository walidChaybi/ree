import { useEffect, useState } from "react";
import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import { IReponseNegative } from "../../../../../../model/composition/IReponseNegative";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import { MimeType } from "../../../../../../ressources/MimeType";
import { useCompositionReponseNegativeApi } from "../../../../../common/hook/v2/composition/CompositionReponseNegativeHook";
import { useStockerDocumentCreerActionMajStatutRequete } from "../../../../../common/hook/v2/requete/StockerDocumentCreerActionMajStatutRequete";

export function useReponseNegative(
  libelleAction: string,
  statutRequete: StatutRequete,
  reponseNegative?: IReponseNegative,
  requeteId?: string
) {
  const [resultat, setResultat] = useState<any>();

  const [documentsReponsePourStockage, setDocumentsReponsePourStockage] =
    useState<IDocumentReponse[] | undefined>();

  // 1- Réponse négative demandée: appel api composition
  const contenuComposition = useCompositionReponseNegativeApi(
    reponseNegative?.fichier,
    reponseNegative?.contenu
  );

  // 2- Création du document réponse (après appel 'useCompositionReponseNegativeMariageApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    if (contenuComposition) {
      setDocumentsReponsePourStockage([
        {
          contenu: contenuComposition,
          nom: reponseNegative?.fichier,
          mimeType: MimeType.APPLI_PDF,
          typeDocument:
            DocumentDelivrance.getCourrierNonDelivranceAttestationPacsUUID(),
          nbPages: 1,
          orientation: Orientation.PORTRAIT
        } as IDocumentReponse
      ]);
    }
  }, [contenuComposition, reponseNegative]);

  // 3- Stockage du document réponse une fois celui-ci créé
  // 4- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 5- Mise à jour du status de la requête + création d'une action
  const { idAction, uuidDocumentsReponse } =
    useStockerDocumentCreerActionMajStatutRequete(
      libelleAction,
      statutRequete,
      documentsReponsePourStockage,
      requeteId
    );

  // 6- Une fois la requête mise à jour et l'action créé, changement de page
  useEffect(
    () => {
      if (
        idAction &&
        requeteId &&
        uuidDocumentsReponse &&
        uuidDocumentsReponse.length === 1
      ) {
        setResultat({
          requeteId,
          idAction,
          uuidDocumentsReponse
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idAction]
  );

  return resultat;
}
