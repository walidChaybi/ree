import { DecisionAnnulation } from "@model/etatcivil/enum/DecisionAnnulation";
import { ETypeAutorite } from "@model/etatcivil/enum/TypeAutorite";
import { IFichePacsDto } from "@model/etatcivil/pacs/FichePacs";

export const pacsModificationNotaire = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url: "/rece-etatcivil-api/v1/repertoirecivil/pacs/89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
  data: {
    id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    numero: "123456",
    annee: "2018",
    dateDerniereMaj: 1606381200000,
    dateDerniereDelivrance: 1609318800000,
    statut: "ENREGISTRE",
    dateEnregistrementParAutorite: [2020, 11, 26],
    dateInscription: [2020, 12, 4],
    autorite: {
      typeAutorite: "NOTAIRE",
      numeroDepartement: "75",
      ville: "paris",
      libelleDepartement: "",
      pays: "France",
      arrondissement: "18",
      region: "",
      nomNotaire: "Ester",
      prenomNotaire: "dominique",
      numeroCrpcen: "1235467890"
    },
    annulation: null,
    dissolution: null,
    modifications: [
      {
        date: 1611334469000,
        dateEffet: 1611334469000,
        autorite: {
          typeAutorite: "NOTAIRE",
          numeroDepartement: "75",
          ville: "paris",
          libelleDepartement: "",
          pays: "France",
          arrondissement: "18",
          region: "",
          nomNotaire: "Ester",
          prenomNotaire: "dominique",
          numeroCrpcen: "1235467890"
        }
      },
      { date: 1606381200000, dateEffet: 1606381200000 }
    ],
    partenaires: [
      {
        numeroOrdreSaisi: 2,
        nomFamille: "Dupe",
        villeNaissance: "paris",
        paysNaissance: "france",
        regionNaissance: "normandie",
        arrondissementNaissance: "20",
        nationalite: "FRANCAISE",
        sexe: "MASCULIN",
        autreNoms: ["DupDup"],
        autrePrenoms: ["Nabil"],
        prenoms: [
          { numeroOrdre: 2, valeur: "Matthieu" },
          { numeroOrdre: 1, valeur: "Louis-Philippe" }
        ],
        dateNaissance: { jour: "01", mois: "09", annee: "1983" }
      },
      {
        numeroOrdreSaisi: 1,
        nomFamille: "Durel",
        villeNaissance: "paris",
        paysNaissance: "france",
        regionNaissance: "normandie",
        arrondissementNaissance: "20",
        nationalite: "FRANCAISE",
        sexe: "FEMININ",
        autreNoms: ["DuDu"],
        autrePrenoms: ["Natacha"],
        prenoms: [
          { numeroOrdre: 2, valeur: "Sara" },
          { numeroOrdre: 1, valeur: "Marie-Charlotte" }
        ],
        dateNaissance: { jour: "01", mois: "09", annee: "1983" }
      }
    ],
    statutsFiche: [
      {
        statut: "ACTIF",
        statutFicheEvenement: {
          id: "",
          date: { annee: "2020" },
          ville: "nantes",
          region: "Pays de Loire",
          pays: "France"
        },
        motif: "",
        dateStatut: 1618480800000,
        complementMotif: ""
      }
    ],
    personnes: []
  } as IFichePacsDto,
  errors: []
};

