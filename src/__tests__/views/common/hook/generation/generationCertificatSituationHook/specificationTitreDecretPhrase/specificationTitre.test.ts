import { specificationTitre } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationTitre";
import { waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";

test("Attendu: specificationTitre.getTitre la demande est CERTIFICAT_SITUATION_PACS", () => {
  const titre = specificationTitre.getTitre(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id // CERTIFICAT_SITUATION_PACS
  );
  waitFor(() => {
    expect(titre).toBe(
      `CERTIFICAT DE SITUATION RELATIF AU
REGISTRE DES PACS DES PERSONNES DE NATIONALITÉ ÉTRANGÈRE ET NÉES À L'ÉTRANGER
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
    );
  });
});

test("Attendu: specificationTitre.getTitre la demande est CERTIFICAT_SITUATION_RC", () => {
  const titre = specificationTitre.getTitre(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id // CERTIFICAT_SITUATION_RC
  );
  waitFor(() => {
    expect(titre).toBe(
      `CERTIFICAT DE SITUATION RELATIF AU
RÉPERTOIRE CIVIL
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
    );
  });
});

test("Attendu: specificationTitre.getTitre la demande est CERTIFICAT_SITUATION_RCA", () => {
  const titre = specificationTitre.getTitre(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id // CERTIFICAT_SITUATION_RCA
  );
  waitFor(() => {
    expect(titre).toBe(
      `CERTIFICAT DE SITUATION RELATIF AU
RÉPERTOIRE CIVIL ANNEXE
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
    );
  });
});
