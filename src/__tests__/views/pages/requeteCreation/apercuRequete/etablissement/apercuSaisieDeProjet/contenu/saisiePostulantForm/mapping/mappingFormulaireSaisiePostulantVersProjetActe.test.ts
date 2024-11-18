import { AGE, ANNEE, ARRONDISSEMENT_NAISSANCE, DATE, DATE_NAISSANCE, DEPARTEMENT_NAISSANCE, JOUR, LIEU_DE_NAISSANCE, MOIS, NOM, PAS_DE_PRENOM_CONNU, PAYS_NAISSANCE, PRENOM, PRENOMS, REGION_NAISSANCE, SEXE, VILLE_NAISSANCE } from "@composant/formulaire/ConstantesNomsForm";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { ISaisieParentSousForm } from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { getFiliation, getFiliationNaissance, getFiliationParParent, mapPostulantVersTitulaireProjetActe } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/mapping/mappingFormulaireSaisiePostulantVersProjetActe";
import { describe, expect, test } from "vitest";


const formulaireParentNaissanceEtranger: ISaisieParentSousForm = {
    [NOM]: "Montier",
    [PRENOM]: {
        [PAS_DE_PRENOM_CONNU]: [],
        [PRENOMS]: {
            prenom1: " Nils ",
            prenom2: " Robin "
        },
    },
    [SEXE]: "MASCULIN",
    [DATE_NAISSANCE]: {
        [DATE]: {
            [JOUR]: "12",
            [MOIS]: "04",
            [ANNEE]: "1998",
        },
        [AGE]: "",
      },
    [LIEU_DE_NAISSANCE]: {
        [LIEU_DE_NAISSANCE]: "ETRANGER",
        [VILLE_NAISSANCE]: "New-York",
        [REGION_NAISSANCE]: "New-York Region",
        [DEPARTEMENT_NAISSANCE]: "NYC",
        [ARRONDISSEMENT_NAISSANCE]: "",
        [PAYS_NAISSANCE]: "Etats-Unis",
    },
}

const formulaireParentNaissanceFrance: ISaisieParentSousForm = {
    [NOM]: " Montier ",
    [PRENOM]: {
        [PAS_DE_PRENOM_CONNU]: [],
        [PRENOMS]: {
            prenom1: "Nils",
            prenom2: "Robin"
        },
    },
    [SEXE]: "MASCULIN",
    [DATE_NAISSANCE]: {
        [DATE]: {
            [JOUR]: "",
            [MOIS]: "",
            [ANNEE]: "1998",
        },
        [AGE]: "",
      },
    [LIEU_DE_NAISSANCE]: {
        [LIEU_DE_NAISSANCE]: "FRANCE",
        [VILLE_NAISSANCE]: "Paris",
        [REGION_NAISSANCE]: "Seine-Maritime",
        [DEPARTEMENT_NAISSANCE]: "76",
        [ARRONDISSEMENT_NAISSANCE]: "10",
        [PAYS_NAISSANCE]: "France",
    },
}

const saisieProjetPostulant = {
    projet: {
      type: "Postulant",
      natureActe: "Naissance"
    },
    titulaire: {
      nom: "BRUCE",
      nomSecable: {
        secable: [],
        nomPartie1: "",
        nomPartie2: ""
      },
      prenoms: {
        pasDePrenomConnu: "false",
        prenoms: {
          prenom1: "Willis",
          prenom2: "Sully"
        }
      },
      analyseMarginale: {
        nom: "BRUCE",
        prenoms: {
          prenom1: "Willis",
          prenom2: "Sully"
        }
      },
      identite: "",
      sexe: "MASCULIN",
      dateNaissance: {
        jour: "12",
        mois: "04",
        annee: "1960"
      },
      lieuNaissance: {
        villeNaissance: "New York",
        regionNaissance: "",
        paysNaissance: "Etats Unis",
        neDansMariage: "NON"
      },
      adoptePar: false
    },
    francisationPostulant: {
        prenoms: ""
    },
    parents: {
        parent1: {
            nom: " NORRIS ",
            prenom: {
                pasDePrenomConnu: [],
          prenoms: {
            prenom1: " Chuck ",
            prenom2: "Steeve "
          }
        },
        sexe: "MASCULIN",
        dateNaissance: {
            date: {
            jour: "25",
            mois: "10",
            annee: "1942"
          },
          age: ""
        },
        lieuNaissance: {
            lieuNaissance: "ETRANGER",
            villeNaissance: "Boston",
            regionNaissance: "",
            departementNaissance: "",
            arrondissementNaissance: "",
            paysNaissance: "Etats-Unis"
        }
      },
      parent2: {
        nom: "JOHANSSON",
        prenom: {
            pasDePrenomConnu: [],
          prenoms: {
            prenom1: " Scarlett ",
            prenom2: " Suuuusan "
          }
        },
        sexe: "FEMININ",
        dateNaissance: {
            date: {
            jour: "31",
            mois: "08",
            annee: "1987"
          },
          age: "44"
        },
        lieuNaissance: {
            lieuNaissance: "FRANCE",
            villeNaissance: "Nantes",
            regionNaissance: "",
            departementNaissance: "fzqzdqzdq",
            arrondissementNaissance: "",
            paysNaissance: "France"
        }
      }
    },
    autres: {
        adresse: "FRANCE",
        ville: "Divatte sur Loire",
        arrondissement: "",
        departement: "qzdqzd",
        pays: "France",
        reconnaissance: "LA_MERE",
        declarant: "PERE_ET_MERE",
        autreDeclarant: ""
    },
    acquisition: {
        nature: "NATURALISATION",
        date: {
        jour: "",
        mois: "",
        annee: ""
      }
    }
  }

  const naissancePostulantEvenement = {
    annee: 1960,
    mois: 4,
    jour: 12,
    pays: "Etats Unis",
    ville: "New York",
    region: "",
    neDansLeMariage: false,
  } as IEvenement;




