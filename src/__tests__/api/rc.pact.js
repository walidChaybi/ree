import { eachLike } from "@pact-foundation/pact/dsl/matchers";

export const rcPact = {
  nature: "Curatelle aménagée",
  typeInscription: "Renouvellement (RC n° 2015 - 36547)",
  numeroRc: "253",
  dateInscription: 1518652800,
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
