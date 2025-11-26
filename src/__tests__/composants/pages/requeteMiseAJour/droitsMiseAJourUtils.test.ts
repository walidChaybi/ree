import { describe, expect, it } from "vitest";

import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { Droit } from "@model/agent/enum/Droit";
import {
  estActeEligibleDoubleNumerique,
  verifierDroitsMiseAJourActe
} from "../../../../composants/pages/requetesMiseAJour/droitsMiseAJourUtils";

describe("droitsMiseAJourUtils", () => {
  it("estActeEligibleDoubleNumerique retourne true pour un acte SCEC_DOCS de type TEXTE sans numéro électronique", () => {
    const ficheActe = new MockFicheActeBuilder().deType("TEXTE").generer();

    expect(ficheActe).not.toBeNull();
    expect(estActeEligibleDoubleNumerique(ficheActe!)).toBe(true);
  });

  it("autorise la mise à jour pour un acte éligible quand tous les droits nécessaires sont présents", () => {
    const ficheActe = new MockFicheActeBuilder({
      statut: "SIGNE",
      numeroActeElectronique: undefined // acte éligible au double numérique
    })
      .deType("TEXTE")
      .generer();

    const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
      .avecDroits([Droit.METTRE_A_JOUR_ACTE, Droit.MISE_A_JOUR_CREER_DOUBLE_NUMERIQUE])
      .generer();

    const result = verifierDroitsMiseAJourActe(ficheActe!, utilisateurConnecte);

    expect(result.autorise).toBe(true);
    expect(result.peutMettreAJourMentions).toBe(true);
    expect(result.peutMettreAJourAnalyseMarginale).toBe(false);
  });

  it("refuse la mise à jour si l'acte est éligible au double numérique mais que le droit associé manque", () => {
    const ficheActe = new MockFicheActeBuilder({
      statut: "SIGNE",
      numeroActeElectronique: undefined
    })
      .deType("TEXTE")
      .generer();

    const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
      .avecDroit(Droit.METTRE_A_JOUR_ACTE) // pas de MISE_A_JOUR_CREER_DOUBLE_NUMERIQUE
      .generer();

    const result = verifierDroitsMiseAJourActe(ficheActe!, utilisateurConnecte);

    expect(result.autorise).toBe(false);
    expect(result.peutMettreAJourMentions).toBe(true);
    expect(result.peutMettreAJourAnalyseMarginale).toBe(false);
  });
});
