import { StatutFiche } from "@model/etatcivil/fiche/StatutFiche";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";
import { TableauStatut } from "./TableauStatut";

export function getStatuts(statutsFiche: StatutFiche[]): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: [getTableauStatuts(statutsFiche)]
      }
    }
  ];
}

function getTableauStatuts(statutsFiche: StatutFiche[]): SectionContentProps {
  return {
    value: <TableauStatut statutsFiche={statutsFiche}></TableauStatut>
  };
}
