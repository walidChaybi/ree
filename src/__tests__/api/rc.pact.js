import { eachLike } from "@pact-foundation/pact/dsl/matchers";

export const rcPact = {
  id: "7566e16c-2b0e-11eb-adc1-0242ac120002",
  categorie: "rc",
  annee: "2018",
  numero: "56533",
  nature: "Curatelle aménagée",
  typeInscription: "Renouvellement (RC n° 2015 - 36547)",
  dateInscription: 1518652800,
  dateDerniereMaj: 1583971200,
  dateDerniereDelivrance: 1592092800,
  statutsFiche: {
    statut: "Actif"
  },
  alertes: eachLike({
    alerte: "Date de fin de mesure dépassée",
    dateCreation: 1581807600
  }),
  duree: {
    nombreDuree: 2,
    uniteDuree: "ans",
    dateFinDeMesure: 1581724800
  },
  codesMandataires: eachLike(
    "Mandataire judiciaire à la protection des majeurs association"
  ),
  inscriptionsLiees: eachLike({
    typeInscription: "Modification",
    numeroRc: "2017 - 145235",
    idInscription: ""
  }),
  interesses: eachLike({
    nomFamille: "FAVARO",
    autresNoms: eachLike("FAVAROTTI"),
    prenoms: eachLike({ valeur: "Enrico", numeroOrdre: 0 }),
    autresPrenoms: eachLike("AutrePrenom"),
    dateDeNaissance: -777168000,
    villeDeNaissance: "San remo",
    paysDeNaissance: "Italie",
    regionDeNaissance: "",
    arrondissementDeNaissance: "",
    nationalite: "Etrangère",
    sexe: "Masculin"
  }),
  decision: {
    type: "Jugement",
    dateDecision: 1577059200,
    enrolementRg: "",
    enrolementPortalis: "",
    autorite: {
      type: "Tribunal de grande instance",
      ville: "Lyon",
      arrondissement: "8",
      departement: "Rhône(69)"
    },
    confirmation: {
      type: "Arrêt",
      dateDecision: 1584403200,
      enrolementRg: "",
      enrolementPortalis: "",
      autorite: {
        type: "Cour d'appel",
        ville: "Marseille",
        arrondissement: "10",
        departement: "Bouches-du-Rhône(13)"
      }
    }
  }
};
