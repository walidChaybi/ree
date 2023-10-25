import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  OngletProps,
  VoletAvecOnglet
} from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
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

  return (
    <div className="side Visualisation">
      <VoletAvecOnglet liste={liste} ongletParDefault={ongletSelectionne} />
    </div>
  );
};
