import { ficheInscriptionRepertoireCivil } from "@mock/data/ficheEtBandeau/divers/InscriptionRepertoireCivilMock";
import { IStatutFiche } from "@model/etatcivil/fiche/IStatutFiche";
import { getStatuts } from "@pages/fiche/hook/constructionComposants/statut/StatutUtils";
import { expect, test } from "vitest";

test("Statut utils get statuts", () => {
  const components = getStatuts(
    ficheInscriptionRepertoireCivil as any as IStatutFiche[]
  );

  expect(components).toHaveLength(1);
});
