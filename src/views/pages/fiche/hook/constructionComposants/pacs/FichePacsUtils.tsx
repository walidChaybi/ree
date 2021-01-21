import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { getInscriptionRegistrePacs } from "./InscriptionRegistrePacsUtils";
import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { IPartenaire } from "../../../../../../model/etatcivil/pacs/IPartenaire";
import { AccordionPanelProps } from "../../../../../common/widget/accordion/AccordionPanel";
import { AccordionPanelAreaProps } from "../../../../../common/widget/accordion/AccordionPanelArea";

export function getPanelsPacs(pacs: IFichePacs): AccordionReceProps {
  const panelAreas: AccordionPanelAreaProps[] = [
    { parts: [getInscriptionRegistrePacs(pacs)] },
    { parts: getPartenaires(pacs.partenaires) },
    { parts: getEnregistrementPacs(pacs) }
  ];

  AjoutePanelOptionel(panelAreas, pacs.modifications, getModificationPacs);
  AjoutePanelOptionel(panelAreas, pacs.dissolution, getDissolutionPacs);
  AjoutePanelOptionel(panelAreas, pacs.annulation, getAnnulationPacs);

  return {
    panels: [
      {
        panelAreas,
        title: "Vue du PACS"
      }
    ]
  };
}

function AjoutePanelOptionel(
  panelAreas: AccordionPanelAreaProps[],
  param: any,
  fct: (p: any) => AccordionPartProps[]
) {
  if (!param) {
    return;
  }
  panelAreas.push({ parts: fct(param) });
}

function getPartenaires(partenaires: IPartenaire[]): AccordionPartProps[] {
  return {
    contents: [],
    title: "Parteniares"
  };
}

function getEnregistrementPacs(pacs: IFichePacs): AccordionPartProps[] {
  return {
    contents: [],
    title: "Enregistrement du PACS"
  };
}

function getModificationPacs(pacs: IFichePacs): AccordionPartProps[] {
  return {
    contents: [],
    title: "Modification du PACS"
  };
}

function getDissolutionPacs(pacs: IFichePacs): AccordionPartProps[] {
  return {
    contents: [],
    title: "Dissolution du PACS"
  };
}

function getAnnulationPacs(pacs: IAnnulation): AccordionPartProps {
  return {
    contents: [],
    title: "Annulation du PACS"
  };
}
