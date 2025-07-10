import { IRMCActeInscriptionDto, IRMCActeInscriptionForm, RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { describe, expect, test } from "vitest";

const valeursInitialesRMCActeInscriptionAttendues = {
  registreRepertoire: {
    registre: {
      natureActe: "",
      familleRegistre: "",
      pocopa: { cle: "", libelle: "" },
      anneeRegistre: "",
      registreSupport: {
        supportUn: "",
        supportDeux: ""
      },
      numeroActe: {
        numeroActeOuOrdre: "",
        numeroBisTer: "",
        aPartirDe: false
      }
    },
    repertoire: {
      numeroInscription: { anneeInscription: "", numero: "" },
      typeRepertoire: "",
      natureInscription: ""
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
  datesDebutFinAnnee: {
    dateDebut: {
      jour: "",
      mois: "",
      annee: ""
    },
    dateFin: {
      jour: "",
      mois: "",
      annee: ""
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

const mockValeursRMCActeInscription: IRMCActeInscriptionForm = {
  registreRepertoire: {
    registre: {
      natureActe: "NAISSANCE",
      familleRegistre: "ÉTAT CIVIL",
      anneeRegistre: "2023",
      pocopa: { cle: "", libelle: "" },
      registreSupport: {
        supportUn: "PAPIER",
        supportDeux: "NUMÉRIQUE"
      },
      numeroActe: {
        numeroActeOuOrdre: "42",
        numeroBisTer: "B",
        aPartirDe: true
      }
    },
    repertoire: {
      numeroInscription: { anneeInscription: "2000", numero: "1" },
      typeRepertoire: "PRINCIPAL",
      natureInscription: "contestation"
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
  datesDebutFinAnnee: {
    dateDebut: {
      jour: "01",
      mois: "01",
      annee: "2023"
    },
    dateFin: {
      jour: "31",
      mois: "12",
      annee: "2023"
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

const mockDtoRMCActeInscription: IRMCActeInscriptionDto = {
  registreRepertoire: {
    registre: {
      natureActe: "NAISSANCE",
      familleRegistre: "ÉTAT CIVIL",
      anneeRegistre: "2023",
      pocopa: { cle: undefined, libelle: undefined },
      registreSupport: {
        supportUn: "PAPIER",
        supportDeux: "NUMÉRIQUE"
      },
      numeroActe: {
        numeroActeOuOrdre: "42",
        numeroBisTer: "B",
        aPartirDe: true
      }
    },
    repertoire: {
      numeroInscription: "2000-1",
      typeRepertoire: "PRINCIPAL",
      natureInscription: "contestation"
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
  datesDebutFinAnnee: {
    dateDebut: {
      jour: "01",
      mois: "01",
      annee: "2023"
    },
    dateFin: {
      jour: "31",
      mois: "12",
      annee: "2023"
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
