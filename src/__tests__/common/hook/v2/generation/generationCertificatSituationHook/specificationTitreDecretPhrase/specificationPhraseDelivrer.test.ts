import request from "superagent";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../../mock/data/nomenclatures";
import { DataRMCInscriptionAvecResultat } from "../../../../../../../mock/data/RMCInscription";
import { configRequetesV2 } from "../../../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { Sexe } from "../../../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { specificationPhraseDelivrer } from "../../../../../../../views/common/hook/v2/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseDelivrer";
const superagentMock = require("superagent-mock")(request, configRequetesV2);

const dataRMCAutoActe: IResultatRMCActe[] = [];

beforeAll(() => {
  DocumentDelivrance.init();
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS et il n'y a pas de PACS", async () => {
  const dataRMCAutoInscription: IResultatRMCInscription[] = [];
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id, // CERTIFICAT_SITUATION_PACS
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "- N'est pas inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RC et il n'y a pas de RC", async () => {
  const dataRMCAutoInscription: IResultatRMCInscription[] = [];
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id, // CERTIFICAT_SITUATION_RC
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe("- N’est pas inscrite au répertoire civil.");
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RCA et il n'y a pas de PACS", async () => {
  const dataRMCAutoInscription: IResultatRMCInscription[] = [];
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id, // CERTIFICAT_SITUATION_RCA
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "- N’est pas inscrite au répertoire civil annexe."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS et il y a au moins un PACS", async () => {
  const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat;
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id, //CERTIFICAT_SITUATION_PACS
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 1er décembre 2020 sous la référence PAC n°2020-1001.\n- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 11 février 2000 sous la référence PAC n°2000-1006."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RC et il y a au moins un RC", async () => {
  const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat;
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id, //CERTIFICAT_SITUATION_RC
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au répertoire civil depuis le 5 novembre 2019 sous la référence RC n°2019-1002.\n- Est inscrite au répertoire civil depuis le 5 février 2009 sous la référence RC n°2009-1004."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RCA et il y a au moins un RC", async () => {
  const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat;
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id, //CERTIFICAT_SITUATION_RCA
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au répertoire civil annexe depuis le 7 mai 2017 sous la référence RCA n°2017-1003.\n- Est inscrite au répertoire civil annexe depuis le 7 juillet 2007 sous la référence RCA n°2007-1005."
  );
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS_RC_RCA et il y a au moins un PACS, un RC et un RCA", async () => {
  const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat;
  const phrase = specificationPhraseDelivrer.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[4].id, //CERTIFICAT_SITUATION_PACS_RC_RCA
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 1er décembre 2020 sous la référence PAC n°2020-1001.\n- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le 11 février 2000 sous la référence PAC n°2000-1006.\n- Est inscrite au répertoire civil depuis le 5 novembre 2019 sous la référence RC n°2019-1002.\n- Est inscrite au répertoire civil depuis le 5 février 2009 sous la référence RC n°2009-1004.\n- Est inscrite au répertoire civil annexe depuis le 7 mai 2017 sous la référence RCA n°2017-1003.\n- Est inscrite au répertoire civil annexe depuis le 7 juillet 2007 sous la référence RCA n°2007-1005."
  );
});

afterAll(() => {
  superagentMock.unset();
});
