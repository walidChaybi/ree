import React, { useCallback, useState } from "react";
import { IDocumentReponse } from "../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { MigratorV1V2 } from "../../../../common/util/migration/MigratorV1V2";
import { getLibelle } from "../../../../common/util/Utils";
import { VisionneuseDocument } from "../../../../common/widget/document/VisionneuseDocument";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { BoutonPrendreEnCharge } from "./contenu/BoutonPrendreEnCharge";

export const ApercuRequetePage: React.FC = () => {
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
          <BoutonRetour />
          {!MigratorV1V2.estRDDouRDC(requete) && (
            <BoutonPrendreEnCharge requete={requete}></BoutonPrendreEnCharge>
          )}
        </>
      )}
    </ApercuRequeteTemplate>
  );
};
