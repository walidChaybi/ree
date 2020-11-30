import React from "react";

import "./sass/ResumeRequete.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Text } from "../../../common/widget/Text";
import { ResumeRequeteContent } from "./ResumeRequeteContent";
import { IDataTable } from "../../requetes/MesRequetesDelivrancePage";

interface ResumeRequeteProps {
  requete: IDataTable;
}

export const ResumeRequete: React.FC<ResumeRequeteProps> = ({ requete }) => {
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const handleChange = () => (event: any) => {
    setExpanded(!expanded);
  };

  return (
    <div className="resume-requete">
      <Accordion expanded={expanded} onChange={handleChange()}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="title">
          <Text messageId={"pages.delivrance.apercu.resume.titre"} />
          <div className="identifiantRequete">{requete.idSagaDila}</div>
        </AccordionSummary>
        <AccordionDetails>
          <ResumeRequeteContent requete={requete} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
