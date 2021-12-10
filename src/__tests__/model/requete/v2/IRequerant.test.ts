import request from "superagent";
import requeteDelivrance from "../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { Qualite } from "../../../../model/requete/enum/Qualite";
import { TypeInstitutionnel } from "../../../../model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "../../../../model/requete/enum/TypeMandataireReq";
import { IRequerant, Requerant } from "../../../../model/requete/IRequerant";
import { mappingRequeteDelivranceVersFormulaireRDCSC } from "../../../../views/pages/requeteDelivrance/saisirRequete/hook/mappingRequeteDelivranceVersFormulaireRDCSC";
const superagentMock = require("superagent-mock")(request, configRequetes);

test("Attendu: Requerant.setRequerant particulier", async () => {
  const saisieRequeteRdcsc = mappingRequeteDelivranceVersFormulaireRDCSC(
    requeteDelivrance
  );

  const requerantAttendu = {
    adresse: {
      codePostal: "310 GL24",
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      pays: "France",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont"
    },
    courriel: "ldubois@wanadoo.fr",
    nomFamille: "RUIZ",
    prenom: "Paul",
    qualiteRequerant: {
      particulier: {
        nomUsage: ""
      },
      qualite: Qualite.PARTICULIER
    },
    telephone: ""
  } as IRequerant;

  const requerant = Requerant.setRequerant(saisieRequeteRdcsc);

  expect(requerant).toEqual(requerantAttendu);
});

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
  const saisieRequeteRdcsc = mappingRequeteDelivranceVersFormulaireRDCSC(
    requeteDelivrance
  );

  const requerantAttendu = {
    adresse: {
      codePostal: "310 GL24",
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      pays: "France",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont"
    },
    courriel: "ldubois@wanadoo.fr",
    nomFamille: "RUIZ",
    prenom: "Paul",
    qualiteRequerant: qualiteMandataire,
    telephone: ""
  } as IRequerant;

  const requerant = Requerant.setRequerant(saisieRequeteRdcsc);

  expect(requerant).toEqual(requerantAttendu);
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
  const saisieRequeteRdcsc = mappingRequeteDelivranceVersFormulaireRDCSC(
    requeteDelivrance
  );

  const requerantAttendu = {
    adresse: {
      codePostal: "310 GL24",
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      pays: "France",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont"
    },
    courriel: "ldubois@wanadoo.fr",
    nomFamille: "RUIZ",
    prenom: "Paul",
    qualiteRequerant: qualiteInstitutionnel,
    telephone: ""
  } as IRequerant;

  const requerant = Requerant.setRequerant(saisieRequeteRdcsc);

  expect(requerant).toEqual(requerantAttendu);
});

test("Attendu: Requerant.setRequerant interessé", async () => {
  const qualiteParticulier = {
    qualite: Qualite.PARTICULIER,
    particulier: {
      nomUsage: ""
    }
  };
  requeteDelivrance.requerant.qualiteRequerant = qualiteParticulier;
  const saisieRequeteRdcsc = mappingRequeteDelivranceVersFormulaireRDCSC(
    requeteDelivrance
  );

  const requerantAttendu = {
    adresse: {
      codePostal: "310 GL24",
      ligne2: "Appartement 258",
      ligne3: "Batiment Z",
      ligne4: "61 avenue Foch",
      ligne5: "lieu dit la martinière",
      pays: "France",
      ville: "Saint-Germain-de-Tallevende-la-Lande-Vaumont"
    },
    courriel: "ldubois@wanadoo.fr",
    nomFamille: "RUIZ",
    prenom: "Paul",
    qualiteRequerant: qualiteParticulier,
    telephone: ""
  } as IRequerant;

  const requerant = Requerant.setRequerant(saisieRequeteRdcsc);

  expect(requerant).toEqual(requerantAttendu);
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
    premiereLigne: "OTHERPRO",
    deuxiemeLigne: "PAUL RUIZ"
  };

  const requerant = Requerant.organiserIdentite(requeteDelivrance.requerant);

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
    premiereLigne: "PAUL RUIZ",
    deuxiemeLigne: ""
  };

  const requerant = Requerant.organiserIdentite(requeteDelivrance.requerant);

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
    premiereLigne: "NOTAIREANDCO",
    deuxiemeLigne: "PAUL RUIZ"
  };

  const requerant = Requerant.organiserIdentite(requeteDelivrance.requerant);

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
    premiereLigne: "PAUL RUIZ",
    deuxiemeLigne: ""
  };

  const requerant = Requerant.organiserIdentite(requeteDelivrance.requerant);

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
    premiereLigne: "AMBASSADE DE FRANCE",
    deuxiemeLigne: "PAUL RUIZ"
  };

  const requerant = Requerant.organiserIdentite(requeteDelivrance.requerant);

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
    premiereLigne: "PAUL RUIZ",
    deuxiemeLigne: ""
  };

  const requerant = Requerant.organiserIdentite(requeteDelivrance.requerant);

  expect(requerant).toEqual(identiteAttendue);
});

afterAll(() => {
  superagentMock.unset();
});
