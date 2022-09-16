import { IRMCActeInscription } from "@model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import {
  seulementAnneeRegistreSaisi,
  seulementDateEvenementSaisi,
  seulementFamilleRegistreSaisi,
  seulementNatureActeSaisi,
  seulementNatureNumeroInscriptionSaisi,
  seulementPaysEvenementSaisi,
  seulementPocopaSaisi,
  seulementTypeRepertoireSaisi
} from "@pages/rechercheMultiCriteres/acteInscription/validation/VerificationRestrictionChampUtiliseSeul";
import {
  familleRegistreCSLouACQSaisieSansPocopa,
  filtreDateCreationInformatiqueSaisiSeul,
  getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur,
  numeroActeSaisiSansFamilleRegistreEtPocopa,
  tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi
} from "@pages/rechercheMultiCriteres/acteInscription/validation/VerificationRestrictionRmcActeInscription";
import {
  dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire,
  prenomSaisiSansNom
} from "@pages/rechercheMultiCriteres/common/validation/VerificationRestrictionRegles";

const SOMETHING = "something";

test("Attendu: getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur fonctionne correctement pour les critères seuls interdits", () => {
  const messageErreur = "Ce critère ne peut être utilisé seul";
  const rmcSaisieNatureActe: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        natureActe: SOMETHING
      }
    },
    titulaire: {}
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisieNatureActe
    )
  ).toBe(messageErreur);

  rmcSaisieNatureActe!.titulaire!.nom = "something else";
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisieNatureActe
    )
  ).toBeUndefined();

  const rmcSaisieFamilleRegistre: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        familleRegistre: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisieFamilleRegistre
    )
  ).toBe(messageErreur);

  const rmcSaisieAnneeRegistre: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        anneeRegistre: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisieAnneeRegistre
    )
  ).toBe(messageErreur);

  const rmcSaisiePocopa: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        pocopa: { value: SOMETHING, str: SOMETHING }
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisiePocopa
    )
  ).toBe(messageErreur);

  const rmcSaisieTypeRepertoire: IRMCActeInscription = {
    registreRepertoire: {
      repertoire: {
        typeRepertoire: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisieTypeRepertoire
    )
  ).toBe(messageErreur);

  const rmcSaisieNumeroInscription: IRMCActeInscription = {
    registreRepertoire: {
      repertoire: {
        numeroInscription: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisieNumeroInscription
    )
  ).toBe(messageErreur);

  const rmcSaisieDateEvenement: IRMCActeInscription = {
    evenement: {
      dateEvenement: { jour: "", mois: "", annee: SOMETHING }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    registreRepertoire: { repertoire: { natureInscription: undefined } }
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisieDateEvenement
    )
  ).toBe(messageErreur);

  const rmcSaisiePaysEvenement: IRMCActeInscription = {
    registreRepertoire: {
      evenement: {
        paysEvenement: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur(
      rmcSaisiePaysEvenement
    )
  ).toBe(messageErreur);
});

test("Attendu: seulementNatureActeSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisieNatureActe: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        natureActe: SOMETHING
      }
    },
    titulaire: {},
    evenement: {
      paysEvenement: ""
    }
  };
  expect(seulementNatureActeSaisi(rmcSaisieNatureActe)).toBeTruthy();
});

test("Attendu: seulementFamilleRegistreSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisieFamilleRegistre: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        familleRegistre: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(seulementFamilleRegistreSaisi(rmcSaisieFamilleRegistre)).toBeTruthy();
});

test("Attendu: seulementAnneeRegistreSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisieAnneeRegistre: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        anneeRegistre: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(seulementAnneeRegistreSaisi(rmcSaisieAnneeRegistre)).toBeTruthy();
});

test("Attendu: seulementPocopaSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisiePocopa: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        pocopa: { value: SOMETHING, str: SOMETHING }
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(seulementPocopaSaisi(rmcSaisiePocopa)).toBeTruthy();
});

