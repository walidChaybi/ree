import { ICriteresRMCActeInscriptionDto, IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { describe, expect, test } from "vitest";

const valeursInitialesRMCActeInscriptionAttendues: IRMCActeInscriptionForm = {
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
      },
      typeReference: "REGISTRE",
      referenceRECE: {
        annee: "",
        numero: ""
      }
    },
    repertoire: {
      numeroInscription: { annee: "", numero: "" },
      typeRepertoire: "",
      natureInscription: "",
      etInscriptionsSuivantes: false
    },
    evenement: {
      dateEvenement: {
        jour: "",
        mois: "",
        annee: ""
      },
      paysEvenement: ""
    }
  },

  titulaire: {
    nom: "",
    prenom: "",
    paysNaissance: "",
    dateNaissance: {
      jour: "",
      mois: "",
      annee: ""
    }
  }
};

export const mockValeursRMCActeInscription: IRMCActeInscriptionForm = {
  registreRepertoire: {
    registre: {
      natureActe: "NAISSANCE",
      familleRegistre: "ACQ",
      anneeRegistre: "2023",
      pocopa: "",
      registreSupport: {
        supportUn: "PAPIER",
        supportDeux: "NUMÉRIQUE"
      },
      numeroActe: {
        numeroActeOuOrdre: "42",
        numeroBisTer: "B",
        etActesSuivants: true
      },
      typeReference: "RECE",
      referenceRECE: {
        annee: "",
        numero: ""
      }
    },
    repertoire: {
      numeroInscription: { annee: "2000", numero: "1" },
      typeRepertoire: "",
      natureInscription: "contestation",
      etInscriptionsSuivantes: false
    },
    evenement: {
      dateEvenement: {
        jour: "15",
        mois: "06",
        annee: "1990"
      },
      paysEvenement: "FRANCE"
    }
  },
  titulaire: {
    nom: "DUPONT",
    prenom: "JEAN",
    paysNaissance: "FRANCE",
    dateNaissance: {
      jour: "12",
      mois: "03",
      annee: "1985"
    }
  }
};

const mockDtoRMCActeInscription: ICriteresRMCActeInscriptionDto = {
  registreRepertoire: {
    registre: {
      natureActe: "NAISSANCE",
      familleRegistre: "ACQ",
      anneeRegistre: "2023",
      registreSupport: {
        supportUn: "PAPIER",
        supportDeux: "NUMÉRIQUE"
      },
      numeroActe: {
        numeroActeOuOrdre: "42",
        numeroBisTer: "B",
        etActesSuivants: true
      }
    },
    repertoire: {
      numeroInscription: "2000-1",
      natureInscription: "contestation",
      etInscriptionsSuivantes: false
    },
    evenement: {
      dateEvenement: {
        jour: "15",
        mois: "06",
        annee: "1990"
      },
      paysEvenement: "FRANCE"
    }
  },
  titulaire: {
    nom: "DUPONT",
    prenom: "JEAN",
    paysNaissance: "FRANCE",
    dateNaissance: {
      jour: "12",
      mois: "03",
      annee: "1985"
    }
  }
};

describe("Test du FORM ", () => {
  test("LORSQUE valeursInitiales est appelé, ALORS le bon objet par defaut est renvoyé", () => {
    const valeuresInitiales = RMCActeInscriptionForm.valeursInitiales();

    expect(valeuresInitiales).toStrictEqual(valeursInitialesRMCActeInscriptionAttendues);
  });

  test("LORSQUE versDto est appelé avec une valeur, ALORS un DTO bien construit est généré", () => {
    const dto = RMCActeInscriptionForm.versDto(mockValeursRMCActeInscription);

    expect(dto).toStrictEqual(mockDtoRMCActeInscription);
  });
});
