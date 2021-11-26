import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/v2/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/v2/IUuidRequeteParams";
import { useGetDocumentReponseApi } from "../../../common/hook/v2/DocumentReponseHook";
import { MigratorV1V2 } from "../../../common/util/migration/MigratorV1V2";
import { getIdDocumentReponseAAfficher } from "../../../common/util/RequetesUtils";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { storeRece } from "../../../common/util/storeRece";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { BoutonSignature } from "../../../common/widget/signature/BoutonSignature";
import { getLibelle } from "../../../common/widget/Text";
import { receUrl } from "../../../router/ReceUrls";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BoutonARetraiterSaga } from "../actions/BoutonARetraiterSaga";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { BoutonModifierTraitement } from "../contenu/BoutonModifierTraitement";
import { BoutonValiderTerminer } from "../contenu/BoutonValiderTerminer";
import {
  DocumentsReponses,
  InfoDocumentAffiche
} from "../contenu/document/DocumentsReponses";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
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

  const actionApresSignature = useCallback(
    (allsigned: boolean) => {
      if (allsigned === true) {
        receUrl.goBack(history);
      }
    },
    [history]
  );

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
              <SuiviObservationsRequete observations={requete.observations} />
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
              <BoutonRetour message={getLibelle("<< Retour")} />
              <div className="BoutonsAction">
                {!MigratorV1V2.estASigner(requete) &&
                  !MigratorV1V2.estARetraiterSaga(requete) && (
                    <>
                      <BoutonModifierTraitement
                        requete={requete}
                        dataHistory={dataHistory}
                      />
                      <BoutonValiderTerminer requete={requete} />
                    </>
                  )}

                {RequeteDelivrance.estASigner(requete) && (
                  <BoutonSignature
                    libelle={"pages.delivrance.apercu.signatureElectronique"}
                    requetes={[
                      mappingRequeteDelivranceToRequeteTableau(requete)
                    ]}
                    reloadData={actionApresSignature}
                    uniqueSignature={true}
                    connectedUser={storeRece.utilisateurCourant}
                  />
                )}

                {MigratorV1V2.estARetraiterSaga(requete) && (
                  <BoutonARetraiterSaga idRequete={idRequete} />
                )}
              </div>
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
