import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { IDocumentReponse } from "../../../../../model/requete/v2/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../../model/requete/v2/IRequeteDelivrance";
import { MigratorV1V2 } from "../../../../common/util/migration/MigratorV1V2";
import { storeRece } from "../../../../common/util/storeRece";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
import { BoutonSignature } from "../../../../common/widget/signature/BoutonSignature";
import { getLibelle } from "../../../../common/widget/Text";
import { receUrl } from "../../../../router/ReceUrls";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { BoutonARetraiterSaga } from "../contenuV1V2/BoutonARetraiterSaga";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import { BoutonModifierTraitement } from "./contenu/BoutonModifierTraitement";
import { BoutonValiderTerminer } from "./contenu/BoutonValiderTerminer";
import { VisionneuseApercuTraitement } from "./contenu/VisionneuseApercuTraitement";
import "./scss/ApercuRequeteTraitementPage.scss";

export const ApercuRequeteTraitementPage: React.FC = () => {
  const history = useHistory();
  const [dataHistory] = useState<any>(history.location.state);

  const [documentAffiche, setDocumentAffiche] = useState<IDocumentReponse>();

  const [requete, setRequete] = useState<IRequeteDelivrance>();

  const setRequeteCallback = useCallback(
    (req: IRequeteDelivrance) => {
      setRequete(req);
    },
    [setRequete]
  );

  const setDocumentAfficheCallback = useCallback(
    (infoDoc: IDocumentReponse) => {
      setDocumentAffiche(infoDoc);
    },
    [setDocumentAffiche]
  );

  const actionApresSignature = useCallback(
    (allsigned: boolean) => {
      if (allsigned === true) {
        receUrl.goBack(history);
      }
    },
    [history]
  );

  return (
    <ApercuRequeteTemplate
      title={getLibelle("Aperçu de la requête en traitement")}
      setRequeteCallback={setRequeteCallback}
      setDocumentAfficheCallback={setDocumentAfficheCallback}
    >
      {requete && (
        <div className="ApercuRequeteTraitement">
          {dataHistory && dataHistory.info && (
            <div className="MessageInfo">{dataHistory.info}</div>
          )}
          <VisionneuseApercuTraitement
            requete={requete}
            contenu={documentAffiche?.contenu}
            typeMime={documentAffiche?.mimeType}
          />
          <BoutonRetour message={getLibelle("<< Retour")} />
          <div className="BoutonsAction">
              {!MigratorV1V2.estRDDouRDC(requete) && (
                <>
                  <BoutonModifierTraitement
                    requete={requete}
                    dataHistory={dataHistory}
                  />
                  <BoutonValiderTerminer requete={requete} />
                </>
              )}

            {RequeteDelivrance.estAuStatutASigner(requete) && (
              <BoutonSignature
                libelle={"pages.delivrance.apercu.signatureElectronique"}
                requetes={[mappingRequeteDelivranceToRequeteTableau(requete)]}
                reloadData={actionApresSignature}
                uniqueSignature={true}
                connectedUser={storeRece.utilisateurCourant}
              />
            )}

            {MigratorV1V2.estARetraiterSaga(requete) &&
              !MigratorV1V2.possedeDocumentSigne(requete) && (
                <BoutonARetraiterSaga idRequete={requete.id} />
              )}
          </div>
        </div>
      )}
    </ApercuRequeteTemplate>
  );
};
