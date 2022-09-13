import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import {
  ADOPTION,
  ANNULATION_DECISION,
  ANNULATION_EVENEMENT,
  ANNULATION_MARIAGE,
  ANNULATION_MENTION,
  ANNULATION_PACS,
  CHANGEMENT_NOM,
  CHANGEMENT_SEXE,
  CODE_RC,
  CODE_RC_RADIE,
  DECES,
  DISSOLUTION_PACS,
  DIVORCE,
  EXTRANEITE,
  LIEN_FILIATION_HORS_ADOPTION,
  MARIAGE,
  MODIFICATION_PACS,
  NATIONALITE,
  PACS,
  RECTIFICATION,
  REPRISE_VIE_COMMUNE,
  SEPARATION_CORPS
} from "@model/etatcivil/enum/NatureMention";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import {
  gestionnaireMentionsRetireesAuto,
  IMentionAvecRetiree
} from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionnaireMentionsRetireesAuto";

test("deselectionnerRadieParPaire", () => {
  const deselectionnerRadieParPaire = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: CODE_RC
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: CODE_RC_RADIE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "4",
      typeMention: {
        nature: {
          code: DECES
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionnerRadieParPaire(
    deselectionnerRadieParPaire
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionnerRadieParPaire
    )
  ).toStrictEqual(["2", "3"]);

  const deselectionnerRadieParPaire2 = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: CODE_RC
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: CODE_RC
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "4",
      typeMention: {
        nature: {
          code: CODE_RC_RADIE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "5",
      typeMention: {
        nature: {
          code: DECES
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionnerRadieParPaire(
    deselectionnerRadieParPaire2
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionnerRadieParPaire2
    )
  ).toStrictEqual([]);

  const deselectionnerRadieParPaire3 = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: CODE_RC
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: CODE_RC_RADIE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "4",
      typeMention: {
        nature: {
          code: CODE_RC
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "5",
      typeMention: {
        nature: {
          code: CODE_RC_RADIE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "6",
      typeMention: {
        nature: {
          code: DIVORCE
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionnerRadieParPaire(
    deselectionnerRadieParPaire3
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionnerRadieParPaire3
    )
  ).toStrictEqual(["2", "3", "4", "5"]);
});

test("deselectionnerAnnulationParPaire", () => {
  const deselectionnerAnnulationParPaire = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: ANNULATION_EVENEMENT
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: DECES
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionnerAnnulationParPaire(
    deselectionnerAnnulationParPaire
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionnerAnnulationParPaire
    )
  ).toStrictEqual(["1", "2"]);

  const deselectionnerAnnulationParPaire2 = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: CHANGEMENT_NOM
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: ANNULATION_EVENEMENT
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionnerAnnulationParPaire(
    deselectionnerAnnulationParPaire2
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionnerAnnulationParPaire2
    )
  ).toStrictEqual([]);
});

test("deselectionneMentionsSpecifiquesNaissance", () => {
  const deselectionneMentionsSpecifiques = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: REPRISE_VIE_COMMUNE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: NATIONALITE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "4",
      typeMention: {
        nature: {
          code: ADOPTION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "5",
      typeMention: {
        nature: {
          code: ANNULATION_MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "6",
      typeMention: {
        nature: {
          code: ANNULATION_PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "7",
      typeMention: {
        nature: {
          code: ANNULATION_DECISION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "8",
      typeMention: {
        nature: {
          code: ANNULATION_EVENEMENT
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "9",
      typeMention: {
        nature: {
          code: ANNULATION_MENTION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "10",
      typeMention: {
        nature: {
          code: CODE_RC_RADIE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "11",
      typeMention: {
        nature: {
          code: CHANGEMENT_NOM
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "12",
      typeMention: {
        nature: {
          code: CHANGEMENT_SEXE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "13",
      typeMention: {
        nature: {
          code: LIEN_FILIATION_HORS_ADOPTION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "14",
      typeMention: {
        nature: {
          code: RECTIFICATION
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];
  gestionnaireMentionsRetireesAuto.deselectionneMentionsSpecifiques(
    deselectionneMentionsSpecifiques,
    ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    NatureActe.NAISSANCE
  );
});

test("deselectionneMentionsSpecifiquesMariage", () => {
  const deselectionneMentionsSpecifiques = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: REPRISE_VIE_COMMUNE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: NATIONALITE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "4",
      typeMention: {
        nature: {
          code: ADOPTION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "5",
      typeMention: {
        nature: {
          code: ANNULATION_MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "6",
      typeMention: {
        nature: {
          code: ANNULATION_PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "7",
      typeMention: {
        nature: {
          code: ANNULATION_DECISION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "8",
      typeMention: {
        nature: {
          code: ANNULATION_EVENEMENT
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "9",
      typeMention: {
        nature: {
          code: ANNULATION_MENTION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "10",
      typeMention: {
        nature: {
          code: CODE_RC_RADIE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "11",
      typeMention: {
        nature: {
          code: CHANGEMENT_NOM
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "12",
      typeMention: {
        nature: {
          code: CHANGEMENT_SEXE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "13",
      typeMention: {
        nature: {
          code: LIEN_FILIATION_HORS_ADOPTION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "14",
      typeMention: {
        nature: {
          code: RECTIFICATION
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];
  gestionnaireMentionsRetireesAuto.deselectionneMentionsSpecifiques(
    deselectionneMentionsSpecifiques,
    ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    NatureActe.MARIAGE
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneMentionsSpecifiques
    )
  ).toStrictEqual(["8", "9", "11", "13", "14"]);
});

test("deselectionneMentionsIncompatibleAvecActe", () => {
  const deselectionneMentionsIncompatibleAvecActe = [
    {
      id: "1",
      typeMention: {
        natureActe: NatureActe.NAISSANCE,
        nature: {
          code: LIEN_FILIATION_HORS_ADOPTION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        natureActe: NatureActe.MARIAGE,
        nature: {
          code: RECTIFICATION
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        natureActe: NatureActe.INCONNUE,
        nature: {
          code: RECTIFICATION
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionneMentionsIncompatibleAvecActe(
    deselectionneMentionsIncompatibleAvecActe,
    NatureActe.NAISSANCE
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneMentionsIncompatibleAvecActe
    )
  ).toStrictEqual(["2"]);
});

test("deselectionneExtraneite", () => {
  const deselectionneExtraneite = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: EXTRANEITE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: EXTRANEITE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: NATIONALITE
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionneExtraneite(
    deselectionneExtraneite
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneExtraneite
    )
  ).toStrictEqual(["1", "2"]);
});

test("deselectionneSituationFamilialePassee", () => {
  const deselectionneSituationFamilialePassee = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: DIVORCE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "4",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "5",
      typeMention: {
        nature: {
          code: ANNULATION_MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionneSituationFamilialePassee(
    deselectionneSituationFamilialePassee
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneSituationFamilialePassee
    )
  ).toStrictEqual(["1", "4", "5"]);

  const deselectionneSituationFamilialePassee2 = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: SEPARATION_CORPS
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: DIVORCE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "4",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "5",
      typeMention: {
        nature: {
          code: SEPARATION_CORPS
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionneSituationFamilialePassee(
    deselectionneSituationFamilialePassee2
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneSituationFamilialePassee2
    )
  ).toStrictEqual(["1", "2", "3"]);

  const deselectionneSituationFamilialePassee3 = [
    {
      id: "2",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: DIVORCE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "1",
      typeMention: {
        nature: {
          code: PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: ANNULATION_PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];
  const deselectionneSituationFamilialePassee4 = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MODIFICATION_PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: DISSOLUTION_PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionneSituationFamilialePassee(
    deselectionneSituationFamilialePassee3
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneSituationFamilialePassee3
    )
  ).toStrictEqual(["1", "2"]);

  gestionnaireMentionsRetireesAuto.deselectionneSituationFamilialePassee(
    deselectionneSituationFamilialePassee4
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneSituationFamilialePassee4
    )
  ).toStrictEqual(["1"]);

  const deselectionneSituationFamilialePassee5 = [
    {
      id: "1",
      typeMention: {
        nature: {
          code: MARIAGE
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "2",
      typeMention: {
        nature: {
          code: PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree,
    {
      id: "3",
      typeMention: {
        nature: {
          code: MODIFICATION_PACS
        }
      },
      retiree: false
    } as IMentionAvecRetiree
  ];

  gestionnaireMentionsRetireesAuto.deselectionneSituationFamilialePassee(
    deselectionneSituationFamilialePassee5
  );

  expect(
    gestionnaireMentionsRetireesAuto.formaterMentionsRetirees(
      deselectionneSituationFamilialePassee5
    )
  ).toStrictEqual(["1"]);
});
