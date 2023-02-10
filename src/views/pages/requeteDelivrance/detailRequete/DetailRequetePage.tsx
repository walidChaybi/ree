import { useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { getLibelle } from "@util/Utils";
import { SectionPanel } from "@widget/section/SectionPanel";
import React, { useEffect, useState } from "react";
import { getPanelsDetailRequete } from "./DetailRequeteUtils";
import "./scss/DetailRequetePage.scss";

export const titreDetail = "Détails requête";
interface DetailRequetePageProps {
  requete?: IRequeteDelivrance;
  idRequeteAAfficher?: string;
}

export const DetailRequetePage: React.FC<DetailRequetePageProps> = props => {
  const [idRequete, setIdRequete] = useState<string>();
  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);
  const [requete, setRequete] = useState<IRequeteDelivrance>();

  useEffect(() => {
    if (props.idRequeteAAfficher) {
      setIdRequete(props.idRequeteAAfficher);
    }
  }, [props.idRequeteAAfficher]);

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
          <SectionPanel
            title="Détail requête"
            panelAreas={[...panels[1].panelAreas, ...panels[0].panelAreas]}
          />
        </div>
      )}
    </div>
  );
};
