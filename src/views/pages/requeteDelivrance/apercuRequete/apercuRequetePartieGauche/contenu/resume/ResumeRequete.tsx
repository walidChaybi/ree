import React, { useState } from "react";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { FenetreExterne } from "../../../../../../common/util/FenetreExterne";
import { SectionPanel } from "../../../../../../common/widget/section/SectionPanel";
import { DetailRequetePage } from "../../../../detailRequete/DetailRequetePage";
import { ListePiecesJustificatives } from "./contenu/piecesJustificatives/ListePiecesJustificatives";
import { getPanelsResumeRequete } from "./ResumeRequeteUtils";

export const titreDetail = "Détails de requête";

interface ResumeRequeteProps {
  requete: IRequeteDelivrance;
}

const ZERO = 0;
const UN = 1;
const DEUX = 2;
const TROIS = 3;
const width = 1100;
const height = 600;

export const ResumeRequete: React.FC<ResumeRequeteProps> = props => {
  const [fenetreExterne, setFenetreExterne] = useState<boolean>(false);
  const panels = getPanelsResumeRequete(props.requete);

  const onClickNumero = () => {
    setFenetreExterne(true);
  };

  const onClose = () => {
    setFenetreExterne(false);
  };

  return (
    <>
      <div className="ResumeRequete Fieldset">
        <div className="ResumeRequeteTitle">
          <span>
            {`Résumé requête `}
            <span className="LinkNumeroRequete" onClick={onClickNumero}>
              {props.requete.numero}
            </span>
          </span>
        </div>
        {panels.length > 1 && (
          <div className="PanelsResumeRequete">
            <SectionPanel {...panels[ZERO]} />
            <SectionPanel {...panels[UN]} />
            <SectionPanel {...panels[DEUX]} />
            <hr className={"SectionPanelAreaSeparation"} />
            <SectionPanel {...panels[TROIS]} />
            <hr className={"SectionPanelAreaSeparation"} />
            <ListePiecesJustificatives
              pieces={props.requete.piecesJustificatives}
              numRequete={props.requete.numero}
            />
          </div>
        )}
      </div>
      {fenetreExterne && (
        <FenetreExterne
          titre={`Détails requête : N°${props.requete.numero}`}
          onCloseHandler={onClose}
          height={height}
          width={width}
        >
          <DetailRequetePage idRequeteAAfficher={props.requete.id} />
        </FenetreExterne>
      )}
    </>
  );
};
