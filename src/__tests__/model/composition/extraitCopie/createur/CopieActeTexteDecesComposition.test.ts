import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { CopieActeTexteDecesComposition } from "@model/composition/extraitCopie/createur/CopieActeTexteDecesComposition";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { expect, test } from "vitest";

test("Attendu: copie fonctionne correctement", () => {
  const acte = new MockFicheActeBuilder({ corpsTexte: { texte: "Acte décès" } }).deType("TEXTE").deNature("DECES").generer()!;
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = CopieActeTexteDecesComposition.creerCopieActeTexteDeces({
    acte,
    requete,
    validation,
    mentionsRetirees: [],
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    ctv
  });

  const corpsTexteAttendu = `Acte décès`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
