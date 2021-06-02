import mockRC from "../../../../../mock/data/RC.json";
import { getPanelsRc } from "../../../../../views/pages/fiche/hook/constructionComposants/rcrca/FicheRcUtils";

test("ficheUtils rc works", async () => {
  const panels = getPanelsRc(mockRC.data);
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(5);
  expect(panels.panels[0].title).toBe("Vue du RC");
});
