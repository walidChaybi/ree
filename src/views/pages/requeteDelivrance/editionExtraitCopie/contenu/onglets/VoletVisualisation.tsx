import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  OngletProps,
  VoletAvecOnglet
} from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useCallback, useEffect, useState } from "react";
import { getOngletsVisu } from "../../EditionExtraitCopieUtils";

interface VoletVisualisationProps {
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
  acte?: IFicheActe;
}

export const VoletVisualisation: React.FC<VoletVisualisationProps> = props => {
  const [{ ongletSelectionne, liste }, setOnglet] = useState<OngletProps>(
    getOngletsVisu(props.requete, props.document, props.acte)
  );

  useEffect(() => {
    setOnglet(getOngletsVisu(props.requete, props.document, props.acte));
  }, [props]);

  const handleChange = useCallback(
    (event: any, newValue: string) => {
      setOnglet({
        liste,
        ongletSelectionne: parseInt(newValue)
      });
    },

    [liste]
  );

  return (
    <div className="side Visualisation">
      <VoletAvecOnglet
        liste={liste}
        ongletSelectionne={ongletSelectionne}
        handleChange={handleChange}
      />
    </div>
  );
};
