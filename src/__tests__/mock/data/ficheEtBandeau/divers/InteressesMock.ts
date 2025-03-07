import { FicheRcDecisionNotaire } from "@mock/data/ficheRC";
import { ficheRcaDecisionJuridictionEtrangere } from "@mock/data/ficheRCA";
import { IFicheRcDto, IFicheRcaDto } from "@model/etatcivil/rcrca/FicheRcRca";

export const ficheDeuxInteresseNumeroOrdreNonOrdonne: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  interesses: [
    {
      numeroOrdreSaisi: 2,
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "ETRANGERE",
      autreNoms: ["favarotti"],
      autrePrenoms: [],
      prenoms: [
        { valeur: "Enrico", numeroOrdre: 2 },
        { valeur: "Pablo", numeroOrdre: 3 },
        { valeur: "Flavio", numeroOrdre: 1 }
      ],
      dateNaissance: {
        jour: "25",
        mois: "05",
        annee: "1980"
      },

      sexe: "MASCULIN"
    },
    {
      numeroOrdreSaisi: 1,
      nomFamille: "Nomfamille",
      villeNaissance: "Ville Naissance",
      paysNaissance: "France",
      regionNaissance: "Ile de france",
      arrondissementNaissance: "",
      nationalite: "FRANCAISE",
      autreNoms: [],
      autrePrenoms: ["AutreP1", "AutreP2"],
      prenoms: [{ valeur: "P1", numeroOrdre: 0 }],
      dateNaissance: {
        jour: "07",
        mois: "12",
        annee: "1972"
      },

      sexe: "MASCULIN"
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

export const ficheUnInteressePrenomNonOrdonne: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  interesses: [
    {
      numeroOrdreSaisi: 2,
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "ETRANGERE",
      autreNoms: ["favarotti", "favarotti2"],
      autrePrenoms: ["autreP1", "autreP2"],
      prenoms: [
        { valeur: "Enrico", numeroOrdre: 2 },
        { valeur: "Pablo", numeroOrdre: 3 },
        { valeur: "Flavio", numeroOrdre: 1 }
      ],
      dateNaissance: {
        jour: "25",
        mois: "05",
        annee: "1980"
      },

      sexe: "MASCULIN"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceFranceSansArrondissement: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  interesses: [
    {
      numeroOrdreSaisi: 0,
      nomFamille: "",
      dateNaissance: { annee: "2020" },
      villeNaissance: "Nantes",
      paysNaissance: "France",
      regionNaissance: "Pays de la Loire",
      arrondissementNaissance: "",
      sexe: "INCONNU",
      nationalite: "INCONNUE"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  interesses: [
    {
      numeroOrdreSaisi: 0,
      nomFamille: "",
      dateNaissance: { annee: "2020" },
      villeNaissance: "Lyon",
      paysNaissance: "France",
      regionNaissance: "Auvergne-Rhône-Alpes",
      arrondissementNaissance: "02",
      sexe: "INCONNU",
      nationalite: "INCONNUE"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  interesses: [
    {
      numeroOrdreSaisi: 0,
      nomFamille: "",
      dateNaissance: { annee: "2020" },
      villeNaissance: "Paris",
      paysNaissance: "France",
      regionNaissance: "",
      arrondissementNaissance: "02",
      sexe: "INCONNU",
      nationalite: "INCONNUE"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceALEtrangerSansRegion: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  interesses: [
    {
      numeroOrdreSaisi: 0,
      nomFamille: "",
      dateNaissance: { annee: "2020" },
      villeNaissance: "Berlin",
      paysNaissance: "Allemagne",
      regionNaissance: "",
      arrondissementNaissance: "02",
      sexe: "INCONNU",
      nationalite: "INCONNUE"
    }
  ]
};

export const ficheUnInteresseVilleNaissanceALEtrangerAvecRegion: IFicheRcDto = {
  ...FicheRcDecisionNotaire,
  interesses: [
    {
      numeroOrdreSaisi: 0,
      nomFamille: "",
      dateNaissance: { annee: "2020" },
      villeNaissance: "Berlin",
      paysNaissance: "Allemagne",
      regionNaissance: "RegionBerlin",
      arrondissementNaissance: "02",
      sexe: "INCONNU",
      nationalite: "INCONNUE"
    }
  ]
};

export const ficheUnInteresseLieuDecesDateDeces: IFicheRcaDto = {
  ...ficheRcaDecisionJuridictionEtrangere,
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
      nationalite: "ETRANGERE",
      autreNoms: ["favarotti", "favarotti2"],
      autrePrenoms: ["autreP1", "autreP2"],
      prenoms: [
        { valeur: "Enrico", numeroOrdre: 2 },
        { valeur: "Pablo", numeroOrdre: 3 },
        { valeur: "Flavio", numeroOrdre: 1 }
      ],
      dateNaissance: {
        jour: "25",
        mois: "05",
        annee: "1980"
      },
      sexe: "MASCULIN"
    }
  ]
};
