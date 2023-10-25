import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  OngletProps,
  VoletAvecOnglet
} from "@widget/voletAvecOnglet/VoletAvecOnglet";
import React, { useEffect, useState } from "react";
import { getOngletsEdition } from "../../EditionExtraitCopieUtils";

interface VoletEditionProps {
  requete: IRequeteDelivrance;
  document: IDocumentReponse;
  acte?: IFicheActe;
}

export const VoletEdition: React.FC<VoletEditionProps> = props => {
  const [{ liste, ongletSelectionne }, setOnglets] = useState<OngletProps>(
    getOngletsEdition(props.requete, props.document, props.acte)
  );

  useEffect(() => {
    setOnglets(getOngletsEdition(props.requete, props.document, props.acte));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.document, props.acte]);

  return (
    <div className="side Edition">
      <VoletAvecOnglet
        liste={liste}
        ongletParDefault={ongletSelectionne}
        checkDirty
      />
    </div>
  );
};
