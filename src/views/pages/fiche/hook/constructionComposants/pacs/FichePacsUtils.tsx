import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { AccordionPanelAreaProps } from "../../../../../common/widget/accordion/AccordionPanelArea";
import {
  IAnnulation,
  Annulation
} from "../../../../../../model/etatcivil/pacs/IAnnulation";
import { getPartenaires } from "./PartenairesUtils";
import { TypeAutoriteUtil } from "../../../../../../model/etatcivil/TypeAutorite";
import { StatutPacesUtil } from "../../../../../../model/etatcivil/enum/StatutPacs";
import { Autorite } from "../../../../../../model/etatcivil/commun/IAutorite";
import { AccordionContentProps } from "../../../../../common/widget/accordion/AccordionContent";
import {
  IModification,
  Modification
} from "../../../../../../model/etatcivil/pacs/IModification";
import {
  IDissolution,
  Dissolution
} from "../../../../../../model/etatcivil/pacs/IDissolution";

export function getPanelsPacs(pacs: IFichePacs): AccordionReceProps {
  const panelAreas: AccordionPanelAreaProps[] = [
    { parts: getInscriptionRegistrePacs(pacs) }
  ];

  AjoutePanel(panelAreas, pacs.partenaires, getPartenaires);
  AjoutePanel(panelAreas, pacs, getEnregistrementPacs);
  if (pacs.modifications) {
    AjoutePanel(panelAreas, pacs.modifications[0], getModificationPacs);
  }
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
    title: "Enregistrement du PACS",
    contents: []
  };

  const contentAutorite: AccordionContentProps = {
    libelle: "Autorité",
    value: pacs.autorite
      ? TypeAutoriteUtil.getLibelle(pacs.autorite.typeAutorite)
      : ""
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

function getModificationPacs(
  modification: IModification
): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "Modification du pacs",
    contents: [
      {
        libelle: "Date d'enregistrement de la convention modificative",
        value: Modification.getDate(modification)
      },
      {
        libelle: "Date d'effet à l'égard des tiers",
        value: Modification.getDateEffet(modification)
      }
    ]
  };

  return [part];
}

function getDissolutionPacs(dissolution: IDissolution): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "Dissolution du PACS",
    contents: [
      {
        libelle: "Date d'enregistrement de la dissolution",
        value: Dissolution.getDate(dissolution)
      },
      {
        libelle: "Date d'effet à l'égard des tiers",
        value: Dissolution.getDateEffet(dissolution)
      },
      {
        libelle: "Motif",
        value: Dissolution.getMotif(dissolution)
      }
    ]
  };

  return [part];
}

function getAnnulationPacs(annulation: IAnnulation): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "Annulation du PACS",
    contents: [
      {
        libelle: "Type de décision",
        value: Annulation.getTypeDecision(annulation)
      },
      {
        libelle: "Date",
        value: Annulation.getDate(annulation)
      },
      {
        libelle: "Juridiction",
        value: Annulation.getJuridiction(annulation)
      },
      {
        libelle: "Enrôlement RG",
        value: Annulation.getEnrolementRG(annulation)
      },
      {
        libelle: "Enrôlement Portalis",
        value: Annulation.getEnrolementPortalis(annulation)
      }
    ]
  };

  return [part];
}
