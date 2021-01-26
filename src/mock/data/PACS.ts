import { IFichePacs } from "../../model/etatcivil/pacs/IFichePacs";
import { StatutPacs } from "../../model/etatcivil/enum/StatutPacs";
import { TypeAutorite } from "../../model/etatcivil/TypeAutorite";
import { Nationalite } from "../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../model/etatcivil/enum/Sexe";

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
    referencePactI: "ref.pact.i",
    dateEnregistrementParAutorite: 1606381200,
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
          { numeroOrdre: 2, prenom: "Matthieu" },
          { numeroOrdre: 1, prenom: "Louis-Philippe" }
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
          { numeroOrdre: 2, prenom: "Sara" },
          { numeroOrdre: 1, prenom: "Marie-Charlotte" }
        ],
        dateNaissance: { jour: "01", mois: "09", annee: "1983" }
      }
    ],
    statutsFiche: [
      {
        statut: "ACTIF",
        dateEvenement: { annee: "2020" },
        motif: "",
        villeEvenement: "nantes",
        departementEvenement: "Pays de Loire",
        paysEvenement: "France",
        complementMotif: ""
      }
    ]
  },
  errors: []
};

export const pacsModificationNotaireMap: IFichePacs = {
  id: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
  numero: "123456",
  annee: "2018",
  dateDerniereMaj: "26/11/2020",
  dateDerniereDelivrance: "30/12/2020",
  statut: StatutPacs.ENREGISTRE,
  referencePactI: "ref.pact.i",
  dateEnregistrementParAutorite: "19/01/1970",
  dateInscription: "04/12/2020",
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
    {
      date: 1606381200000,
      dateEffet: 1606381200000
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
          prenom: "marie charlotte"
        },
        {
          numeroOrdre: 2,
          prenom: "sara"
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
          prenom: "Louis-Philippe"
        },
        {
          numeroOrdre: 2,
          prenom: "Matthieu"
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
      dateEvenement: {
        annee: "2020"
      },
      motif: "",
      villeEvenement: "nantes",
      departementEvenement: "Pays de Loire",
      paysEvenement: "France",
      complementMotif: ""
    }
  ]
};
