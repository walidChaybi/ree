import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getStatuts } from "@pages/fiche/hook/constructionComposants/statut/StatutUtils";
import { ficheInscriptionRepertoireCivil } from "./mock/InscriptionRepertoireCivilMock";

test("Statut utils get statuts", async () => {
  const components = getStatuts(ficheInscriptionRepertoireCivil as IFicheRcRca);

  expect(components).toHaveLength(1);

  // const tableau = components[0].contentsPart?.contents[0].value;
  // expect(tableau).toBeCalled();
});
