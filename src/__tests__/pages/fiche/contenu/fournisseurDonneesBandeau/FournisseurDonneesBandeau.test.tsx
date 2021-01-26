import { fournisseurDonneesBandeauFactory } from "../../../../../views/pages/fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";

import { acte } from "../../data/ficheActe";
import { FournisseurDonneesBandeau } from "../../../../../views/pages/fiche/contenu/fournisseurDonneesBandeau/FournisseurDonneesBandeau";
import { TypeFiche } from "../../../../../model/etatcivil/TypeFiche";
test("Attendu: fournisseur de donnée bandeau pour acte fonctionne correctement", () => {
  const fdActe: FournisseurDonneesBandeau = fournisseurDonneesBandeauFactory.createFournisseur(
    TypeFiche.ACTE,
    acte
  );

  expect(fdActe.getSimplePersonnes()[0].nom).toBe("GREENWALD");
  expect(fdActe.getSimplePersonnes()[1].nom).toBe("DUPE");
  expect(fdActe.getSimplePersonnes()[0].prenom).toBe("Paulita");
  expect(fdActe.getSimplePersonnes()[1].prenom).toBe("Laurent");
  expect(fdActe.getTypeAbrege()).toBe("Absence");
  expect(fdActe.getType()).toBe("Acte d'Absence");

  expect(fdActe.getAnnee()).toBe(1921);
  expect(fdActe.getRegistre()).toBe("CSL.DX.1921.413.681.NA.T");
});
