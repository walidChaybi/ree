import React from "react";
import { useDetailRequeteApiHook } from "./hook/DetailRequeteHook";
import { getPanelsDetailRequete } from "./hook/DetailRequeteUtils";

import { useParams } from "react-router-dom";
import { getLibelle } from "../../common/widget/Text";
import { Fieldset } from "../../common/widget/fieldset/Fieldset";
import { SectionPanel } from "../../common/widget/section/SectionPanel";
import "./scss/DetailRequetePage.scss";

export const titreDetail = "Détails de requête";

interface IdRequeteParams {
  idRequete: string;
}

export const DetailRequetePage: React.FC = () => {
  const { idRequete } = useParams<IdRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const panels = getPanelsDetailRequete(detailRequeteState);

  return (
    <div className="DetailRequetePage">
      <title>{getLibelle(titreDetail)}</title>

      {panels.length > 1 && (
        <Fieldset titre={getLibelle(titreDetail)}>
          <div className="PanelsDetailRequete">
            <SectionPanel {...panels[0]} />
            <SectionPanel {...panels[1]} />
          </div>
        </Fieldset>
      )}
    </div>
  );
};
