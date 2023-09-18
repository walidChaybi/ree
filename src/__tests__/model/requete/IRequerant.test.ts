import requeteDelivrance from "@mock/data/requeteDelivrance";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { Requerant } from "@model/requete/IRequerant";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "@pages/requeteDelivrance/saisirRequete/hook/mappingRequeteDelivranceVersFormulaireRDCSC";
test("Attendu: Requerant.setRequerant mandataire", async () => {
  const qualiteMandataire = {
    qualite: Qualite.MANDATAIRE_HABILITE,
    mandataireHabilite: {
      type: TypeMandataireReq.NOTAIRE,
      raisonSociale: "Maître Duflan",
      nature: ""
    }
  };
  requeteDelivrance.requerant.qualiteRequerant = qualiteMandataire;
  const saisieRequeteRdcsc =
    mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);

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
            jour: 25,
            mois: 6,
            annee: 1990
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
      typeRequerant: "MANDATAIRE_HABILITE",
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
          mimeType: "",
          extension: undefined
        },
        type: {
          cle: "00c885c9-2918-46fe-b743-798b1b90e5dd",
          libelle: "Carte professionnelle"
        }
      }
    ]
  };

  expect(saisieRequeteRdcsc).toEqual(attendu);
});

test("Attendu: Requerant.setRequerant institutionnel", async () => {
  const qualiteInstitutionnel = {
    qualite: Qualite.INSTITUTIONNEL,
    institutionnel: {
      type: TypeInstitutionnel.AMBASSADE,
      nomInstitution: "Ambassade de France",
      nature: ""
    }
  };
  requeteDelivrance.requerant.qualiteRequerant = qualiteInstitutionnel;
  const saisieRequeteRdcsc =
    mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);

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
            jour: 25,
            mois: 6,
            annee: 1990
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
          mimeType: "",
          extension: undefined
        },
        type: {
          cle: "00c885c9-2918-46fe-b743-798b1b90e5dd",
          libelle: "Carte professionnelle"
        }
      }
    ]
  };

  expect(saisieRequeteRdcsc).toEqual(attendu);
});

test("Attendu: Requerant.setRequerant interessé", async () => {
  const qualiteParticulier = {
    qualite: Qualite.PARTICULIER,
    particulier: {
      nomUsage: ""
    }
  };
  requeteDelivrance.requerant.qualiteRequerant = qualiteParticulier;
  const saisieRequeteRdcsc =
    mappingRequeteDelivranceVersFormulaireRDCSC(requeteDelivrance);

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
            jour: 25,
            mois: 6,
            annee: 1990
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
          mimeType: "",
          extension: undefined
        },
        type: {
          cle: "00c885c9-2918-46fe-b743-798b1b90e5dd",
          libelle: "Carte professionnelle"
        }
      }
    ]
  };

  expect(saisieRequeteRdcsc).toEqual(attendu);
});

test("Attendu: Requerant.organiserRequerant autreProfessionnel", async () => {
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

test("Attendu: Requerant.organiserRequerant autreProfessionnel sans raison sociale", async () => {
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

test("Attendu: Requerant.organiserRequerant mandataireHabilite", async () => {
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

test("Attendu: Requerant.organiserRequerant mandataireHabilite sans raison sociale", async () => {
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

test("Attendu: Requerant.organiserRequerant institutionnel", async () => {
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

test("Attendu: Requerant.organiserRequerant institutionnel sans nomInstitution", async () => {
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
