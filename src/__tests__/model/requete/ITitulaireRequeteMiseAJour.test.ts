import { ITitulaireActeDto, TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { ITitulaireRequeteMiseAJour, TitulaireRequeteMiseAJour } from "@model/requete/ITitulaireRequeteMiseAJour";
import { describe, expect, test } from "vitest";

describe("Tests du model Titulaire d'une requête de mise à jour", () => {
  test("Doit retourner une liste depuis un tableau de DTO", () => {
    const attendu: ITitulaireRequeteMiseAJour[] = [
      {
        position: 0,
        nomNaissance: "Test",
        anneeNaissance: 2000,
        moisNaissance: 1,
        jourNaissance: 1,
        villeEtrangereNaissance: "Ville",
        regionNaissance: "Region",
        arrondissementNaissance: "Region",
        paysNaissance: "Pays",
        sexe: "MASCULIN",
        prenoms: [
          { prenom: "John", numeroOrdre: 1 },
          { prenom: "Paul", numeroOrdre: 2 }
        ]
      },
      {
        position: 1,
        nomNaissance: "Test",
        anneeNaissance: 2002,
        moisNaissance: 2,
        jourNaissance: 2,
        villeEtrangereNaissance: "Ville2",
        regionNaissance: "Region2",
        arrondissementNaissance: "Region2",
        paysNaissance: "Pays2",
        sexe: "FEMININ",
        prenoms: [
          { prenom: "Jeanne", numeroOrdre: 1 },
          { prenom: "Paulette", numeroOrdre: 2 }
        ]
      }
    ];

    const donneesTitulaires: ITitulaireActeDto[] = [
      {
        ordre: 0,
        nom: "Test",
        naissance: {
          annee: 2000,
          mois: 1,
          jour: 1,
          ville: "Ville",
          region: "Region",
          pays: "Pays"
        },
        sexe: "MASCULIN",
        prenoms: ["John", "Paul"],
        filiations: []
      },
      {
        ordre: 1,
        nom: "Test",
        naissance: {
          annee: 2002,
          mois: 2,
          jour: 2,
          ville: "Ville2",
          region: "Region2",
          pays: "Pays2"
        },
        sexe: "FEMININ",
        prenoms: ["Jeanne", "Paulette"],
        filiations: []
      }
    ];

    expect(
      TitulaireRequeteMiseAJour.listeDepuisDonneesFiche(
        donneesTitulaires.map(TitulaireActe.depuisDto).filter((titulaire): titulaire is TitulaireActe => titulaire !== null)
      )
    ).toStrictEqual(attendu);
  });
});
