import { AccordionReceProps } from "../../../../../common/widget/accordion/AccordionRece";
import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";
import { SectionPanelAreaProps } from "../../../../../common/widget/section/SectionPanelArea";
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
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import {
  IModification,
  Modification
} from "../../../../../../model/etatcivil/pacs/IModification";
import {
  IDissolution,
  Dissolution
} from "../../../../../../model/etatcivil/pacs/IDissolution";
import { SectionPanelProps } from "../../../../../common/widget/section/SectionPanel";
import { getFichesPersonne } from "../personne/FichePersonne";
import { getDateString } from "../../../../../common/util/DateUtils";

export function getPanelsPacs(pacs: IFichePacs): AccordionReceProps {
  const panelAreas: SectionPanelAreaProps[] = [];

  const deuxColonnes = 2;

  AjoutePanel(
    panelAreas,
    pacs,
    getInscriptionRegistrePacs,
    "1",
    "Inscription au registre des PACS des étrangers nés à l'étranger",
    1
  );

  AjoutePanel(
    panelAreas,
    pacs.partenaires,
    getPartenaires,
    "2",
    "",
    deuxColonnes
  );
  AjoutePanel(
    panelAreas,
    pacs,
    getEnregistrementPacs,
    "3",
    "Enregistrement du PACS",
    deuxColonnes
  );
  if (pacs.modifications) {
    AjoutePanel(
      panelAreas,
      pacs.modifications[0],
      getModificationPacs,
      "4",
      "Modification du PACS",
      deuxColonnes
    );
  }
  AjoutePanel(
    panelAreas,
    pacs.dissolution,
    getDissolutionPacs,
    "5",
    "Dissolution du PACS",
    deuxColonnes
  );
  AjoutePanel(
    panelAreas,
    pacs.annulation,
    getAnnulationPacs,
    "6",
    "Annulation du PACS",
    deuxColonnes
  );

  const fichesPersonne: SectionPanelProps[] = getFichesPersonne(pacs.personnes);

  return {
    panels: [
      {
        panelAreas,
        title: "Vue du PACS"
      },
      ...fichesPersonne
    ]
  };
}

function AjoutePanel(
  panelAreas: SectionPanelAreaProps[],
  param: any,
  fct: (p: any) => SectionPartProps[],
  idPanelArea?: string,
  titlePanelArea?: string,
  nbColonnePanelArea?: number
) {
  if (param) {
    panelAreas.push({
      parts: fct(param),
      id: idPanelArea,
      title: titlePanelArea,
      nbColonne: nbColonnePanelArea
    } as SectionPanelAreaProps);
  }
}

function getInscriptionRegistrePacs(pacs: IFichePacs): SectionPartProps[] {
  const part: SectionPartProps = {
    contentsPart: {
      title: "",
      contents: [
        {
          libelle: "Statut du PACS",
          value: StatutPacesUtil.getLibelle(pacs.statut)
        },
        {
          libelle: "Date d'enregistrement (par l'autorité)",
          value: getDateString(pacs.dateEnregistrementParAutorite)
        },

        {
          libelle: "Date d'inscription au registre",
          value: getDateString(pacs.dateInscription)
        }
      ]
    }
  };

  return [part];
}

function getEnregistrementPacs(pacs: IFichePacs): SectionPartProps[] {
  const part1: SectionPartProps = {
    contentsPart: {
      contents: [
        getContentAutorite(pacs.autorite),
        ...getContentNotaire(pacs.autorite),
        {
          libelle: "Date",
          value: getDateString(pacs.dateEnregistrementParAutorite)
        }
      ]
    }
  };

  const part2: SectionPartProps = {
    contentsPart: {
      title: "",
      contents: getContentLieu(pacs.autorite)
    }
  };

  return [part1, part2];
}

function getModificationPacs(modification: IModification): SectionPartProps[] {
  const part1: SectionPartProps = {
    contentsPart: {
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
    }
  };

  const part2: SectionPartProps = {
    contentsPart: {
      contents: getContentLieu(modification.autorite)
    }
  };

  return [part1, part2];
}

function getDissolutionPacs(dissolution: IDissolution): SectionPartProps[] {
  const part1: SectionPartProps = {
    contentsPart: {
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
    }
  };

  const part2: SectionPartProps = {
    contentsPart: {
      title: "",
      contents: getContentLieu(dissolution.autorite)
    }
  };

  return [part1, part2];
}

function getAnnulationPacs(annulation: IAnnulation): SectionPartProps[] {
  const part1: SectionPartProps = {
    contentsPart: {
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
    }
  };

  const part2: SectionPartProps = {
    contentsPart: {
      contents: getContentLieu(annulation.autorite)
    }
  };

  return [part1, part2];
}

export function getContentAutorite(autorite?: IAutorite): SectionContentProps {
  return {
    libelle: "Autorité",
    value: Autorite.getTypeAutorite(autorite)
  };
}

export function getContentNotaire(autorite?: IAutorite): SectionContentProps[] {
  let contentNotaire: SectionContentProps[] = [];
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

export function getContentLieu(autorite?: IAutorite): SectionContentProps[] {
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
