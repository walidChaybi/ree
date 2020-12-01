export const mockFicheRc = {
  idInscription: "",
  categorieInscription: "rc",
  numero: "2015-123456",
  annee: "2019",
  dateInscription: 1518652800,
  dateDerniereMaj: 1518652800,
  dateDerniereDelivrance: 1518652800,
  alertes: [],
  decision: {
    dateDecision: 1577059200,
    type: "Jugement",
    autorite: {
      type: "Tribunal de grande instance",
      numeroDepartement: 69,
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",
      arrondissement: 8,
      nomNotaire: "",
      prenomNotaire: "",
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: "",
      enrolementRg: "",
      enrolementPortails: "",
      dateDecisionEtrangere: 1584403200
    },
    sourceConfirmation: {
      type: "Arrêt",
      dateDecisionEtrangere: 1584403200,
      enrolementRg: "",
      enrolementPortails: "",
      ville: "Marseille",
      arrondissement: 10,
      numeroDepartement: 13,
      libelleDepartement: "Bouches-du-Rhône",
      pays: "France",
      nomNotaire: "",
      prenomNotaire: "",
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
    }
  },
  mariageInteresses: {
    villeMariage: "",
    regionMariage: "",
    paysMariage: "",
    dateMariage: {
      jour: 1,
      mois: 12,
      annee: 2020
    },
    aletranger: false
  },
  interesses: [
    {
      numeroOrdreSaisi: 0,
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "Etrangère",
      autreNoms: ["FAVAROTTI"],
      autrePrenoms: [],
      prenoms: ["Enrico", "Pablo", "Flavio"],
      dateNaissance: {
        jour: 25,
        mois: 5,
        annee: 1980
      },

      sexe: "Masculin"
    },
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Nomfamille",
      villeNaissance: "Ville Naissance",
      paysNaissance: "France",
      regionNaissance: "Ile de france",
      arrondissementNaissance: "",
      nationalite: "Française",
      autreNoms: [],
      autrePrenoms: ["AutreP1", "AutreP2"],
      prenoms: ["P1"],
      dateNaissance: {
        jour: 7,
        mois: 12,
        annee: 1972
      },

      sexe: "Masculin"
    }
  ],
  statutsFiche: [
    {
      statut: "Actif",
      date: {
        jour: 25,
        mois: 7,
        annee: 2020
      },
      motif: "Décision du procureur",
      villeEvenement: "Marseille",
      departementEvenement: "Bouches-du-rhône",
      paysEvenement: "France",
      complementMotif: ""
    },
    {
      statut: "Inactif",
      date: {
        jour: 17,
        mois: 3,
        annee: 2020
      },
      motif: "Date de fin de mesure",
      villeEvenement: "Lyon",
      departementEvenement: "Rhône",
      paysEvenement: "France",
      complementMotif: ""
    },
    {
      statut: "Actif",
      date: {
        jour: 15,
        mois: 2,
        annee: 2018
      },
      motif: "",
      villeEvenement: "Lyon",
      departementEvenement: "Rhône",
      paysEvenement: "France",
      complementMotif: ""
    }
  ],
  nature: "Curatelle aménagée",
  typeInscription: "Renouvellement",
  mandataires: [
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ],
  duree: {
    nombreDuree: 2,
    uniteDuree: "ans",
    dateFinDeMesure: 1581724800
  },

  // pas presents
  numeroRcImpactes: ["2015 - 36547"],
  inscriptionsLiees: [
    {
      typeInscription: "Modification",
      numeroRc: "2017 - 145235",
      idInscription: ""
    },
    {
      typeInscription: "Radiation",
      numeroRc: "2019 - 48596",
      idInscription: ""
    }
  ]
};
