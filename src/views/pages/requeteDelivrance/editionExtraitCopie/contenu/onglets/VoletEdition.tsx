import React, { useCallback, useContext, useEffect, useState } from "react";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { Validation } from "../../../../../../model/requete/enum/Validation";
import { IDocumentReponse } from "../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { EditionECContext } from "../../EditionExtraitCopiePage";
import { checkDirty, getOngletsEdition } from "../../EditionExtraitCopieUtils";
import { OngletProps, VoletAvecOnglet } from "../VoletAvecOnglet";

interface VoletEditionProps {
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
  acte: IFicheActe;
  sauvegarderDocument: (document: IDocumentReponse) => void;
}

export const VoletEdition: React.FC<VoletEditionProps> = props => {
  const { isDirty, setIsDirty } = useContext(EditionECContext);

  const afficherDocument = useCallback(
    (idDocument: string) => {
      const futureDoc = { ...props.document };
      futureDoc.id = idDocument;
      futureDoc.validation = Validation.O;
      props.sauvegarderDocument(futureDoc);
      setIsDirty(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.document, setIsDirty]
  );

  const [{ liste, ongletSelectionne }, setOnglets] = useState<OngletProps>(
    getOngletsEdition(
      afficherDocument,
      props.requete,
      props.document,
      props.acte
    )
  );

  useEffect(() => {
    setOnglets(
      getOngletsEdition(
        afficherDocument,
        props.requete,
        props.document,
        props.acte
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [afficherDocument, props.document]);

  const handleChange = useCallback(
    (event: any, newValue: string) => {
      if (isDirty !== undefined && setIsDirty) {
        if (checkDirty(isDirty, setIsDirty)) {
          setOnglets({
            liste,
            ongletSelectionne: parseInt(newValue)
          });
        }
      } else {
        setOnglets({
          liste,
          ongletSelectionne: parseInt(newValue)
        });
      }
    },
    [isDirty, liste, setIsDirty]
  );

  return (
    <div className="side Edition">
      <VoletAvecOnglet
        liste={liste}
        ongletSelectionne={ongletSelectionne}
        handleChange={handleChange}
      />
    </div>
  );
};
