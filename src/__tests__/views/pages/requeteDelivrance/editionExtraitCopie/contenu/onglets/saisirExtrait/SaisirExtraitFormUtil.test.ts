import { mapTitulaires } from "@hook/repertoires/MappingRepertoires";
import {
  titulaireClassique,
  titulaireParentsDeMemeSexe,
  titulaireSexeInconnu
} from "@mock/data/Titulaire";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { parentMemeSexeOuIndeterminCasPlurilingue } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitFormUtil";

test("Attendu: parentMemeSexeOuExtraitPlurilingue fonctionne correctement", async () => {
  const titulairesSexesInconnus = mapTitulaires([titulaireSexeInconnu]);
  const documentsReponses = [
    {
      typeDocument: DocumentDelivrance.getUuidFromCode(CODE_EXTRAIT_PLURILINGUE)
    } as IDocumentReponse
  ];
  expect(
    parentMemeSexeOuIndeterminCasPlurilingue(
      titulairesSexesInconnus,
      documentsReponses
    )
  ).toBeTruthy();

  const titulairesParentsMemeSexe = mapTitulaires([titulaireParentsDeMemeSexe]);
  expect(
    parentMemeSexeOuIndeterminCasPlurilingue(
      titulairesParentsMemeSexe,
      documentsReponses
    )
  ).toBeTruthy();

  const titulairesClassiques = mapTitulaires([titulaireClassique]);

  expect(
    parentMemeSexeOuIndeterminCasPlurilingue(
      titulairesClassiques,
      documentsReponses
    )
  ).toBeFalsy();
});
