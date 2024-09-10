import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FournisseurDonneesBandeau } from "@pages/fiche/contenu/fournisseurDonneesBandeau/FournisseurDonneesBandeau";
import { fournisseurDonneesBandeauFactory } from "@pages/fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { expect, test } from "vitest";
import {
  acte,
  acteElectronique
} from "../../../../../../mock/data/ficheEtBandeau/ficheActe";

test("Attendu: fournisseur de donnée bandeau pour acte fonctionne correctement", () => {
  const fournisseurDonneesdActe: FournisseurDonneesBandeau =
    fournisseurDonneesBandeauFactory.createFournisseur(TypeFiche.ACTE, acte);

  expect(fournisseurDonneesdActe.getSimplePersonnes()[0].nom).toBe("GREENWALD");
  expect(fournisseurDonneesdActe.getSimplePersonnes()[1].nom).toBe("DUPE");
  expect(fournisseurDonneesdActe.getSimplePersonnes()[0].prenom).toBe(
    "Paulita"
  );
  expect(fournisseurDonneesdActe.getSimplePersonnes()[1].prenom).toBe(
    "Laurent"
  );
  expect(fournisseurDonneesdActe.getTypeAbrege()).toBe("Absence");
  expect(fournisseurDonneesdActe.getType()).toBe("Acte d'Absence");

  expect(fournisseurDonneesdActe.getAnnee()).toBe(1921);
  expect(fournisseurDonneesdActe.getRegistre()).toBe(
    "CSL.DX.1922.NA.T.410.681"
  );
});

test("Attendu: Un acte electronique modifie l'affichage du registre", () => {
  const fournisseurDonneesdActe: FournisseurDonneesBandeau =
    fournisseurDonneesBandeauFactory.createFournisseur(
      TypeFiche.ACTE,
      acteElectronique
    );

  expect(fournisseurDonneesdActe.getSimplePersonnes()[0].nom).toBe("GREENWALD");
  expect(fournisseurDonneesdActe.getSimplePersonnes()[1].nom).toBe("DUPE");
  expect(fournisseurDonneesdActe.getSimplePersonnes()[0].prenom).toBe(
    "Paulita"
  );
  expect(fournisseurDonneesdActe.getSimplePersonnes()[1].prenom).toBe(
    "Laurent"
  );
  expect(fournisseurDonneesdActe.getTypeAbrege()).toBe("Absence");
  expect(fournisseurDonneesdActe.getType()).toBe("Acte d'Absence");

  expect(fournisseurDonneesdActe.getAnnee()).toBe(1921);
  expect(fournisseurDonneesdActe.getRegistre()).toBe(
    "RECE.0000.0000 / CSL.DX.1922.NA.T.410.681"
  );
});