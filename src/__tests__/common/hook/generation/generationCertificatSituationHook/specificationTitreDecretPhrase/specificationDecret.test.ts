import { waitFor } from "@testing-library/react";
import request from "superagent";
import { decrets } from "../../../../../../mock/data/NomenclatureEtatCivilDecrets";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";
import {} from "../../../../../../mock/superagent-config/superagent-mock-params";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../../../model/requete/enum/DocumentDelivrance";
import { specificationDecret } from "../../../../../../views/common/hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationDecret";
import { storeRece } from "../../../../../../views/common/util/storeRece";

const superagentMock = require("superagent-mock")(request, configRequetes);
beforeAll(() => {
  DocumentDelivrance.init();
  storeRece.decrets = decrets;
});

test("Attendu: specificationDecret.getDecret la demande est CERTIFICAT_SITUATION_PACS", async () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id // CERTIFICAT_SITUATION_PACS
  );
  await waitFor(() => {
    expect(decrets.map(d => d.libelle)).toEqual([
      "Article 515-3-1 du Code civil",
      "Article 1 du décret 2006-1806 du 23 décembre 2006 modifié",
      "Article 6 du décret 2012-966 du 20 août 2012",
      "Article 4-2 du décret 65-422 du 1er juin 1965 modifié"
    ]);
  });
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RC et il n'y a pas de RC", async () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id // CERTIFICAT_SITUATION_RC
  );
  await waitFor(() => {
    expect(decrets.map(d => d.libelle)).toEqual([
      "Article 4 du décret 65-422 du 1er juin 1965 modifié"
    ]);
  });
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RCA et il n'y a pas de PACS", async () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id // CERTIFICAT_SITUATION_RCA
  );
  await waitFor(() => {
    expect(decrets.map(d => d.libelle)).toEqual([
      "Article 4-1 du décret 65-422 du 1er juin 1965 modifié"
    ]);
  });
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS_RC_RCA et il y a au moins un PACS, un RC et un RCA", async () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[4].id //CERTIFICAT_SITUATION_PACS_RC_RCA
  );
  await waitFor(() => {
    expect(decrets.map(d => d.libelle)).toEqual([
      "Article 515-3-1 du Code civil",
      "Article 1 du décret 2006-1806 du 23 décembre 2006 modifié",
      "Article 6 du décret 2012-966 du 20 août 2012",
      "Article 4-2 du décret 65-422 du 1er juin 1965 modifié",
      "Article 4 du décret 65-422 du 1er juin 1965 modifié",
      "Article 4-1 du décret 65-422 du 1er juin 1965 modifié"
    ]);
  });
});
afterAll(() => {
  superagentMock.unset();
});
