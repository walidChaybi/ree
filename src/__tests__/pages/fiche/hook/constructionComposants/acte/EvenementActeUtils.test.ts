import { mapActe } from "../../../../../../views/common/hook/repertoires/MappingRepertoires";
import { getEvenement } from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/EvenementActeUtils";
import { acte } from "../../../data/ficheActe";

test("Acte utils : affichage correcte des infos de l'évènement", async () => {
  const dataActe = mapActe(acte);
  const components = getEvenement(dataActe);

  const idxDate = components[0].partContent.contents.findIndex(
    content => content.libelle === "Date de l'évènement"
  );
  expect(idxDate).toBeGreaterThan(-1);

  const valueDate: JSX.Element = components[0].partContent.contents[idxDate]
    .value as JSX.Element;
  expect(valueDate.props.children).toBe("31/03/1921 à 13h54");

  const idxLieu = components[0].partContent.contents.findIndex(
    content => content.libelle === "Lieu de l'évènement"
  );
  expect(idxLieu).toBeGreaterThan(-1);
  expect(idxDate).toBeLessThan(idxLieu);

  const valueLieu: JSX.Element = components[0].partContent.contents[idxLieu]
    .value as JSX.Element;
  expect(valueLieu.props.children).toBe("Kanpur - Uttar Pradesh (Inde)");

  const idxNature = components[1].partContent.contents.findIndex(
    content => content.libelle === "Nature"
  );
  expect(idxNature).toBeGreaterThan(-1);

  const valueNature: JSX.Element = components[1].partContent.contents[idxNature]
    .value as JSX.Element;
  expect(valueNature.props.children).toBe("Absence");
});
