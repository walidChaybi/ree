import { ficheActeMariage } from "../../../../../mock/data/ficheActe";
import { CopieActeImageComposition } from "../../../../../model/composition/extraitCopie/createur/CopieActeImageComposition";
import { IFicheActe } from "../../../../../model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";

test("Attendu: corps image correct", () => {
  const acte = ficheActeMariage.data as any as IFicheActe;
  const natureActe = acte.nature.libelle;
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = Validation.N;
  const avecFiliation = true;
  const copie = true;
  const archive = false;
  const corpsImage = acte.corpsImage;
  const erreur = "erreur";

  const compositionCorps = CopieActeImageComposition.creerCopieActeImage({
    acte,
    natureActe,
    requete,
    validation,
    avecFiliation,
    copie,
    archive,
    corpsImage,
    erreur
  });

  const corpsImageAttendu = ["base64"];

  expect(compositionCorps.corps_image).toEqual(corpsImageAttendu);
});
