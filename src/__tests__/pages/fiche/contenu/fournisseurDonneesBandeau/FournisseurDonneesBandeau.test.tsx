import { fournisseurDonneesBandeauFactory } from "../../../../../views/pages/fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";

import { acte } from "../../data/ficheActe";
import FournisseurDonneesBandeau from "../../../../../views/pages/fiche/contenu/fournisseurDonneesBandeau/FournisseurDonneesBandeau";
test("Attendu: fournisseur de donnée bandeau pour acte fonctionne correctement", () => {
  const fdActe: FournisseurDonneesBandeau = fournisseurDonneesBandeauFactory.createFournisseur(
    "acte",
    acte
  );

  expect(fdActe.getNom1()).toBe("GREENWALD");
  expect(fdActe.getNom2()).toBe("DUPE");
  expect(fdActe.getPrenom1()).toBe("Paulita");
  expect(fdActe.getPrenom2()).toBe("Laurent");
  expect(fdActe.getTypeAbrege()).toBe("Absence");
  expect(fdActe.getType()).toBe("Acte d'Absence");

  expect(fdActe.getAnnee()).toBe(1921);
  expect(fdActe.getRegistre()).toBe("CSL.DX.1921.413.NA.T");
});
