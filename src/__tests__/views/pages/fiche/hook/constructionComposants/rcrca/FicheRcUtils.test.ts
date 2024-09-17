import mockRC from "@mock/data/RC.json";
import { MandataireRc } from "@model/etatcivil/enum/MandataireRc";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getPanelsRc } from "@pages/fiche/hook/constructionComposants/rcrca/FicheRcUtils";
import { waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("ficheUtils rc works", () => {
  const panels = getPanelsRc(mockRC.data as unknown as IFicheRcRca);
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(5);
  expect(panels.panels[0].title).toBe("Visualisation du RC");
});

test("peupleMandataireRc", () => {
  MandataireRc.init();
  const mandataires = MandataireRc.getAllEnumsAsOptions();
  waitFor(() => {
    expect(mandataires).toBeDefined();
    expect(mandataires).toHaveLength(4);
  });
});
