import React from "react";
import { IFicheRcRca } from "../../../../../../model/etatcivil/fiche/IFicheRcRca";
import { IStatutFiche } from "../../../../../../model/etatcivil/fiche/IStatutFiche";
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";
import { TableauStatut } from "./TableauStatut";

export function getStatuts(rcrca: IFicheRcRca): SectionPartProps[] {
  const statuts: SectionPartProps[] = [
    {
      contentsPart: {
        contents: [getTableauStatuts(rcrca.statutsFiche)]
      }
    }
  ];

  return statuts;
}

function getTableauStatuts(statutsFiche: IStatutFiche[]): SectionContentProps {
  return {
    value: <TableauStatut statutsFiche={statutsFiche}></TableauStatut>
  };
}