const idFichePacs = "89c9d030-26c3-41d3-bdde-8b4dcc0420df";
const fichePacs = {
  data: {
    id: idFichePacs,
    numero: "1234506",
    annee: "2001",
    dateDerniereMaj: 1606374000000,
    dateDerniereDelivrance: 1609311600000,
    statut: "ENREGISTRE",
    dateEnregistrementParAutorite: [2001, 9, 14],
    dateInscription: [2001, 8, 31],
    autorite: {
      typeAutorite: "NOTAIRE",
      numeroDepartement: "75",
      ville: "paris",
      pays: "France",
      arrondissement: "18",
      region: "",
      nomNotaire: "Ester",
      prenomNotaire: "dominique",
      numeroCrpcen: "1235467890"
    },
    annulation: null,
    dissolution: null,
    modifications: null,
    partenaires: [
      {
        numeroOrdreSaisi: 2,
        nomFamille: "Dupe",
        villeNaissance: "paris",
        paysNaissance: "france",
        regionNaissance: "normandie",
        arrondissementNaissance: "20",
        nationalite: "FRANCAISE",
        sexe: "MASCULIN",
        autreNoms: ["DupDup"],
        autrePrenoms: ["Nabil"],
        prenoms: [
          { numeroOrdre: 2, valeur: "Matthieu" },
          { numeroOrdre: 1, valeur: "Louis-Philippe" }
        ],
        dateNaissance: { jour: "01", mois: "09", annee: "1983" }
      },
      {
        numeroOrdreSaisi: 1,
        nomFamille: "Durel",
        villeNaissance: "paris",
        paysNaissance: "france",
        regionNaissance: "normandie",
        arrondissementNaissance: "20",
        nationalite: "FRANCAISE",
        sexe: "FEMININ",
        autreNoms: ["DuDu"],
        autrePrenoms: ["Natacha"],
        prenoms: [
          { numeroOrdre: 2, valeur: "Sara" },
          { numeroOrdre: 1, valeur: "Marie-Charlotte" }
        ],
        dateNaissance: { jour: "01", mois: "09", annee: "1983" }
      }
    ],
    statutsFiche: [
      {
        statut: "ACTIF",
        motif: "",
        statutFicheEvenement: {
          id: "594dcd34-846a-47c7-aed1-94352cb4ea50",
          date: { jour: "13", mois: "9", annee: "1975" },
          ville: "Seoul",
          region: "Sudogwon",
          pays: "Corée du sud"
        },
        complementMotif: "",
        dateStatut: 1618480800000
      }
    ],
    personnes: [
      {
        id: "e7114c57-d00d-48ad-bbee-af2b01e2da63",
        nom: "Faulkner",
        sexe: "MASCULIN",
        nationalite: "FRANCAISE",
        naissance: {
          minute: null,
          heure: null,
          jour: 26,
          mois: 2,
          annee: 1980,
          voie: null,
          ville: "marseille",
          arrondissement: "2",
          region: "Provence-Aples-côte d'azur",
          pays: "France",
          lieuReprise: null
        },
        deces: {
          minute: null,
          heure: null,
          jour: null,
          mois: 7,
          annee: 2020,
          voie: null,
          ville: "londres",
          arrondissement: null,
          region: "Angleterre",
          pays: "Grande bretagne",
          lieuReprise: null
        },
        autresNoms: [{ nom: "Elisa", type: "PSEUDONYME" }],
        prenoms: ["Elie_madelaine-henriette", "Maëlla", "Marie-Charlotte"],
        autresPrenoms: ["Solomon"],
        parents: [],
        enfants: [
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Janine",
            prenoms: ["Alyce"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Barton",
            prenoms: ["Buck"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Paul",
            prenoms: ["Justice"]
          }
        ],
        rcs: [
          {
            id: "85df1d10-71b7-4336-9463-bb1c5760d1a0",
            numero: "3",
            referenceComplete: "RC N° 2020-4"
          },
          {
            id: "a3d1eeb9-a01e-455d-8fc4-ee595bcc3918",
            numero: "4",
            referenceComplete: "RC N° 2020-4"
          }
        ],
        rcas: [],
        pacss: [
          {
            id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
            numero: "1234507",
            referenceComplete: "PACS N° 2020-1234507"
          },
          {
            id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df",
            numero: "1234506",
            referenceComplete: "PACS N° 2020-1234508"
          },
          {
            id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
            numero: "1234508",
            referenceComplete: "PACS N° 2020-1234509"
          }
        ],
        actes: [
          {
            id: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
            numero: "413",
            nature: "ABSENCE"
          }
        ]
      },
      {
        id: "e7114c57-d00d-48ad-bbee-af2b01e2da64",
        nom: "Rose",
        sexe: "FEMININ",
        nationalite: "ETRANGERE",
        naissance: {
          minute: null,
          heure: null,
          jour: 8,
          mois: 6,
          annee: 1960,
          voie: null,
          ville: "tunis",
          arrondissement: null,
          region: "",
          pays: "Tunisie",
          lieuReprise: null
        },
        deces: {
          minute: null,
          heure: null,
          jour: null,
          mois: null,
          annee: 2020,
          voie: null,
          ville: "nantes",
          arrondissement: null,
          region: "Pays de Loire",
          pays: "France",
          lieuReprise: null
        },
        autresNoms: [{ nom: "DUPE", type: "PSEUDONYME" }],
        prenoms: ["Jean-pierre", "Michel"],
        autresPrenoms: [],
        parents: [
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Glenn",
            prenoms: ["Pearl", "Ginger"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Nora",
            prenoms: ["Reed"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Meagan",
            prenoms: ["Emerson"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Turner",
            prenoms: ["Concetta"]
          }
        ],
        enfants: [
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Janine",
            prenoms: ["Alyce"]
          },
          {
            id: null,
            typeLienParente: "DIRECT",
            nom: "Barton",
            prenoms: ["Buck"]
          },
          {
            id: null,
            typeLienParente: "ADOPTION",
            nom: "Kirsten",
            prenoms: ["Louella"]
          }
        ],
        rcs: [{ id: "8244d136-729b-4fd3-b88a-fa1fe30a2214", numero: "2" }],
        rcas: [{ id: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d", numero: "4093" }],
        pacss: [
          { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420df", numero: "1234506" },
          { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1", numero: "1234508" },
          { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2", numero: "1234509" },
          { id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3", numero: "1234510" }
        ],
        actes: [
          {
            id: "d8708d77-a359-4553-be72-1eb5f246d4da",
            numero: "754",
            nature: "RECONNAISSANCE"
          }
        ]
      }
    ],
    paysEnregistrement: "France"
  }
};

export const pacsModificationNotaireMap: IFichePacsDto = {
  ...fichePacs.data,
  personnes: [],
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: new Date("2020-11-26").getTime(),
  dateDerniereDelivrance: new Date("2020-12-30").getTime(),
  statut: "MODIFIE",
  dateEnregistrementParAutorite: [1970, 1, 19],
  dateInscription: [2020, 12, 1],
  autorite: {
    typeAutorite: ETypeAutorite.NOTAIRE,
    numeroDepartement: "75",
    ville: "paris",
    libelleDepartement: "",
    pays: "France",
    arrondissement: "18",
    region: "",
    nomNotaire: "Ester",
    prenomNotaire: "dominique",
    numeroCrpcen: "1235467890"
  },
  annulation: null,
  dissolution: null,
  modifications: [
    {
      date: 1611334469000,
      dateEffet: 1611334469000,
      autorite: {
        typeAutorite: ETypeAutorite.NOTAIRE,
        numeroDepartement: "44",
        ville: "nantes",
        libelleDepartement: "loire-Atlantique",
        pays: "France",
        region: "Pays de la Loire",
        nomNotaire: "De la plume dans le bec",
        prenomNotaire: "Martin",
        numeroCrpcen: "987563141"
      }
    },
    {
      date: 1606381200000,
      dateEffet: 1606381200000,
      autorite: {
        typeAutorite: ETypeAutorite.JURIDICTION,
        numeroDepartement: "75",
        ville: "paris",
        libelleDepartement: "",
        pays: "France",
        arrondissement: "18",
        region: "",
        typeJuridiction: "Tribunal judiciaire"
      }
    }
  ],
  partenaires: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Durel",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "FEMININ",
      autreNoms: ["DuDu", "dudu2"],
      autrePrenoms: ["NatachA", "natacha2"],
      prenoms: [
        {
          numeroOrdre: 1,
          valeur: "marie charlotte"
        },
        {
          numeroOrdre: 2,
          valeur: "sara"
        }
      ],
      dateNaissance: {
        jour: "01",
        mois: "09",
        annee: "1983"
      }
    },
    {
      numeroOrdreSaisi: 2,
      nomFamille: "Dupe",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: ["DupDup"],
      autrePrenoms: ["Nabil"],
      prenoms: [
        {
          numeroOrdre: 1,
          valeur: "Louis-Philippe"
        },
        {
          numeroOrdre: 2,
          valeur: "Matthieu"
        }
      ],
      dateNaissance: {
        jour: "01",
        mois: "09",
        annee: "1983"
      }
    }
  ],
  statutsFiche: [
    {
      statut: "ACTIF",
      dateStatut: 1606381200000,
      statutFicheEvenement: {
        id: "",
        ville: "nantes",
        region: "Pays de Loire",
        pays: "FRANCE",
        date: {
          annee: "2020"
        }
      },
      motif: "",
      complementMotif: ""
    }
  ]
};

export const annulationJuridictionMap: IFichePacsDto = {
  ...fichePacs.data,
  personnes: [],
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: new Date("2020-11-26").getTime(),
  dateDerniereDelivrance: new Date("2020-12-30").getTime(),
  statut: "ANNULE",
  dateEnregistrementParAutorite: [1970, 1, 19],
  dateInscription: [2020, 12, 4],
  autorite: {
    typeAutorite: ETypeAutorite.JURIDICTION,
    numeroDepartement: "75",
    ville: "paris",
    libelleDepartement: "",
    pays: "France",
    arrondissement: "18",
    region: "",
    typeJuridiction: "Tribunal judiciaire"
  },
  annulation: {
    date: 1606381200000,
    dateEffet: 1606381200000,
    type: DecisionAnnulation.JUGEMENT,
    autorite: {
      typeAutorite: ETypeAutorite.JURIDICTION,
      ville: "Paris",
      pays: "France",
      typeJuridiction: "Greffe du tribunal"
    },
    enrolementRG: "xxx",
    enrolementPortalis: "yyy"
  },
  dissolution: null,
  modifications: null,
  partenaires: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Durel",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "FEMININ",
      autreNoms: ["DuDu"],
      autrePrenoms: ["Natacha"],
      prenoms: [
        {
          numeroOrdre: 1,
          valeur: "Marie-Charlotte"
        },
        {
          numeroOrdre: 2,
          valeur: "Sara"
        }
      ],
      dateNaissance: {
        jour: "01",
        mois: "09",
        annee: "1983"
      }
    },
    {
      numeroOrdreSaisi: 2,
      nomFamille: "Dupe",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: ["DupDup"],
      autrePrenoms: ["Nabil"],
      prenoms: [
        {
          numeroOrdre: 1,
          valeur: "Louis-Philippe"
        },
        {
          numeroOrdre: 2,
          valeur: "Matthieu"
        }
      ],
      dateNaissance: {
        jour: "01",
        mois: "09",
        annee: "1983"
      }
    }
  ],
  statutsFiche: []
};

export const dissolutionJuridictionMap: IFichePacsDto = {
  ...fichePacs.data,
  personnes: [],
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: new Date("2020-11-26").getTime(),
  dateDerniereDelivrance: new Date("2020-12-30").getTime(),
  statut: "DISSOUS",
  dateEnregistrementParAutorite: [1970, 1, 19],
  dateInscription: [2020, 12, 1],
  autorite: {
    typeAutorite: ETypeAutorite.JURIDICTION,
    numeroDepartement: "75",
    ville: "paris",
    libelleDepartement: "",
    pays: "France",
    arrondissement: "18",
    region: "",
    typeJuridiction: "Tribunal judiciaire"
  },
  annulation: null,
  dissolution: {
    date: 1606381200000,
    dateEffet: 1606381200000,
    motif: "mariage",
    autorite: {
      typeAutorite: ETypeAutorite.JURIDICTION,
      numeroDepartement: "75",
      ville: "paris",
      libelleDepartement: "",
      pays: "France",
      arrondissement: "18",
      region: "",
      typeJuridiction: "Tribunal judiciaire"
    }
  },
  modifications: null,
  partenaires: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Durel",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "FEMININ",
      autreNoms: ["DuDu"],
      autrePrenoms: ["Natacha"],
      prenoms: [
        {
          numeroOrdre: 1,
          valeur: "Marie-Charlotte"
        },
        {
          numeroOrdre: 2,
          valeur: "Sara"
        }
      ],
      dateNaissance: {
        jour: "01",
        mois: "09",
        annee: "1983"
      }
    },
    {
      numeroOrdreSaisi: 2,
      nomFamille: "Dupe",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: "FRANCAISE",
      sexe: "MASCULIN",
      autreNoms: ["DupDup"],
      autrePrenoms: ["Nabil"],
      prenoms: [
        {
          numeroOrdre: 1,
          valeur: "Louis-Philippe"
        },
        {
          numeroOrdre: 2,
          valeur: "Matthieu"
        }
      ],
      dateNaissance: {
        jour: "01",
        mois: "09",
        annee: "1983"
      }
    }
  ],
  statutsFiche: []
};
