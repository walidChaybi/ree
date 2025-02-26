import { ITypeMentionDto } from "@api/configurations/etatCivil/nomenclature/GetTypesMentionConfigApi";

export const TYPE_MENTION = [
  {
    idTypeMention: "126ad458-fd77-4c8c-bd88-db0b818f7d91",
    libelleType: "1 Mariage",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b03c0e14-bad0-40a7-a895-8169e2b7f38e",
        libelleType: "1-1 en France (mairie)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b03c6b4e-e028-4676-96fe-81fc9028b6fd",
        libelleType: "1-2 à l'étranger (acte dressé)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b03c1503-d452-4751-8bb3-94d082db1e5e",
        libelleType: "1-3 à l'étranger (acte transcrit ou établi)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b03c18ba-bb6c-4461-b96c-09b90a99468f",
        libelleType: "1-4 en France (consulat étranger)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b03c883a-b23e-4a59-a4c6-3630f87bbf58",
        libelleType: "autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "0185f3c8-5f4c-4ea9-89e1-fb65fcb7b17f",
    libelleType: "2 Divorce/Séparation/Annulation mariage",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "7adaa7f8-6228-4e25-87a1-d99f3b98371a",
        libelleType: "2-1 & 2-2 divorce/séparation de corps en France",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "b03c54ae-5130-4062-b7e4-34bed2de7989",
            libelleType: "2-1 notarié",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "96189dcf-69f9-41d2-8039-26476b82ee01",
            libelleType: "2-2 judiciaire",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b03ca46d-592e-4e45-a7b0-39f0f3664ffb",
        libelleType: "2-3 divorce/séparation de corps avec exequatur",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "5f562b8d-0d26-4c55-8311-040ed70c0e15",
        libelleType: "2-6 & 2-7 divorce/séparation de corps à l'étranger",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "7adec958-a42a-4fbd-918b-c6892b0b5180",
            libelleType: "2-7 V.O",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b03c0e79-da22-44ef-8256-5276631662b3",
            libelleType: "2-6 dans l'U.E.",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b03c481e-1cfd-4a3e-8ad5-005975951876",
        libelleType: "2-8 annulation de mariage",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04835d7-880e-45f2-9947-da18dd3237de",
        libelleType: "2-9 reprise vie commune",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "3d62029f-8c16-48dc-bc25-941e7a5d27ac",
            libelleType: "2-9 OEC",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
            estPresentListeDeroulante: true,
            estSousType: true,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "2e3d768f-2eae-4dba-80fc-5b404c10b589",
            libelleType: "2-9 notaire",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b048b66e-e0fa-4052-a63d-9111b442c3ee",
        libelleType: "divorce/séparation de corps - autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b0481430-4307-4dd9-a9af-d3c21cb6d8f4",
        libelleType: "annulation de mariage - autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "ec837ffc-8cbe-4397-b4e8-94899264d28a",
    libelleType: "3 PACS",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "6cc65fb0-c6ac-43ef-8533-3469e7a88174",
        libelleType: "3-1 enregistrement en France",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cd99d-3422-4d70-98b5-7da12277e179",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "53b308ef-8fb3-45ea-bb6f-ced8b55d49fa",
        libelleType: "3-1 enregistrement à l'étranger",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cd99d-3422-4d70-98b5-7da12277e179",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0480197-6297-4fd6-b7cf-bf41ef8bf0cb",
        libelleType: "3-2 modification",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "3fe1a991-6717-49cb-a208-a8fc09afc853",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0488dca-c638-4cf0-ab85-23606ed12131",
        libelleType: "3-3 dissolution",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "26186600-3146-4e95-954b-6ac741ad421a",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0487399-777a-4340-94ce-c0f15b643c98",
        libelleType: "3-4 annulation",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c5a85-cc38-4577-aaac-397cabf86ca3",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: true
      }
    ],
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b93e3638-d963-4681-b8d7-bab02b765613",
    libelleType: "4 Décès",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b0486d06-c2be-4d3f-8542-68fc8df9ab77",
        libelleType: "4-1 en France",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b048aa11-ecbb-48f2-8908-b14e4bf46638",
        libelleType: "4-2 à l'étranger (acte dressé)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "65870f8f-9509-44a2-8ae4-e2cfb8104c4b",
        libelleType: "4-2 à l'étranger (acte transcrit)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04809e7-4aaf-43ae-9656-9fb2665cdbe7",
        libelleType: "4-3 date non établie (en France/à l'étranger)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0489f3d-d461-4e24-873c-d1df7c9467f4",
        libelleType: "4-4 déclaration judiciaire de décès",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0481314-da13-4238-8922-37d8b7f7059f",
        libelleType: "autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "47639645-e848-4f37-9aaa-50a05f9e1bfe",
    libelleType: "7 Reconnaissance",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b0483be5-0549-4c2e-bd51-472d766d7a29",
        libelleType: "7-1 en France (mairie)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b048bac0-a8ea-4837-a091-d66f5ed1411a",
        libelleType: "7-2 en France (notaire)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "18493a55-39ab-4c01-a772-6c20538fbcac",
        libelleType: "7-1 à l'étranger (acte dressé)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04851fa-a513-4387-a1e2-c91415a4a304",
        libelleType: "7-3 à l'étranger (acte transcrit)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b048cbd4-f38a-4958-b9eb-17bca4e05c90",
        libelleType: "7-5 annulation de reconnaissance",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0485a55-d056-4065-95ff-9e802935cc7c",
        libelleType: "autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b0485b10-0ac4-4193-8cfc-16f4f6702b3e",
    libelleType: "8 Filiation - Acte de notoriété",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    estPresentListeDeroulante: true,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "165670bd-cabe-478e-97ef-9f28f342da31",
    libelleType: "9 Filiation (art. 311-14 et 311-17 c.c)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    estPresentListeDeroulante: true,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b6f778a2-9414-4fb7-8818-c703b02a2644",
    libelleType: "10 Filiation - décision judiciaire",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b048e1b4-f864-499e-943d-b87734905367",
        libelleType: "10-1 paternité",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0480356-1c3d-43ef-b7dc-8b362899f4ca",
        libelleType: "10-4 possession d'état",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b048ae10-deaf-4f07-a1b9-ede1a43cb460",
        libelleType: "10-5 contestation de paternité",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0484914-a550-454e-b1a5-134d297848cc",
        libelleType: "10-8 conflit de filiation tranché",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04889e7-3bef-4eea-b952-6f1a6d131348",
        libelleType: "autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "7d05d070-37b2-4c75-b273-4801ae8ecc8c",
    libelleType: "12 Adoption simple",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b048b0b6-3c53-4936-a63d-ea537903f806",
        libelleType: "12-1 en France",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0481643-9846-4a5f-b33d-88e0c2f22fb6",
        libelleType: "12-2 à l'étranger",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0487488-bb0c-4b41-b032-9068583d0c92",
        libelleType: "12-4 avec exequatur",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0483683-870f-4505-9091-ebfa39d73c43",
        libelleType: "12-5 révocation",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cfc41-1821-496d-891c-87f963149600",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b0482c36-7ead-4245-a875-f1f83dafc4c3",
    libelleType: "13 Légitimation par mariage (avant le 1er juillet 2006)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    estPresentListeDeroulante: true,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "62569b32-666e-4a9f-9204-643d18ad2a6b",
    libelleType: "14 & 15 Changement de nom",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b0489bb0-6516-46a4-bbf3-22678749197d",
        libelleType: "14-1 décret (61 c.c)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04826fb-3aa8-444b-b48f-1822f8023dd3",
        libelleType: "14-2 procédure simplifiée (61-3-1 c.c al.1)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "67da7f70-a32c-4209-853b-1adb39fc0b87",
        libelleType: "14-2 mise en concordance (61-3-1 c.c al.2)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b048d075-724e-4e3c-8575-4494667ad90b",
        libelleType: "15 déclaration conjointe (311-23 c.c)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b048e125-5b04-4dcd-9a56-11eefb6811eb",
        libelleType: "autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b0aa20ad-9bf3-4cbd-99f1-a54c8f6598a4",
    libelleType: "18 Changement de prénom (art. 60 c.c)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b048e05c-ff6f-44fd-89dc-d07aa9b5fc80",
        libelleType: "18-1 décision OEC",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b0485f4e-5d29-4f03-956b-0a53d02ae617",
        libelleType: "18-2 décision judiciaire",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b048c1ab-a8e2-4b59-a0cd-7057dfb96cdd",
        libelleType: "autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b048c8a8-ac10-4a70-8fa6-36bf8ba7013b",
    libelleType: "18-3 Changement de sexe",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    idNatureMention: "b03c45b2-74c6-4cc5-9f64-4bad6f343598",
    estPresentListeDeroulante: true,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b0481141-b0e1-4cc6-940e-368b2987d86e",
    libelleType: "19 Francisation prénom(s)/nom",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: true,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "16ccfb8f-b756-4e3a-bab1-b3ef660968b6",
    libelleType: "20 & 21 Rectification",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "80e2eb90-85d7-4d5c-b0ad-dcd467b46eee",
        libelleType: "20-1 rectification 99-1 c.c (OEC)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "b048853f-628c-46c8-a807-f70dd848a7f3",
            libelleType: "20-1 divers",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: true,
            idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b04861c1-3b73-4de5-9361-444dff8a4580",
            libelleType: "20-1 annulation mention réputée non écrite",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: true,
            idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "d9c2a7a7-b2cd-4135-a1e1-cf4506d39eda",
        libelleType: "20-2 rectification 99-1 c.c (procureur)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "b04b0546-66a7-43e2-9bba-199b574e8153",
            libelleType: "20-2 divers",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: true,
            idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b04ba34c-0a6f-4d54-b087-7e0f5e405009",
            libelleType: "20-2 annulation mention réputée non écrite",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: true,
            idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b04b7405-c11d-4299-931e-1d41c7158946",
        libelleType: "20-3 rectification hors 99-1 c.c (dont VO)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04b087b-2504-4ee9-b2d1-6889a6241fe9",
        libelleType: "21 rectification judiciaire",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: true,
        idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "2b20dc19-5d44-404e-b7a0-4e39e2dd4d46",
    libelleType: "22 & 23 Annulation (acte/mention)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b04b8126-cba8-477c-8d42-fee7634a8252",
        libelleType: "22-1 annulation de l’acte (procureur)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04bb719-bc07-41f1-a73a-81aa069b898e",
        libelleType: "22-2 annulation de l’acte (judiciaire)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "f139e2a7-5774-4e5b-8ddf-735039285415",
        libelleType: "23 annulation d'une mention (procureur)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03ceb19-f934-49ab-9c3b-76d0d59337c4",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04be004-a421-4f72-8417-77a6333dbce4",
        libelleType: "23 annulation d'une mention (judiciaire)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03ceb19-f934-49ab-9c3b-76d0d59337c4",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: true
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b8e8b-1f29-4f23-b097-103d602ec386",
    libelleType: "23 Mention réputée non écrite (procureur)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: true,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "79816598-7832-4f51-847d-8e4f0d3770a4",
    libelleType: "26 Décret de nationalité",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "ce60cec5-8977-43ba-99eb-0f386c6d3e80",
        libelleType: "26-1 à 26-4 naturalisation/réintégration/effet collectif",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "b04ba20a-dcd8-4f7c-96e6-01b9f353d12c",
            libelleType: "26-1 décret de naturalisation",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b04b9f49-b9b7-4b32-bdf4-db193ae540a8",
            libelleType: "26-2 décret de réintégration",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b04b948e-6e4c-46be-8a38-32c924283fa4",
            libelleType: "26-3 effet collectif décret de naturalisation",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b04bce76-d851-4d88-bf4d-3d500e838616",
            libelleType: "26-4 effet collectif décret de réintégration",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b04bbeff-5330-43d8-91e9-c2d8820d98c8",
        libelleType: "26-5 perte nationalité",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "f1b07b6c-e19b-4636-8845-1a05a6ad7297",
        libelleType: "26-8 & 26-9 retrait nationalité (décret rapporté)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "b04bef71-02ec-4bd5-8ddd-6ff007fe2c76",
            libelleType: "26-8 décret de naturalisation rapporté",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b04bc98a-c416-49e8-bd52-346bf0545d45",
            libelleType: "26-9 décret de réintégration rapporté",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b04b7ee8-4a46-4bce-ae3e-cc6d3f066d1a",
        libelleType: "extranéité - autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "6eab3409-a717-4b34-9211-e377321f24ec",
    libelleType: "27 à 30 Déclaration de nationalité",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "5a02f800-2f9b-4041-a01f-1b19b2a50095",
        libelleType: "27-1 acquisition 21-2, 21-13-1 et 21-13-2 c.c",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "b04b8056-c29b-448a-8432-48539bcb40e6",
            libelleType: "27-1-a acquisition",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "b04bcb53-3521-44fd-9b62-4bc2847c2865",
            libelleType: "27-1-b effet collectif",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "2e35a25f-e8ba-4f4c-8037-2952bb72d09a",
        libelleType: "27-2 acquisition autres art. (en France)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "a6052abe-653a-4db6-92af-8e05b7c31ecd",
            libelleType: "27-2-a acquisition (en France)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "bbde848d-8e0e-4ca4-a51e-590276eee34e",
            libelleType: "27-2-b effet collectif (en France)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b520b05f-fa84-400a-b621-33f8b56851c3",
        libelleType: "27-2 acquisition autres art. (à l'étranger)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "b6b873c2-2f35-40a3-8d61-f7b83050d741",
            libelleType: "27-2-a acquisition (à l'étranger)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "dc6eb3c4-8c6e-45e6-9a69-c3dd69a8cfb8",
            libelleType: "27-2-b effet collectif (à l'étranger)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "c9c60c17-e737-4f67-b6b2-ce86c93ebb6a",
        libelleType: "28-1 & 28-2 réintégration (en France)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "ee41e46e-02a2-49d2-86e4-8d711b23d651",
            libelleType: "28-1 réintégration (en France)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "f670cf87-e297-44fb-a6ee-8e6809378c17",
            libelleType: "28-2 effet collectif (en France)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "450e512b-6eb0-42a6-8499-3f4eea4f90d9",
        libelleType: "28-1 & 28-2 réintégration (à l'étranger)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        estPresentListeDeroulante: true,
        typeMentionEnfantList: [
          {
            idTypeMention: "f8e4fb14-3843-4b6e-b896-9af81f6784c1",
            libelleType: "28-1 réintégration (à l'étranger)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          },
          {
            idTypeMention: "f0d8d45c-040f-4c4d-a830-9350eda78347",
            libelleType: "28-2 effet collectif (à l'étranger)",
            natureActe: "NAISSANCE",
            affecteAnalyseMarginale: false,
            idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
            estPresentListeDeroulante: true,
            estSousType: false,
            estSaisieAssistee: true
          }
        ],
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "628a5660-be62-42dc-b16b-7b69706c4e37",
        libelleType: "29-1 répudiation de nationalité (en France)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "a52e5513-080d-486b-8033-efccd914c70e",
        libelleType: "29-1 répudiation de nationalité (à l'étranger)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04b200d-e23b-4d1b-a740-0fb3ecf5ea82",
        libelleType: "29-2 perte de nationalité",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "a3b470b0-6960-47ac-a6ec-5a786e1afbb0",
        libelleType: "30 renonciation faculté de répudier (en France)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "77e37565-5612-465a-aaeb-e8462a397452",
        libelleType: "30 renonciation faculté de répudier (à l'étranger)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04b2e27-2e95-4515-9e43-c9106232992c",
        libelleType: "déclaration tendant à perdre ou à décliner de la nationalité - autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "2121eb53-d829-45d6-90fc-904a6153038d",
    libelleType: "31 Décision judiciaire de nationalité",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b04bbbeb-67ba-4f33-a825-ed1622f51750",
        libelleType: "31-1 Est Français(e)",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04beb7f-2855-4fff-9d89-a279b4128cd0",
        libelleType: "31-2 perte nationalité",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04b4191-96da-49ca-8132-a5933fda53ad",
        libelleType: "31-3 extranéité (N'est pas français(e))",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04bdb1a-6b4d-4e44-964b-3d2f20a90a0a",
        libelleType: "31-4 annulation enregistrement d'une déclaration",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04b1d07-82df-4339-ac46-82f2b5c5d3d5",
        libelleType: "nationalité - autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: false
      },
      {
        idTypeMention: "b04b15b7-2ee7-439c-b8cf-e3db259e5a50",
        libelleType: "extranéité - autres",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
        estPresentListeDeroulante: true,
        estSousType: false,
        estSaisieAssistee: false
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04ba5df-490b-43f4-8bd5-4d322d14ddff",
    libelleType: "32 Certificat de nationalité française",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    estPresentListeDeroulante: true,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "43329696-8418-4eb7-8df4-4afa22fbaa79",
    libelleType: "33 Répertoire civil",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    estPresentListeDeroulante: true,
    typeMentionEnfantList: [
      {
        idTypeMention: "b04b57f1-7f36-4022-a0b3-0f9bf15911f8",
        libelleType: "33-1 inscription",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03cdc6e-c77f-47a6-bc51-25b52ad7674e",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: true
      },
      {
        idTypeMention: "b04bb8af-9e0e-4473-a901-23aae1506b9f",
        libelleType: "33-2 radiation",
        natureActe: "NAISSANCE",
        affecteAnalyseMarginale: false,
        idNatureMention: "b03c5f7f-2ad5-4f55-8599-6192dd6f126e",
        estPresentListeDeroulante: true,
        estSousType: true,
        estSaisieAssistee: true
      }
    ],
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04bddcd-2a4e-410b-ac24-387dcddc9809",
    libelleType: "35 Adopté(e) par la Nation",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c3b1c-412b-4a94-93ba-ebbb457000b0",
    estPresentListeDeroulante: true,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b1f6b-425f-4dc1-8703-81dddac7475e",
    libelleType: "Autres",
    natureActe: "INCONNUE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c38d7-0442-4291-85e5-649351dd6784",
    estPresentListeDeroulante: true,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b03cca54-ee3f-411e-9b75-04e900657ad0",
    libelleType: "2-1-b Séparation de corps par consentement mutuel en France",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b03c5942-a05f-4b6f-8d1e-b0f406509038",
    libelleType: "2-3-b Séparation de corps avec décision d'exequatur",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b03c23ef-e893-4659-8c6d-416ffb60bf82",
    libelleType: "2-6-b Séparation de corps à l'étranger dans le cadre du règlement du conseil de l'union européenne",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b048a326-6d90-4806-936f-f43372f1af51",
    libelleType: "2-98 Séparation de corps - Autres",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b0486714-ef33-446e-9f27-bda0cf181bda",
    libelleType: "3-1 Enregistrement du PACS",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd99d-3422-4d70-98b5-7da12277e179",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "dde0a069-54a5-4e80-bf4b-4ee7983243ff",
    libelleType: "2-2-b Séparation de corps judiciaire en France",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "eac6d665-ef10-4ed0-b617-e4b507f947d7",
    libelleType: "2-7-b Séparation de corps prononcée par une décision étrangère hors U.E",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b9e9b-4774-4c63-957f-2307b9c43ec7",
    libelleType: "27-2-a Acquisition nationalité autres articles (en France ou à l'étranger)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bfdc3-7a49-4358-9587-6a87ebe3c6c7",
    libelleType: "27-2-b Effet collectif acquisition nationalité autres articles (en France ou à l'étranger)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b3973-fe20-4852-b9d6-9feea0b1b2e6",
    libelleType: "28-1 Déclaration de réintégration (en France ou à l'étranger)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bb99d-a46b-4a08-b9ef-a2e1cccd4622",
    libelleType: "28-2 Effet collectif de la réintégration dans la nationalité française (en France ou à l'étranger)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bef13-8432-4b14-81b3-086f8b3504ff",
    libelleType: "29-1 Déclaration tendant à répudier la nationalité française (en France ou à l'étranger)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b0ec2-eaa8-4bf6-8c85-32e2f91186be",
    libelleType: "30 Renonciation faculté de répudier la nationalité française (en France ou à l'étranger)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b0487801-b7b6-41db-ad88-381e06a97d46",
    libelleType: "9-1 Etablissement de la filiation en application de l’article 311-14 C. civ.",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b0482d5d-b32e-4099-a4f3-9bf65499bccb",
    libelleType: "9-2 Etablissement de la filiation en application de l’article 311-17 C. civ.",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b048989a-7783-46e5-b1f9-3fc13b4af249",
    libelleType: "16 Déclaration conjointe de choix de nom",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "f2ee4afa-3fe3-4646-bcf5-611a2c5be963",
    libelleType: "26-6 Décret d'opposition à l'acquisition de la nationalité française",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "266c61bf-4500-437b-bb0d-ae4f29a1e759",
    libelleType: "26-7 Déchéance de la nationalité française",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04bb781-3052-41d4-9b97-9f91fd8345e5",
    libelleType: "27-99 Déclaration d’acquisition nationalité - Autres",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b0484ff3-c310-4ed4-8d39-c19ce356e1d3",
    libelleType: "12-98 Adoption simple - Autres",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b048137a-4596-4af3-a8b6-13153318256f",
    libelleType: "12-99 Adoption simple révocation - Autres",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cfc41-1821-496d-891c-87f963149600",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b0486687-d58d-472c-9703-c3e37d80689b",
    libelleType: "13-99 Légitimation - Autres",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b48c9-5106-4559-ac8b-85d145bbb9eb",
    libelleType: '21-99 Rectification judiciaire, hors annulation d\'une mention "réputée non écrite" - Autres',
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b9003-b32b-4aa3-a0b7-90ffe684e12c",
    libelleType: '21-98 Rectification judiciaire, annulation d\'une mention "réputée non écrite" - Autres',
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b048a937-2f7c-4e54-9b7f-675953d68fe9",
    libelleType: "17 Déclaration conjointe d'adjonction de nom (art. 23 de la loi n°2002-304)",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b048cd35-4825-4386-b141-596ddc72df9f",
    libelleType: "19-99 Francisation des nom et/ou des prénom(s) - Autres",
    natureActe: "NAISSANCE",
    affecteAnalyseMarginale: true,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04bc836-dc01-4ba9-95cf-ac102a2373af",
    libelleType: "39-1-a Divorce par consentement mutuel en France",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b33b4-ffa3-4330-b301-7ea46febeb23",
    libelleType: "39-1-b Séparation de corps par consentement mutuel en France",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "e0900d9a-4c2c-465a-8616-cb5b7b2aa8e2",
    libelleType: "39-2 Divorce judiciaire en France",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "5ad585aa-8871-481d-b575-b46d6d5d4ebb",
    libelleType: "39-3 Séparation de corps judiciaire en France",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bdcc3-de81-4df6-a238-fa44b5ff2791",
    libelleType: "39-4-a Divorce prononcé à l'étranger avec jugement d'exequatur ",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b5876-e83d-40ce-8ca5-0378b0ce791f",
    libelleType: "39-4-b Séparation de corps prononcée à l'étranger avec jugement d'exequatur ",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bd773-c179-48b3-b82f-2e4efe8b7d14",
    libelleType: "39-4-c Annulation de mariage prononcée à l'étranger avec jugement d'exequatur ",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04bb0cc-3a4b-49a3-9c1f-648e151ee021",
    libelleType: "39-5-a Divorce à l'étranger",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b813f-58c1-44ca-b2ca-cf3e46a25182",
    libelleType: "39-5-b Séparation de corps à l'étranger",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b3115-4bc9-4d27-ab9c-c570a3c00aee",
    libelleType: "39-5-c Annulation de mariage à l'étranger",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "163668c7-3608-411e-8064-72592aba8348",
    libelleType: "39-6-a Divorce à l'étranger hors U.E.",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "a8335d5f-8323-416d-a693-9bbd6ba2a289",
    libelleType: "39-6-b Séparation de corps à l'étranger hors U.E.",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "880b48fe-e4f9-4bd3-8808-864b23699be3",
    libelleType: "39-6-c Annulation de mariage à l'étranger hors U.E.",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bef1c-7a95-4b26-b53d-9011e5cc5c6f",
    libelleType: "39-7 Annulation de mariage prononcée en France",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b9ae6-e061-4f63-8824-7db7a731f234",
    libelleType: "39-8 Reprise de la vie commune",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "2e9b80d5-0ff8-42f7-85b5-ea752a12032b",
    libelleType: "39-8-a Reprise de la vie commune par déclaration",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "fdae6691-7d1a-458b-bc49-b38d44ac94ff",
    libelleType: "39-8-b Reprise de la vie commune par acte notarié",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b44fc-10c3-4215-86c5-a94f2917d3b4",
    libelleType: "39-97 Divorce - Autres",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b7ef0-cefe-4db7-9a36-5e752f1419ce",
    libelleType: "39-98 Séparation de corps - Autres",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b9ffb-1114-4fbc-9c3c-156dc36d8ddc",
    libelleType: "39-99 Annulation de mariage - Autres",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cd289-503f-4c98-8d12-0dffd9c51178",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b03dd-815d-433b-bda0-08e6f1947bdf",
    libelleType: "40-1 Changement ou modification de régime matrimonial par décision judiciaire en France",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5368-01a5-4027-981d-bfd165b358ae",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b2e85-49c6-4dfd-a21f-9a95f8d667e2",
    libelleType: "40-2 Changement ou modification de régime matrimonial par acte notarié en France (loi française)",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5368-01a5-4027-981d-bfd165b358ae",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04befed-3263-4e47-9aea-74af30c99a87",
    libelleType: "40-3 Changement de régime matrimonial par acte (loi étrangère)",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5368-01a5-4027-981d-bfd165b358ae",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b3164-2d4d-4b93-9529-f2f891f676cc",
    libelleType: "40-4 Changement de régime matrimonial par décision judiciaire à l'étranger",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5368-01a5-4027-981d-bfd165b358ae",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bc744-34a0-4f69-8ebe-93416f58b70b",
    libelleType: "40-99 Changement de régime matrimonial - Autres",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5368-01a5-4027-981d-bfd165b358ae",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b33d7-b2cf-4797-9c67-0520e3b258e3",
    libelleType: "41-1 Désignation de la loi applicable au régime matrimonial",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5368-01a5-4027-981d-bfd165b358ae",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bce7c-0800-44cf-83ee-2359f35802db",
    libelleType: "41-99 Déclarations relatives au régime matrimonial - Autres",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5368-01a5-4027-981d-bfd165b358ae",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b9d02-1bcb-435c-8aa2-722d249ff1e1",
    libelleType: "42-2 Adoption simple",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bf5e4-476c-480d-bda4-74319e58fef4",
    libelleType: "42-99 Lien de filiation - Autres",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b2eb0-3ef4-4c3f-ad9e-a9fb1817a80d",
    libelleType: "43-1 Changement de prénom(s) par décision de l'officier de l'état civil",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b116a-5e33-4931-bbb1-f2a4acd838f7",
    libelleType: "43-2 Changement de prénom(s) par décision judiciaire",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b527b-bdf0-4b6a-aa09-2d94b02d146a",
    libelleType: "43-99 Changement de prénom - Autres",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b3d5c-74f7-49c6-942e-687e2130f028",
    libelleType: "44-1 Changement de nom suite à un décret (art. 61 C. civ.)",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04be79f-a83a-44a9-b0a3-f0487e5a96a1",
    libelleType: "44-2 Changement de nom par décision (art. 61-3-1 C. civ.)",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bb8fd-dede-4d97-b37f-d9454c841036",
    libelleType: "44-3 Changement de nom et/ou prénom(s) prononcé à l'étranger (V.O)",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b8206-46f8-49c7-9c40-ea6d5dfba5df",
    libelleType: "44-99 Changement de nom (art. 61 et 61-3-1 C.civ.) - Autres ",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b2a1e-35f5-43bf-bd35-091105cb1693",
    libelleType: "45 Francisation nom/prénom(s)",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c5a32-397a-4ded-857b-798da72935d6",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b69a6-62b6-49bd-91fd-295d83b51e6a",
    libelleType: "46-1-a Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b78ff-09da-48e6-991a-239d4682e1e9",
    libelleType:
      "46-1-b Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Hors annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bfbb9-8430-47d2-b26e-792ea6202d6d",
    libelleType:
      "46-2-a Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b8ac4-dad5-40c5-81e6-62cdce3d992b",
    libelleType:
      "46-2-b Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Hors annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bdff0-8aac-4c48-8b00-8a9c38739def",
    libelleType:
      "46-3-a Rectification administrative d'un acte hors article 99-1 (dont V.O) - Annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b7c72-646b-4663-adeb-ad07eb0f2f84",
    libelleType:
      "46-3-b Rectification administrative d'un acte hors article 99-1 (dont V.O) - Hors annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b3d99-06de-4378-956d-7b1d728b8bbe",
    libelleType: '47-98 Rectification judiciaire, annulation d\'une mention "réputée non écrite" - Autres',
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b6ccd-c758-448b-8a92-52a195d85d2c",
    libelleType: '47-99 Rectification judiciaire, hors annulation d\'une mention "réputée non écrite" - Autres',
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: false
  },
  {
    idTypeMention: "b04b6caa-f975-4f6d-bd7f-5f6a59af31ee",
    libelleType: "47-a Rectification judiciaire d'un acte - Annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b6ba8-ab38-4e86-a1b2-e09e009cee08",
    libelleType: "47-b Rectification judiciaire d'un acte - Hors annulation d'une mention \"réputée non écrite\"",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b577d-8070-4a2c-9525-0c3ebf3a1516",
    libelleType: "48-1 Annulation de l'acte par le procureur de la république",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b0442-30f0-42c9-8e84-21e258bf707c",
    libelleType: "48-2 Annulation judiciaire de l'acte",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b9a38-c497-4abe-bfea-97fbdcc2c069",
    libelleType: "49-a Annulation judiciaire d'une mention",
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03ceb19-f934-49ab-9c3b-76d0d59337c4",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b5147-f07e-4ab1-b622-286a8d61765c",
    libelleType: '49-b Mention "réputée non écrite" (procureur)',
    natureActe: "MARIAGE",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b8ba5-7fa2-4496-9848-b2b1cc4730f5",
    libelleType: "52 Mort pour la France",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b5bb5-f3b8-4da4-8c0c-5caf4582ce4e",
    libelleType: "54 Mort pour le service de la Nation ",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b27a1-2860-4dca-bfc1-860f6f68a746",
    libelleType: "55 Victime du terrorisme",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b1767-8214-4f82-9b39-2893c15d598a",
    libelleType: "56-1-a Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Annulation d'une mention \"réputée non écrite\"",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bc6c1-0310-4129-b4ea-ffc04ac27819",
    libelleType:
      "56-1-b Rectification administrative d'un acte art. 99-1 C. civ. (OEC) - Hors annulation d'une mention \"réputée non écrite\"",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b4053-c092-4369-b07c-3fab08c1dcac",
    libelleType:
      "56-2-a Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Annulation d'une mention \"réputée non écrite\"",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bdd7b-6771-4235-866e-4e270a7d9115",
    libelleType:
      "56-2-b Rectification administrative d'un acte art. 99-1 C. civ. (procureur) - Hors annulation d'une mention \"réputée non écrite\"",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04be753-4cad-470f-b09e-c4fd1d2f4412",
    libelleType: "57-a Rectification judiciaire d'un acte - Annulation d'une mention \"réputée non écrite\"",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04ba3d6-879d-49df-a12a-ecc9885bc5a3",
    libelleType: "57-b Rectification judiciaire d'un acte - Hors annulation d'une mention \"réputée non écrite\"",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bda57-d7c5-4b60-8555-8b61502ee9d8",
    libelleType: "58-1 Annulation de l'acte par le procureur de la république",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
    estPresentListeDeroulante: false,
    estSousType: false,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04bddbd-20f3-4422-a8e2-14d9d392f521",
    libelleType: "58-2 Annulation judiciaire de l'acte",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  },
  {
    idTypeMention: "b04b3fd5-98fe-4ad4-b32b-951dcccce4c3",
    libelleType: "62 Acte de notoriété établissant la qualité d'héritier",
    natureActe: "DECES",
    affecteAnalyseMarginale: false,
    idNatureMention: "b03c07b4-922f-497d-83d8-434a09ee52ee",
    estPresentListeDeroulante: false,
    estSousType: true,
    estSaisieAssistee: true
  }
] as ITypeMentionDto[];
