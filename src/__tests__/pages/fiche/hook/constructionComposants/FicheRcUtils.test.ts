import { getPanelsRca } from "../../../../../views/pages/fiche/hook/constructionComposants/FicheRcaUtils";
import mockRC from "../../../../../api/mock/data/RC.json";
import { getPanelsRc } from "../../../../../views/pages/fiche/hook/constructionComposants/FicheRcUtils";

test("ficheUtils rc works", async () => {
  const panels = getPanelsRc(mockRC.data);
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(4);
  expect(panels.panels[0].title).toBe("Vue du RC");
});
