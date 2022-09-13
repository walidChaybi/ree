import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { getLibelle } from "@util/Utils";
import { VisionneuseAvecTitre } from "@widget/document/VisionneuseAvecTitre";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
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
            {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS) &&
              SousTypeDelivrance.estRDCSDouRDCSC(requete?.sousType) && (
                <BoutonModifierTraitement requete={requete} />
              )}

            <BoutonsTerminer requete={requete} />

            {GestionnaireARetraiterDansSaga.estARetraiterSaga(requete) &&
              !GestionnaireARetraiterDansSaga.possedeDocumentSigne(requete) && (
                <BoutonARetraiterSaga idRequete={requete.id} />
              )}
          </div>
        </div>
      )}
    </ApercuRequeteTemplate>
  );
};
