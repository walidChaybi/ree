import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import {
  IReponseNegativeDemandeIncompleteComposition,
  NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
} from "../../../../../../model/composition/IReponseNegativeDemandeIncompleteComposition";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import { TRequete } from "../../../../../../model/requete/v2/IRequete";
import { MimeType } from "../../../../../../ressources/MimeType";
import { useCompositionReponseNegativeDemandeIncompleteApi } from "../../../../../common/hook/v2/composition/CompositionReponseNegativeDemandeIncompleteHook";
import { useStockeDocumentCreerActionEtMajStatutRequte } from "../../../../../common/hook/v2/requete/StockDocumentEtCreationActionEtMajStatutRequete";
import { getUrlWithParam } from "../../../../../common/util/route/routeUtil";
import { URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID } from "../../../../../router/ReceUrls";

export function useReponseNegative(
  reponseNegative?: IReponseNegativeDemandeIncompleteComposition,
  requete?: TRequete
) {
  const history = useHistory();
  const [
    documentsReponsePourStockage,
    setDocumentsReponsePourStockage
  ] = useState<IDocumentReponse[] | undefined>();

  // 1- Réponse négative demandée: appel api composition
  const contenuComposition = useCompositionReponseNegativeDemandeIncompleteApi(
    reponseNegative
  );

  // 2- Création du document réponse (après appel 'useCompositionReponseNegativeDemandeIncompleteApi') pour stockage dans la BDD et Swift
  useEffect(() => {
    if (contenuComposition) {
      DocumentDelivrance.getCourrierNonDelivranceAttestationPacsUUID().then(
        uuidTypeDocument => {
          setDocumentsReponsePourStockage([
            {
              contenu: contenuComposition,
              nom: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE,
              mimeType: MimeType.APPLI_PDF,
              typeDocument: uuidTypeDocument,
              nbPages: 1,
              orientation: Orientation.PORTRAIT
            } as IDocumentReponse
          ]);
        }
      );
    }
  }, [contenuComposition]);

  // 3- Stockage du document réponse une fois celui-ci créé
  // 4- Création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  // 5- Mise à jour du status de la requête + création d'une action
  const {
    idAction,
    uuidDocumentsReponse
  } = useStockeDocumentCreerActionEtMajStatutRequte(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    documentsReponsePourStockage,
    requete?.id
  );

  // 6- Une fois la requête mise à jour et l'action créée changement de page
  useEffect(
    () => {
      if (
        idAction &&
        requete &&
        uuidDocumentsReponse &&
        uuidDocumentsReponse.length === 1
      ) {
        history.push(
          getUrlWithParam(
            URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID,
            requete.id
          )
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idAction]
  );
}
