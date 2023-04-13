import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FournisseurDonneesBandeau } from "@pages/fiche/contenu/fournisseurDonneesBandeau/FournisseurDonneesBandeau";
import { fournisseurDonneesBandeauFactory } from "@pages/fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { acte } from "../../../../../../mock/data/ficheEtBandeau/ficheActe";

test("Attendu: fournisseur de donnée bandeau pour acte fonctionne correctement", () => {
  const fdActe: FournisseurDonneesBandeau =
    fournisseurDonneesBandeauFactory.createFournisseur(TypeFiche.ACTE, acte);

  expect(fdActe.getSimplePersonnes()[0].nom).toBe("GREENWALD");
  expect(fdActe.getSimplePersonnes()[1].nom).toBe("DUPE");
  expect(fdActe.getSimplePersonnes()[0].prenom).toBe("Paulita");
  expect(fdActe.getSimplePersonnes()[1].prenom).toBe("Laurent");
  expect(fdActe.getTypeAbrege()).toBe("Absence");
  expect(fdActe.getType()).toBe("Acte d'Absence");

  expect(fdActe.getAnnee()).toBe(1921);
  expect(fdActe.getRegistre()).toBe("CSL.DX.1922.NA.T.410.681");
});
