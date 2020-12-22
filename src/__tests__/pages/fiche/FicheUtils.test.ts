import { getFicheTitle } from "../../../views/pages/fiche/FicheUtils";

test("ficheUtils getFicheTitle works", async () => {
  const title = getFicheTitle("categorie", "2020", "numero", "nom1", "nom2");
  expect(title).toBe("CATEGORIE - NOM1 et NOM2 - N° 2020 - numero");

  const title2 = getFicheTitle("categorie", "2020", "numero", "nom1");
  expect(title2).toBe("CATEGORIE - NOM1 - N° 2020 - numero");
});
