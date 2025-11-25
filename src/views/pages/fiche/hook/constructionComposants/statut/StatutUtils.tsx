import { StatutFiche } from "@model/etatcivil/fiche/StatutFiche";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";
import { TableauStatut } from "./TableauStatut";

export const getStatuts = (statutsFiche: StatutFiche[]): SectionPartProps[] => {
  return [
    {
      partContent: {
        contents: [getTableauStatuts(statutsFiche)]
      }
    }
  ];
};

const getTableauStatuts = (statutsFiche: StatutFiche[]): SectionContentProps => {
  return {
    value: <TableauStatut statutsFiche={statutsFiche}></TableauStatut>
  };
};
