import { eachLike } from "@pact-foundation/pact/dsl/matchers";

export const rcPact = {
  annee: "2018",
  numeroRc: "56533",
  nature: "Curatelle aménagée",
  typeInscription: "Renouvellement (RC n° 2015 - 36547)",
  dateInscription: 1518652800,
  dateDerniereMaj: 1583971200,
  dateDerniereDelivrance: 1592092800,
  statutFicheRc: {
    statut: "Actif"
  },
  alertesRc: eachLike({
    alerte: "Date de fin de mesure dépassée",
    dateCreation: 1581807600
  }),
  dureeInscriptionRc: {
    nombreDuree: 2,
    uniteDuree: "ans",
    dateFinDeMesure: 1581724800
  },
  mandataires: eachLike([
    "Mandataire judiciaire à la protection des majeurs association",
    "Préposé d'établissement"
  ]),
  inscriptionsLiees: eachLike({
    typeInscription: "Modification",
    numeroRc: "2017 - 145235",
    idInscription: ""
  }),
  interesses: eachLike({
    nomFamille: "FAVARO",
    autresNoms: eachLike("FAVAROTTI"),
    prenoms: eachLike({ prenom: "Enrico", numeroOrdre: 0 }),
    autresPrenoms: eachLike([]),
    dateDeNaissance: -777168000,
    lieuDeNaissance: "San remo (Italie)",
    nationalite: "Etrangère",
    sexe: "Masculin"
  }),
  decisionRc: {
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
