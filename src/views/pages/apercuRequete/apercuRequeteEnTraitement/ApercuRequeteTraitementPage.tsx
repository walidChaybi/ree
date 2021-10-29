import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/v2/IUuidRequeteParams";
import { useGetDocumentReponseApi } from "../../../common/hook/v2/DocumentReponseHook";
import { getIdDocumentReponseAAfficher } from "../../../common/util/RequetesUtils";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { BoutonModifierTraitement } from "../contenu/BoutonModifierTraitement";
import { BoutonSignerValider } from "../contenu/BoutonSignerValider";
import {
  DocumentsReponses,
  InfoDocumentAffiche
} from "../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
import "./scss/ApercuRequeteTraitementPage.scss";
import { VisionneuseApercuTraitement } from "./VisionneuseApercuTraitement";

export const ApercuRequeteTraitementPage: React.FC = () => {
  const history = useHistory();
  const { idRequete } = useParams<IUuidRequeteParams>();
  const [dataHistory] = useState<any>(history.location.state);
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
    <div className="ApercuRequeteTraitement">
      <title>{getLibelle("Aperçu du traitement de la requête")}</title>
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
                actions={requete?.actions}
              ></SuiviActionsRequete>
              <SuiviObservationsRequete observations={requete?.observations} />
              <DocumentsReponses
                documents={requete.documentsReponses}
                setDocumentAffiche={setDocumentAffiche}
              />
            </div>
            <div className="side right">
              {dataHistory && dataHistory.info && (
                <div className="MessageInfo">{dataHistory.info}</div>
              )}
              <VisionneuseApercuTraitement
                requete={requete}
                contenu={contenuDocument?.contenu}
                typeMime={contenuDocument?.mimeType}
              />
              <BoutonModifierTraitement
                requete={requete}
                dataHistory={dataHistory}
              />
              <BoutonSignerValider requete={requete} />
              <BoutonRetour message={getLibelle("<< Retour")} />
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