test("Attendu: seulementTypeRepertoireSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisieTypeRepertoire: IRMCActeInscription = {
    registreRepertoire: {
      repertoire: {
        typeRepertoire: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(seulementTypeRepertoireSaisi(rmcSaisieTypeRepertoire)).toBeTruthy();
});

test("Attendu: seulementNatureNumeroInscriptionSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisieNumeroInscription: IRMCActeInscription = {
    registreRepertoire: {
      repertoire: {
        numeroInscription: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    seulementNatureNumeroInscriptionSaisi(rmcSaisieNumeroInscription)
  ).toBeTruthy();
});

test("Attendu: seulementDateEvenementSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisieDateEvenement: IRMCActeInscription = {
    evenement: {
      dateEvenement: { jour: "10", mois: "10", annee: SOMETHING }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    registreRepertoire: { repertoire: { natureInscription: undefined } }
  };
  expect(seulementDateEvenementSaisi(rmcSaisieDateEvenement)).toBeTruthy();
});

test("Attendu: seulementPaysEvenementSaisi retourne vraie lorsque le critère est saisi seul", () => {
  const rmcSaisiePaysEvenement: IRMCActeInscription = {
    registreRepertoire: {
      evenement: {
        paysEvenement: SOMETHING,
        dateEvenement: { jour: "", mois: "", annee: "" }
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(seulementPaysEvenementSaisi(rmcSaisiePaysEvenement)).toBeTruthy();
});

test("Attendu: prenomSaisiSansNom fonctionnne correctement", () => {
  const rmcSaisiePrenomSansNom: IRMCActeInscription = {
    titulaire: {
      prenom: SOMETHING,
      paysNaissance: SOMETHING
    }
  };
  expect(prenomSaisiSansNom(rmcSaisiePrenomSansNom)).toBeTruthy();
  rmcSaisiePrenomSansNom.titulaire!.nom = SOMETHING;
  expect(prenomSaisiSansNom(rmcSaisiePrenomSansNom)).toBeFalsy();
});

test("Attendu: dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire fonctionnne correctement", () => {
  const rmcSaisiePaysNaissance: IRMCActeInscription = {
    titulaire: {
      paysNaissance: SOMETHING,
      nom: "",
      prenom: "",
      dateNaissance: { jour: "", mois: "", annee: "" }
    },
    registreRepertoire: { registre: { natureActe: SOMETHING } }
  };
  const rmcSaisieDateNaissance: IRMCActeInscription = {
    titulaire: {
      dateNaissance: { jour: "10", mois: "10", annee: SOMETHING },
      nom: "",
      prenom: "",
      paysNaissance: ""
    }
  };
  expect(
    dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire(rmcSaisiePaysNaissance)
  ).toBeTruthy();
  rmcSaisiePaysNaissance.titulaire!.nom = SOMETHING;
  expect(
    dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire(rmcSaisiePaysNaissance)
  ).toBeFalsy();

  expect(
    dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire(rmcSaisieDateNaissance)
  ).toBeTruthy();
  rmcSaisieDateNaissance.titulaire!.paysNaissance = SOMETHING;
  expect(
    dateOuPaysNaissanceSaisiSansCritereDuBlocTitulaire(rmcSaisieDateNaissance)
  ).toBeFalsy();
});

test("Attendu: filtreDateCreationInformatiqueSaisiSeul fonctionnne correctement", () => {
  const rmcSaisieFiltreDateCreationInformatique: IRMCActeInscription = {
    datesDebutFinAnnee: {
      dateDebut: { jour: "10", mois: "10", annee: SOMETHING },
      dateFin: { jour: "", mois: "", annee: SOMETHING }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    },
    registreRepertoire: { repertoire: { natureInscription: undefined } }
  };
  expect(
    filtreDateCreationInformatiqueSaisiSeul(
      rmcSaisieFiltreDateCreationInformatique
    )
  ).toBeTruthy();
  rmcSaisieFiltreDateCreationInformatique.titulaire!.paysNaissance = SOMETHING;
  expect(
    filtreDateCreationInformatiqueSaisiSeul(
      rmcSaisieFiltreDateCreationInformatique
    )
  ).toBeFalsy();
});

test("Attendu: familleRegistreCSLouACQSaisieSansPocopa fonctionnne correctement", () => {
  const rmcSaisieFamilleRegistre: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        natureActe: SOMETHING,
        familleRegistre: "ACQ",
        pocopa: undefined
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };
  expect(
    familleRegistreCSLouACQSaisieSansPocopa(rmcSaisieFamilleRegistre)
  ).toBeTruthy();

  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.familleRegistre =
    "CSL";
  expect(
    familleRegistreCSLouACQSaisieSansPocopa(rmcSaisieFamilleRegistre)
  ).toBeTruthy();

  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.familleRegistre =
    SOMETHING;
  expect(
    familleRegistreCSLouACQSaisieSansPocopa(rmcSaisieFamilleRegistre)
  ).toBeFalsy();

  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.familleRegistre =
    "CSL";
  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.pocopa = {
    value: SOMETHING,
    str: SOMETHING
  };
  expect(
    familleRegistreCSLouACQSaisieSansPocopa(rmcSaisieFamilleRegistre)
  ).toBeFalsy();

  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.familleRegistre =
    "CSL";
  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.pocopa = undefined;
  rmcSaisieFamilleRegistre.titulaire!.nom = SOMETHING;
  expect(
    familleRegistreCSLouACQSaisieSansPocopa(rmcSaisieFamilleRegistre)
  ).toBeTruthy();

  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.familleRegistre =
    "ACQ";
  rmcSaisieFamilleRegistre.registreRepertoire!.registre!.pocopa = {
    value: SOMETHING,
    str: SOMETHING
  };
  expect(
    familleRegistreCSLouACQSaisieSansPocopa(rmcSaisieFamilleRegistre)
  ).toBeFalsy();
});

test("Attendu: tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi fonctionnne correctement", () => {
  const rmcSaisieNatureEtFamille: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        natureActe: SOMETHING,
        familleRegistre: SOMETHING,
        pocopa: undefined
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };

  expect(
    tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(
      rmcSaisieNatureEtFamille
    )
  ).toBeTruthy();

  rmcSaisieNatureEtFamille.registreRepertoire!.registre!.anneeRegistre =
    SOMETHING;
  expect(
    tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(
      rmcSaisieNatureEtFamille
    )
  ).toBeFalsy();

  const rmcSaisieNatureEtAnnee: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        natureActe: SOMETHING,
        anneeRegistre: SOMETHING,
        pocopa: undefined
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };

  expect(
    tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(
      rmcSaisieNatureEtAnnee
    )
  ).toBeTruthy();

  rmcSaisieNatureEtAnnee.titulaire!.dateNaissance!.annee = SOMETHING;
  expect(
    tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(
      rmcSaisieNatureEtAnnee
    )
  ).toBeFalsy();

  const rmcSaisieFamilleEtAnnee: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        anneeRegistre: SOMETHING,
        familleRegistre: SOMETHING,
        pocopa: undefined
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: ""
    }
  };

  expect(
    tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(
      rmcSaisieFamilleEtAnnee
    )
  ).toBeTruthy();

  rmcSaisieFamilleEtAnnee.titulaire!.nom = SOMETHING;
  expect(
    tripletNatureFamilleAnneeNonSaisiEntierementEtPasDAutreCritereSaisi(
      rmcSaisieFamilleEtAnnee
    )
  ).toBeFalsy();
});

