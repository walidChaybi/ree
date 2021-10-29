import React from "react";
import { useParams } from "react-router-dom";
import { IUuidRequeteParams } from "../../../model/requete/v2/IUuidRequeteParams";
import { Fieldset } from "../../common/widget/fieldset/Fieldset";
import { SectionPanel } from "../../common/widget/section/SectionPanel";
import { getLibelle } from "../../common/widget/Text";
import { useDetailRequeteApiHook } from "./hook/DetailRequeteHook";
import { getPanelsDetailRequete } from "./hook/DetailRequeteUtils";
import "./scss/DetailRequetePage.scss";

export const titreDetail = "Détails de requête";

export const DetailRequetePage: React.FC = () => {
  const { idRequete } = useParams<IUuidRequeteParams>();

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
