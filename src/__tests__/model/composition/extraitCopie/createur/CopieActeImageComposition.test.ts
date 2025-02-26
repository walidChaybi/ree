import { CopieActeImageComposition } from "@model/composition/extraitCopie/createur/CopieActeImageComposition";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { expect, test } from "vitest";
import { ficheActeMariage } from "../../../../mock/data/ficheActe";

test("Attendu: corps image correct", () => {
  const acte = ficheActeMariage.data as any as IFicheActe;
  const natureActe = acte.nature.libelle;
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = Validation.O;
  const corpsImage = acte.corpsImage;
  const erreur = "erreur";

  const compositionCorps = CopieActeImageComposition.creerCopieActeImage({
    acte,
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
