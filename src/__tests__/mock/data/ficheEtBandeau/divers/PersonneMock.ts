import { IPersonne } from "@model/etatcivil/commun/Personne";
import { AutresNoms } from "@model/etatcivil/enum/ETypeAutreNom";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";

export const personneMock: IPersonne = {
  id: "53b3e881-9ee1-4ad5-bcfa-de3dec1ce944",
  nom: "Faulkner",
  sexe: Sexe.MASCULIN,
  nationalite: Nationalite.FRANCAISE,
  lieuNaissance: {
    ville: "marseille",
    arrondissement: "2",
    region: "Provence-Aples-côte d'azur",
    pays: "France"
  },
  lieuDeces: {
    ville: "londres",
    arrondissement: "",
    region: "Angleterre",
    pays: "Grande bretagne"
  },
  dateNaissance: {
    jour: "26",
    mois: "2",
    annee: "1980"
  },
  dateDeces: {
    mois: "7",
    annee: "2020"
  },
  autresNoms: [{ nom: "Elisa", type: AutresNoms.getEnumFor("PSEUDONYME") }],
  prenoms: ["Elie_madelaine-henriette", "Maëlla", "Marie-Charlotte"],
  autresPrenoms: ["Solomon"],
  parents: [
    { nom: "Paul", prenoms: ["Justice"] },
    { nom: "Barton", prenoms: ["Buck"] },
    { nom: "Janine", prenoms: ["Alyce"] }
  ],
  enfants: [
    { nom: "Paul", prenoms: ["Justice"] },
    { nom: "Barton", prenoms: ["Buck"] },
    { nom: "Janine", prenoms: ["Alyce"] }
  ],
  rcs: [
    {
      id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
      numero: "3",
      statut: "ACTIF",
      referenceComplete: "RC N° 2020-4"
    },
    {
      id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
      numero: "4",
      statut: "ACTIF",
      referenceComplete: "RC N° 2020-5"
    }
  ],
  rcas: [
    {
      id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e",
      numero: "4094",
      statut: "INACTIF",
      referenceComplete: "RCA N° 2019-492"
    }
  ],
  pacss: [
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
      numero: "123456",
      statut: "INACTIF",
      referenceComplete: "PACS N° 2020-1234507"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df",
      numero: "1234506",
      statut: "ACTIF",
      referenceComplete: "PACS N° 2020-1234508"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
      numero: "1234508",
      statut: "INACTIF",
      referenceComplete: "PACS N° 2020-1234509"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
      numero: "1234509",
      statut: "ACTIF",
      referenceComplete: "PACS N° 2020-1234505"
    },
    {
      id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3",
      numero: "1234510",
      statut: "INACTIF",
      referenceComplete: "PACS N° 2020-1234504"
    }
  ],
  actes: [
    {
      id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      numero: "413",
      nature: NatureActe.getEnumFor("ABSENCE"),
      referenceComplete: "Mariage ACQ.Y.2023.2"
    }
  ]
};
