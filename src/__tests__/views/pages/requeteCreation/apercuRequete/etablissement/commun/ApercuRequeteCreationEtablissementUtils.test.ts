import {
  ANALYSE_MARGINALE,
  ANNEE,
  DATE_NAISSANCE,
  ETAT_CANTON_PROVINCE,
  JOUR,
  LIEU_DE_NAISSANCE,
  MOIS,
  NOM,
  PAYS_NAISSANCE,
  PRENOMS,
  SEXE,
  TITULAIRE,
  VILLE_NAISSANCE
} from "@composant/formulaire/ConstantesNomsForm";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ISaisieProjetPostulantForm } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { estModifieBulletinIdentification } from "@pages/requeteCreation/apercuRequete/etablissement/commun/ApercuRequeteCreationEtablissementUtils";

describe("Test la modification des donnees du BI.", () => {
  const SAISIE_PROJET = {
    [TITULAIRE]: {
      [ANALYSE_MARGINALE]: {
        [NOM]: "Nom",
        [PRENOMS]: {
          prenom1: "Prenom1",
          prenom2: "Prenom2"
        }
      },
      [SEXE]: "MASCULIN",
      [DATE_NAISSANCE]: {
        [JOUR]: "01",
        [MOIS]: "01",
        [ANNEE]: "2000"
      },
      [LIEU_DE_NAISSANCE]: {
        [VILLE_NAISSANCE]: "Ville",
        [ETAT_CANTON_PROVINCE]: "Region",
        [PAYS_NAISSANCE]: "Pays"
      }
    }
  } as any as ISaisieProjetPostulantForm;

  const PROJET_ACTE = {
    analyseMarginales: [
      {
        dateDebut: new Date(),
        titulaires: [{ nom: "Nom", prenoms: ["Prenom1", "Prenom2"] }]
      }
    ],
    titulaires: [
      {
        sexe: "MASCULIN",
        naissance: {
          jour: 1,
          mois: 1,
          annee: 2000,
          ville: "Ville",
          region: "Region",
          pays: "Pays"
        }
      }
    ]
  } as any as IProjetActe;

  test("DOIT renvoyer 'false' QUAND le projet d'acte est undefined.", async () => {
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, undefined)
    ).toBeFalsy();
  });

  test("DOIT renvoyer 'false' QUAND les données de la saisie sont identiques aux données du projet d'acte.", async () => {
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeFalsy();
  });

  test("DOIT renvoyer 'true' QUAND la saisie du nom de l'analyse marginale diffère du projet d'acte.", async () => {
    SAISIE_PROJET.titulaire.analyseMarginale.nom = "Test";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.analyseMarginale.nom = "Nom";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeFalsy();
  });

  test("DOIT renvoyer 'true' QUAND la saisie des prénoms de l'analyse marginale diffère du projet d'acte.", async () => {
    SAISIE_PROJET.titulaire.analyseMarginale.prenoms.prenom1 = "Test";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.analyseMarginale.prenoms.prenom1 = "Prenom1";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeFalsy();
  });

  test("DOIT renvoyer 'true' QUAND la saisie du sexe diffère du projet d'acte.", async () => {
    SAISIE_PROJET.titulaire.sexe = "FEMININ";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.sexe = "MASCULIN";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeFalsy();
  });

  test("DOIT renvoyer 'true' QUAND la saisie de la date de naissance diffère du projet d'acte.", async () => {
    SAISIE_PROJET.titulaire.dateNaissance.jour = "02";
    SAISIE_PROJET.titulaire.dateNaissance.mois = "02";
    SAISIE_PROJET.titulaire.dateNaissance.annee = "2002";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.dateNaissance.jour = "01";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.dateNaissance.mois = "01";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.dateNaissance.annee = "2000";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeFalsy();
  });

  test("DOIT renvoyer 'true' QUAND la saisie du lieu de naissance diffère du projet d'acte.", async () => {
    SAISIE_PROJET.titulaire.lieuNaissance.villeNaissance = "Test";
    SAISIE_PROJET.titulaire.lieuNaissance.etatCantonProvince = "Test";
    SAISIE_PROJET.titulaire.lieuNaissance.paysNaissance = "Test";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.lieuNaissance.villeNaissance = "Ville";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.lieuNaissance.etatCantonProvince = "Region";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeTruthy();
    SAISIE_PROJET.titulaire.lieuNaissance.paysNaissance = "Pays";
    expect(
      estModifieBulletinIdentification(SAISIE_PROJET, PROJET_ACTE)
    ).toBeFalsy();
  });
});
