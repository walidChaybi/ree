import { RMCArchiveForm } from "@model/form/rmc/RMCArchiveForm";
import { ICriteresRMC, ICriteresRMCDto } from "@model/rmc/commun/IRMCFormulaire";
import { describe, expect, test } from "vitest";

const mockValeursRMCArchive: ICriteresRMC = {
  acte: {
    natureActe: "NAISSANCE",
    familleRegistre: "ACQ",
    anneeRegistre: "2023",
    pocopa: "",
    registreSupport: {
      support1: "PAPIER",
      support2: "NUMÉRIQUE"
    },
    numeroActe: {
      numeroActe: "42",
      numeroBisTer: "B"
    },
    etActesSuivants: true,
    typeReference: "RECE",
    referenceRECE: {
      annee: "",
      numero: ""
    }
  },
  evenement: {
    dateEvenement: {
      jour: "15",
      mois: "06",
      annee: "1990"
    },
    paysEvenement: "FRANCE"
  },
  titulaire: {
    nom: "DUPONT",
    prenom: "JEAN",
    paysNaissance: "FRANCE",
    dateNaissance: {
      jour: "12",
      mois: "03",
      annee: "1985"
    }
  }
};

const mockDtoRMCArchive: ICriteresRMCDto = {
  acte: {
    referenceRegistre: {
      familleRegistre: "ACQ",
      anneeRegistre: "2023",
      support1: "PAPIER",
      support2: "NUMÉRIQUE",
      numeroActe: "42",
      numeroBisTer: "B",
      etActesSuivants: true
    },
    natureActe: "NAISSANCE"
  },
  evenement: {
    dateEvenement: {
      jour: "15",
      mois: "06",
      annee: "1990"
    },
    paysEvenement: "FRANCE"
  },
  titulaire: {
    nom: "DUPONT",
    prenom: "JEAN",
    paysNaissance: "FRANCE",
    dateNaissance: {
      jour: "12",
      mois: "03",
      annee: "1985"
    }
  }
};

describe("Test du FORM ", () => {
  test("LORSQUE versDto est appelé avec une valeur, ALORS un DTO bien construit est généré", () => {
    const dto = RMCArchiveForm.versDto(mockValeursRMCArchive);

    expect(dto).toStrictEqual(mockDtoRMCArchive);
  });
});
