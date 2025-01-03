import { INatureRca } from "@model/etatcivil/enum/NatureRca";

export const NATURE_RCA = [
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
  }
] as INatureRca[];
