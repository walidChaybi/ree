import { getValidationExtraitPlurilingue } from "@hook/generation/generationECHook/generationECHookUtil";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { describe, expect, test } from "vitest";
import { DOCUMENT_DELIVRANCE } from "../../../../../mock/data/NomenclatureDocumentDelivrance";
import { ficheActeAvecDeuxTitulaireIndetermine, ficheActeMariageAvecNomContientDesormais } from "../../../../../mock/data/ficheActe";

describe("Test de generationECHookUtil", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

  test("Attendu: getTypeDocument fonctionne correctement", () => {
    expect(DocumentDelivrance.getTypeDocument(ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION)).toBe(
      "318a2726-0d04-4558-8b36-8fe48780def5"
    );

    expect(DocumentDelivrance.getTypeDocument(ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION)).toBe(
      "28580709-06dd-4df2-bf6e-70a9482940a1"
    );

    expect(DocumentDelivrance.getTypeDocument(ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE)).toBe(
      "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6"
    );

    expect(DocumentDelivrance.getTypeDocument(ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE)).toBe("0e1e909f-f74c-4b16-9c03-b3733354c6ce");

    expect(DocumentDelivrance.getTypeDocument(ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE)).toBe("8b808725-a83e-4ce5-81a2-192cd09e0cb2");
  });

  test("Attendu: getValidationExtraitPlurilingue fonctionne correctement", () => {
    expect(getValidationExtraitPlurilingue(mapActe(ficheActeAvecDeuxTitulaireIndetermine.data as any as IFicheActe), Validation.O)).toBe(
      Validation.E
    );

    expect(getValidationExtraitPlurilingue(mapActe(ficheActeMariageAvecNomContientDesormais.data as any as IFicheActe), Validation.E)).toBe(
      Validation.N
    );
  });
});
