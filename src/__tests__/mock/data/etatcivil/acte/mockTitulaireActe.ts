import { ITitulaireActeDto } from "@model/etatcivil/acte/TitulaireActe";

export const MOCK_TITULAIRE_ACTE: ITitulaireActeDto = {
  ordre: 1,
  nom: "Nom Titulaire",
  prenoms: ["Prénom Titulaire"],
  sexe: "MASCULIN",
  filiations: []
};

export const MOCK_DEUX_TITULAIRES_ACTE: ITitulaireActeDto[] = [
  MOCK_TITULAIRE_ACTE,
  {
    ordre: 2,
    nom: "Nom Titulaire 2",
    prenoms: ["Prénom Titulaire 2"],
    sexe: "FEMININ",
    filiations: []
  }
];
