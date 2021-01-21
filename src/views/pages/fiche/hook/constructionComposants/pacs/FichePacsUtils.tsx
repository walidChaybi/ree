import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { AccordionPanelAreaProps } from "../../../../../common/widget/accordion/AccordionPanelArea";
import { IAnnulation } from "../../../../../../model/etatcivil/pacs/IAnnulation";
import { getPartenaires } from "./PartenairesUtils";
import { TypeAutoriteUtil } from "../../../../../../model/etatcivil/TypeAutorite";
import { StatutPacesUtil } from "../../../../../../model/etatcivil/enum/StatutPacs";
import { getFormatDateFromTimestamp } from "../../../../../common/util/DateUtils";

export function getPanelsPacs(pacs: IFichePacs): AccordionReceProps {
  const panelAreas: AccordionPanelAreaProps[] = [
    { parts: getInscriptionRegistrePacs(pacs) },
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
  if (param) {
    panelAreas.push({ parts: fct(param) });
  }
}

function getInscriptionRegistrePacs(pacs: IFichePacs): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "Inscription des registre des PACS des étrangers nés à l'étranger",
    contents: [
      {
        libelle: "Statut du PACS",
        value: StatutPacesUtil.getLibelle(pacs.statut)
      },
      {
        libelle: "Date d'enregistrement par l'autorité",
        value: getFormatDateFromTimestamp(pacs.dateEnregistrementParAutorite)
      },

      {
        libelle: "Date d'inscription au registre",
        value: getFormatDateFromTimestamp(pacs.dateInscription)
      }
    ]
  };

  return [part];
}

function getEnregistrementPacs(pacs: IFichePacs): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "TODO",
    contents: [
      {
        libelle: "Autorité",
        value: TypeAutoriteUtil.getLibelle(pacs.autorite.type)
      },
      {
        libelle: "TODO",
        value: "TODO"
      }
    ]
  };

  return [part];
}

function getModificationPacs(pacs: IFichePacs): AccordionPartProps[] {
  //TODO plusieurs modifications possibles ?
  const part: AccordionPartProps = {
    title: "TODO",
    contents: [
      {
        libelle: "Autorité",
        value: "TODO" // TypeAutoriteUtil.getLibelle(pacs.modifications[0].)
      }
    ]
  };

  return [part];
}

function getDissolutionPacs(pacs: IFichePacs): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "TODO",
    contents: [
      {
        libelle: "TODO",
        value: "TODO"
      }
    ]
  };

  return [part];
}

function getAnnulationPacs(pacs: IAnnulation): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "TODO",
    contents: [
      {
        libelle: "TODO",
        value: "TODO"
      }
    ]
  };

  return [part];
}
