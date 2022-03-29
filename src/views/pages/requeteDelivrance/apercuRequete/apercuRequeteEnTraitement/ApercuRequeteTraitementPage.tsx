import { Warning } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import {
  DocumentReponse,
  IDocumentReponse
} from "../../../../../model/requete/IDocumentReponse";
import {
  IRequeteDelivrance
} from "../../../../../model/requete/IRequeteDelivrance";
import { FeatureFlag } from "../../../../common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../../common/util/featureFlag/gestionnaireFeatureFlag";
import { MigratorV1V2 } from "../../../../common/util/migration/MigratorV1V2";
import {
  getUrlPrecedente,
  getUrlWithoutIdParam
} from "../../../../common/util/route/routeUtil";
import { getLibelle } from "../../../../common/util/Utils";
import { BoutonOperationEnCours } from "../../../../common/widget/attente/BoutonOperationEnCours";
import { VisionneuseAvecTitre } from "../../../../common/widget/document/VisionneuseAvecTitre";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
import {
  PATH_APERCU_COURRIER,
  PATH_EDITION,
  receUrl
} from "../../../../router/ReceUrls";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { BoutonARetraiterSaga } from "./contenu/BoutonARetraiterSaga";
import { BoutonModifierTraitement } from "./contenu/BoutonModifierTraitement";
import { BoutonsTerminer } from "./contenu/BoutonsTerminer";
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
              <BoutonModifierTraitement
                requete={requete}
                dataHistory={dataHistory}
              />
            )}

            <BoutonsTerminer requete={requete} />

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
                {!DocumentReponse.verifierDocumentsValides(
                  requete.documentsReponses
                ) && (
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

const boutonPresent = (sousType: SousTypeDelivrance) => {
  return (
    gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS) &&
    (sousType === SousTypeDelivrance.RDC ||
      sousType === SousTypeDelivrance.RDD ||
      sousType === SousTypeDelivrance.RDDP)
  );
};
