import { getPanelsActe } from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/FicheActeUtils";
import { acte } from "../../../data/ficheActe";

test("ficheUtils rca works", async () => {
  const panels = getPanelsActe(acte);
  expect(panels.panels).toHaveLength(2);
  expect(panels.panels[0].panelAreas).toHaveLength(2);
  expect(panels.panels[0].title).toBe("Résumé de l'acte");
});
