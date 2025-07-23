import { A_NE_PAS_DELIVRER, DESCRIPTION_SAGA, TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import {
  ErreurResult,
  IndexAction,
  aGenreIdentique,
  aGenreIndetermine,
  aNombreTitulairesIncoherent,
  acteAvecAlerteDeTypeANePasDelivrer,
  choixDifferentNonDetenuEtnombreActesSelectionnesDifferentDeUnOuZero,
  estChoixExtraitAvecOuSansFiliation,
  estChoixExtraitPlurilingue,
  estChoixIgnorerRequete,
  nombreActesSelectionnesDifferentDeUn
} from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuUtilEC";
import { expect, test } from "vitest";
import { ReponseAppelNomenclatureTypeAlerte } from "../../../../../../../mock/data/nomenclatures";

const testsCasMultiples = <T>({ casOK, casKO, fonction }: { casOK: T[]; casKO: T[]; fonction: (props: T) => boolean }) => {
  casOK.forEach(cas => expect(fonction(cas)).toBe(true));
  casKO.forEach(cas => expect(fonction(cas)).toBe(false));
};

const testsConditionsCasMultiples = <T>({ casOK, casKO, fonction }: { casOK: T[]; casKO: T[]; fonction: (props: T) => ErreurResult }) => {
  casOK.forEach(cas => {
    const { enErreur } = fonction(cas);
    expect(enErreur).toBe(true);
  });
  casKO.forEach(cas => {
    const { enErreur } = fonction(cas);
    expect(enErreur).toBe(false);
  });
};

// Choix -----------------------------------------------------------------

test("estChoixExtraitAvecOuSansFiliation", () => {
  const casOK = [1, 2];
  const casKO = [0, 3, 4];

  testsCasMultiples({
    casOK,
    casKO,
    fonction: estChoixExtraitAvecOuSansFiliation
  });
});

test("estChoixExtraitPlurilingue", () => {
  const casOK = [3];
  const casKO = [0, 1, 2, 4];

  testsCasMultiples({
    casOK,
    casKO,
    fonction: estChoixExtraitPlurilingue
  });
});

test("estChoixIgnorerRequete", () => {
  const casOK = [3];
  const casKO = [0, 1, 2, 4];

  testsCasMultiples({
    casOK,
    casKO,
    fonction: estChoixIgnorerRequete
  });
});

// Utils -----------------------------------------------------------------

test("aNombreTitulairesIncoherent", () => {
  expect(aNombreTitulairesIncoherent("NAISSANCE", 2)).toBe(true);
  expect(aNombreTitulairesIncoherent("DECES", 2)).toBe(true);
  expect(aNombreTitulairesIncoherent("MARIAGE", 3)).toBe(true);
});

test("aGenreIdentique", () => {
  const casOK = [
    ["FEMININ", "FEMININ"],
    ["MASCULIN", "MASCULIN"]
  ];
  const casKO = [
    ["FEMININ", "MASCULIN"],
    ["INCONNU", "INCONNU"]
  ];

  casOK.forEach(cas => expect(aGenreIdentique(cas[0], cas[1])).toBe(true));
  casKO.forEach(cas => expect(aGenreIdentique(cas[0], cas[1])).toBe(false));
});

test("aGenreIndetermine", () => {
  const casOK = [["FEMININ", "MASCULIN", "INDETERMINE"]];
  const casKO = [["FEMININ", "FEMININ", "MASCULIN", "MASCULIN"]];

  casOK.forEach(cas => expect(aGenreIndetermine(cas)).toBe(true));
  casKO.forEach(cas => expect(aGenreIndetermine(cas)).toBe(false));
});

// Contrôles -------------------------------------------------------------

type casType = {
  actes?: ResultatRMCActe[];
  inscriptions?: TResultatRMCInscription[];
};

test("nombreActesSelectionnesDifferentDeUn", () => {
  const acte = "test" as unknown as ResultatRMCActe;
  const inscription = "test" as unknown as TResultatRMCInscription;
  const casOK: casType[] = [
    {
      actes: undefined,
      inscriptions: undefined
    },
    {
      actes: [],
      inscriptions: []
    },
    {
      actes: [acte],
      inscriptions: [inscription]
    },
    {
      actes: [acte, acte],
      inscriptions: []
    }
  ];
  const casKO: casType[] = [
    {
      actes: [acte],
      inscriptions: []
    }
  ];

  testsConditionsCasMultiples({
    casOK,
    casKO,
    fonction: nombreActesSelectionnesDifferentDeUn
  });
});

test("choixDifferentNonDetenuEtnombreActesSelectionnesDifferentDeUnOuZero", () => {
  const acte = "test" as unknown as ResultatRMCActe;
  const inscription = "test" as unknown as TResultatRMCInscription;
  const casOK: (casType & { indexMenu: number })[] = [
    {
      indexMenu: IndexAction.REQUETE_INCOMPLETE,
      actes: [acte],
      inscriptions: [inscription]
    },
    {
      indexMenu: IndexAction.REQUETE_INCOMPLETE,
      actes: [acte, acte],
      inscriptions: []
    }
  ];
  const casKO: (casType & { indexMenu: number })[] = [
    {
      indexMenu: IndexAction.REQUETE_INCOMPLETE,
      actes: undefined,
      inscriptions: undefined
    },
    {
      indexMenu: IndexAction.REQUETE_INCOMPLETE,
      actes: [],
      inscriptions: []
    },
    {
      indexMenu: IndexAction.REQUETE_INCOMPLETE,
      actes: [acte],
      inscriptions: []
    },
    {
      indexMenu: IndexAction.ACTE_NON_DETENU,
      actes: [acte, acte],
      inscriptions: []
    }
  ];

  testsConditionsCasMultiples({
    casOK,
    casKO,
    fonction: choixDifferentNonDetenuEtnombreActesSelectionnesDifferentDeUnOuZero
  });
});

test("acteAvecAlerteDeTypeANePasDelivrer OK", async () => {
  TypeAlerte.init(ReponseAppelNomenclatureTypeAlerte.data);

  const alertes = [
    {
      type: TypeAlerte.listeDepuisType(DESCRIPTION_SAGA)[0]
    } as IAlerte
  ] as IAlerte[];

  expect(acteAvecAlerteDeTypeANePasDelivrer(alertes)).toEqual({
    enErreur: false,
    popinErreur: {
      message: "L'acte n'est pas délivrable. Voulez-vous continuer ?",
      nonBloquant: true
    }
  });

  const alertesANePasDelivrer = [
    {
      type: TypeAlerte.listeDepuisType(A_NE_PAS_DELIVRER)[0]
    } as IAlerte
  ] as IAlerte[];

  expect(acteAvecAlerteDeTypeANePasDelivrer(alertesANePasDelivrer)).toEqual({
    enErreur: true,
    popinErreur: {
      message: "L'acte n'est pas délivrable. Voulez-vous continuer ?",
      nonBloquant: true
    }
  });
});
