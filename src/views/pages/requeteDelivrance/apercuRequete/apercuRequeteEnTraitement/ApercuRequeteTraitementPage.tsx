import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { MigratorV1V2 } from "../../../../common/util/migration/MigratorV1V2";
import { getLibelle } from "../../../../common/util/Utils";
import { VisionneuseAvecTitre } from "../../../../common/widget/document/VisionneuseAvecTitre";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
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
          ></VisionneuseAvecTitre>
          <BoutonRetour />
          <div className="BoutonsAction">
            {MigratorV1V2.nEstPasRDDouRDCouEstEtape2Bis(requete) && (
              <BoutonModifierTraitement requete={requete} />
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

/*const afficherBoutonsActions = (
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
};*/
