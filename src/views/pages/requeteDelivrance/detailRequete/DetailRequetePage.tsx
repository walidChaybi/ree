import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { IUuidRequeteParams } from "../../../../model/requete/IUuidRequeteParams";
import { getLibelle } from "../../../common/util/Utils";
import { SectionPanel } from "../../../common/widget/section/SectionPanel";
import { useDetailRequeteApiHook } from "./hook/DetailRequeteHook";
import { getPanelsDetailRequete } from "./hook/DetailRequeteUtils";
import "./scss/DetailRequetePage.scss";

export const titreDetail = "Détails requête";

export const DetailRequetePage: React.FC = () => {
  const { idRequete } = useParams<IUuidRequeteParams>();
  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);
  const [requete, setRequete] = useState<IRequeteDelivrance>();

  useEffect(() => {
    if (detailRequeteState) {
      setRequete(detailRequeteState as IRequeteDelivrance);
    }
  }, [detailRequeteState]);

  const panels = getPanelsDetailRequete(requete);

  return (
    <div className="DetailRequetePage">
      <title>{getLibelle(titreDetail)}</title>

      {panels.length > 1 && (
        <div className="PanelsDetailRequete">
          <SectionPanel {...panels[0]} />
          <SectionPanel {...panels[1]} />
        </div>
      )}
    </div>
  );
};
