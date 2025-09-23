import { CopieActeTexteDecesComposition } from "@model/composition/extraitCopie/createur/CopieActeTexteDecesComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { expect, test } from "vitest";
import { ficheActeDeces } from "../../../../mock/data/ficheActe";

test("Attendu: copie fonctionne correctement", () => {
  const acte = FicheActe.depuisDto(ficheActeDeces)!;
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = EValidation.N;
  const ctv = "111111-222222";

  const compositionCorps = CopieActeTexteDecesComposition.creerCopieActeTexteDeces({
    acte: acte,
    requete,
    validation,
    mentionsRetirees: [],
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
    ctv
  });

  const corpsTexteAttendu = `Acte décès`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
