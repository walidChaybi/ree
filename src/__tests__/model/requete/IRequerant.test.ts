import requeteDelivrance from "@mock/data/requeteDelivrance";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { EMimeType } from "@ressources/EMimeType";
import { describe, expect, test } from "vitest";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "../../../views/pages/requeteDelivrance/saisirRequete/hook/mappingRequeteDelivranceVersFormulaireRDCSC";

describe("Test du bloc Postulant de l'onglet Postulant", () => {
  test("Attendu: Requerant.setRequerant mandataire", () => {
    const qualiteMandataire = {
      qualite: Qualite.MANDATAIRE_HABILITE,
      mandataireHabilite: {
        type: TypeMandataireReq.NOTAIRE,
        raisonSociale: "Maître Duflan",
        nature: ""
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteMandataire;
    const saisieRequeteRdcsc = mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);

    const attendu = {
      document: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
      titulaires: {
        titulaire1: {
          noms: {
            nomNaissance: "Prodesk",
            nomUsage: ""
          },
          prenoms: {
            prenom1: "Elodie",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: "",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: ""
          },
          sexe: "FEMININ",
          naissance: {
            dateEvenement: {
              jour: "25",
              mois: "6",
              annee: "1990"
            },
            villeEvenement: "Barcelone",
            paysEvenement: "Espagne"
          },
          nationalite: "ETRANGERE",
          parent1: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          },
          parent2: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          }
        },
        titulaire2: {
          noms: {
            nomNaissance: "",
            nomUsage: ""
          },
          prenoms: {
            prenom1: "",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: "",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: ""
          },
          sexe: "INCONNU",
          naissance: {
            dateEvenement: {
              jour: "",
              mois: "",
              annee: ""
            },
            villeEvenement: "",
            paysEvenement: ""
          },
          nationalite: "ETRANGERE",
          parent1: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          },
          parent2: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          }
        }
      },
      requerant: {
        typeRequerant: "MANDATAIRE",
        mandataire: {
          type: "NOTAIRE",
          nature: "",
          raisonSociale: "Maître Duflan",
          nom: "RUIZ",
          prenom: "Paul"
        },
        institutionnel: {
          type: "",
          nature: "",
          nomInstitution: "",
          nom: "",
          prenom: ""
        },
        autreProfessionnel: {
          nature: "",
          nom: "",
          prenom: "",
          raisonSociale: ""
        },
        particulier: {
          nomNaissance: "",
          nomUsage: "",
          prenom: ""
        }
      },
      adresse: {
        voie: "61 avenue Foch",
        lieuDit: "lieu dit la martinière",
        complementDestinataire: "Appartement 258",
        complementPointGeo: "Batiment Z",
        codePostal: "310 GL24",
        commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
        pays: "France",
        adresseCourriel: "ldubois@wanadoo.fr",
        numeroTelephone: ""
      },
      piecesJointes: [
        {
          base64File: {
            fileName: "Jérome",
            base64String: "",
            taille: 0,
            conteneurSwift: undefined,
            identifiantSwift: undefined,
            mimeType: EMimeType.APPLI_PDF,
            extension: undefined
          },
          type: {
            cle: "877300ab-555a-418f-ab0d-9963610c36e2",
            libelle: "Autorisation de consultation"
          }
        }
      ]
    };

    expect(saisieRequeteRdcsc).toEqual(attendu);
  });

  test("Attendu: Requerant.setRequerant institutionnel", () => {
    const qualiteInstitutionnel = {
      qualite: Qualite.INSTITUTIONNEL,
      institutionnel: {
        type: TypeInstitutionnel.AMBASSADE,
        nomInstitution: "Ambassade de France",
        nature: ""
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteInstitutionnel;
    const saisieRequeteRdcsc = mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);

    const attendu = {
      document: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
      titulaires: {
        titulaire1: {
          noms: {
            nomNaissance: "Prodesk",
            nomUsage: ""
          },
          prenoms: {
            prenom1: "Elodie",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: "",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: ""
          },
          sexe: "FEMININ",
          naissance: {
            dateEvenement: {
              jour: "25",
              mois: "6",
              annee: "1990"
            },
            villeEvenement: "Barcelone",
            paysEvenement: "Espagne"
          },
          nationalite: "ETRANGERE",
          parent1: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          },
          parent2: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          }
        },
        titulaire2: {
          noms: {
            nomNaissance: "",
            nomUsage: ""
          },
          prenoms: {
            prenom1: "",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: "",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: ""
          },
          sexe: "INCONNU",
          naissance: {
            dateEvenement: {
              jour: "",
              mois: "",
              annee: ""
            },
            villeEvenement: "",
            paysEvenement: ""
          },
          nationalite: "ETRANGERE",
          parent1: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          },
          parent2: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          }
        }
      },
      requerant: {
        typeRequerant: "INSTITUTIONNEL",
        mandataire: {
          type: "",
          nature: "",
          raisonSociale: "",
          nom: "",
          prenom: ""
        },
        institutionnel: {
          type: "AMBASSADE",
          nature: "",
          nomInstitution: "Ambassade de France",
          nom: "RUIZ",
          prenom: "Paul"
        },
        autreProfessionnel: {
          nature: "",
          nom: "",
          prenom: "",
          raisonSociale: ""
        },
        particulier: {
          nomNaissance: "",
          nomUsage: "",
          prenom: ""
        }
      },
      adresse: {
        voie: "61 avenue Foch",
        lieuDit: "lieu dit la martinière",
        complementDestinataire: "Appartement 258",
        complementPointGeo: "Batiment Z",
        codePostal: "310 GL24",
        commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
        pays: "France",
        adresseCourriel: "ldubois@wanadoo.fr",
        numeroTelephone: ""
      },
      piecesJointes: [
        {
          base64File: {
            fileName: "Jérome",
            base64String: "",
            taille: 0,
            conteneurSwift: undefined,
            identifiantSwift: undefined,
            mimeType: EMimeType.APPLI_PDF,
            extension: undefined
          },
          type: {
            cle: "877300ab-555a-418f-ab0d-9963610c36e2",
            libelle: "Autorisation de consultation"
          }
        }
      ]
    };

    expect(saisieRequeteRdcsc).toEqual(attendu);
  });

  test("Attendu: Requerant.setRequerant interessé", () => {
    const qualiteParticulier = {
      qualite: Qualite.PARTICULIER,
      particulier: {
        nomUsage: ""
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteParticulier;
    const saisieRequeteRdcsc = mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);

    const attendu = {
      document: "9a51eeaa-df69-46bc-b03b-735eb84197f8",
      titulaires: {
        titulaire1: {
          noms: {
            nomNaissance: "Prodesk",
            nomUsage: ""
          },
          prenoms: {
            prenom1: "Elodie",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: "",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: ""
          },
          sexe: "FEMININ",
          naissance: {
            dateEvenement: {
              jour: "25",
              mois: "6",
              annee: "1990"
            },
            villeEvenement: "Barcelone",
            paysEvenement: "Espagne"
          },
          nationalite: "ETRANGERE",
          parent1: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          },
          parent2: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          }
        },
        titulaire2: {
          noms: {
            nomNaissance: "",
            nomUsage: ""
          },
          prenoms: {
            prenom1: "",
            prenom2: "",
            prenom3: "",
            prenom4: "",
            prenom5: "",
            prenom6: "",
            prenom7: "",
            prenom8: "",
            prenom9: "",
            prenom10: "",
            prenom11: "",
            prenom12: "",
            prenom13: "",
            prenom14: "",
            prenom15: ""
          },
          sexe: "INCONNU",
          naissance: {
            dateEvenement: {
              jour: "",
              mois: "",
              annee: ""
            },
            villeEvenement: "",
            paysEvenement: ""
          },
          nationalite: "ETRANGERE",
          parent1: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          },
          parent2: {
            nomNaissance: "",
            prenoms: {
              prenom1: "",
              prenom2: "",
              prenom3: "",
              prenom4: "",
              prenom5: "",
              prenom6: "",
              prenom7: "",
              prenom8: "",
              prenom9: "",
              prenom10: "",
              prenom11: "",
              prenom12: "",
              prenom13: "",
              prenom14: "",
              prenom15: ""
            }
          }
        }
      },
      requerant: {
        typeRequerant: "PARTICULIER",
        mandataire: {
          type: "",
          nature: "",
          raisonSociale: "",
          nom: "",
          prenom: ""
        },
        institutionnel: {
          type: "",
          nature: "",
          nomInstitution: "",
          nom: "",
          prenom: ""
        },
        autreProfessionnel: {
          nature: "",
          nom: "",
          prenom: "",
          raisonSociale: ""
        },
        particulier: {
          nomNaissance: "RUIZ",
          nomUsage: "",
          prenom: "Paul"
        }
      },
      adresse: {
        voie: "61 avenue Foch",
        lieuDit: "lieu dit la martinière",
        complementDestinataire: "Appartement 258",
        complementPointGeo: "Batiment Z",
        codePostal: "310 GL24",
        commune: "Saint-Germain-de-Tallevende-la-Lande-Vaumont",
        pays: "France",
        adresseCourriel: "ldubois@wanadoo.fr",
        numeroTelephone: ""
      },
      piecesJointes: [
        {
          base64File: {
            fileName: "Jérome",
            base64String: "",
            taille: 0,
            conteneurSwift: undefined,
            identifiantSwift: undefined,
            mimeType: EMimeType.APPLI_PDF,
            extension: undefined
          },
          type: {
            cle: "877300ab-555a-418f-ab0d-9963610c36e2",
            libelle: "Autorisation de consultation"
          }
        }
      ]
    };

    expect(saisieRequeteRdcsc).toEqual(attendu);
  });

  test("Attendu: Requerant.organiserRequerant autreProfessionnel", () => {
    const qualiteAutreProfessionnel = {
      qualite: Qualite.AUTRE_PROFESSIONNEL,
      autreProfessionnel: {
        raisonSociale: "otherPro",
        nature: ""
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteAutreProfessionnel;

    const identiteAttendue = {
      ligne1: "OTHERPRO",
      ligne2: "PAUL RUIZ"
    };

    const requerant = Requerant.composerIdentite(requeteDelivrance.requerant);

    expect(requerant).toEqual(identiteAttendue);
  });

  test("Attendu: Requerant.organiserRequerant autreProfessionnel sans raison sociale", () => {
    const qualiteAutreProfessionnel = {
      qualite: Qualite.AUTRE_PROFESSIONNEL,
      autreProfessionnel: {
        nature: ""
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteAutreProfessionnel;

    const identiteAttendue = {
      ligne1: "PAUL RUIZ",
      ligne2: undefined
    };

    const requerant = Requerant.composerIdentite(requeteDelivrance.requerant);

    expect(requerant).toEqual(identiteAttendue);
  });

  test("Attendu: Requerant.organiserRequerant mandataireHabilite", () => {
    const qualiteMandataireHabilite = {
      qualite: Qualite.MANDATAIRE_HABILITE,
      mandataireHabilite: {
        type: TypeMandataireReq.NOTAIRE,
        raisonSociale: "NotaireAndCo"
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteMandataireHabilite;

    const identiteAttendue = {
      ligne1: "NOTAIREANDCO",
      ligne2: "PAUL RUIZ"
    };

    const requerant = Requerant.composerIdentite(requeteDelivrance.requerant);

    expect(requerant).toEqual(identiteAttendue);
  });

  test("Attendu: Requerant.organiserRequerant mandataireHabilite sans raison sociale", () => {
    const qualiteMandataireHabilite = {
      qualite: Qualite.MANDATAIRE_HABILITE,
      mandataireHabilite: {
        type: TypeMandataireReq.NOTAIRE
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteMandataireHabilite;

    const identiteAttendue = {
      ligne1: "PAUL RUIZ",
      ligne2: undefined
    };

    const requerant = Requerant.composerIdentite(requeteDelivrance.requerant);

    expect(requerant).toEqual(identiteAttendue);
  });

  test("Attendu: Requerant.organiserRequerant institutionnel", () => {
    const qualiteInstitutionnel = {
      qualite: Qualite.INSTITUTIONNEL,
      institutionnel: {
        type: TypeInstitutionnel.AMBASSADE,
        nomInstitution: "Ambassade de France"
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteInstitutionnel;

    const identiteAttendue = {
      ligne1: "AMBASSADE DE FRANCE",
      ligne2: "PAUL RUIZ"
    };

    const requerant = Requerant.composerIdentite(requeteDelivrance.requerant);

    expect(requerant).toEqual(identiteAttendue);
  });

  test("Attendu: Requerant.organiserRequerant institutionnel sans nomInstitution", () => {
    const qualiteInstitutionnel = {
      qualite: Qualite.INSTITUTIONNEL,
      institutionnel: {
        type: TypeInstitutionnel.AMBASSADE
      }
    };
    requeteDelivrance.requerant.qualiteRequerant = qualiteInstitutionnel;

    const identiteAttendue = {
      ligne1: "PAUL RUIZ",
      ligne2: undefined
    };

    const requerant = Requerant.composerIdentite(requeteDelivrance.requerant);

    expect(requerant).toEqual(identiteAttendue);
  });

  test("getNomPrenom - doit gérer un nom complet", () => {
    const requerant = {
      nomFamille: "Dubois",
      prenom: "Marie"
    } as IRequerant;
    expect(Requerant.getNomPrenom(requerant)).toBe("Dubois Marie\n");
  });

  test("getNomPrenom - doit gérer l'absence de prénom", () => {
    const requerant = {
      nomFamille: "Dubois"
    } as IRequerant;
    expect(Requerant.getNomPrenom(requerant)).toBe("Dubois \n");
  });

  test("estTitulaireX - doit vérifier l'égalité exacte des noms", () => {
    const requerant = {
      nomFamille: "Dubois",
      prenom: "Marie"
    } as IRequerant;

    const titulaire = {
      id: "123",
      position: 1,
      nomNaissance: "Dubois",
      prenoms: [{ numeroOrdre: 1, prenom: "Marie" }],
      sexe: "FEMININ",
      nationalite: Nationalite.ETRANGERE
    } as ITitulaireRequete;

    expect(Requerant.estTitulaireX({ requerant, titulaire })).toBe(true);
  });

  test("estTitulaireX - doit vérifier les noms avec casse", () => {
    const requerant = {
      nomFamille: "Dubois",
      prenom: "MARIE"
    } as IRequerant;

    const titulaire = {
      id: "123",
      position: 1,
      nomNaissance: "Dubois",
      prenoms: [{ numeroOrdre: 1, prenom: "marie" }],
      sexe: "FEMININ",
      nationalite: Nationalite.ETRANGERE
    } as ITitulaireRequete;

    expect(Requerant.estTitulaireX({ requerant, titulaire })).toBe(true);
  });
});
