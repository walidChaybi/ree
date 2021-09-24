import { DecisionAnnulation } from "../../model/etatcivil/enum/DecisionAnnulation";
import { Nationalite } from "../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../model/etatcivil/enum/Sexe";
import { StatutPacs } from "../../model/etatcivil/enum/StatutPacs";
import { TypeAutorite } from "../../model/etatcivil/enum/TypeAutorite";
import { IFichePacs } from "../../model/etatcivil/pacs/IFichePacs";

export const pacsModificationNotaire = {
  hasTechnicalError: false,
  hasBusinessError: false,
  status: 200,
  url:
    "/rece-etatcivil-api/v1/repertoirecivil/pacs/89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
  data: {
    id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    numero: "123456",
    annee: "2018",
    dateDerniereMaj: 1606381200000,
    dateDerniereDelivrance: 1609318800000,
    statut: "ENREGISTRE",
    dateEnregistrementParAutorite: 1606381200000,
    dateInscription: 1607036400000,
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
        dateEvenement: { annee: "2020" },
        motif: "",
        dateStatut: 1618480800000,
        villeEvenement: "nantes",
        departementEvenement: "Pays de Loire",
        paysEvenement: "France",
        complementMotif: ""
      }
    ],
    personnes: []
  },
  errors: []
};

export const pacsModificationNotaireMap: IFichePacs = {
  personnes: [],
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: new Date("2020-11-26"),
  dateDerniereDelivrance: new Date("2020-12-30"),
  statut: StatutPacs.ENREGISTRE,
  dateEnregistrementParAutorite: new Date("1970-01-19"),
  dateInscription: new Date("2020-12-04"),
  autorite: {
    typeAutorite: TypeAutorite.NOTAIRE,
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
  annulation: undefined,
  dissolution: undefined,
  modifications: [
    {
      date: 1611334469000,
      dateEffet: 1611334469000,
      autorite: {
        typeAutorite: TypeAutorite.NOTAIRE,
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
        typeAutorite: TypeAutorite.JURIDICTION,
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
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.FEMININ,
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
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.MASCULIN,
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
      statut: "Actif",
      dateStatut: 1606381200000,
      statutFicheEvenement: {
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

export const annulationJuridictionMap: IFichePacs = {
  personnes: [],
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e1",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: new Date("2020-11-26"),
  dateDerniereDelivrance: new Date("2020-12-30"),
  statut: StatutPacs.ENREGISTRE,
  dateEnregistrementParAutorite: new Date("1970-01-19"),
  dateInscription: new Date("2020-12-04"),
  autorite: {
    typeAutorite: TypeAutorite.JURIDICTION,
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
      typeAutorite: TypeAutorite.JURIDICTION,
      ville: "Paris",
      pays: "France",
      typeJuridiction: "Greffe du tribunal"
    },
    enrolementRG: "xxx",
    enrolementPortalis: "yyy"
  },
  dissolution: undefined,
  modifications: undefined,
  partenaires: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Durel",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.FEMININ,
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
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.MASCULIN,
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

export const dissolutionJuridictionMap: IFichePacs = {
  personnes: [],
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e2",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: new Date("2020-11-26"),
  dateDerniereDelivrance: new Date("2020-12-30"),
  statut: StatutPacs.ENREGISTRE,
  dateEnregistrementParAutorite: new Date("1970-01-19"),
  dateInscription: new Date("2020-12-04"),
  autorite: {
    typeAutorite: TypeAutorite.JURIDICTION,
    numeroDepartement: "75",
    ville: "paris",
    libelleDepartement: "",
    pays: "France",
    arrondissement: "18",
    region: "",
    typeJuridiction: "Tribunal judiciaire"
  },
  annulation: undefined,
  dissolution: {
    date: 1606381200000,
    dateEffet: 1606381200000,
    motif: "mariage",
    autorite: {
      typeAutorite: TypeAutorite.JURIDICTION,
      numeroDepartement: "75",
      ville: "paris",
      libelleDepartement: "",
      pays: "France",
      arrondissement: "18",
      region: "",
      typeJuridiction: "Tribunal judiciaire"
    }
  },
  modifications: undefined,
  partenaires: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Durel",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.FEMININ,
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
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.MASCULIN,
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

export const dissolutionPosteMap: IFichePacs = {
  personnes: [],
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e3",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: new Date("2020-11-26"),
  dateDerniereDelivrance: new Date("2020-12-30"),
  statut: StatutPacs.ENREGISTRE,
  dateEnregistrementParAutorite: new Date("1970-01-19"),
  dateInscription: new Date("2020-12-04"),
  autorite: {
    typeAutorite: TypeAutorite.POSTE_ETRANGER,
    numeroDepartement: "75",
    ville: "paris",
    libelleDepartement: "",
    pays: "France",
    arrondissement: "18",
    region: "",
    typePoste: "Ambassade"
  },
  annulation: undefined,
  dissolution: {
    date: 1606381200000,
    dateEffet: 1606381200000,
    motif: "mariage",
    autorite: {
      typeAutorite: TypeAutorite.JURIDICTION,
      numeroDepartement: "75",
      ville: "paris",
      libelleDepartement: "",
      pays: "France",
      arrondissement: "18",
      region: "",
      typeJuridiction: "Tribunal judiciaire"
    }
  },
  modifications: undefined,
  partenaires: [
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Durel",
      villeNaissance: "paris",
      paysNaissance: "france",
      regionNaissance: "normandie",
      arrondissementNaissance: "20",
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.FEMININ,
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
      nationalite: Nationalite.FRANCAISE,
      sexe: Sexe.MASCULIN,
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
