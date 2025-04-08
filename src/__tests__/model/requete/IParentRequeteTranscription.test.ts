import { IParentRequeteTranscription, ParentsRequeteTranscription } from "@model/requete/IParentsRequeteTranscription";
import { describe, expect, test } from "vitest";

describe("Interface ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm", () => {
  test("doit retourner un mapping avec des valeurs par défaut quand parent est undefined", () => {
    const result = ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(undefined);

    expect(result).toEqual({
      sexe: "",
      nom: "",
      prenomsChemin: {
        nombrePrenomsAffiches: 1,
        prenom1: "",
        prenom2: "",
        prenom3: "",
        prenom4: "",
        prenom5: "",
        prenom6: "",
        prenom7: "",
        prenom8: "",
        prenom9: "",
        prenom10: "",
        prenom11: "",
        prenom12: "",
        prenom13: "",
        prenom14: "",
        prenom15: ""
      },
      dateNaissance: {
        jour: "",
        mois: "",
        annee: ""
      },
      lieuNaissance: {
        typeLieu: "Inconnu",
        ville: "",
        departement: undefined,
        arrondissement: "",
        pays: "",
        etatProvince: "",
        adresse: ""
      },
      sansProfession: false,
      profession: "",
      domicile: {
        typeLieu: "Inconnu",
        ville: "",
        adresse: "",
        departement: "",
        arrondissement: "",
        pays: "",
        etatProvince: ""
      },
      renseignerAge: false,
      age: ""
    });
  });

  test("doit mapper correctement un parent né en France", () => {
    const parent: IParentRequeteTranscription = {
      sexe: "MASCULIN",
      nomUsage: "nomUsage",
      nomNaissance: "nomNaissance",
      jourNaissance: 5,
      moisNaissance: 8,
      anneeNaissance: 1980,
      villeNaissance: "Paris",
      arrondissementNaissance: "8ème",
      regionNaissance: "Ile-de-France",
      paysNaissance: "FRANCE",
      prenoms: [
        { numeroOrdre: 1, prenom: "Jean" },
        { numeroOrdre: 2, prenom: "Michel" }
      ],
      domiciliation: {
        typeLieu: "France",
        ville: "Lyon",
        adresse: "123 rue des lions",
        departement: "Rhone",
        arrondissement: "2ème",
        pays: "France",
        etatProvince: ""
      }
    };

    const result = ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(parent);

    expect(result).toEqual({
      sexe: "MASCULIN",
      nom: "nomUsage",
      prenomsChemin: {
        nombrePrenomsAffiches: 2,
        prenom1: "Jean",
        prenom2: "Michel",
        prenom3: "",
        prenom4: "",
        prenom5: "",
        prenom6: "",
        prenom7: "",
        prenom8: "",
        prenom9: "",
        prenom10: "",
        prenom11: "",
        prenom12: "",
        prenom13: "",
        prenom14: "",
        prenom15: ""
      },
      dateNaissance: {
        jour: "05",
        mois: "08",
        annee: "1980"
      },
      lieuNaissance: {
        typeLieu: "France",
        ville: "Paris",
        departement: "Ile-de-France",
        arrondissement: "8ème",
        pays: "FRANCE",
        etatProvince: "Ile-de-France",
        adresse: ""
      },
      sansProfession: false,
      profession: "",
      domicile: {
        typeLieu: "France",
        ville: "Lyon",
        adresse: "123 rue des lions",
        departement: "Rhone",
        arrondissement: "2ème",
        pays: "France",
        etatProvince: ""
      },
      renseignerAge: false,
      age: ""
    });
  });

  test("doit mapper correctement un parent né à l'étranger", () => {
    const parent: IParentRequeteTranscription = {
      sexe: "FEMININ",
      nomUsage: "",
      nomNaissance: "Smith",
      jourNaissance: 15,
      moisNaissance: 3,
      anneeNaissance: 1975,
      villeNaissance: "New York",
      regionNaissance: "New York",
      paysNaissance: "ETATS-UNIS",
      prenoms: [
        { numeroOrdre: 1, prenom: "Sarah" },
        { numeroOrdre: 2, prenom: "Jane" }
      ],
      domiciliation: {
        typeLieu: "Étranger",
        ville: "Berlin",
        adresse: "456 adresse de Berlin",
        pays: "Allemagne",
        etatProvince: "Berlin"
      }
    };

    const result = ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(parent);

    expect(result).toEqual({
      sexe: "FEMININ",
      nom: "Smith",
      prenomsChemin: {
        nombrePrenomsAffiches: 2,
        prenom1: "Sarah",
        prenom2: "Jane",
        prenom3: "",
        prenom4: "",
        prenom5: "",
        prenom6: "",
        prenom7: "",
        prenom8: "",
        prenom9: "",
        prenom10: "",
        prenom11: "",
        prenom12: "",
        prenom13: "",
        prenom14: "",
        prenom15: ""
      },
      dateNaissance: {
        jour: "15",
        mois: "03",
        annee: "1975"
      },
      lieuNaissance: {
        typeLieu: "Étranger",
        ville: "New York",
        departement: "New York",
        arrondissement: "",
        pays: "ETATS-UNIS",
        etatProvince: "New York",
        adresse: ""
      },
      sansProfession: false,
      profession: "",
      domicile: {
        typeLieu: "Étranger",
        ville: "Berlin",
        adresse: "456 adresse de Berlin",
        departement: "",
        arrondissement: "",
        pays: "Allemagne",
        etatProvince: "Berlin"
      },
      renseignerAge: false,
      age: ""
    });
  });

  test("doit gérer correctement les valeurs manquantes", () => {
    const parent: IParentRequeteTranscription = {
      sexe: "MASCULIN",
      nomNaissance: "Durand",
      jourNaissance: 1,
      prenoms: [{ numeroOrdre: 1, prenom: "Pierre" }]
    };

    const result = ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(parent);

    expect(result).toEqual({
      sexe: "MASCULIN",
      nom: "Durand",
      prenomsChemin: {
        nombrePrenomsAffiches: 1,
        prenom1: "Pierre",
        prenom2: "",
        prenom3: "",
        prenom4: "",
        prenom5: "",
        prenom6: "",
        prenom7: "",
        prenom8: "",
        prenom9: "",
        prenom10: "",
        prenom11: "",
        prenom12: "",
        prenom13: "",
        prenom14: "",
        prenom15: ""
      },
      dateNaissance: {
        jour: "01",
        mois: "",
        annee: ""
      },
      lieuNaissance: {
        typeLieu: "Inconnu",
        ville: "",
        departement: undefined,
        arrondissement: "",
        pays: "",
        etatProvince: "",
        adresse: ""
      },
      sansProfession: false,
      profession: "",
      domicile: {
        typeLieu: "Inconnu",
        ville: "",
        adresse: "",
        departement: "",
        arrondissement: "",
        pays: "",
        etatProvince: ""
      },
      renseignerAge: false,
      age: ""
    });
  });

  test("doit préférer nomUsage sur nomNaissance quand les deux sont présents", () => {
    const parent: IParentRequeteTranscription = {
      nomUsage: "Martin",
      nomNaissance: "Dubois"
    };

    const result = ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(parent);

    expect(result.nom).toBe("Martin");
  });

  test("doit utiliser nomNaissance quand nomUsage est absent", () => {
    const parent: IParentRequeteTranscription = {
      nomNaissance: "Dubois"
    };

    const result = ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(parent);

    expect(result.nom).toBe("Dubois");
  });
});
