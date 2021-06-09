/* istanbul ignore file */
// TODO à supprimer lors de l'implémentation de la page

import React from "react";
import { useParams } from "react-router-dom";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/v2/IRequeteDelivrance";
import { useGetDocumentReponseApi } from "../../../common/hook/v2/DocumentReponseHook";
import { VisionneuseDocument } from "../../../common/widget/document/VisionneuseDocument";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";

export const ApercuRequeteTraitementPage: React.FC = () => {
  const { idRequete } = useParams();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const contenuDocument = useGetDocumentReponseApi(
    getIdDocumentReponseAAfficher(detailRequeteState)
  );

  return (
    <>
      <title>{getLibelle("Aperçu du traitement de la requête")}</title>
      <h1>{getLibelle("Aperçu du traitement de la requête")}</h1>
      <div className="contenu-requete">
        <div className="side left">
          <SuiviActionsRequete
            actions={detailRequeteState?.actions}
          ></SuiviActionsRequete>
        </div>
        <div className="side right">
          <VisionneuseDocument
            titre={getLibelle("Aperçu des documents")}
            contenu={contenuDocument?.contenu}
            typeMime={contenuDocument?.mimeType}
          />

          <BoutonRetour message={getLibelle("<< Retour")} />
        </div>
      </div>
    </>
  );

  function getIdDocumentReponseAAfficher(requete?: TRequete) {
    let idDocumentAAfficher;
    if (requete?.type === TypeRequete.DELIVRANCE) {
      const requeteDelivrance = requete as IRequeteDelivrance;

      const documentsDeDelivrance = RequeteDelivrance.getDocumentsDeDelivrance(
        requeteDelivrance
      );
      if (documentsDeDelivrance.length > 0) {
        idDocumentAAfficher = documentsDeDelivrance[0].id;
      } else if (requeteDelivrance.documentsReponses.length > 0) {
        idDocumentAAfficher = requeteDelivrance.documentsReponses[0].id;
      }
    }
    return idDocumentAAfficher;
  }
};
