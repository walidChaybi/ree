import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/v2/IUuidRequeteParams";
import { useGetDocumentReponseApi } from "../../../common/hook/v2/DocumentReponseHook";
import { getIdDocumentReponseAAfficher } from "../../../common/util/RequetesUtils";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { VisionneuseDocument } from "../../../common/widget/document/VisionneuseDocument";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { BoutonPrendreEnCharge } from "../contenu/BoutonPrendreEnCharge";
import {
  DocumentsReponses,
  InfoDocumentAffiche
} from "../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";

export const ApercuRequetePageV2: React.FC = () => {
  const { idRequete } = useParams<IUuidRequeteParams>();
  const [documentAffiche, setDocumentAffiche] = useState<InfoDocumentAffiche>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);
  const contenuDocument = useGetDocumentReponseApi(documentAffiche?.id);

  const [requete, setRequete] = useState<IRequeteDelivrance>();

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);

      setDocumentAffiche({
        id: getIdDocumentReponseAAfficher(
          detailRequeteState as IRequeteDelivrance
        )
      });
    }
  }, [detailRequeteState]);

  return (
    <div className="ApercuRequete">
      <title>{getLibelle("Aperçu de la requête")}</title>
      {requete && (
        <ProtectionApercu
          statut={requete.statutCourant.statut}
          type={requete.type}
        >
          <BandeauRequete detailRequete={requete} />
          <div className="contenu-requete">
            <div className="side left">
              <ResumeRequeteV2 requete={requete}></ResumeRequeteV2>
              <SuiviActionsRequete
                actions={requete.actions}
              ></SuiviActionsRequete>
              <SuiviObservationsRequete
                observations={requete?.observations}
              ></SuiviObservationsRequete>
              <DocumentsReponses
                documents={requete.documentsReponses}
                setDocumentAffiche={setDocumentAffiche}
              />
            </div>
            <div className="side right">
              <VisionneuseDocument
                titre={getLibelle("Aperçu des documents")}
                contenu={contenuDocument ? contenuDocument.contenu : ""}
                typeMime={contenuDocument?.mimeType}
              />
              <BoutonPrendreEnCharge requete={requete}></BoutonPrendreEnCharge>
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
