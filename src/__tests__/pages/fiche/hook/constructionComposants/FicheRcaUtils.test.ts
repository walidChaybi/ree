import { getPanelsRca } from "../../../../../views/pages/fiche/hook/constructionComposants/FicheRcaUtils";
import mockRCA from "../../../../../api/mock/data/RCA.json";

test("ficheUtils rca works", async () => {
  const panels = getPanelsRca(mockRCA.data);
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(4);
  expect(panels.panels[0].title).toBe("Vue du RCA");
});
