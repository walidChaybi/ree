import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import {
  filtreDateCreationInformatiqueSaisiSeul,
  getMessageSiVerificationRestrictionRmcRequeteEnErreur,
  nomSaisiSansDateNaissance,
  typeRequeteSaisiSansSousTypeOuStatut
} from "@pages/rechercheMultiCriteres/requete/validation/VerificationRestrictionRmcRequete";

const SOMETHING = "something";

test("Attendu: getMessageSiVerificationRestrictionRmcRequeteEnErreur fonctionne correctement", () => {
  const rmcSaisieTypeRequete: IRMCRequete = {
    requete: {
      typeRequete: SOMETHING,
      sousTypeRequete: undefined,
      numeroTeledossier: ""
    },
    titulaire: {
      nom: ""
    },
    datesDebutFinAnnee: {
      dateDebut: undefined,
      dateFin: {
        jour: "10",
        mois: "10",
        annee: "2022"
      }
    }
  };
  expect(
    getMessageSiVerificationRestrictionRmcRequeteEnErreur(rmcSaisieTypeRequete)
  ).toBe(
    "Les critères Type, sous-type et statut de requête doivent être renseignés ensemble"
  );

  rmcSaisieTypeRequete.requete!.sousTypeRequete = SousTypeDelivrance.RDD;
  rmcSaisieTypeRequete.requete!.statutRequete = StatutRequete.A_SIGNER;
  expect(
    getMessageSiVerificationRestrictionRmcRequeteEnErreur(rmcSaisieTypeRequete)
  ).toBeUndefined();
});

test("Attendu: typeRequeteSaisiSansSousTypeOuStatut fonctionne correctement", () => {
  const rmcSaisieTypeRequete: IRMCRequete = {
    requete: {
      typeRequete: SOMETHING,
      sousTypeRequete: undefined,
      numeroTeledossier: "",
      statutRequete: undefined
    },
    titulaire: {
      nom: ""
    },
    datesDebutFinAnnee: {
      dateDebut: undefined,
      dateFin: {
        jour: "10",
        mois: "10",
        annee: "2022"
      }
    }
  };
  expect(
    typeRequeteSaisiSansSousTypeOuStatut(rmcSaisieTypeRequete)
  ).toBeTruthy();

  rmcSaisieTypeRequete.requete!.sousTypeRequete = SousTypeDelivrance.RDD;
  expect(
    typeRequeteSaisiSansSousTypeOuStatut(rmcSaisieTypeRequete)
  ).toBeTruthy();

  rmcSaisieTypeRequete.requete!.statutRequete = StatutRequete.A_SIGNER;
  expect(
    typeRequeteSaisiSansSousTypeOuStatut(rmcSaisieTypeRequete)
  ).toBeFalsy();
});

test("Attendu: nomSaisiSansDateNaissance fonctionne correctement", () => {
  const rmcSaisieTypeRequete: IRMCRequete = {
    requete: {
      typeRequete: SOMETHING,
      sousTypeRequete: undefined,
      numeroTeledossier: ""
    },
    titulaire: {
      nom: SOMETHING,
      dateNaissance: { annee: "" }
    },
    datesDebutFinAnnee: {
      dateDebut: undefined,
      dateFin: {
        jour: "10",
        mois: "10",
        annee: "2022"
      }
    }
  };
  expect(nomSaisiSansDateNaissance(rmcSaisieTypeRequete)).toBeTruthy();

  rmcSaisieTypeRequete.titulaire!.dateNaissance!.annee = "2010";
  expect(nomSaisiSansDateNaissance(rmcSaisieTypeRequete)).toBeFalsy();
});

test("Attendu: filtreDateCreationInformatiqueSaisiSeul fonctionne correctement", () => {
  const rmcSaisieTypeRequete: IRMCRequete = {
    requete: {
      typeRequete: "",
      sousTypeRequete: undefined,
      numeroTeledossier: ""
    },
    titulaire: {
      nom: "",
      dateNaissance: { annee: "" }
    },
    datesDebutFinAnnee: {
      dateDebut: { jour: "", mois: "", annee: "2021" },
      dateFin: {
        jour: "10",
        mois: "10",
        annee: "2022"
      }
    }
  };
  expect(
    filtreDateCreationInformatiqueSaisiSeul(rmcSaisieTypeRequete)
  ).toBeTruthy();

  rmcSaisieTypeRequete.titulaire!.dateNaissance!.annee = "2010";
  expect(
    filtreDateCreationInformatiqueSaisiSeul(rmcSaisieTypeRequete)
  ).toBeFalsy();
});
