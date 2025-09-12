import { requeteDelivranceRDC } from "@mock/data/requeteDelivrance";
import { ISaisieRDCForm, requerantRDCForm, SaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { IRequerant } from "@model/requete/IRequerant";

import { describe, expect, test } from "vitest";

const requeteSaisie: ISaisieRDCForm = {
  requete: {
    natureActe: "MARIAGE",
    documentDemande: "28580709-06dd-4df2-bf6e-70a9482940a1",
    motif: "DIVORCE_CONTENTIEUX",
    nbExemplaire: 4,
    complementMotif: ""
  },
  evenement: {
    date: {
      jour: "",
      mois: "",
      annee: "1920"
    },
    ville: "Nantes",
    pays: "France"
  },
  titulaires: {
    titulaire1: {
      nomNaissance: "Bahuaud",
      prenom: "Arnaud",
      naissance: {
        date: {
          jour: "",
          mois: "",
          annee: "1992"
        },
        pays: "France"
      }
    },
    titulaire2: {
      nomNaissance: "MERLET",
      prenom: "Amandine",
      naissance: {
        date: {
          jour: "",
          mois: "",
          annee: "1992"
        },
        pays: "France"
      }
    }
  },
  requerant: {
    typeRequerant: "INSTITUTIONNEL",
    nomInstitution: "NomInstit",
    nom: "NOMREPRESENTANT",
    prenom: "PrenomRequerant",
    type: "AMBASSADE",
    nature: "",
    nomUsage: "",
    raisonSociale: "",
    avecNature: false
  },
  mandant: {
    type: "PERSONNE_PHYSIQUE",
    nom: "",
    prenom: "",
    raisonSociale: ""
  },
  lienTitulaire: {
    lien: "TITULAIRE",
    nature: ""
  },
  piecesJustificatives: []
};

const requeteMapAttendu = {
  canal: "COURRIER",
  documentDemande: "28580709-06dd-4df2-bf6e-70a9482940a1",
  evenement: {
    annee: "1920",
    natureActe: "MARIAGE",
    pays: "France",
    ville: "Nantes"
  },
  motif: "DIVORCE_CONTENTIEUX",
  nombreExemplairesDemandes: 4,
  piecesJustificatives: [],
  provenance: "COURRIER",
  requerant: {
    detailQualiteInstitutionnel: {
      nomInstitution: "NomInstit",
      type: "AMBASSADE"
    },
    nomFamille: "NOMREPRESENTANT",
    prenom: "PrenomRequerant",
    qualite: "INSTITUTIONNEL"
  },
  sousType: "RDC",
  titulaires: [
    {
      anneeNaissance: "1992",
      nationalite: "INCONNUE",
      nomNaissance: "Bahuaud",
      paysNaissance: "France",
      position: 1,
      prenoms: [
        {
          numeroOrdre: 1,
          prenom: "Arnaud"
        }
      ],
      sexe: "INCONNU"
    },
    {
      nationalite: "INCONNUE",
      nomNaissance: "MERLET",
      anneeNaissance: "1992",
      paysNaissance: "France",
      position: 2,
      prenoms: [
        {
          numeroOrdre: 1,
          prenom: "Amandine"
        }
      ],
      sexe: "INCONNU"
    }
  ],
  type: "DELIVRANCE"
};

describe("Mapping Requete RDC", () => {
  test("DOIT renvoyer les valeurs par défaut QUAND la requête est null", () => {
    expect(SaisieRDCForm.valeursInitiales(null)).toStrictEqual({
      requete: {
        natureActe: "NAISSANCE",
        documentDemande: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
        motif: "NON_PRECISE_PAR_REQUERANT",
        nbExemplaire: 1,
        complementMotif: ""
      },
      evenement: {
        date: {
          jour: "",
          mois: "",
          annee: ""
        },
        ville: "",
        pays: ""
      },
      titulaires: {
        titulaire1: {
          nomNaissance: "",
          prenom: "",
          naissance: {
            date: {
              jour: "",
              mois: "",
              annee: ""
            },
            pays: ""
          }
        },
        titulaire2: {
          nomNaissance: "",
          prenom: "",
          naissance: {
            date: {
              jour: "",
              mois: "",
              annee: ""
            },
            pays: ""
          }
        }
      },
      requerant: {
        typeRequerant: "TITULAIRE1",
        nom: "",
        prenom: "",
        type: "",
        raisonSociale: "",
        avecNature: false,
        nomInstitution: "",
        nomUsage: "",
        nature: ""
      },
      mandant: {
        type: "PERSONNE_PHYSIQUE",
        nom: "",
        prenom: "",
        raisonSociale: ""
      },
      lienTitulaire: {
        lien: "TITULAIRE",
        nature: ""
      },
      piecesJustificatives: []
    });
  });

  test("DOIT mapper correctement vers le dto", () => {
    expect(SaisieRDCForm.versDto(requeteSaisie)).toStrictEqual(requeteMapAttendu);
  });

  test("DOIT mettre en valeur initiale titulaire 2 QUAND le type requerant est particulier et présent dans les titulaires en position 2", () => {
    const requerant = {
      qualiteRequerant: {
        qualite: {
          nom: "PARTICULIER"
        }
      },
      nomFamille: "Daniel",
      prenom: "Jack"
    } as any as IRequerant;

    const qualiteRequerantTitulaire2 = requerantRDCForm.valeursInitiales(requerant, requeteDelivranceRDC.titulaires);

    expect(qualiteRequerantTitulaire2.typeRequerant).toBe("TITULAIRE2");
  });

  test("DOIT mettre en valeur initiale titulaire 1 QUAND le type requerant est particulier et présent dans les titulaire en position 1", () => {
    const requerant = {
      qualiteRequerant: {
        qualite: {
          nom: "PARTICULIER"
        }
      },
      nomFamille: "Prodesk",
      prenom: "Elodie"
    } as any as IRequerant;
    const qualiteRequerantTitulaire1 = requerantRDCForm.valeursInitiales(requerant, requeteDelivranceRDC.titulaires);

    expect(qualiteRequerantTitulaire1.typeRequerant).toBe("TITULAIRE1");
  });

  test("DOIT mapper correctement le requerant titulaire 1 vers le Dto", () => {
    expect(
      SaisieRDCForm.versDto({ ...requeteSaisie, requerant: { ...requeteSaisie.requerant, typeRequerant: "TITULAIRE1" } })
    ).toStrictEqual({
      ...requeteMapAttendu,
      lienRequerant: {
        typeLienRequerant: "TITULAIRE"
      },
      requerant: {
        nomFamille: "Bahuaud",
        prenom: "Arnaud",
        qualite: "PARTICULIER"
      }
    });
  });

  test("DOIT mapper correctement le requerant titulaire 2 vers le Dto", () => {
    expect(
      SaisieRDCForm.versDto({ ...requeteSaisie, requerant: { ...requeteSaisie.requerant, typeRequerant: "TITULAIRE2" } })
    ).toStrictEqual({
      ...requeteMapAttendu,
      lienRequerant: {
        typeLienRequerant: "TITULAIRE"
      },
      requerant: {
        nomFamille: "MERLET",
        prenom: "Amandine",
        qualite: "PARTICULIER"
      }
    });
  });

  test("DOIT mapper correctement le requerant mandataire vers le Dto", () => {
    expect(
      SaisieRDCForm.versDto({ ...requeteSaisie, requerant: { ...requeteSaisie.requerant, typeRequerant: "MANDATAIRE_HABILITE" } })
    ).toStrictEqual({
      ...requeteMapAttendu,
      lienRequerant: {
        typeLienRequerant: "TITULAIRE"
      },
      mandant: {
        lienMandant: "TITULAIRE",
        typeMandant: "PERSONNE_PHYSIQUE"
      },

      requerant: {
        nomFamille: "NOMREPRESENTANT",
        prenom: "PrenomRequerant",
        qualite: "MANDATAIRE_HABILITE",
        detailQualiteMandataireHabilite: {
          type: "AMBASSADE"
        }
      }
    });
  });
});
