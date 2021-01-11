/* istanbul ignore file */

export const ficheDeuxInteresseNumeroOrdreNonOrdonne = {
  interesses: [
    {
      numeroOrdreSaisi: 2,
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "Etrangère",
      autreNoms: ["favarotti"],
      autrePrenoms: [],
      prenoms: [
        { prenom: "Enrico", numeroOrdre: 2 },
        { prenom: "Pablo", numeroOrdre: 3 },
        { prenom: "Flavio", numeroOrdre: 1 }
      ],
      dateNaissance: {
        jour: "25",
        mois: "05",
        annee: "1980"
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
      prenoms: [{ prenom: "P1", numeroOrdre: 0 }],
      dateNaissance: {
        jour: "07",
        mois: "12",
        annee: "1972"
      },

      sexe: "Masculin"
    }
  ],
  mariageInteresses: {
    villeMariage: "villeMariage",
    arrondissementMariage: "08",
    regionMariage: "regionMariage",
    paysMariage: "paysMariage",
    dateMariage: {
      jour: "01",
      mois: "12",
      annee: "2020"
    },
    aletranger: false
  }
};

export const ficheUnInteressePrenomNonOrdonne = {
  interesses: [
    {
      numeroOrdreSaisi: 2,
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "Etrangère",
      autreNoms: ["favarotti", "favarotti2"],
      autrePrenoms: ["autreP1", "autreP2"],
      prenoms: [
        { prenom: "Enrico", numeroOrdre: 2 },
        { prenom: "Pablo", numeroOrdre: 3 },
        { prenom: "Flavio", numeroOrdre: 1 }
      ],
      dateNaissance: {
        jour: "25",
        mois: "05",
        annee: "1980"
      },

      sexe: "Masculin"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceFranceSansArrondissement = {
  interesses: [
    {
      villeNaissance: "Nantes",
      paysNaissance: "France",
      regionNaissance: "Pays de la Loire",
      arrondissementNaissance: ""
    }
  ]
};

export const ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis = {
  interesses: [
    {
      villeNaissance: "Lyon",
      paysNaissance: "France",
      regionNaissance: "Auvergne-Rhône-Alpes",
      arrondissementNaissance: "02"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis = {
  interesses: [
    {
      villeNaissance: "Paris",
      paysNaissance: "France",
      regionNaissance: "",
      arrondissementNaissance: "02"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceALEtrangerSansRegion = {
  interesses: [
    {
      villeNaissance: "Berlin",
      paysNaissance: "Allemagne",
      regionNaissance: "",
      arrondissementNaissance: "02"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceALEtrangerAvecRegion = {
  interesses: [
    {
      villeNaissance: "Berlin",
      paysNaissance: "Allemagne",
      regionNaissance: "RegionBerlin",
      arrondissementNaissance: "02"
    }
  ]
};

export const ficheUnInteresseLieuDecesDateDeces = {
  categorie: "RCA",
  interesses: [
    {
      villeDeces: "Berlin",
      paysDeces: "Allemagne",
      regionDeces: "RegionBerlin",
      arrondissementDeces: "02",
      dateDeces: {
        jour: "02",
        mois: "03",
        annee: "2018"
      },

      numeroOrdreSaisi: 2,
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "Etrangère",
      autreNoms: ["favarotti", "favarotti2"],
      autrePrenoms: ["autreP1", "autreP2"],
      prenoms: [
        { prenom: "Enrico", numeroOrdre: 2 },
        { prenom: "Pablo", numeroOrdre: 3 },
        { prenom: "Flavio", numeroOrdre: 1 }
      ],
      dateNaissance: {
        jour: "25",
        mois: "05",
        annee: "1980"
      },
      sexe: "Masculin"
    }
  ]
};
