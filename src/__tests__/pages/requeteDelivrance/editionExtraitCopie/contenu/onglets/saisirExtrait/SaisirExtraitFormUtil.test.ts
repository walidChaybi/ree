import { mapTitulaires } from "@hook/repertoires/MappingRepertoires";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { parentMemeSexeOuExtraitPlurilingue } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitFormUtil";
import request from "superagent";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";
import {
  titulaireClassique,
  titulaireParentsDeMemeSexe,
  titulaireSexeInconnu
} from "./../../../../../../../mock/data/Titulaire";
const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(async () => {
  await DocumentDelivrance.init();
});

test("Attendu: parentMemeSexeOuExtraitPlurilingue fonctionne correctement", async () => {
  const titulairesSexesInconnus = mapTitulaires([titulaireSexeInconnu]);
  const documentsReponses = [
    {
      typeDocument: DocumentDelivrance.getUuidFromCode(CODE_EXTRAIT_PLURILINGUE)
    } as IDocumentReponse
  ];
  expect(
    parentMemeSexeOuExtraitPlurilingue(
      titulairesSexesInconnus,
      documentsReponses
    )
  ).toBeTruthy();

  const titulairesParentsMemeSexe = mapTitulaires([titulaireParentsDeMemeSexe]);
  expect(
    parentMemeSexeOuExtraitPlurilingue(
      titulairesParentsMemeSexe,
      documentsReponses
    )
  ).toBeTruthy();

  const titulairesClassiques = mapTitulaires([titulaireClassique]);

  expect(
    parentMemeSexeOuExtraitPlurilingue(titulairesClassiques, documentsReponses)
  ).toBeFalsy();
});

afterAll(() => {
  superagentMock.unset();
});
