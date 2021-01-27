import { getEvenement } from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/EvenementActeUtils";
import { mappingDataActe } from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/FicheActeUtils";
import { acte } from "../../../data/ficheActe";

test("Acte utils : affichage correcte des infos de l'évènement", async () => {
  const dataActe = mappingDataActe(acte);
  const components = getEvenement(dataActe);

  const idxDate = components[0].contents.findIndex(
    content => content.libelle === "Date de l'évènement"
  );
  expect(idxDate).toBeGreaterThan(-1);

  const valueDate: JSX.Element = components[0].contents[idxDate]
    .value as JSX.Element;
  expect(valueDate.props.children).toBe("31/03/1921 à 13h54");

  const idxLieu = components[0].contents.findIndex(
    content => content.libelle === "Lieu de l'évènement"
  );
  expect(idxLieu).toBeGreaterThan(-1);
  expect(idxDate).toBeLessThan(idxLieu);

  const valueLieu: JSX.Element = components[0].contents[idxLieu]
    .value as JSX.Element;
  expect(valueLieu.props.children).toBe("Kanpur - Uttar Pradesh (Inde)");

  const idxNature = components[1].contents.findIndex(
    content => content.libelle === "Nature"
  );
  expect(idxNature).toBeGreaterThan(-1);

  const valueNature: JSX.Element = components[1].contents[idxNature]
    .value as JSX.Element;
  expect(valueNature.props.children).toBe("Absence");
});
