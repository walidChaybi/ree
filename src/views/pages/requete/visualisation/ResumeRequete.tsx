import React from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureRegion
} from "reakit/Disclosure";

import "./sass/ResumeRequete.scss";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Text } from "../../../common/widget/Text";
import { ResumeRequeteContent } from "./ResumeRequeteContent";
import { IDataTable } from "../MesRequetesPage";

interface ResumeRequeteProps {
  requete: IDataTable;
}

export const ResumeRequete: React.FC<ResumeRequeteProps> = ({ requete }) => {
  const disclosure = useDisclosureState({ visible: true });

  return (
    <div className="resume-requete">
      <Disclosure {...disclosure} as={ExpansionPanel}>
        <ExpansionPanelSummary
          className="title"
          expandIcon={<ExpandMoreIcon />}
        >
          <Text messageId={"pages.delivrance.apercu.resume.titre"} />
          <div className="identifiantRequete">{requete.idSagaDila}</div>
        </ExpansionPanelSummary>
      </Disclosure>

      <DisclosureRegion {...disclosure} as={ExpansionPanelDetails}>
        {props =>
          disclosure.visible && <ResumeRequeteContent requete={requete} />
        }
      </DisclosureRegion>
    </div>
  );
};
