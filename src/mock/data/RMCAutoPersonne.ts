export const RMCAutoPersonneResponseAlpha = {
  errors: [],
  url: "/rece-etatcivil-api/v1/acte/rmc",
  headers: {
    "content-range": "0-100/0",
    link: ""
  },
  data: [
    {
      idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7a",
      nom: "PHILIPS",
      autresNoms: null,
      prenoms: ["Yann"],
      jourNaissance: 13,
      moisNaissance: 4,
      anneeNaissance: 1980,
      villeNaissance: "Barcelone",
      paysNaissance: "Espagne",
      sexe: "MASCULIN",
      actesRepertoiresLies: [
        {
          id: "89c9d030-26c3-41d3-bdde-8b4dcc0420da",
          nature: null,
          statut: "INACTIF",
          reference: "PACS - 2011 - 1234580",
          categorieRepertoire: "PACS",
          typeInscription: null
        }
      ]
    },
    {
      idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7b",
      nom: "Philips",
      autresNoms: null,
      prenoms: ["Yann"],
      jourNaissance: 13,
      moisNaissance: 4,
      anneeNaissance: 1980,
      villeNaissance: "Barcelone",
      paysNaissance: "Espagne",
      sexe: "MASCULIN",
      actesRepertoiresLies: [
        {
          id: "89c9d030-26c3-41d3-bdde-8b4dcc0420db",
          nature: null,
          statut: "ACTIF",
          reference: "PACS - 2021 - 1234581",
          categorieRepertoire: "PACS",
          typeInscription: null
        },
        {
          id: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
          nature: "NAISSANCE",
          statut: "VALIDE",
          reference: "ACQ.X.1951.1.681ABC",
          categorieRepertoire: null,
          typeInscription: null
        },
        {
          id: "8c9ea77f-55dc-494f-8e75-b136ac7ce61a",
          nature: "ADOPTION_SIMPLE_ETRANGER_EXEQUATUR",
          statut: "ACTIF",
          reference: "RCA - 2020 - 4010",
          categorieRepertoire: "RCA",
          typeInscription: "INSCRIPTION"
        },
        {
          id: "76b62678-8b06-4442-ad5b-b9207627a6eb",
          nature: "CURATELLE_SIMPLE",
          statut: "ACTIF",
          reference: "RC - 2020 - 11",
          categorieRepertoire: "RC",
          typeInscription: "INSCRIPTION"
        }
      ]
    },
    {
      idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7c",
      nom: "Coscas",
      autresNoms: null,
      prenoms: ["Mathilde", "Murielle"],
      jourNaissance: 1,
      moisNaissance: 1,
      anneeNaissance: 1990,
      villeNaissance: "Dunkerque",
      paysNaissance: "France",
      sexe: "FEMININ",
      actesRepertoiresLies: [
        {
          id: "89c9d030-26h7-41d3-bdde-8b4dcc0420da",
          nature: null,
          statut: "INACTIF",
          reference: "PACS - 2011 - 1234590",
          categorieRepertoire: "PACS",
          typeInscription: null
        }
      ]
    }
  ]
};

export const RMCAutoPersonneResponseBeta = {
  errors: [],
  url: "/rece-etatcivil-api/v1/acte/rmc",
  headers: {
    "content-range": "0-100/0",
    link: ""
  },
  data: [
    {
      idPersonne: "e7114c54-d00d-48ad-bbee-af2b01e2da7d",
      nom: "DUPONT",
      autresNoms: null,
      prenoms: ["Paul"],
      jourNaissance: 4,
      moisNaissance: 3,
      anneeNaissance: 1963,
      villeNaissance: "Dunkerque",
      paysNaissance: "France",
      sexe: "MASCULIN",
      actesRepertoiresLies: [
        {
          id: "89c9d030-26h7-41d3-bdde-8b4dcc0420da",
          nature: null,
          statut: "INACTIF",
          reference: "PACS - 2011 - 1234590",
          categorieRepertoire: "PACS",
          typeInscription: null
        }
      ]
    }
  ]
};