describe("test des fonction de mapping de la saisie postulant", () => {

    test("getFiliationNaissance DOIT renvoyer la filliation naissance pour une naissance a l'etranger", () => {
        const resultat = getFiliationNaissance(formulaireParentNaissanceEtranger);
        expect(resultat.jour).toBe(12);
        expect(resultat.mois).toBe(4);
        expect(resultat.annee).toBe(1998);
        expect(resultat.pays).toBe("Etats-Unis");
        expect(resultat.ville).toBe("New-York");
        expect(resultat.arrondissement).toBeNull();
        expect(resultat.region).toBe("New-York Region");
    });

    test("getFiliationNaissance DOIT renvoyer la filliation naissance pour une naissance en France", () => {
        const resultat = getFiliationNaissance(formulaireParentNaissanceFrance);
        expect(resultat.jour).toBeNull();
        expect(resultat.mois).toBeNull();
        expect(resultat.annee).toBe(1998);
        expect(resultat.pays).toBe("France");
        expect(resultat.ville).toBe("Paris")
        expect(resultat.arrondissement).toBe("10");
        // cas ou ville = Paris donc region = null
        expect(resultat.region).toBeNull();
    })

    test("getFiliationParParent DOIT renvoyer la filliation pour le parent 1", () => {
        const resultat = getFiliationParParent(formulaireParentNaissanceFrance, 1);

        expect(resultat.lienParente).toBe("PARENT");
        expect(resultat.ordre).toBe(1);
        expect(resultat.nom).toBe("Montier");
        expect(resultat.sexe).toBe("MASCULIN");
        expect(resultat.age).toBeNull();
        expect(resultat.prenoms).toStrictEqual(["Nils","Robin"]);
    })

    test("getFiliation DOIT renvoyer les filliations pour les deux parents", () => {
        const resultat = getFiliation(saisieProjetPostulant);

        expect(resultat.length).toBe(2);
        expect(resultat[0].lienParente).toBe("PARENT");
        expect(resultat[0].ordre).toBe(1);
        expect(resultat[0].nom).toBe("NORRIS");
        expect(resultat[0].sexe).toBe("MASCULIN");
        expect(resultat[0].age).toBeNull();
        expect(resultat[0].prenoms).toStrictEqual(["Chuck","Steeve"]);

        expect(resultat.length).toBe(2);
        expect(resultat[1].lienParente).toBe("PARENT");
        expect(resultat[1].ordre).toBe(2);
        expect(resultat[1].nom).toBe("JOHANSSON");
        expect(resultat[1].sexe).toBe("FEMININ");
        expect(resultat[1].age).toBe(44);
        expect(resultat[1].prenoms).toStrictEqual(["Scarlett","Suuuusan"]);
    })

    test("mapPostulantVersTitulaireProjetActe DOIT renvoyer les données relatives au titulaire du projet d'acte", () => {
        const resultat = mapPostulantVersTitulaireProjetActe(saisieProjetPostulant, naissancePostulantEvenement);
        expect(resultat.ordre).toBe(1);
        expect(resultat.nom).toBe("BRUCE");
        expect(resultat.sexe).toBe("MASCULIN");
        expect(resultat.age).toBeNull();
        expect(resultat.prenoms).toStrictEqual(["Willis","Sully"]);
    })

})

