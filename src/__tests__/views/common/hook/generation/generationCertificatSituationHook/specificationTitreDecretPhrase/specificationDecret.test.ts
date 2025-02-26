import { specificationDecret } from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationDecret";
import { waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { decrets as decretsMock } from "../../../../../../mock/data/NomenclatureEtatCivilDecrets";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";
import {} from "../../../../../../mock/superagent-config/superagent-mock-params";

test("Attendu: specificationDecret.getDecret la demande est CERTIFICAT_SITUATION_PACS", () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[1].id,
    decretsMock // CERTIFICAT_SITUATION_PACS
  );
  waitFor(() => {
    expect(decrets.map(d => d.libelle)).toEqual([
      "Article 515-3-1 du Code civil",
      "Article 1 du décret 2006-1806 du 23 décembre 2006 modifié",
      "Article 6 du décret 2012-966 du 20 août 2012",
      "Article 4-2 du décret 65-422 du 1er juin 1965 modifié"
    ]);
  });
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RC et il n'y a pas de RC", () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[5].id,
    decretsMock // CERTIFICAT_SITUATION_RC
  );
  waitFor(() => {
    expect(decrets.map(d => d.libelle)).toEqual(["Article 4 du décret 65-422 du 1er juin 1965 modifié"]);
  });
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_RCA et il n'y a pas de PACS", () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[7].id,
    decretsMock // CERTIFICAT_SITUATION_RCA
  );
  waitFor(() => {
    expect(decrets.map(d => d.libelle)).toEqual(["Article 4-1 du décret 65-422 du 1er juin 1965 modifié"]);
  });
});

test("Attendu: specificationPhraseDelivrer.getPhrasesJasper la demande est CERTIFICAT_SITUATION_PACS_RC_RCA et il y a au moins un PACS, un RC et un RCA", () => {
  const decrets = specificationDecret.getDecret(
    ReponseAppelNomenclatureDocummentDelivrance.data[4].id,
    decretsMock //CERTIFICAT_SITUATION_PACS_RC_RCA
  );
  waitFor(() => {
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
