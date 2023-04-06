import { specificationTitre } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationTitre";
import { waitFor } from "@testing-library/react";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";

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


