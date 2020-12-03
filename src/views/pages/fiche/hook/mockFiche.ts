import { IFicheRc } from "./FicheRcInterfaces";
import { TypeDecision } from "../../../../model/ficheRcRca/TypeDecision";
import { TypeAutorite } from "../../../../model/ficheRcRca/TypeAutorite";
import { Statut } from "../../../../model/Statut";

export const mockFicheRc: IFicheRc = {
  id: "",
  categorie: "rc",
  numero: "2015-123456",
  annee: "2019",
  dateInscription: 1518652800,
  dateDerniereMaj: 1518652800,
  dateDerniereDelivrance: 1518652800,
  alertes: [],
  decision: {
    dateDecision: 1577059200,
    type: TypeDecision.JUGEMENT,
    autorite: {
      type: TypeAutorite.TRIBUNA_DE_GRANDE_INSTANCE,
      numeroDepartement: 69,
      libelleDepartement: "Rhône",
      ville: "Lyon",
      pays: "France",
      arrondissement: 8,
      nomNotaire: "",
      prenomNotaire: "",
      numeroCrpcen: "",
      nomOnac: "",
      prenomOnac: ""
    },
    enrolementRg: "",
    enrolementPortalis: "",
    sourceConfirmation: {
      autorite: {
        type: undefined,
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
      },
      dateDecision: 1584403200,
      enrolementRg: "",
      enrolementPortalis: "",
      type: TypeDecision.ARRET
    }
  },
  mariageInteresses: {
    villeMariage: "",
    regionMariage: "",
    paysMariage: "",
    dateMariage: {
      jour: "01",
      mois: "12",
      annee: "2020"
    },
    aletranger: false
  },
  interesses: [
    {
      nomFamille: "FAVARO",
      villeNaissance: "San remo",
      paysNaissance: "Italie",
      regionNaissance: "",
      arrondissementNaissance: "",
      nationalite: "Etrangère",
      autreNoms: ["FAVAROTTI"],
      autrePrenoms: [],
      prenoms: [
        { prenom: "Enrico", numeroOrdre: 0 },
        { prenom: "Pablo", numeroOrdre: 0 },
        { prenom: "Flavio", numeroOrdre: 0 }
      ],
      dateNaissance: {
        jour: "25",
        mois: "05",
        annee: "1980"
      },

      sexe: "Masculin"
    },
    {
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
  statutsFiche: [
    {
      statut: Statut.ACTIF,
      dateEvenement: {
        jour: "25",
        mois: "07",
        annee: "2020"
      },
      motif: "Décision du procureur",
      villeEvenement: "Marseille",
      departementEvenement: "Bouches-du-rhône",
      paysEvenement: "France",
      complementMotif: ""
    },
    {
      statut: Statut.INACTIF,
      dateEvenement: {
        jour: "17",
        mois: "03",
        annee: "2020"
      },
      motif: "Date de fin de mesure",
      villeEvenement: "Lyon",
      departementEvenement: "Rhône",
      paysEvenement: "France",
      complementMotif: ""
    },
    {
      statut: Statut.ACTIF,
      dateEvenement: {
        jour: "15",
        mois: "02",
        annee: "2018"
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
    autreDuree: "Viager",
    dateFinDeMesure: 1581724800
  },

  // pas presents
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
  ]
};
