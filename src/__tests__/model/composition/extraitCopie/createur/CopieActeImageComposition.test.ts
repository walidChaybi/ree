import { CopieActeImageComposition } from "@model/composition/extraitCopie/createur/CopieActeImageComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { expect, test } from "vitest";
import { ficheActeMariage } from "../../../../mock/data/ficheActe";

test("Attendu: corps image correct", () => {
  const acte = ficheActeMariage;
  const natureActe = acte.nature;
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = EValidation.O;
  const corpsImage = acte.corpsImage;
  const erreur = "erreur";

  const compositionCorps = CopieActeImageComposition.creerCopieActeImage({
    acte: FicheActe.depuisDto(acte)!,
    natureActe,
    requete,
    validation,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
    corpsImage,
    erreur,
    ctv: "111111-222222"
  });

  const corpsImageAttendu = ["base64"];

  expect(compositionCorps.corps_image).toEqual(corpsImageAttendu);
});
