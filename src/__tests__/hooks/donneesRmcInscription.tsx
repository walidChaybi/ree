import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";

export const formulaireValideMaisNonAutorise_1: IRMCActeInscriptionForm = {
  titulaire: {
    nom: "",
    prenom: "",
    paysNaissance: "",
    dateNaissance: { jour: "", mois: "", annee: "" }
  },
  datesDebutFinAnnee: {
    dateDebut: { jour: "", mois: "", annee: "" },
    dateFin: { jour: "", mois: "", annee: "" }
  },
  registreRepertoire: {
    registre: {
      natureActe: "NAISSANCE",
      familleRegistre: "",
      pocopa: "",
      anneeRegistre: "",
      registreSupport: {
        supportUn: "",
        supportDeux: ""
      },
      numeroActe: {
        numeroActeOuOrdre: "",
        numeroBisTer: "",
        etActesSuivants: false
      }
    },
    repertoire: {
      numeroInscription: {
        anneeInscription: "",
        numero: ""
      },
      typeRepertoire: "",
      natureInscription: "",
      etInscriptionsSuivantes: false
    },
    evenement: {
      dateEvenement: { jour: "", mois: "", annee: "" },
      paysEvenement: ""
    }
  }
};

export const formulaireValideMaisNonAutorise_2: IRMCActeInscriptionForm = {
  titulaire: {
    nom: "",
    prenom: "",
    paysNaissance: "",
    dateNaissance: { jour: "", mois: "", annee: "" }
  },
  datesDebutFinAnnee: {
    dateDebut: { jour: "", mois: "", annee: "" },
    dateFin: { jour: "", mois: "", annee: "" }
  },
  registreRepertoire: {
    registre: {
      natureActe: "",
      familleRegistre: "",
      pocopa: "",
      anneeRegistre: "",
      registreSupport: {
        supportUn: "",
        supportDeux: ""
      },
      numeroActe: {
        numeroActeOuOrdre: "",
        numeroBisTer: "",
        etActesSuivants: false
      }
    },
    repertoire: {
      numeroInscription: {
        anneeInscription: "",
        numero: ""
      },
      typeRepertoire: "",
      natureInscription: "",
      etInscriptionsSuivantes: false
    },
    evenement: {
      dateEvenement: { jour: "", mois: "", annee: "" },
      paysEvenement: ""
    }
  }
};
