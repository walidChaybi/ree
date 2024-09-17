import mockRCA from "@mock/data/RCA.json";
import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getPanelsRca } from "@pages/fiche/hook/constructionComposants/rcrca/FicheRcaUtils";
import { expect, test } from "vitest";

test("ficheUtils rca works", () => {
  const panels = getPanelsRca({
    ...(mockRCA.data as unknown as IFicheRcRca),
    personnes: []
  });
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(5);
  expect(panels.panels[0].title).toBe("Visualisation du RCA");
});
