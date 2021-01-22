import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { AccordionPanelAreaProps } from "../../../../../common/widget/accordion/AccordionPanelArea";
import { IAnnulation } from "../../../../../../model/etatcivil/pacs/IAnnulation";
import { getPartenaires } from "./PartenairesUtils";
import { TypeAutoriteUtil } from "../../../../../../model/etatcivil/TypeAutorite";
import { StatutPacesUtil } from "../../../../../../model/etatcivil/enum/StatutPacs";
import { Autorite } from "../../../../../../model/etatcivil/commun/IAutorite";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";

export function getPanelsPacs(pacs: IFichePacs): AccordionReceProps {
  const panelAreas: AccordionPanelAreaProps[] = [
    { parts: getInscriptionRegistrePacs(pacs) }
  ];

  AjoutePanel(panelAreas, pacs.partenaires, getPartenaires);
  AjoutePanel(panelAreas, pacs, getEnregistrementPacs);
  AjoutePanel(panelAreas, pacs.modifications, getModificationPacs);
  AjoutePanel(panelAreas, pacs.dissolution, getDissolutionPacs);
  AjoutePanel(panelAreas, pacs.annulation, getAnnulationPacs);

  return {
    panels: [
      {
        panelAreas,
        title: "Vue du PACS"
      }
    ]
  };
}

function AjoutePanel(
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
        value: pacs.dateEnregistrementParAutorite
      },

      {
        libelle: "Date d'inscription au registre",
        value: pacs.dateInscription
      }
    ]
  };

  return [part];
}

function getEnregistrementPacs(pacs: IFichePacs): AccordionPartProps[] {
  const part1: AccordionPartProps = {
    title: "Enregistrement PACS",
    contents: []
  };

  const contentAutorite: AccordionContentProps = {
    libelle: "Autorité",
    value: pacs.autorite ? TypeAutoriteUtil.getLibelle(pacs.autorite.type) : ""
  };

  const contentDate: AccordionContentProps = {
    libelle: "Date",
    value: pacs.dateEnregistrementParAutorite
  };

  part1.contents.push(contentAutorite);
  part1.contents.push(contentDate);

  if (Autorite.isNotaire(pacs.autorite)) {
    const contentNotaire = [
      {
        libelle: "Prénom nom",
        value: Autorite.getLibelleNotaire(pacs.autorite)
      },
      {
        libelle: "N° CRPCEN",
        value: Autorite.getNumeroCrpcen(pacs.autorite)
      }
    ];
    part1.contents.push(...contentNotaire);
  }

  const part2: AccordionPartProps = {
    title: "",
    contents: [
      {
        libelle: "Ville",
        value: Autorite.getVille(pacs.autorite)
      },
      {
        libelle: "Arrondissement",
        value: Autorite.getArrondissement(pacs.autorite)
      },
      {
        libelle: "Région/Dpt",
        value: Autorite.getRegionDepartement(pacs.autorite)
      },
      {
        libelle: "Pays",
        value: Autorite.getPays(pacs.autorite)
      }
    ]
  };

  return [part1, part2];
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
