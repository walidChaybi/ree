import { Sexe } from "../../model/etatcivil/enum/Sexe";

export const ReponseMesRequetesInformation = [
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EVIPG4",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "TRANSFEREE",
    titulaires: []
  },
  {
    dateCreation: 1620273936000,
    id: "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63",
    nomCompletRequerant: "Tribunal de Nantes",
    numero: "EVIPG5",
    objet: "Objet de la requête",
    qualiteRequerant: "INSTITUTIONNEL",
    sousType: "INFORMATION",
    statut: "PRISE_EN_CHARGE",
    titulaires: [
      {
        nom: "nom1",
        prenoms: ["p1", "p2"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        sexe: Sexe.MASCULIN
      },
      {
        nom: "nom2",
        prenoms: ["p1", "p2"],
        jourNaissance: 1,
        moisNaissance: 2,
        anneeNaissance: 2000,
        villeNaissance: "villeNaissance",
        paysNaissance: "paysNaissance",
        sexe: Sexe.MASCULIN
      }
    ]
  }
];
