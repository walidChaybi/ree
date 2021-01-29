import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import { AccordionPartProps } from "../../../../../common/widget/accordion/AccordionPart";
import { AccordionPanelAreaProps } from "../../../../../common/widget/accordion/AccordionPanelArea";
import {
  IAnnulation,
  Annulation
} from "../../../../../../model/etatcivil/pacs/IAnnulation";
import { getPartenaires } from "./PartenairesUtils";
import { StatutPacesUtil } from "../../../../../../model/etatcivil/enum/StatutPacs";
import {
  Autorite,
  IAutorite
} from "../../../../../../model/etatcivil/commun/IAutorite";
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
  const panelAreas: AccordionPanelAreaProps[] = [];

  AjoutePanel(
    panelAreas,
    pacs,
    getInscriptionRegistrePacs,
    "1",
    "Inscription des registre des PACS des étrangers nés à l'étranger"
  );

  AjoutePanel(panelAreas, pacs.partenaires, getPartenaires, "2");
  AjoutePanel(
    panelAreas,
    pacs,
    getEnregistrementPacs,
    "3",
    "Enregistrement du PACS"
  );
  if (pacs.modifications) {
    AjoutePanel(
      panelAreas,
      pacs.modifications[0],
      getModificationPacs,
      "4",
      "Modification du PACS"
    );
  }
  AjoutePanel(
    panelAreas,
    pacs.dissolution,
    getDissolutionPacs,
    "5",
    "Dissolution du PACS"
  );
  AjoutePanel(
    panelAreas,
    pacs.annulation,
    getAnnulationPacs,
    "6",
    "Annulation du PACS"
  );

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
  fct: (p: any) => AccordionPartProps[],
  idPanelArea?: string,
  titlePanelArea?: string
) {
  if (param) {
    panelAreas.push({
      parts: fct(param),
      id: idPanelArea,
      title: titlePanelArea
    } as AccordionPanelAreaProps);
  }
}

function getInscriptionRegistrePacs(pacs: IFichePacs): AccordionPartProps[] {
  const part: AccordionPartProps = {
    title: "",
    columnIndex: "1/3",
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
    contents: [
      getContentAutorite(pacs.autorite),
      ...getContentNotaire(pacs.autorite),
      {
        libelle: "Date",
        value: pacs.dateEnregistrementParAutorite
      }
    ]
  };

  const part2: AccordionPartProps = {
    title: "",
    contents: getContentLieu(pacs.autorite)
  };

  return [part1, part2];
}

function getModificationPacs(
  modification: IModification
): AccordionPartProps[] {
  const part1: AccordionPartProps = {
    contents: [
      getContentAutorite(modification.autorite),
      ...getContentNotaire(modification.autorite),
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

  const part2: AccordionPartProps = {
    contents: getContentLieu(modification.autorite)
  };

  return [part1, part2];
}

function getDissolutionPacs(dissolution: IDissolution): AccordionPartProps[] {
  const part1: AccordionPartProps = {
    contents: [
      getContentAutorite(dissolution.autorite),
      ...getContentNotaire(dissolution.autorite),
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

  const part2: AccordionPartProps = {
    title: "",
    contents: getContentLieu(dissolution.autorite)
  };

  return [part1, part2];
}

function getAnnulationPacs(annulation: IAnnulation): AccordionPartProps[] {
  const part1: AccordionPartProps = {
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

  const part2: AccordionPartProps = {
    contents: getContentLieu(annulation.autorite)
  };

  return [part1, part2];
}

export function getContentAutorite(
  autorite?: IAutorite
): AccordionContentProps {
  return {
    libelle: "Autorité",
    value: Autorite.getTypeAutorite(autorite)
  };
}

export function getContentNotaire(
  autorite?: IAutorite
): AccordionContentProps[] {
  let contentNotaire: AccordionContentProps[] = [];
  if (Autorite.isNotaire(autorite)) {
    contentNotaire = [
      {
        libelle: "Prénom nom",
        value: Autorite.getLibelleNotaire(autorite)
      },
      {
        libelle: "N° CRPCEN",
        value: Autorite.getNumeroCrpcen(autorite)
      }
    ];
  }
  return contentNotaire;
}

export function getContentLieu(autorite?: IAutorite): AccordionContentProps[] {
  return [
    {
      libelle: "Ville",
      value: Autorite.getVille(autorite)
    },
    {
      libelle: "Arrondissement",
      value: Autorite.getArrondissement(autorite)
    },
    {
      libelle: "Région/Dpt",
      value: Autorite.getRegionDepartement(autorite)
    },
    {
      libelle: "Pays",
      value: Autorite.getPays(autorite)
    }
  ];
}
