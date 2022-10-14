import { RECEContext } from "@core/body/RECEContext";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { checkDirty } from "@util/Utils";
import {
  OngletProps,
  VoletAvecOnglet
} from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { getOngletsEdition } from "../../EditionExtraitCopieUtils";

interface VoletEditionProps {
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
  acte?: IFicheActe;
  handleDocumentEnregistre: () => void;
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
