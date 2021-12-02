import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import { IDataTable } from "../../../../../../model/requete/IDataTable";
import { Text } from "../../../../../common/widget/Text";
import { ResumeRequeteContent } from "./ResumeRequeteContent";
import "./scss/ResumeRequete.scss";

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
