import { ITypeAlerte } from "@model/etatcivil/enum/TypeAlerte";

export const TYPE_ALERTE = [
  { id: "058a436b-330d-4c3c-83e4-d49c27380526", nom: "MANDATAIRE", code: "MANDATAIRE_FAMILLE", libelle: "Famille", estActif: true },
  {
    id: "058a436b-330d-4c3c-83e1-d49c27380226",
    nom: "MANDATAIRE",
    code: "MANDATAIRE_JUDICIAIRE_ASSOCIATION",
    libelle: "Mandataire judiciaire à la protection des majeurs association",
    estActif: true
  },
  {
    id: "058a436b-330d-4c3c-83e2-d49c27380326",
    nom: "MANDATAIRE",
    code: "MANDATAIRE_JUDICIAIRE_INDIVIDUEL",
    libelle: "Mandataire judiciaire à la protection des majeurs  individuel",
    estActif: true
  },
  {
    id: "058a436b-330d-4c3c-83e3-d49c27380426",
    nom: "MANDATAIRE",
    code: "MANDATAIRE_PREPOSE",
    libelle: "Préposé d’établissement",
    estActif: true
  },
  {
    id: "b03cc263-7d77-4027-a67b-286dd8754107",
    nom: "NATURE_MENTION",
    code: "24",
    libelle: 'Décision "validant" un acte',
    estActif: false,
    opposableAuTiers: false
  },
  {
    id: "b03ce3f6-44a1-41b5-92eb-e4983cbad686",
    nom: "NATURE_MENTION",
    code: "7",
    libelle: "Contrat de mariage",
    estActif: false,
    opposableAuTiers: false
  },
  {
    id: "b03c38d7-0442-4291-85e5-649351dd6784",
    nom: "NATURE_MENTION",
    code: "99",
    libelle: "Autres",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c07b4-922f-497d-83d8-434a09ee52ee",
    nom: "NATURE_MENTION",
    code: "26",
    libelle: "Acte de notoriété établissant la qualité d'héritier",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03cc823-a7c2-4ae9-8925-d336f8eaa62f",
    nom: "NATURE_MENTION",
    code: "25",
    libelle: "Mort pour la France, Mort en déportation, Victime du terrorisme",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c0e11-54d4-4fd6-87f2-a08d2b2d4a22",
    nom: "NATURE_MENTION",
    code: "23",
    libelle: "Annulation de l'acte",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03cede5-d26e-41ec-a7e2-0f1a09d5e162",
    nom: "NATURE_MENTION",
    code: "1",
    libelle: "Décès, absence",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
    nom: "NATURE_MENTION",
    code: "3",
    libelle: "Séparation de corps",
    estActif: true,
    opposableAuTiers: true
  },
  {
    id: "b03cd7cf-b9e2-4ddc-b039-87f1ab2fadb7",
    nom: "NATURE_MENTION",
    code: "4",
    libelle: "Reprise vie commune",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c5992-d421-4aa1-a4cf-f97f22b267f9",
    nom: "NATURE_MENTION",
    code: "5",
    libelle: "Divorce",
    estActif: true,
    opposableAuTiers: true
  },
  {
    id: "b03c5368-01a5-4027-981d-bfd165b358ae",
    nom: "NATURE_MENTION",
    code: "6",
    libelle: "Régime matrimonial",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
    nom: "NATURE_MENTION",
    code: "8",
    libelle: "Nationalité",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c848a-af74-483b-ace9-aec7f7ea3c1b",
    nom: "NATURE_MENTION",
    code: "9",
    libelle: "Extranéité",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c5a32-397a-4ded-857b-798da72935d6",
    nom: "NATURE_MENTION",
    code: "10",
    libelle: "Changement nom, prénom, francisation",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c45b2-74c6-4cc5-9f64-4bad6f343598",
    nom: "NATURE_MENTION",
    code: "11",
    libelle: "Changement de sexe",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c04c5-a17e-4b75-b61e-8158b029da15",
    nom: "NATURE_MENTION",
    code: "12",
    libelle: "Lien de filiation hors adoption",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c14e3-7b8b-411d-8a6f-10a60334f509",
    nom: "NATURE_MENTION",
    code: "13",
    libelle: "Adoption simple",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c3b1c-412b-4a94-93ba-ebbb457000b0",
    nom: "NATURE_MENTION",
    code: "14",
    libelle: "Pupille de la nation",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03ceb19-f934-49ab-9c3b-76d0d59337c4",
    nom: "NATURE_MENTION",
    code: "18",
    libelle: "Annulation d'un événement",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03cd289-503f-4c98-8d12-0dffd9c51178",
    nom: "NATURE_MENTION",
    code: "15",
    libelle: "Annulation de mariage",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c5a85-cc38-4577-aaac-397cabf86ca3",
    nom: "NATURE_MENTION",
    code: "16",
    libelle: "Annulation de PACS",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03cfc41-1821-496d-891c-87f963149600",
    nom: "NATURE_MENTION",
    code: "17",
    libelle: "Annulation/révocation d'une décision (absence, adoption simple)",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c5f7f-2ad5-4f55-8599-6192dd6f126e",
    nom: "NATURE_MENTION",
    code: "22",
    libelle: "RC radié",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03c2ae6-1ae8-40b8-a9e8-6259af6d3afc",
    nom: "NATURE_MENTION",
    code: "19",
    libelle: 'Annulation d\'une mention "réputée non écrite"',
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03cdc6e-c77f-47a6-bc51-25b52ad7674e",
    nom: "NATURE_MENTION",
    code: "21",
    libelle: "RC",
    estActif: true,
    opposableAuTiers: true
  },
  {
    id: "3fe1a991-6717-49cb-a208-a8fc09afc853",
    nom: "NATURE_MENTION",
    code: "29",
    libelle: "Modification du PACS",
    estActif: true,
    opposableAuTiers: true
  },
  {
    id: "b03cf4c0-d452-45f8-b284-c585a7a47fb8",
    nom: "NATURE_MENTION",
    code: "20",
    libelle: "Rectification (hors annulation de mention)",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "26186600-3146-4e95-954b-6ac741ad421a",
    nom: "NATURE_MENTION",
    code: "28",
    libelle: "Dissolution du PACS",
    estActif: true,
    opposableAuTiers: true
  },
  {
    id: "56ab85e8-eb8b-4ec1-b800-88be22871f1b",
    nom: "NATURE_MENTION",
    code: "27",
    libelle: "Mariage",
    estActif: true,
    opposableAuTiers: false
  },
  {
    id: "b03cd99d-3422-4d70-98b5-7da12277e179",
    nom: "NATURE_MENTION",
    code: "2",
    libelle: "PACS",
    estActif: true,
    opposableAuTiers: true
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390122",
    nom: "NATURE_RC",
    code: "CO_CURATELLE_RENFORCEE",
    libelle: "co-curatelle renforcée",
    estActif: false,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "bba162ee-4685-4e2e-b31b-dc7a0dece833",
    nom: "NATURE_RC",
    code: "INCONNUE",
    libelle: "Inconnue",
    estActif: false,
    type: "Inconnu",
    article: "",
    categorieRCRCA: "INCONNUE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390131",
    nom: "NATURE_RC",
    code: "INTERDICTION",
    libelle: "interdiction",
    estActif: false,
    type: "Requête",
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "INTERDICTION"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390123",
    nom: "NATURE_RC",
    code: "CURATELLE_512",
    libelle: "curatelle 512",
    estActif: false,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390124",
    nom: "NATURE_RC",
    code: "CURATELLE_AGGRAVEE",
    libelle: "curatelle aggravée",
    estActif: false,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390125",
    nom: "NATURE_RC",
    code: "CURATELLE_AGGRAVEE_512",
    libelle: "curatelle aggravée 512",
    estActif: false,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390126",
    nom: "NATURE_RC",
    code: "CURATELLE_ALLEGEE",
    libelle: "curatelle allégée",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390127",
    nom: "NATURE_RC",
    code: "CURATELLE_AMENAGEE",
    libelle: "curatelle aménagée",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390128",
    nom: "NATURE_RC",
    code: "CURATELLE_RENFORCEE",
    libelle: "curatelle renforcée",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390129",
    nom: "NATURE_RC",
    code: "CURATELLE_RENFORCEE_512",
    libelle: "curatelle renforcée 512",
    estActif: false,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739012a",
    nom: "NATURE_RC",
    code: "CURATELLE_RENFORCEE_AMENAGEE",
    libelle: "curatelle renforcée aménagée",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739012b",
    nom: "NATURE_RC",
    code: "CURATELLE_RENFORCEE_BIENS",
    libelle: "curatelle renforcée aux biens",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739012c",
    nom: "NATURE_RC",
    code: "CURATELLE_RENFORCEE_BIENS_PERSONNE",
    libelle: "curatelle renforcée aux biens et à la personne",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739012d",
    nom: "NATURE_RC",
    code: "CURATELLE_SIMPLE",
    libelle: "curatelle simple",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739012e",
    nom: "NATURE_RC",
    code: "CURATELLE",
    libelle: "curatelle",
    estActif: false,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "CURATELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390130",
    nom: "NATURE_RC",
    code: "HABILITATION_FAMILIALE_GENERALE",
    libelle: "habilitation familiale générale",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "HABILITATION "
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390132",
    nom: "NATURE_RC",
    code: "HOMOLOGATION_JUDICIAIRE",
    libelle: "homologation judiciaire d'un acte de changement de régime matrimonial",
    estActif: true,
    type: "Requête",
    decisionCouple: true,
    article: "l'",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390133",
    nom: "NATURE_RC",
    code: "RADIATION_REQUETE_HOMOLOGATION_JUDICIAIRE",
    libelle: "radiation d'une requête en homologation judiciaire d'un acte de changement de régime matrimonial",
    estActif: true,
    type: "Requête",
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390134",
    nom: "NATURE_RC",
    code: "SEPARATION_JUDICIAIRE_BIENS",
    libelle: "séparation judiciaire de biens",
    estActif: true,
    type: "Requête",
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390135",
    nom: "NATURE_RC",
    code: "TRANSFERT_POUVOIRS",
    libelle: "transfert de pouvoirs",
    estActif: true,
    type: "Requête",
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390136",
    nom: "NATURE_RC",
    code: "TUTELLE",
    libelle: "tutelle",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390137",
    nom: "NATURE_RC",
    code: "TUTELLE_ALLEGEE",
    libelle: "tutelle allégée",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390138",
    nom: "NATURE_RC",
    code: "TUTELLE_AMENAGEE",
    libelle: "tutelle aménagée",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390139",
    nom: "NATURE_RC",
    code: "TUTELLE_BIENS",
    libelle: "tutelle aux biens",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RC",
    code: "TUTELLE_BIENS_PERSONNE",
    libelle: "tutelle aux biens et à la personne",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739013b",
    nom: "NATURE_RC",
    code: "TUTELLE_BIENS_PERSONNE_ASSISTANCE",
    libelle: "tutelle aux biens et à la personne (avec assistance)",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d2739013c",
    nom: "NATURE_RC",
    code: "TUTELLE_BIENS_PERSONNE_REPRESENTATION",
    libelle: "tutelle aux biens et à la personne (avec représentation)",
    estActif: true,
    type: "Protection des majeurs",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "058a436b-330d-4c3c-83e0-e49d27390121",
    nom: "NATURE_RC",
    code: "PRESOMPTION_ABSENCE",
    libelle: "présomption d'absence",
    estActif: true,
    type: "Requête",
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "ABSENCE"
  },
  {
    id: "888a436b-330d-4c3c-83e0-e49d2739013b",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_REGIME_MATRIMONIAL_HOMOLOGATION_JUDICIAIRE_ACTE_NOTARIE_FRANCAIS",
    libelle: "changement ou modification de régime matrimonial par homologation judiciaire d'un acte notarié français",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "a58a436b-330d-4c3c-83e0-e49d2739012a",
    nom: "NATURE_RCA",
    code: "DIVORCE_ETRANGER_EXEQUATUR",
    libelle: "divorce prononcé à l'étranger avec jugement d' exequatur",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "35fb18ca-181e-4617-adbc-45e88a672a71",
    nom: "NATURE_RCA",
    code: "INCONNUE",
    libelle: "Inconnue",
    estActif: false,
    type: "Inconnu",
    article: "",
    categorieRCRCA: "INCONNUE"
  },
  {
    id: "158a436b-330d-4c3c-83e0-e49d27390121",
    nom: "NATURE_RCA",
    code: "DECLARATION_JUDICIAIRE_ABSENCE",
    libelle: "déclaration judiciaire d'absence",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "ABSENCE"
  },
  {
    id: "358a436b-330d-4c3c-83e0-e49d27390123",
    nom: "NATURE_RCA",
    code: "MORT_DEPORTATION",
    libelle: '"Mort en déportation"',
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "DECES"
  },
  {
    id: "558a436b-330d-4c3c-83e0-e49d27390125",
    nom: "NATURE_RCA",
    code: "ANNULATION_MARIAGE_JUGEMENT_FRANCE",
    libelle: "annulation de mariage par jugement prononcé en France",
    estActif: true,
    decisionCouple: true,
    article: "l'",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "658a436b-330d-4c3c-83e0-e49d27390126",
    nom: "NATURE_RCA",
    code: "DIVORCE",
    libelle: "divorce",
    estActif: false,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "658a436b-330d-4c3c-83e0-e49d27390127",
    nom: "NATURE_RCA",
    code: "DIVORCE_REGLEMENT_CONSEIL_UE",
    libelle: "divorce dans le cadre du règlement du Conseil de l'UE 2201/2003 (Bruxelles II bis)",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "858a436b-330d-4c3c-83e0-e49d27390128",
    nom: "NATURE_RCA",
    code: "DIVORCE_JUDICIAIRE",
    libelle: "divorce judiciaire",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "b58a436b-330d-4c3c-83e0-e49d2739012b",
    nom: "NATURE_RCA",
    code: "MARIAGE_INOPPOSABLE_FRANCE",
    libelle: "mariage déclaré inopposable en France",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "b58b436b-330d-4c3c-83e0-e49d2739012b",
    nom: "NATURE_RCA",
    code: "REFUS_TRANSCRIPTION_ACTE_MARIAGE",
    libelle: "refus de transcription d’acte de mariage",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "c58a436b-330d-4c3c-83e0-e49d2739012c",
    nom: "NATURE_RCA",
    code: "REPRISE_VIE_COMMUNE",
    libelle: "reprise de la vie commune",
    estActif: true,
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "d58a436b-330d-4c3c-83e0-e49d2739012d",
    nom: "NATURE_RCA",
    code: "SEPARATION_CORPS_JUDICIAIRE",
    libelle: "séparation de corps judiciaire ",
    estActif: true,
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "e58a436b-330d-4c3c-83e0-e49d2739012e",
    nom: "NATURE_RCA",
    code: "SEPARATION_CORPS_CONSENTEMENT_MUTUEL",
    libelle: "séparation de corps par consentement mutuel",
    estActif: true,
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "f58a436b-330d-4c3c-83e0-e49d27390130",
    nom: "NATURE_RCA",
    code: "ACTE_NOTORIETE_POSSESSION_ETAT",
    libelle: "acte de notoriété constatant la possession d’état",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "068a436b-330d-4c3c-83e0-e49d27390131",
    nom: "NATURE_RCA",
    code: "ADOPTION_PLENIERE_FRANCE_PARENTS_ETRANGER",
    libelle: "adoption plénière prononcée en France – parents étrangers",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "168a436b-330d-4c3c-83e0-e49d27390132",
    nom: "NATURE_RCA",
    code: "ADOPTION_SIMPLE_ETRANGER_EXEQUATUR",
    libelle: "adoption simple prononcée à l'étranger avec jugement d'exequatur",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "268a436b-330d-4c3c-83e0-e49d27390133",
    nom: "NATURE_RCA",
    code: "ADOPTION_SIMPLE_FRANCE",
    libelle: "adoption simple prononcée en France",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "368a436b-330d-4c3c-83e0-e49d27390134",
    nom: "NATURE_RCA",
    code: "ANNULATION_LEGITIMATION",
    libelle: "annulation de légitimation",
    estActif: false,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "468a436b-330d-4c3c-83e0-e49d27390135",
    nom: "NATURE_RCA",
    code: "ANNULATION_RECONNAISSANCE",
    libelle: "annulation de reconnaissance",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "568a436b-330d-4c3c-83e0-e49d27390136",
    nom: "NATURE_RCA",
    code: "CONTESTATION_FILIATION_CHANGEMENT_NOM",
    libelle: "contestation de filiation et de changement de nom",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "668a436b-330d-4c3c-83e0-e49d27390137",
    nom: "NATURE_RCA",
    code: "CONTESTATION_FILIATION",
    libelle: "contestation de la filiation",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "768a436b-330d-4c3c-83e0-e49d27390138",
    nom: "NATURE_RCA",
    code: "CONTESTATION_MATERNITE",
    libelle: "contestation de maternité",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "868a436b-330d-4c3c-83e0-e49d27390139",
    nom: "NATURE_RCA",
    code: "CONTESTATION_PATERNITE",
    libelle: "contestation de paternité",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "968a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RCA",
    code: "DESAVEU_PATERNITE",
    libelle: "désaveu de paternité",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "a68a436b-330d-4c3c-83e0-e49d2739013b",
    nom: "NATURE_RCA",
    code: "ETABLISSEMENT_FILIATION",
    libelle: "établissement de la filiation",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "b68a436b-330d-4c3c-83e0-e49d2739013c",
    nom: "NATURE_RCA",
    code: "ETABLISSEMENT_FILIATION_CHANGEMENT_NOM",
    libelle: "établissement de la filiation et changement de nom",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "c68a436b-330d-4c3c-83e0-e49d27390121",
    nom: "NATURE_RCA",
    code: "ETABLISSEMENT_PATERNITE",
    libelle: "établissement de paternité",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "d68a436b-330d-4c3c-83e0-e49d27390122",
    nom: "NATURE_RCA",
    code: "JUGEMENT_CONSTATATION_POSSESSION_ETAT",
    libelle: "jugement en constatation de la possession d'état",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "e68a436b-330d-4c3c-83e0-e49d27390123",
    nom: "NATURE_RCA",
    code: "LEGITIMATION",
    libelle: "légitimation",
    estActif: false,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "f68a436b-330d-4c3c-83e0-e49d27390124",
    nom: "NATURE_RCA",
    code: "RECONNAISSANCE_ETRANGER_JUGEMENT_EXEQUATUR",
    libelle: "reconnaissance prononcée à l'étranger  avec jugement d'exequatur",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "078a436b-330d-4c3c-83e0-e49d27390125",
    nom: "NATURE_RCA",
    code: "REVOCATION_ADOPTION_SIMPLE",
    libelle: "révocation d'adoption simple",
    estActif: false,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "FILIATION"
  },
  {
    id: "178a436b-330d-4c3c-83e0-e49d27390126",
    nom: "NATURE_RCA",
    code: "ANNULATION_ENREGISTREMENT_DECLARATION_ACQUISITION_NATIONALITE_FRANCAISE",
    libelle: "annulation de l'enregistrement d'une déclaration d'acquisition de la nationalité française",
    estActif: false,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "278a436b-330d-4c3c-83e0-e49d27390127",
    nom: "NATURE_RCA",
    code: "CERTIFICAT_NATIONALITE_FRANCAISE_ATTENTE_ACTE_NAISSANCE",
    libelle: "certificat de nationalité française en attente d'établissement d'un acte de naissance",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "378a436b-330d-4c3c-83e0-e49d27390128",
    nom: "NATURE_RCA",
    code: "DEBOUTE_MINISTERE_CONTESTATION_NATIONALITE",
    libelle: "déboute le ministère public de son action en contestation de nationalité",
    estActif: false,
    decisionCouple: false,
    article: "",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "478a436b-330d-4c3c-83e0-e49d27390129",
    nom: "NATURE_RCA",
    code: "DECLARATION_ACQUISITION_NATIONALITE_FRANCAISE_ATTENTE_ACTE_NAISSANCE",
    libelle: "déclaration d'acquisition de la nationalité française en attente d'enregistrement ou d'établissement d'un acte de naissance ",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "578a436b-330d-4c3c-83e0-e49d2739012a",
    nom: "NATURE_RCA",
    code: "EXTRANEITE",
    libelle: "extranéité",
    estActif: true,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "678a436b-330d-4c3c-83e0-e49d2739012b",
    nom: "NATURE_RCA",
    code: "EXTRANEITE_AOUT_2010",
    libelle: "extranéité à compter du 8 août 2010",
    estActif: false,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "878a436b-330d-4c3c-83e0-e49d2739012d",
    nom: "NATURE_RCA",
    code: "NATIONALITE_FRANCAISE_AVRIL_2013",
    libelle: "nationalité française depuis le 19 avril 2013",
    estActif: false,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "978a436b-330d-4c3c-83e0-e49d2739012e",
    nom: "NATURE_RCA",
    code: "OPPOSITION_NATIONALITE_FRANCAISE",
    libelle: "opposition à la nationalité française",
    estActif: false,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "a78a436b-330d-4c3c-83e0-e49d27390130",
    nom: "NATURE_RCA",
    code: "REFUS_TRANSCRIPTION_ACTE_NAISSANCE",
    libelle: "refus de transcription d'acte de naissance",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "NATIONALITE "
  },
  {
    id: "b78a436b-330d-4c3c-83e0-e49d27390131",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_NOM_DECRET",
    libelle: "changement de nom à la suite d'un décret",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "NOM"
  },
  {
    id: "c78a436b-330d-4c3c-83e0-e49d27390132",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_NOM_JUDICIAIRE",
    libelle: "changement de nom par décision judiciaire",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "NOM"
  },
  {
    id: "d78a436b-330d-4c3c-83e0-e49d27390133",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_NOM_PRENOM_EXEQUATUR",
    libelle: "changement des noms et/ou prénoms prononcé à l'étranger avec jugement d'exequatur",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "NOM"
  },
  {
    id: "e78a436b-330d-4c3c-83e0-e49d27390134",
    nom: "NATURE_RCA",
    code: "EXEQUATUR_ORDONNANCE_CHANGEMENT_NOM",
    libelle: "exequatur d'ordonnance de changement de nom",
    estActif: false,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "NOM"
  },
  {
    id: "f78a436b-330d-4c3c-83e0-e49d27390135",
    nom: "NATURE_RCA",
    code: "ADJONCTION_PRENOMS",
    libelle: "adjonction de prénoms",
    estActif: false,
    decisionCouple: false,
    article: "l'",
    categorieRCRCA: "PRENOM"
  },
  {
    id: "088a436b-330d-4c3c-83e0-e49d27390136",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_PRENOM_JUDICIAIRE",
    libelle: "changement de prénom par décision judiciaire",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "PRENOM"
  },
  {
    id: "188a436b-330d-4c3c-83e0-e49d27390137",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_PRENOM",
    libelle: "changement de prénom",
    estActif: false,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "PRENOM"
  },
  {
    id: "388a436b-330d-4c3c-83e0-e49d27390139",
    nom: "NATURE_RCA",
    code: "JUGEMENT_RECTIFICATIF",
    libelle: "jugement rectificatif",
    estActif: false,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "RECTIFICATION"
  },
  {
    id: "488a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_REGIME_MATRIMONIAL_ACTE_NOTARIE_ETRANGER_INSTRUCTION_PROCUREUR",
    libelle: "changement de régime matrimonial par acte notarié étranger / instruction du Procureur",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "588a436b-330d-4c3c-83e0-e49d2739013b",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_REGIME_MATRIMONIAL_JUDICIAIRE_ETRANGER_INSTRUCTION_PROCUREUR",
    libelle: "changement de régime matrimonial par décision judiciaire étrangère / Instruction du Procureur",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "688a436b-330d-4c3c-83e0-e49d2739013c",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_REGIME_MATRIMONIAL_ACTE_NOTARIE_FRANCAIS",
    libelle: "changement ou modification de régime matrimonial par acte notarié français",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "788a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_REGIME_MATRIMONIAL_ACTE_NOTARIE_FRANCAIS_LOI_ETRANGERE_INSTRUCTION_PROCUREUR",
    libelle: "changement ou modification de régime matrimonial par acte notarié français / loi étrangère/ instruction du Procureur",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "988a436b-330d-4c3c-83e0-e49d2739013c",
    nom: "NATURE_RCA",
    code: "DESIGNATION_LOI_APPLICABLE_REGIME_MATRIMONIAL_ACTE_NOTARIE_ETRANGER_INSTRUCTION_PROCUREUR",
    libelle: "désignation de la loi applicable au régime matrimonial par acte notarié étranger / instruction du Procureur",
    estActif: true,
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "b88a436b-330d-4c3c-83e0-e49d2739013b",
    nom: "NATURE_RCA",
    code: "TRANSFERT_POUVOIRS",
    libelle: "transfert de pouvoirs",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "c78a436b-330d-4c3c-83e0-e49d2739013c",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_SEXE",
    libelle: "changement de sexe",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "SEXE"
  },
  {
    id: "d88a436b-330d-4c3c-83e0-e49d2739013c",
    nom: "NATURE_RCA",
    code: "CHANGEMENT_SEXE_PRENOMS",
    libelle: "changement de sexe et de prénom",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "SEXE"
  },
  {
    id: "e88a436b-330d-4c3c-83e0-e49d2739013c",
    nom: "NATURE_RCA",
    code: "JUGEMENT_TUTELLE_EXEQUATUR",
    libelle: "jugement de tutelle prononcé à l'étranger avec jugement d'exequatur",
    estActif: true,
    decisionCouple: false,
    article: "le",
    categorieRCRCA: "TUTELLE"
  },
  {
    id: "258a436b-330d-4c3c-83e0-e49d27390122",
    nom: "NATURE_RCA",
    code: "DECLARATION_JUDICIAIRE_DECES",
    libelle: "déclaration judiciaire de décès",
    estActif: false,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "DECES"
  },
  {
    id: "958a436b-330d-4c3c-83e0-e49d27390129",
    nom: "NATURE_RCA",
    code: "DIVORCE_CONSENTEMENT_MUTUEL_NOTAIRE",
    libelle: "divorce par consentement mutuel par acte sous seing privé",
    estActif: true,
    decisionCouple: true,
    article: "le",
    categorieRCRCA: "DIVORCE"
  },
  {
    id: "778a436b-330d-4c3c-83e0-e49d2739012c",
    nom: "NATURE_RCA",
    code: "NATIONALITE_FRANCAISE",
    libelle: "nationalité française en attente de l'établissement d'un acte de naissance par le poste consulaire",
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "NATIONALITE"
  },
  {
    id: "458a436b-330d-4c3c-83e0-e49d27390124",
    nom: "NATURE_RCA",
    code: "MORT_FRANCE",
    libelle: '"Mort pour la France"',
    estActif: true,
    decisionCouple: false,
    article: "la",
    categorieRCRCA: "DECES"
  },
  {
    id: "288a436b-330d-4c3c-83e0-e49d27390138",
    nom: "NATURE_RCA",
    code: "ADOPTE_NATION",
    libelle: "adoption par la Nation",
    estActif: true,
    decisionCouple: false,
    article: "",
    categorieRCRCA: "PUPILLE NATION"
  },
  {
    id: "a88a436b-330d-4c3c-83e0-e49d2739013a",
    nom: "NATURE_RCA",
    code: "DESIGNATION_LOI_APPLICABLE_REGIME_MATRIMONIAL_ACTE_NOTARIE_FRANCAIS",
    libelle: "désignation de la loi applicable au régime matrimonial",
    estActif: true,
    decisionCouple: true,
    article: "la",
    categorieRCRCA: "REGIME MATRIMONIAL"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27690ba1",
    nom: "POPIN_SIGNATURE",
    code: "POPIN_SIGNATURE_ACTE",
    libelle: "Popin signature acte",
    estActif: true,
    type: "Popin signature",
    sousType: "POPIN_SIGNATURE_ACTE",
    description:
      "Après validation, les données suivantes seront générées automatiquement et inscrites sur le document final: référence de l’acte ; formule finale, comprenant le nom et le prénom figurant sur le certificat électronique servant à la signature ; date et lieu de signature."
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ba0",
    nom: "POPIN_SIGNATURE",
    code: "POPIN_SIGNATURE_MENTION",
    libelle: "Popin signature mention",
    estActif: true,
    type: "Popin signature",
    sousType: "POPIN_SIGNATURE_MENTION",
    description:
      "En cliquant sur VALIDER, vous acceptez de signer électroniquement la ou les mentions apposée(s) qui comporteront les données suivantes insérées automatiquement : lieu et date d’apposition, qualité du signataire, prénom et nom usuels dans le dispositif de création de signature qualifiée."
  },
  {
    id: "f844b79d-e8c4-4eaf-bdf2-76c2af51f7eb",
    nom: "TYPE_ALERTE",
    code: "NE_PAS_DELIVRER_AUTRE",
    libelle: "A ne pas délivrer dans SAGA",
    type: "A ne pas délivrer",
    sousType: "repris SAGA",
    description: "A ne pas délivrer dans SAGA"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aad",
    nom: "TYPE_ALERTE",
    code: "LEGITIMATION_ADOPTIVE",
    libelle: "Légitimation adoptive, délivrance d'extrait à privilégier, délivrance de copie intégrale dans certaines conditions",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description:
      "A délivrer sous conditions - Extrait à privilégier - Légitimation adoptive, délivrance d'extrait à privilégier, délivrance de copie intégrale dans certaines conditions"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab0",
    nom: "TYPE_ALERTE",
    code: "PROBLEME_FONCTIONNEL",
    libelle: "Problème fonctionnel",
    type: "Problème fonctionnel",
    sousType: "Problème fonctionnel",
    description: "Problème fonctionnel"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aac",
    nom: "TYPE_ALERTE",
    code: "ENONCIATION_PROHIBEES",
    libelle: "Enonciations prohibées, à délivrer en extrait ou masquer les énonciations avant délivrance de copie intégrale",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description:
      "A délivrer sous conditions - Enonciations prohibées, à délivrer en extrait ou masquer les énonciations avant délivrance de copie intégrale"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aab",
    nom: "TYPE_ALERTE",
    code: "DELIVRANCE_COPIE_INTEGRALE",
    libelle: "Délivrance en copie intégrale à privilégier",
    type: "A délivrer sous conditions",
    sousType: "Copie intégrale à privilégier",
    description: "A délivrer sous conditions - Délivrance en copie intégrale à privilégier"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aaa",
    nom: "TYPE_ALERTE",
    code: "ATTENTE_NUMERISATION",
    libelle: "En attente de nouvelle numérisation",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - En attente de nouvelle numérisation"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa0",
    nom: "TYPE_ALERTE",
    code: "ACTE_DOUBLONS",
    libelle: "Actes en double, voir acte n°",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - Actes en double, voir acte n°"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa9",
    nom: "TYPE_ALERTE",
    code: "TRAITEMENT_DOUBLONS",
    libelle: "Traitement doublons en cours",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - Traitement doublons en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa8",
    nom: "TYPE_ALERTE",
    code: "SURSIS_EXPLOITATION_INSTRUCTION_PARQUET",
    libelle: "Sursis à exploitation, instructions au Parquet",
    type: "A ne pas délivrer",
    sousType: "Divers - ne pas délivrer",
    description: "A ne pas délivrer - Divers - Sursis à exploitation, instructions au Parquet"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa7",
    nom: "TYPE_ALERTE",
    code: "EXTRANEITE_EPOUX_DOSSIER_PARQUET",
    libelle: "Extraénité des époux, dossier au Parquet en cours",
    type: "A ne pas délivrer",
    sousType: "Nationalité",
    description: "A ne pas délivrer - Nationalité - Extraénité des époux, dossier au Parquet en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa6",
    nom: "TYPE_ALERTE",
    code: "MARIAGE_INOPPOSABLE_FRANCE",
    libelle: "Mariage inopposable en France",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Mariage inopposable en France"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa2",
    nom: "TYPE_ALERTE",
    code: "ACTE_ANNULE_ADOPTION_PLENIERE",
    libelle: "Acte annulé, adoption plénière",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - acte annulé, adoption plénière"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa3",
    nom: "TYPE_ALERTE",
    code: "TRANSCRIPTION_ANNULATION_DOSSIER_PARQUET",
    libelle: "Transcription pour annulation, dossier au Parquet en cours",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Transcription pour annulation, dossier au Parquet en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa5",
    nom: "TYPE_ALERTE",
    code: "MARIAGE_ANNULE",
    libelle: "Mariage annulé",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Mariage annulé"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aae",
    nom: "TYPE_ALERTE",
    code: "PV_ABANDON",
    libelle: "Procès-verbal d'abandon qui tient lieu d'acte de naissance",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description: "A délivrer sous conditions - Extrait à privilégier - Procès-verbal d'abandon qui tient lieu d'acte de naissance"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aaf",
    nom: "TYPE_ALERTE",
    code: "ACTE_DESAVEU_PATERNITE",
    libelle: "Acte comportant une mention de désaveu de paternité",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description: "A délivrer sous conditions - Extrait à privilégier - Acte comportant une mention de désaveu de paternité"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab1",
    nom: "TYPE_ALERTE",
    code: "ACTE_CHANGEMENT_SEXE",
    libelle: "Actes comportant une mention de changement de sexe",
    type: "A délivrer sous conditions",
    sousType: "Extrait à privilégier",
    description: "A délivrer sous conditions - Extrait à privilégier - Actes comportant une mention de changement de sexe"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab2",
    nom: "TYPE_ALERTE",
    code: "RECTIFICATION",
    libelle: "Rectification en cours",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Rectification en cours"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab3",
    nom: "TYPE_ALERTE",
    code: "PRECISER_CONDITIONS",
    libelle: "Préciser les conditions d'exploitation, les instructions du Parquet",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Préciser les conditions d'exploitation, les instructions du Parquet"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab4",
    nom: "TYPE_ALERTE",
    code: "CONSULTER_DOSSIER",
    libelle: "Consulter le dossier n°",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Consulter le dossier n°"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab5",
    nom: "TYPE_ALERTE",
    code: "DELIVRANCE_RESERVE_PREUVE",
    libelle: "Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description:
      "A délivrer sous conditions - Divers - Délivrance sous réserve de la preuve de la nationalité française de l'autre conjoint"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab6",
    nom: "TYPE_ALERTE",
    code: "HOMONYMIE",
    libelle: "Homonymie, voir acte n°",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Homonymie, voir acte n°"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab7",
    nom: "TYPE_ALERTE",
    code: "DELIVRER_AUTORITE_JUDICIAIRE",
    libelle: "Ne délivrer qu'à une autorité judiciaire",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - Ne délivrer qu'à une autorité judiciaire"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab8",
    nom: "TYPE_ALERTE",
    code: "ATTENTE_VERIFICATION",
    libelle: "En attente de vérification",
    type: "A délivrer sous conditions",
    sousType: "Divers - délivrer sous conditions ",
    description: "A délivrer sous conditions - Divers - En attente de vérification"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ab9",
    nom: "TYPE_ALERTE",
    code: "ACTE_NON_NUMERISE",
    libelle: "Acte pas encore numérisé",
    type: "Acte non exploitable",
    sousType: "Acte non exploitable",
    description: "Acte non exploitable - Acte pas encore numérisé"
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390aa1",
    nom: "TYPE_ALERTE",
    code: "ACTE_ANNULE",
    libelle: "Acte annulé",
    type: "A ne pas délivrer",
    sousType: "Annulation",
    description: "A ne pas délivrer - Annulation - Acte annulé"
  },
  {
    id: "b394ef34-2b40-44d7-b1a6-68c61e4fdfc5",
    nom: "TYPE_ALERTE",
    code: "PROBLEME_TECHNIQUE",
    libelle: "Problème technique",
    type: "Problème technique",
    sousType: "Problème technique",
    description: "Problème technique"
  },
  {
    id: "063cb865-1217-440d-861b-f777b995a59f",
    nom: "TYPE_ALERTE",
    code: "NON_EXPLOITABLE",
    libelle: "Non exploitable dans SAGA",
    type: "Acte non exploitable",
    sousType: "repris SAGA",
    description: "Acte non exploitable - repris SAGA"
  },
  {
    id: "9e00d7c7-10f8-441a-9f57-8051b24f3a65",
    nom: "TYPE_ALERTE",
    code: "INFORMATION_SAGA",
    libelle: "Information SAGA",
    type: "Description SAGA",
    sousType: "Repris SAGA",
    description: "Information SAGA"
  },
  {
    id: "6cc42860-9421-4224-be49-2c91309199cd",
    nom: "TYPE_ALERTE",
    code: "DELIVRER_SOUS_CONDITION_AUTRE",
    libelle: "A délivrer sous conditions dans SAGA",
    type: "A délivrer sous conditions",
    sousType: "repris SAGA",
    description: "A délivrer sous conditions dans SAGA"
  }
] as ITypeAlerte[];
