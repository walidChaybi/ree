import {
  annulationJuridictionMap,
  dissolutionJuridictionMap,
  pacsModificationNotaireMap
} from "../../../mock/data/PACS";
import { ICertificatPACSComposition } from "../../../model/composition/pacs/ICertificatPACSComposition";
import { ParagrapheComposition } from "../../../model/composition/pacs/IParagraphesPacsComposition";
import { IAutorite } from "../../../model/etatcivil/commun/IAutorite";
import { TypeAutorite } from "../../../model/etatcivil/enum/TypeAutorite";
import { TypeJuridiction } from "../../../model/etatcivil/enum/TypeJuridiction";
import { IAnnulation } from "../../../model/etatcivil/pacs/IAnnulation";
import { IDissolution } from "../../../model/etatcivil/pacs/IDissolution";
import { IModification } from "../../../model/etatcivil/pacs/IModification";

test("ajoutParagrapheEnregistrementPACS", () => {
  let temp = {} as ICertificatPACSComposition;
  ParagrapheComposition.ajoutParagrapheEnregistrementPACS(
    temp,
    pacsModificationNotaireMap
  );
  ParagrapheComposition.ajoutParagrapheModificationPACS(
    temp,
    pacsModificationNotaireMap.modifications
      ? pacsModificationNotaireMap.modifications
      : ([] as IModification[])
  );
  ParagrapheComposition.ajoutParagrapheDissolutionPACS(
    temp,
    dissolutionJuridictionMap.dissolution
      ? dissolutionJuridictionMap.dissolution
      : ({} as IDissolution)
  );
  ParagrapheComposition.ajoutParagrapheAnnulationPACS(
    temp,
    annulationJuridictionMap.annulation
      ? annulationJuridictionMap.annulation
      : ({} as IAnnulation)
  );

  expect(temp).toStrictEqual({
    paragraphe_enregistrement: `Enregistrée par Maître dominique Ester, notaire à Paris arr.18, office notarial n°1235467890, le 19 janvier 1970.
Date d'effet de la déclaration du PACS à l'égard des tiers : 1er décembre 2020`,
    paragraphe_modification: `Modifiée par Maître Martin De la plume dans le bec, notaire à Nantes (Loire-Atlantique), office notarial n°987563141, le 22 janvier 2021.
Date d'effet de la modification du PACS à l'égard des tiers : 22 janvier 2021.`,
    paragraphe_dissolution: `Dissoute au tribunal judiciaire de Paris arr.18, le 26 novembre 2020.
Date d'effet de la dissolution du PACS à l'égard des tiers : 26 novembre 2020.`,
    paragraphe_annulation: `Annulée par jugement du tribunal judiciaire de Paris, le 26 novembre 2020.
Date d'effet d'annulation du PACS à l'égard des tiers : 26 novembre 2020.`
  });
});

test("getLibelleJuridiction", () => {
  expect(
    ParagrapheComposition.getLibelleJuridiction(TypeJuridiction.COURS_APPEL)
  ).toBe("par arrêt de la cour d'appel de");
});
test("getLibelleJuridiction defaut", () => {
  expect(
    ParagrapheComposition.getLibelleJuridiction(TypeJuridiction.GREFFE_TRIBUNAL)
  ).toBe("par jugement du tribunal judiciaire de");
});
test("getAutorite commune", () => {
  expect(
    ParagrapheComposition.getAutorite(({
      typeAutorite: TypeAutorite.COMMUNE
    } as unknown) as IAutorite)
  ).toBe("en la commune de");
});
test("getAutorite commune", () => {
  expect(
    ParagrapheComposition.getAutorite(({
      typeAutorite: "salut"
    } as unknown) as IAutorite)
  ).toBe("");
});
test("getAutorite poste", () => {
  expect(
    ParagrapheComposition.getAutorite(({
      typeAutorite: TypeAutorite.POSTE_ETRANGER,
      typePoste: "Benoît"
    } as unknown) as IAutorite)
  ).toBe("par Benoît à");
});
