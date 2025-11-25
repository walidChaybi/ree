import { Autorite, IAutorite } from "@model/etatcivil/commun/IAutorite";
import { SectionContentProps } from "@widget/section/SectionContent";

export const DATE_EFFET_POUR_TIERS = "Date d'effet à l'égard des tiers";

export const getContentAutorite = (autorite?: IAutorite): SectionContentProps => {
  return {
    libelle: "Autorité",
    value: Autorite.getTypeAutorite(autorite)
  };
};

export const getContentNotaire = (autorite?: IAutorite): SectionContentProps[] => {
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
};

export const getContentLieu = (autorite?: IAutorite): SectionContentProps[] => {
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
};
