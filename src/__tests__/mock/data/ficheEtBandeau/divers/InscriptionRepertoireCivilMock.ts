/* istanbul ignore file */

export const ficheInscriptionRepertoireCivil = {
  nature: { article: "la", libelle: "Protection des majeurs", code: "CURATELLE_AMENAGEE" },
  mandataires: [
    { libelle: "Mandataire judiciaire à la protection des majeurs association" },
    { libelle: "Mandataire judiciaire à la protection des majeurs  individuel" }
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [
    { id: "0", annee: "2015", numero: "36547" },
    { id: "1", annee: "2020", numero: "36548" }
  ],
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
  ],
  dateInscription: new Date(1518652800000),
  duree: {
    nombreDuree: 2,
    uniteDuree: "années",
    dateFinDeMesure: 1581724800000
  },
  statutsFiche: [
    {
      statut: "ACTIF",
      dateEvenement: {
        jour: null,
        mois: null,
        annee: "2020"
      },
      motif: "",
      villeEvenement: "nantes",
      departementEvenement: "Pays de la Loire",
      paysEvenement: "France",
      complementMotif: ""
    }
  ]
};

export const ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes = {
  nature: { article: "la", libelle: "Protection des majeurs", code: "CURATELLE_AMENAGEE" },
  mandataires: ["Mandataire judiciaire à la protection des majeurs association", "Préposé d'établissement"],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  dateInscription: new Date(1518652800000),
  duree: {
    nombreDuree: 2,
    uniteDuree: "années",
    dateFinDeMesure: 1581724800000
  }
};

export const ficheInscriptionRepertoireCivilSansUniteDureeInscription = {
  nature: { article: "la", libelle: "Protection des majeurs", code: "CURATELLE_AMENAGEE" },
  mandataires: ["Mandataire judiciaire à la protection des majeurs association", "Préposé d'établissement"],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  dateInscription: new Date(1518652800000),
  duree: {
    dateFinDeMesure: 1581724800000
  }
};
