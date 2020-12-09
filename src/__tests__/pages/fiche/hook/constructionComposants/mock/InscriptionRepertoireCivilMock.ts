export const ficheInscriptionRepertoireCivil = {
  nature: "CURATELLE_AMENAGEE",
  mandataires: [
    "MANDATAIRE_JUDICIAIRE_ASSOCIATION",
    "MANDATAIRE_JUDICIAIRE_INDIVIDUEL"
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [
    { id: "0", numero: "2015 - 36547" },
    { id: "1", numero: "2020- 36547" }
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
  dateInscription: 1518652800000,
  duree: {
    nombreDuree: 2,
    uniteDuree: "années",
    autreDuree: "Viager",
    dateFinDeMesure: 1581724800000
  }
};

export const ficheInscriptionRepertoireCivilSansInscriptionsLieesInscriptionsImpactes = {
  nature: "Curatelle aménagée",
  mandataires: [
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  dateInscription: 1518652800,
  duree: {
    nombreDuree: 2,
    autreDuree: "Viager",
    dateFinDeMesure: 1581724800
  }
};

export const ficheInscriptionRepertoireCivilSansUniteDureeInscription = {
  nature: "Curatelle aménagée",
  mandataires: [
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ],
  typeInscription: "RENOUVELLEMENT",
  inscriptionsImpactees: [],
  inscriptionsLiees: [],
  dateInscription: 1518652800,
  duree: {
    autreDuree: "Viager",
    dateFinDeMesure: 1581724800
  }
};

export const ficheInscriptionRepertoireCivilSansDonnees = {};
