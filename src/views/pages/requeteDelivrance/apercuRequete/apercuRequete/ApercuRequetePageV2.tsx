import React, { useCallback, useState } from "react";
import { IDocumentReponse } from "../../../../../model/requete/v2/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { MigratorV1V2 } from "../../../../common/util/migration/MigratorV1V2";
import { VisionneuseDocument } from "../../../../common/widget/document/VisionneuseDocument";
import { getLibelle } from "../../../../common/widget/Text";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { BoutonPrendreEnCharge } from "./contenu/BoutonPrendreEnCharge";

export const ApercuRequetePageV2: React.FC = () => {
  const [documentAffiche, setDocumentAffiche] = useState<IDocumentReponse>();

  const [requete, setRequete] = useState<IRequeteDelivrance>();

  const setRequeteCallback = useCallback(
    (req: IRequeteDelivrance) => {
      setRequete(req);
    },
    [setRequete]
  );

  const setDocumentAfficheCallback = useCallback(
    (docReponse: IDocumentReponse) => {
      setDocumentAffiche(docReponse);
    },
    [setDocumentAffiche]
  );

  return (
    <ApercuRequeteTemplate
      title={getLibelle("Aperçu de la requête")}
      setRequeteCallback={setRequeteCallback}
      setDocumentAfficheCallback={setDocumentAfficheCallback}
    >
      {requete && (
        <>
          <VisionneuseDocument
            titre={getLibelle("Aperçu des documents")}
            contenu={documentAffiche?.contenu}
            typeMime={documentAffiche?.mimeType}
          />
          {!MigratorV1V2.estRDDouRDC(requete) && (
            <BoutonPrendreEnCharge requete={requete}></BoutonPrendreEnCharge>
          )}
        </>
      )}
    </ApercuRequeteTemplate>
  );
};
