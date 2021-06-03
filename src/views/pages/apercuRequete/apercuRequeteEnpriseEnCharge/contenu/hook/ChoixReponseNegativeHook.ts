import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Orientation } from "../../../../../../model/composition/enum/Orientation";
import {
  IReponseNegativeDemandeIncomplete,
  NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
} from "../../../../../../model/composition/IReponseNegativeDemandeIncomplete";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import { TRequete } from "../../../../../../model/requete/v2/IRequete";
import { MimeType } from "../../../../../../ressources/MimeType";
import { useCompositionReponseNegativeDemandeIncompleteApi } from "../../../../../common/hook/v2/composition/CompositionReponseNegativeDemandeIncompleteHook";
import { usePostDocumentsReponseApi } from "../../../../../common/hook/v2/DocumentReponseHook";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../../../common/hook/v2/requete/ActionHook";
import { getUrlWithParam } from "../../../../../common/util/route/routeUtil";
import { URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_APRES_PRISE_EN_CHARGE_ID } from "../../../../../router/ReceUrls";

export function useReponseNegative(
  reponseNegative?: IReponseNegativeDemandeIncomplete,
  requete?: TRequete
) {
  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<CreationActionEtMiseAjourStatutParams | undefined>();
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
  const uuidDocumentsReponse = usePostDocumentsReponseApi(
    requete?.id,
    documentsReponsePourStockage
  );

  // 4- Une fois le document stocké, création des paramètres pour la création de l'action et la mise à jour du statut de la requête
  useEffect(() => {
    if (uuidDocumentsReponse) {
      setCreationActionEtMiseAjourStatutParams({
        requeteId: requete?.id,
        libelleAction: StatutRequete.A_VALIDER.libelle,
        statutRequete: StatutRequete.A_VALIDER
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidDocumentsReponse]);

  // 5- Une fois le document stocké et les paramètres créés, mise à jour du status de la requête + création d'une action
  const idAction = usePostCreationActionEtMiseAjourStatutApi(
    creationActionEtMiseAjourStatutParams
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
