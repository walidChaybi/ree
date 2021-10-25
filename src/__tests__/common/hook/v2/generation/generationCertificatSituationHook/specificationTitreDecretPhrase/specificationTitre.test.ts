import { waitFor } from "@testing-library/react";
import request from "superagent";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../../mock/data/nomenclatures";
import { configMultiAPi } from "../../../../../../../mock/superagent-config/superagent-mock-multi-apis";
import { DocumentDelivrance } from "../../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { specificationTitre } from "../../../../../../../views/common/hook/v2/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationTitre";

const superagentMock = require("superagent-mock")(request, configMultiAPi);
beforeAll(() => {
  DocumentDelivrance.init();
});

test("Attendu: specificationTitre.getTitre la demande est CERTIFICAT_SITUATION_PACS", async () => {
  const titre = specificationTitre.getTitre(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id // CERTIFICAT_SITUATION_PACS
  );
  await waitFor(() => {
    expect(titre).toBe(
      `CERTIFICAT DE SITUATION RELATIF AU
REGISTRE DES PACS DES PERSONNES DE NATIONALITÉ ÉTRANGÈRE ET NÉES À L'ÉTRANGER
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
    );
  });
});

test("Attendu: specificationTitre.getTitre la demande est CERTIFICAT_SITUATION_RC", async () => {
  const titre = specificationTitre.getTitre(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id // CERTIFICAT_SITUATION_RC
  );
  await waitFor(() => {
    expect(titre).toBe(
      `CERTIFICAT DE SITUATION RELATIF AU
RÉPERTOIRE CIVIL
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
    );
  });
});

test("Attendu: specificationTitre.getTitre la demande est CERTIFICAT_SITUATION_RCA", async () => {
  const titre = specificationTitre.getTitre(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id // CERTIFICAT_SITUATION_RCA
  );
  await waitFor(() => {
    expect(titre).toBe(
      `CERTIFICAT DE SITUATION RELATIF AU
RÉPERTOIRE CIVIL ANNEXE
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
