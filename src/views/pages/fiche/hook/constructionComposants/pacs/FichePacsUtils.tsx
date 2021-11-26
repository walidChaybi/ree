import {
  Autorite,
  IAutorite
} from "../../../../../../model/etatcivil/commun/IAutorite";
import { StatutPacesUtil } from "../../../../../../model/etatcivil/enum/StatutPacs";
import {
  Annulation,
  IAnnulation
} from "../../../../../../model/etatcivil/pacs/IAnnulation";
import {
  Dissolution,
  IDissolution
} from "../../../../../../model/etatcivil/pacs/IDissolution";
import { IFichePacs } from "../../../../../../model/etatcivil/pacs/IFichePacs";
import {
  IModification,
  Modification
} from "../../../../../../model/etatcivil/pacs/IModification";
import { getDateString } from "../../../../../common/util/DateUtils";
import { SectionContentProps } from "../../../../../common/widget/section/SectionContent";
import { SectionPanelProps } from "../../../../../common/widget/section/SectionPanel";
import { SectionPanelAreaProps } from "../../../../../common/widget/section/SectionPanelArea";
import { SectionPartProps } from "../../../../../common/widget/section/SectionPart";
import { AjoutePartAuPanelAreas } from "../../../../../common/widget/section/SectionUtils";
import { getLibelle } from "../../../../../common/widget/Text";
import { IAccordionReceSection } from "../../../FicheUtils";
import { getFichesPersonne } from "../personne/FichePersonne";
import { getStatuts } from "../statut/StatutUtils";
import { getPartenaires } from "./PartenairesUtils";

const DATE_EFFET = "Date d'effet à l'égard des tiers";

export function getPanelsPacs(pacs: IFichePacs): IAccordionReceSection {
  const panelAreas: SectionPanelAreaProps[] = [];

  const deuxColonnes = 2;

  AjoutePartAuPanelAreas(
    panelAreas,
    pacs,
    getInscriptionRegistrePacs,
    "1",
    "Inscription au registre des PACS des étrangers nés à l'étranger",
    1
  );

  AjoutePartAuPanelAreas(
    panelAreas,
    pacs.partenaires,
    getPartenaires,
    "2",
    "",
    deuxColonnes
  );
  AjoutePartAuPanelAreas(
    panelAreas,
    pacs,
    getEnregistrementPacs,
    "3",
    "Enregistrement du PACS",
    deuxColonnes
  );
  if (pacs.modifications) {
    AjoutePartAuPanelAreas(
      panelAreas,
      pacs.modifications[0],
      getModificationPacs,
      "4",
      "Modification du PACS",
      deuxColonnes
    );
  }
  AjoutePartAuPanelAreas(
    panelAreas,
    pacs.dissolution,
    getDissolutionPacs,
    "5",
    "Dissolution du PACS",
    deuxColonnes
  );
  AjoutePartAuPanelAreas(
    panelAreas,
    pacs.annulation,
    getAnnulationPacs,
    "6",
    "Annulation du PACS",
    deuxColonnes
  );

  panelAreas.push({
    parts: getStatuts(pacs.statutsFiche),
    title: getLibelle("Historique des statuts de la fiche")
  });

  const fichesPersonne: SectionPanelProps[] = getFichesPersonne(pacs.personnes);

  return {
    panels: [
      {
        panelAreas,
        title: "Visualisation du PACS"
      },
      ...fichesPersonne
    ]
  };
}

function getInscriptionRegistrePacs(pacs: IFichePacs): SectionPartProps[] {
  const part: SectionPartProps = {
    partContent: {
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
    partContent: {
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
    partContent: {
      title: "",
      contents: getContentLieu(pacs.autorite)
    }
  };

  return [part1, part2];
}

function getModificationPacs(modification: IModification): SectionPartProps[] {
  const part1: SectionPartProps = {
    partContent: {
      contents: [
        getContentAutorite(modification.autorite),
        ...getContentNotaire(modification.autorite),
        {
          libelle: "Date d'enregistrement de la convention modificative",
          value: Modification.getDate(modification)
        },
        {
          libelle: DATE_EFFET,
          value: Modification.getDateEffet(modification)
        }
      ]
    }
  };

  const part2: SectionPartProps = {
    partContent: {
      contents: getContentLieu(modification.autorite)
    }
  };

  return [part1, part2];
}

function getDissolutionPacs(dissolution: IDissolution): SectionPartProps[] {
  const part1: SectionPartProps = {
    partContent: {
      contents: [
        getContentAutorite(dissolution.autorite),
        ...getContentNotaire(dissolution.autorite),
        {
          libelle: "Date d'enregistrement de la dissolution",
          value: Dissolution.getDate(dissolution)
        },
        {
          libelle: DATE_EFFET,
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
    partContent: {
      title: "",
      contents: getContentLieu(dissolution.autorite)
    }
  };

  return [part1, part2];
}

function getAnnulationPacs(annulation: IAnnulation): SectionPartProps[] {
  const part1: SectionPartProps = {
    partContent: {
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
          libelle: DATE_EFFET,
          value: Annulation.getDateEffet(annulation)
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
    partContent: {
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
