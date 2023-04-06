import { specificationPhraseDelivrer } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseDelivrer";
import { INbInscriptionsInfos } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import {
    FicheRcDecisionNotaire,
    FicheRcModification
} from "../../../../../../mock/data/ficheRC";
import {
    FicheRcaDecisionAvecInstructionProcureur,
    FicheRcaDecisionJuridictionEtrangere
} from "../../../../../../mock/data/ficheRCA";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";
import {
    annulationJuridictionMap,
    pacsModificationNotaireMap
} from "../../../../../../mock/data/PACS";
const nbInscriptionsInfos = {} as INbInscriptionsInfos;

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS et il n'y a pas de PACS", async () => {
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id, // CERTIFICAT_SITUATION_PACS
    Sexe.FEMININ,
    nbInscriptionsInfos,
    {
      infosPacs: [],
      infosRc: [],
      infosRca: []
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- N'est pas inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RC et il n'y a pas de RC", async () => {
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id, // CERTIFICAT_SITUATION_RC
    Sexe.FEMININ,
    nbInscriptionsInfos,
    {
      infosPacs: [],
      infosRc: [],
      infosRca: []
    }
  );
  expect(phrase.phrasesLiees).toBe("- N’est pas inscrite au répertoire civil.");
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RCA et il n'y a pas de RCA", async () => {
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id, // CERTIFICAT_SITUATION_RCA
    Sexe.FEMININ,
    nbInscriptionsInfos,
    {
      infosPacs: [],
      infosRc: [],
      infosRca: []
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- N’est pas inscrite au répertoire civil annexe."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS et il y a au moins un PACS", async () => {
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id, //CERTIFICAT_SITUATION_PACS
    Sexe.FEMININ,
    nbInscriptionsInfos,
    {
      infosPacs: [pacsModificationNotaireMap, annulationJuridictionMap],
      infosRc: [],
      infosRca: []
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 1er décembre 2020 sous la référence PAC n°2018-123456 (modifié).\n- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 4 décembre 2020 sous la référence PAC n°2018-123456 (annulé)."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RC et il y a au moins un RC", async () => {
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id, //CERTIFICAT_SITUATION_RC
    Sexe.FEMININ,
    nbInscriptionsInfos,
    {
      infosPacs: [],
      infosRc: [FicheRcDecisionNotaire, FicheRcModification],
      infosRca: []
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au répertoire civil depuis le 18 novembre 2020 sous la référence RC n°2020-11.\n- Est inscrite au répertoire civil depuis le 22 novembre 2020 sous la référence RC n°2020-2."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RCA et il y a au moins un RC", async () => {
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id, //CERTIFICAT_SITUATION_RCA
    Sexe.FEMININ,
    nbInscriptionsInfos,
    {
      infosPacs: [],
      infosRc: [],
      infosRca: [
        FicheRcaDecisionJuridictionEtrangere,
        FicheRcaDecisionAvecInstructionProcureur
      ]
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au répertoire civil annexe depuis le 23 février 2020 sous la référence RCA n°2020-4013.\n- Est inscrite au répertoire civil annexe depuis le 23 février 2020 sous la référence RCA n°2020-4012."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS_RC_RCA et il y a au moins un PACS, un RC et un RCA", async () => {
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[4].id, //CERTIFICAT_SITUATION_PACS_RC_RCA
    Sexe.FEMININ,
    nbInscriptionsInfos,
    {
      infosPacs: [pacsModificationNotaireMap, annulationJuridictionMap],
      infosRc: [FicheRcDecisionNotaire, FicheRcModification],
      infosRca: [
        FicheRcaDecisionJuridictionEtrangere,
        FicheRcaDecisionAvecInstructionProcureur
      ]
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 1er décembre 2020 sous la référence PAC n°2018-123456 (modifié).\n- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 4 décembre 2020 sous la référence PAC n°2018-123456 (annulé).\n- Est inscrite au répertoire civil depuis le 18 novembre 2020 sous la référence RC n°2020-11.\n- Est inscrite au répertoire civil depuis le 22 novembre 2020 sous la référence RC n°2020-2.\n- Est inscrite au répertoire civil annexe depuis le 23 février 2020 sous la référence RCA n°2020-4013.\n- Est inscrite au répertoire civil annexe depuis le 23 février 2020 sous la référence RCA n°2020-4012."
  );
});


