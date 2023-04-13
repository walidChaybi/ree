import { specificationPhraseRMCAutoVide } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { ReponseAppelNomenclatureDocummentDelivrance } from "@mock/data/nomenclatures";
import { Sexe } from "@model/etatcivil/enum/Sexe";

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper ne retourne rien car il y a des actes et des inscritptions", async () => {
  // const dataRMCAutoActe: IResultatRMCActe[] = DataRMCActeAvecResultat;
  // const dataRMCAutoInscription: IResultatRMCInscription[] = DataRMCInscriptionAvecResultat;
  const phrase = specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id,
    Sexe.FEMININ,
    {
      nbActe: 4,
      nbPacs: 2,
      nbRc: 2,
      nbRca: 2
    }
  );
  expect(phrase.phrasesLiees).toBeUndefined();
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper ne retourne rien car il y a des actes", async () => {
  const phrase = specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id,
    Sexe.FEMININ,
    {
      nbActe: 4,
      nbPacs: 0,
      nbRc: 0,
      nbRca: 0
    }
  );
  expect(phrase.phrasesLiees).toBeUndefined();
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper retourne une phrase car pour une demande de cs RC/RCA il n'y a ni actes ni inscriptions", async () => {
  const phrase = specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id, // CERTIFICAT_SITUATION_RC_RCA
    Sexe.FEMININ,
    {
      nbActe: 0,
      nbPacs: 0,
      nbRc: 0,
      nbRca: 0
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- N’est pas inscrite au répertoire civil.\n- N’est pas inscrite au répertoire civil annexe."
  );
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper retourne une phrase car pour une demande de cs RC/RCA il n'y a pas d'actes et que des PACS", async () => {
  const phrase = specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[6].id, // CERTIFICAT_SITUATION_RC_RCA
    Sexe.FEMININ,
    {
      nbActe: 0,
      nbPacs: 1,
      nbRc: 0,
      nbRca: 0
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- N’est pas inscrite au répertoire civil.\n- N’est pas inscrite au répertoire civil annexe."
  );
});

test("Attendu: specificationPhraseRMCAutoVide.getPhrasesJasper retourne une phrase car pour une demande de cs PACS il n'y a pas d'actes et que des inscriptions", async () => {
  const phrase = specificationPhraseRMCAutoVide.getPhrasesJasper(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id, // CERTIFICAT_SITUATION_PACS
    Sexe.MASCULIN,
    {
      nbActe: 0,
      nbPacs: 0,
      nbRc: 0,
      nbRca: 0
    }
  );
  expect(phrase.phrasesLiees).toBe(
    "- N'est pas inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
  );
});
