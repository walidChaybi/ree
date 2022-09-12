import { NatureActe } from "../../../../../../model/etatcivil/enum/NatureActe";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  aGenreIdentique,
  aGenreIndetermine,
  aNombreTitulairesIncoherent,
  choixDifferentNonDetenuEtnombreActesSelectionnesDifferentDeUnOuZero,
  ErreurResult,
  estChoixExtraitAvecOuSansFiliation,
  estChoixExtraitPlurilingue,
  estChoixIgnorerRequete,
  IndexAction,
  nombreActesSelectionnesDifferentDeUn
} from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuUtilEC";

const testsCasMultiples = <T>({
  casOK,
  casKO,
  fonction
}: {
  casOK: T[];
  casKO: T[];
  fonction: (props: T) => boolean;
}) => {
  casOK.forEach(cas => expect(fonction(cas)).toBe(true));
  casKO.forEach(cas => expect(fonction(cas)).toBe(false));
};

const testsConditionsCasMultiples = <T>({
  casOK,
  casKO,
  fonction
}: {
  casOK: T[];
  casKO: T[];
  fonction: (props: T) => ErreurResult;
}) => {
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
  expect(aNombreTitulairesIncoherent(NatureActe.NAISSANCE.libelle, 2)).toBe(
    true
  );
  expect(aNombreTitulairesIncoherent(NatureActe.DECES.libelle, 2)).toBe(true);
  expect(aNombreTitulairesIncoherent(NatureActe.MARIAGE.libelle, 3)).toBe(true);
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
  actes?: IResultatRMCActe[];
  inscriptions?: IResultatRMCInscription[];
};

test("nombreActesSelectionnesDifferentDeUn", () => {
  const acte = "test" as unknown as IResultatRMCActe;
  const inscription = "test" as unknown as IResultatRMCInscription;
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
  const acte = "test" as unknown as IResultatRMCActe;
  const inscription = "test" as unknown as IResultatRMCInscription;
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
    fonction:
      choixDifferentNonDetenuEtnombreActesSelectionnesDifferentDeUnOuZero
  });
});
