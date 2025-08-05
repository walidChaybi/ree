import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SectionPanel } from "@widget/section/SectionPanel";
import React from "react";
import { useTitreDeLaFenetre } from "../../../../hooks/utilitaires/TitreDeLaFenetreHook";
import { getPanelsDetailRequete } from "./DetailRequeteUtils";
import "./scss/DetailRequetePage.scss";

interface IDetailRequetePageProps {
  requete: IRequeteDelivrance;
}

const DetailRequetePage: React.FC<IDetailRequetePageProps> = ({ requete }) => {
  const panels = getPanelsDetailRequete(requete);

  useTitreDeLaFenetre("Détails requête");

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

export default DetailRequetePage;
