import { IPersonne } from "../../../../../../views/pages/fiche/contenu/personne/Personne";
import { EnumTypeAutresNoms } from "../../../../../../views/common/util/enum/EnumAutresNoms";
import { NatureActe } from "../../../../../../views/common/util/enum/NatureActe";

export const personneMock: IPersonne = {
  id: "e7114c57-d00d-48ad-bbee-af2b01e2da63",
  nom: "Faulkner",
  sexe: "MASCULIN",
  nationalite: "FRANCAISE",
  lieuNaissance: {
    jour: 26,
    mois: 2,
    annee: 1980,
    voie: "",
    ville: "marseille",
    arrondissement: "2",
    region: "Provence-Aples-côte d'azur",
    pays: "France"
  },
  lieuDeces: {
    jour: null,
    mois: 7,
    annee: 2020,
    voie: "",
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
  autresNoms: [
    { nom: "Elisa", type: EnumTypeAutresNoms.getEnumFor("PSEUDONYME") }
  ],
  prenoms: ["Elie_madelaine-henriette", "Maëlla", "Marie-Charlotte"],
  autresPrenoms: ["Solomon"],
  parents: [
    { id: null, typeLienParente: "DIRECT", nom: "Paul", prenoms: ["Justice"] },
    { id: null, typeLienParente: "DIRECT", nom: "Barton", prenoms: ["Buck"] },
    { id: null, typeLienParente: "DIRECT", nom: "Janine", prenoms: ["Alyce"] }
  ],
  enfants: [
    { id: null, typeLienParente: "DIRECT", nom: "Paul", prenoms: ["Justice"] },
    { id: null, typeLienParente: "DIRECT", nom: "Barton", prenoms: ["Buck"] },
    { id: null, typeLienParente: "DIRECT", nom: "Janine", prenoms: ["Alyce"] }
  ],
  rcs: [
    { id: "85df1d10-71b7-4336-9463-bb1c5760d1a0", numero: "3" },
    { id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918", numero: "4" }
  ],
  rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63e", numero: "4094" }],
  pacss: [
    { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0", numero: "123456" },
    { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df", numero: "1234506" },
    { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1", numero: "1234508" },
    { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2", numero: "1234509" },
    { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3", numero: "1234510" }
  ],
  actes: [
    {
      id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
      numero: "413",
      nature: NatureActe.getEnumFor("ABSENCE")
    }
  ]
};
