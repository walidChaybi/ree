import { specificationCourrier } from "@hook/generation/generationCourrierHook/specificationCourrier";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { ActeAnalyseMarginales, OptionsChoisiesCourrier17, RequeteRDDCourrier17, SaisieCourrier17 } from "@mock/data/SaisieCourrier";
import { expect, test } from "vitest";

const saisieCourrier = SaisieCourrier17;
const requete = RequeteRDDCourrier17;
const optionsChoisies = OptionsChoisiesCourrier17;
const acte = mapActe(ActeAnalyseMarginales);

test("Attendu: specificationCourrier.getElementsJasper titulaire de la requete", () => {
  const elementsJasper = specificationCourrier.getElementsJasper(saisieCourrier, requete, optionsChoisies);

  expect(elementsJasper.nomTitulaire1).toBe("PRODESK");
  expect(elementsJasper.prenomsTitulaire1).toBe("Elodie, Juliette");
  expect(elementsJasper.nomTitulaire2).toBe("PRODESK");
  expect(elementsJasper.prenomsTitulaire2).toBe("Henri, Charles");
  expect(elementsJasper.texteLibre).toBe("Test Texte Libre courrier 17");

  expect(elementsJasper.options[0].option).toBe("Demande de copie intégrale par un tiers");
  expect(elementsJasper.options[1].option).toBe("Requérant mineur (modifié)");
  expect(elementsJasper.options[2].option_puce).toBe("- Mge consulat étranger en France");
  expect(elementsJasper.options[3].option_puce).toBe("- Option à tiret test (modifié)");

  expect(elementsJasper.optionsTexteLibre[0].option_puce).toBe("- Option 996 A tiret");
  expect(elementsJasper.optionsTexteLibre[1].option_puce).toBe("- Option 997 A tiret (modifié)");
  expect(elementsJasper.optionsTexteLibre[2].option).toBe("Option 998");
  expect(elementsJasper.optionsTexteLibre[3].option).toBe("Option 999 (modifié)");
  expect(elementsJasper.natureActe).toBe("mariage");
});

test("Attendu: specificationCourrier.getElementsJasper titulaire de l'analyse marginale'", () => {
  const elementsJasper = specificationCourrier.getElementsJasper(saisieCourrier, requete, [], acte);

  expect(elementsJasper.nomTitulaire1).toBe("MARECHAL");
  expect(elementsJasper.prenomsTitulaire1).toBe("Sophie, Thaîs, Uliana");
  expect(elementsJasper.nomTitulaire2).toBe("BAGOT");
  expect(elementsJasper.prenomsTitulaire2).toBe("Sébastien, Théo, Ulysse");
  expect(elementsJasper.texteLibre).toBe("Test Texte Libre courrier 17");
  expect(elementsJasper.natureActe).toBe("mariage");
});
