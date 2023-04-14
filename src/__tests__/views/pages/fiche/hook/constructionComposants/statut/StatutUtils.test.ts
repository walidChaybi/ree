import { ficheInscriptionRepertoireCivil } from "@mock/data/ficheEtBandeau/divers/InscriptionRepertoireCivilMock";
import { IStatutFiche } from "@model/etatcivil/fiche/IStatutFiche";
import { getStatuts } from "@pages/fiche/hook/constructionComposants/statut/StatutUtils";

test("Statut utils get statuts", async () => {
  const components = getStatuts(
    ficheInscriptionRepertoireCivil as any as IStatutFiche[]
  );

  expect(components).toHaveLength(1);

  // const tableau = components[0].contentsPart?.contents[0].value;
  // expect(tableau).toBeCalled();
});
