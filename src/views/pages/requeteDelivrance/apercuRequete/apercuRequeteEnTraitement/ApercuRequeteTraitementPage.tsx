import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { VisionneuseAvecTitre } from "@widget/visionneuseDocument/VisionneuseAvecTitre";
import React, { useCallback, useState } from "react";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { BoutonARetraiterSaga } from "./contenu/BoutonARetraiterSaga";
import { BoutonModifierTraitement } from "./contenu/BoutonModifierTraitement";
import { BoutonsTerminerOuRelecture } from "./contenu/BoutonsTerminerOuRelecture";
import "./scss/ApercuRequeteTraitementPage.scss";

export const ApercuRequeteTraitementPage: React.FC = () => {
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
      title={"Aperçu de la requête en traitement"}
      setRequete={setRequeteCallback}
      setDocumentAfficheCallback={setDocumentAfficheCallback}
    >
      {requete && (
        <div className="ApercuRequeteTraitement">
          {documentAffiche && (
            <VisionneuseAvecTitre
              titre="Aperçu des documents"
              contenuBase64={documentAffiche.contenu}
              typeMime={documentAffiche.mimeType}
            />
          )}
          <BoutonRetour />
          <BoutonsTerminerOuRelecture requete={requete} />
          <div className="BoutonsAction">
            {gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS) &&
              SousTypeDelivrance.estRDCSDouRDCSC(requete?.sousType) &&
              requete.statutCourant.statut !== StatutRequete.TRANSMISE_A_VALIDEUR && <BoutonModifierTraitement requete={requete} />}

            {GestionnaireARetraiterDansSaga.estARetraiterSaga(requete) && !GestionnaireARetraiterDansSaga.possedeDocumentSigne(requete) && (
              <BoutonARetraiterSaga idRequete={requete.id} />
            )}
          </div>
        </div>
      )}
    </ApercuRequeteTemplate>
  );
};
