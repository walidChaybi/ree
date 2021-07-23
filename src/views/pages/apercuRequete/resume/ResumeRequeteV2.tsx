import React from "react";
import { useHistory } from "react-router-dom";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { getUrlWithoutIdParam } from "../../../common/util/route/routeUtil";
import { SectionPanel } from "../../../common/widget/section/SectionPanel";
import { ListePiecesJustificatives } from "./contenu/piecesJustificatives/ListePiecesJustificatives";
import { getPanelsResumeRequete } from "./ResumeRequeteUtils";

export const titreDetail = "Détails de requête";

interface ResumeRequeteV2Props {
  requete: TRequete;
}

export const ResumeRequeteV2: React.FC<ResumeRequeteV2Props> = props => {
  const panels = getPanelsResumeRequete(props.requete);
  const history = useHistory();

  const onClickNumero = () => {
    const newUrl = `${getUrlWithoutIdParam(
      history.location.pathname
    )}/detailrequete/${props.requete.id}`;
    history.push(newUrl);
  };

  return (
    <div className="ResumeRequeteV2 Fieldset">
      <div className="ResumeRequeteTitle">
        <span>
          Résumé de la requête{" "}
          <span className="LinkNumeroRequete" onClick={onClickNumero}>
            {props.requete.numero}
          </span>
        </span>
      </div>
      {panels.length > 1 && (
        <>
          <SectionPanel {...panels[0]} />
          <SectionPanel {...panels[1]} />
          <SectionPanel {...panels[2]} />
          <hr className={"SectionPanelAreaSeparation"} />
          <SectionPanel {...panels[3]} />
          <hr className={"SectionPanelAreaSeparation"} />
          <ListePiecesJustificatives
            pieces={props.requete.piecesJustificatives}
            numRequete={props.requete.numero}
          />
        </>
      )}
    </div>
  );
};
