import React, { useCallback, useContext, useEffect, useState } from "react";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { IDocumentReponse } from "../../../../../../model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { checkDirty } from "../../../../../common/util/Utils";
import {
  OngletProps,
  VoletAvecOnglet
} from "../../../../../common/widget/voletAvecOnglet/VoletAvecOnglet";
import { RECEContext } from "../../../../../core/body/Body";
import { getOngletsEdition } from "../../EditionExtraitCopieUtils";
import { DocumentEC } from "../../enum/DocumentEC";

interface VoletEditionProps {
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
  acte?: IFicheActe;
  handleDocumentEnregistre: (index: DocumentEC) => void;
}

export const VoletEdition: React.FC<VoletEditionProps> = props => {
  const { isDirty, setIsDirty } = useContext(RECEContext);

  const [{ liste, ongletSelectionne }, setOnglets] = useState<OngletProps>(
    getOngletsEdition(
      props.handleDocumentEnregistre,
      props.requete,
      props.document,
      props.acte
    )
  );

  useEffect(() => {
    setOnglets(
      getOngletsEdition(
        props.handleDocumentEnregistre,
        props.requete,
        props.document,
        props.acte
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.document, props.acte]);

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
