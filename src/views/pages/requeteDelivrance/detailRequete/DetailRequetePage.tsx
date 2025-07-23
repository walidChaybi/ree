import { IDetailRequeteParams, useDetailRequeteApiHook } from "@hook/requete/DetailRequeteHook";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SectionPanel } from "@widget/section/SectionPanel";
import React, { useEffect, useState } from "react";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import { getPanelsDetailRequete } from "./DetailRequeteUtils";
import "./scss/DetailRequetePage.scss";

const titreDetail = "Détails requête";
interface DetailRequetePageProps {
  idRequeteAAfficher?: string;
}

export const DetailRequetePage: React.FC<DetailRequetePageProps> = props => {
  const [idRequete, setIdRequete] = useState<string>();
  const [requete, setRequete] = useState<IRequeteDelivrance>();
  const [detailRequeteParams, setDetailRequeteParams] = useState<IDetailRequeteParams>({});
  const { detailRequeteState } = useDetailRequeteApiHook(detailRequeteParams);

  useEffect(() => {
    setDetailRequeteParams({
      idRequete,
      estConsultation: false
    });
  }, [idRequete]);

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

  useTitreDeLaFenetre(titreDetail);

  return (
    <div className="DetailRequetePage">
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
