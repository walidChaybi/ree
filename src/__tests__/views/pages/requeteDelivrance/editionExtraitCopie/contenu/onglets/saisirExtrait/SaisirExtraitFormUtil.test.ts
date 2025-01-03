import { mapTitulaires } from "@hook/repertoires/MappingRepertoires";
import { titulaireClassique, titulaireParentsDeMemeSexe, titulaireSexeInconnu } from "@mock/data/Titulaire";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { parentMemeSexeOuIndeterminCasPlurilingue } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitFormUtil";
import { expect, test } from "vitest";

test("Attendu: parentMemeSexeOuExtraitPlurilingue fonctionne correctement", () => {
  const titulairesSexesInconnus = mapTitulaires([titulaireSexeInconnu]);
  const documentsReponses = [
    {
      typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE)
    }
  ] as IDocumentReponse[];
  expect(parentMemeSexeOuIndeterminCasPlurilingue(titulairesSexesInconnus, documentsReponses)).toBeTruthy();

  const titulairesParentsMemeSexe = mapTitulaires([titulaireParentsDeMemeSexe]);
  expect(parentMemeSexeOuIndeterminCasPlurilingue(titulairesParentsMemeSexe, documentsReponses)).toBeTruthy();

  const titulairesClassiques = mapTitulaires([titulaireClassique]);

  expect(parentMemeSexeOuIndeterminCasPlurilingue(titulairesClassiques, documentsReponses)).toBeFalsy();
});
