import { getPanelsRca } from "../../../../../views/pages/fiche/hook/constructionComposants/rcrca/FicheRcaUtils";
import mockRCA from "../../../../../mock/data/RCA.json";

test("ficheUtils rca works", async () => {
  const panels = getPanelsRca({ ...mockRCA.data, personnes: [] });
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(4);
  expect(panels.panels[0].title).toBe("Vue du RCA");
});
