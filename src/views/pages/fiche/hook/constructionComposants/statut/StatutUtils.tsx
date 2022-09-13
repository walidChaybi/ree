import { IStatutFiche } from "@model/etatcivil/fiche/IStatutFiche";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPartProps } from "@widget/section/SectionPart";
import React from "react";
import { TableauStatut } from "./TableauStatut";

export function getStatuts(statutsFiche: IStatutFiche[]): SectionPartProps[] {
  return [
    {
      partContent: {
        contents: [getTableauStatuts(statutsFiche)]
      }
    }
  ];
}

function getTableauStatuts(statutsFiche: IStatutFiche[]): SectionContentProps {
  return {
    value: <TableauStatut statutsFiche={statutsFiche}></TableauStatut>
  };
}