test("Attendu: numeroActeSaisiSansFamilleRegistreEtPocopa fonctionnne correctement", () => {
  const rmcSaisieNumeroActe: IRMCActeInscription = {
    registreRepertoire: {
      registre: {
        natureActe: "",
        anneeRegistre: "",
        pocopa: undefined,
        numeroActe: SOMETHING
      }
    },
    titulaire: {
      dateNaissance: { jour: "", mois: "", annee: "" },
      paysNaissance: undefined
    },
    evenement: {
      paysEvenement: SOMETHING
    }
  };
  expect(
    numeroActeSaisiSansFamilleRegistreEtPocopa(rmcSaisieNumeroActe)
  ).toBeTruthy();

  rmcSaisieNumeroActe.registreRepertoire!.registre!.familleRegistre = SOMETHING;
  expect(
    numeroActeSaisiSansFamilleRegistreEtPocopa(rmcSaisieNumeroActe)
  ).toBeFalsy();

  rmcSaisieNumeroActe.registreRepertoire!.registre!.familleRegistre = "";
  rmcSaisieNumeroActe.registreRepertoire!.registre!.pocopa = {
    value: SOMETHING,
    str: SOMETHING
  };
  expect(
    numeroActeSaisiSansFamilleRegistreEtPocopa(rmcSaisieNumeroActe)
  ).toBeFalsy();

  rmcSaisieNumeroActe.registreRepertoire!.registre!.familleRegistre = SOMETHING;
  rmcSaisieNumeroActe.registreRepertoire!.registre!.pocopa = {
    value: SOMETHING,
    str: SOMETHING
  };
  expect(
    numeroActeSaisiSansFamilleRegistreEtPocopa(rmcSaisieNumeroActe)
  ).toBeFalsy();
});
