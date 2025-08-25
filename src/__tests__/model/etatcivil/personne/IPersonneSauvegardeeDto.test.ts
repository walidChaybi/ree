import { PersonneSauvegardeeDto } from "@model/etatcivil/personne/IPersonneSauvegardeeDto";
import { describe, expect, test } from "vitest";

describe("Test du dto IPersonneSauvegardeeDto", () => {
  test("Méthode PersonneSauvegardeeDto mapping", () => {
    let donneesPersonne: unknown = {
      idPersonne: "idPersonne"
    };

    expect(PersonneSauvegardeeDto.mapping(donneesPersonne)).toEqual({
      idPersonne: "idPersonne",
      nom: undefined,
      autresNoms: undefined,
      prenoms: undefined,
      dateNaissance: undefined,
      lieuNaissance: undefined,
      sexe: ""
    });

    donneesPersonne = {
      idPersonne: "idPersonne",
      nom: "nom",
      prenoms: "prenom",
      autresNoms: "nom2",
      dateNaissance: "03/06/1999",
      lieuNaissance: "Nantes, France",
      sexe: "Masculin"
    };

    expect(PersonneSauvegardeeDto.mapping(donneesPersonne)).toEqual(donneesPersonne);
  });
});
