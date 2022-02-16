import { Warning } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../../model/requete/IRequeteDelivrance";
import { MigratorV1V2 } from "../../../../common/util/migration/MigratorV1V2";
import {
  getUrlPrecedente,
  getUrlWithoutIdParam
} from "../../../../common/util/route/routeUtil";
import { storeRece } from "../../../../common/util/storeRece";
import { getLibelle } from "../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../common/widget/attente/BoutonOperationEnCours";
import { VisionneuseAvecTitre } from "../../../../common/widget/document/VisionneuseAvecTitre";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
import { BoutonSignature } from "../../../../common/widget/signature/BoutonSignature";
import {
  PATH_APERCU_COURRIER,
  PATH_EDITION,
  receUrl
} from "../../../../router/ReceUrls";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import { BoutonARetraiterSaga } from "./contenu/BoutonARetraiterSaga";
import { BoutonModifierTraitement } from "./contenu/BoutonModifierTraitement";
import { BoutonValiderTerminer } from "./contenu/BoutonValiderTerminer";
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

  const modifierCourrier = () => {
    receUrl.replaceUrl(
      history,
      `${getUrlPrecedente(history.location.pathname)}/${PATH_APERCU_COURRIER}/${
        requete?.id
      }`,
      documentAffiche?.idActe
    );
  };

  const edition = () => {
    history.push(
      `${getUrlWithoutIdParam(history.location.pathname)}/${PATH_EDITION}/${
        requete?.id
      }`,
      documentAffiche?.id
    );
  };

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
          <VisionneuseAvecTitre
            titre="Aperçu des documents"
            contenu={documentAffiche?.contenu}
            typeMime={documentAffiche?.mimeType}
          >
            {afficherBoutonsActions(requete, modifierCourrier, edition)}
          </VisionneuseAvecTitre>
          <BoutonRetour />
          <div className="BoutonsAction">
            {MigratorV1V2.nEstPasRDDouRDCouEstEtape2Bis(requete) && (
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
                libelle={getLibelle("Signer et terminer")}
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

const afficherBoutonsActions = (
  requete: IRequeteDelivrance,
  modifierCourrier: () => void,
  edition: () => void
) => {
  return (
    <>
      {boutonPresent(requete.sousType) && (
        <div className="BarreBoutons">
          <BoutonOperationEnCours onClick={modifierCourrier}>
            {getLibelle("Modifier le courrier")}
          </BoutonOperationEnCours>
          {requete.choixDelivrance &&
            ChoixDelivrance.estReponseAvecDelivrance(
              requete.choixDelivrance
            ) && (
              <>
                <BoutonOperationEnCours onClick={edition}>
                  {getLibelle("Valider le document à traiter")}
                </BoutonOperationEnCours>
                {!documentsSontValides(requete) && (
                  <span
                    className="Warning"
                    title="Le ou les documents à délivrer ne sont pas validés. Cliquez sur le bouton pour les valider"
                  >
                    <Warning />
                  </span>
                )}
              </>
            )}
        </div>
      )}
    </>
  );
};

const documentsSontValides = (requete: IRequeteDelivrance) => {
  return requete.documentsReponses.some(
    el => el.validation === Validation.E || el.validation === Validation.N
  );
};

const boutonPresent = (sousType: SousTypeDelivrance) => {
  return (
    sousType === SousTypeDelivrance.RDC ||
    sousType === SousTypeDelivrance.RDD ||
    sousType === SousTypeDelivrance.RDDP
  );
};
