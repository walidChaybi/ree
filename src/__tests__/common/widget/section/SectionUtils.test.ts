import { SectionContentProps } from "@widget/section/SectionContent";
import { ajouterContentPartAuPartMultiValeursVide } from "@widget/section/SectionUtils";

test("ajouterContentPartAuPartMultiValeursVide", () => {
  let panel = [] as SectionContentProps[];
  ajouterContentPartAuPartMultiValeursVide(panel, "Peut pas l'épouser", [
    "Il est gentil",
    "Il est mignon"
  ]);
  expect(panel.length).toStrictEqual(1);
});
