import { Personne } from "@model/etatcivil/commun/Personne";
import { ENationalite } from "@model/etatcivil/enum/Nationalite";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { SectionContentProps } from "@widget/section/SectionContent";
import { SectionPanelProps } from "@widget/section/SectionPanel";
import { SectionPanelAreaProps } from "@widget/section/SectionPanelArea";
import { SectionPartProps } from "@widget/section/SectionPart";
import { IParamsAffichage } from "../acte/FicheActeUtils";

export const getFichesPersonneActe = (personnes: Personne[], paramsAffichage: IParamsAffichage): SectionPanelProps[] => {
  if (paramsAffichage.personnes === "visible") {
    return getFichesPersonne(personnes);
  } else if (paramsAffichage.personnes === "disabled") {
    return [
      {
        panelAreas: [],
        title: `Fiche Personne`
      }
    ];
  } else {
    // paramsAffichage.personnes === "none"
    return [];
  }
};

export const getFichesPersonne = (personnes: Personne[]): SectionPanelProps[] => {
  return personnes.map((personne, index) => {
    return {
      panelAreas: getPanelAreasFichesPersonnes(personne),
      title: `Fiche Personne ${index + 1}`
    };
  });
};

const getPanelAreasFichesPersonnes = (personne: Personne): SectionPanelAreaProps[] => {
  return [
    {
      parts: [getInformationsPersonne(personne)],
      nbColonne: 3
    }
  ];
};

const getInformationsPersonne = (personne: Personne): SectionPartProps => {
  return {
    partContent: {
      contents: [
        getNomPersonne(personne.nom),
        getAutresNomsPersonne(personne.autresNoms),
        getPrenomsPersonne(personne.prenoms),
        getAutresPrenomsPersonne(personne.autresPrenoms),
        getLieuNaissance(personne.lieuNaissance),
        getDateNaissance(personne.dateNaissance),
        getNationalitePersonne(ENationalite[personne.nationalite]),
        getSexePersonne(ESexe[personne.sexe]),
        getLieuDeces(personne.lieuDeces),
        getDateDeces(personne.dateDeces)
      ],
      title: "Personne"
    }
  };
};

const getNomPersonne = (nom: string): SectionContentProps => {
  return {
    libelle: "Nom",
    value: nom
  };
};

const getAutresNomsPersonne = (autresNom: string): SectionContentProps => {
  return {
    libelle: "Autres noms",
    value: autresNom
  };
};

const getPrenomsPersonne = (prenoms: string): SectionContentProps => {
  return {
    libelle: "Prénoms",
    value: prenoms
  };
};

const getAutresPrenomsPersonne = (autresPrenoms: string): SectionContentProps => {
  return {
    libelle: "Autres prénoms",
    value: autresPrenoms
  };
};

const getLieuNaissance = (lieuNaissance: string): SectionContentProps => {
  return {
    libelle: "Lieu de naissance",
    value: lieuNaissance
  };
};

const getLieuDeces = (lieuDeces: string): SectionContentProps => {
  return {
    libelle: "Lieu décès",
    value: lieuDeces
  };
};

const getDateNaissance = (dateNaissance: string): SectionContentProps => {
  return {
    libelle: "Né(e) le",
    value: dateNaissance
  };
};

const getDateDeces = (dateDeces: string): SectionContentProps => {
  return {
    libelle: "Date décès",
    value: dateDeces
  };
};

const getNationalitePersonne = (nationalite: string): SectionContentProps => {
  return {
    libelle: "Nationalité",
    value: nationalite
  };
};

const getSexePersonne = (sexe: string): SectionContentProps => {
  return {
    libelle: "Sexe",
    value: sexe
  };
};
