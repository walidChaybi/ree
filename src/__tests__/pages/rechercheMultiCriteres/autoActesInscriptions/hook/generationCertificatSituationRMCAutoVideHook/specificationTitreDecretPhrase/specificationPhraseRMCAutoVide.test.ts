import request from "superagent";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../../mock/data/nomenclatures";
import { DataRMCActeAvecResultat } from "../../../../../../../mock/data/RMCActe";
import { DataRMCInscriptionAvecResultat } from "../../../../../../../mock/data/RMCInscription";
import { configMultiAPi } from "../../../../../../../mock/superagent-config/superagent-mock-multi-apis";
import { Sexe } from "../../../../../../../model/etatcivil/enum/Sexe";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { specificationPhraseRMCAutoVide } from "../../../../../../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
const superagentMock = require("superagent-mock")(request, configMultiAPi);
test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper ne retourne rien car il y a des actes et des inscritptions", async () => {
  const dataRMCAutoActe: IResultatRMCActe[] = DataRMCActeAvecResultat;
  const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat;
  const phrase = await specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id,
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBeUndefined();
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper ne retourne rien car il y a des actes", async () => {
  const dataRMCAutoActe: IResultatRMCActe[] = DataRMCActeAvecResultat;
  const dataRMCAutoInscription: IResultatRMCInscription[] = [];
  const phrase = await specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id,
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBeUndefined();
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper retourne une phrase car pour une demande de cs RC/RCA il n'y a ni actes ni inscriptions", async () => {
  const dataRMCAutoActe: IResultatRMCActe[] = [];
  const dataRMCAutoInscription: IResultatRMCInscription[] = [];
  const phrase = await specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id, // CERTIFICAT_SITUATION_RC_RCA
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "N’est pas inscrite au répertoire civil.\nN’est pas inscrite au répertoire civil annexe."
  );
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper retourne une phrase car pour une demande de cs RC/RCA il n'y a pas d'actes et que des PACS", async () => {
  const dataRMCAutoActe: IResultatRMCActe[] = [];
  const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat.filter(
    res => res.categorie === "PACS"
  );
  const phrase = await specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id, // CERTIFICAT_SITUATION_RC_RCA
    Sexe.FEMININ,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "N’est pas inscrite au répertoire civil.\nN’est pas inscrite au répertoire civil annexe."
  );
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper retourne une phrase car pour une demande de cs PACS il n'y a pas d'actes et que des inscriptions", async () => {
  const dataRMCAutoActe: IResultatRMCActe[] = [];
  const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat.filter(
    res => res.categorie !== "PACS"
  );
  const phrase = await specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id, // CERTIFICAT_SITUATION_PACS
    Sexe.MASCULIN,
    dataRMCAutoActe,
    dataRMCAutoInscription
  );
  expect(phrase.phrasesLiees).toBe(
    "N'est pas inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
  );
});

afterAll(() => {
  superagentMock.unset();
});
