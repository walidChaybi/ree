import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getPanelsRc } from "@pages/fiche/hook/constructionComposants/rcrca/FicheRcUtils";
import { expect, test } from "vitest";
import mockRC from "../../../../../../mock/data/RC.json";

test("ficheUtils rc works", () => {
  const panels = getPanelsRc(mockRC.data as unknown as IFicheRcRca);
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(5);
  expect(panels.panels[0].title).toBe("Visualisation du RC");
});
