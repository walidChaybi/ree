import mockRCA from "../../../../../mock/data/RCA.json";
import { getPanelsRca } from "../../../../../views/pages/fiche/hook/constructionComposants/rcrca/FicheRcaUtils";

test("ficheUtils rca works", async () => {
  const panels = getPanelsRca({ ...mockRCA.data, personnes: [] });
  expect(panels.panels).toHaveLength(1);
  expect(panels.panels[0].panelAreas).toHaveLength(5);
  expect(panels.panels[0].title).toBe("Visualisation du RCA");
});
