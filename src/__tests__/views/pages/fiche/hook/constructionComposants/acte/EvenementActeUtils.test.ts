import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { getEvenement } from "@pages/fiche/hook/constructionComposants/acte/EvenementActeUtils";
import { expect, test } from "vitest";
import { acte } from "../../../../../../../mock/data/ficheEtBandeau/ficheActe";

test("Acte utils : affichage correcte des infos de l'évènement", () => {
  const dataActe = mapActe(acte);
  const components = getEvenement(dataActe);

  const idxDate = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Date de l'évènement"
  );
  expect(idxDate).toBeGreaterThan(-1);

  const valueDate: JSX.Element = components[0].partContent?.contents[
    idxDate as number
  ].value as JSX.Element;
  expect(valueDate.props.children).toBe("31/03/1921 à 13h54");

  const idxLieu = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Lieu de l'évènement"
  );
  expect(idxLieu).toBeGreaterThan(-1);
  expect(idxDate).toBeLessThan(idxLieu as number);

  const valueLieu: JSX.Element = components[0].partContent?.contents[
    idxLieu as number
  ].value as JSX.Element;
  expect(valueLieu.props.children).toBe("Kanpur, Uttar Pradesh (Inde)");

  const idxNature = components[1].partContent?.contents.findIndex(
    content => content.libelle === "Nature"
  );
  expect(idxNature).toBeGreaterThan(-1);

  const valueNature: JSX.Element = components[1].partContent?.contents[
    idxNature as number
  ].value as JSX.Element;
  expect(valueNature.props.children).toBe("Absence");
});
