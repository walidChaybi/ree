import { ficheActeDeces } from "../../../../../mock/data/ficheActe";
import { CopieActeTexteDecesComposition } from "../../../../../model/composition/extraitCopie/createur/CopieActeTexteDecesComposition";
import { IFicheActe } from "../../../../../model/etatcivil/acte/IFicheActe";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../model/requete/enum/SousTypeDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";

test("Attendu: copie fonctionne correctement", () => {
  const acte = ficheActeDeces.data;
  const requete = {
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
    sousType: SousTypeDelivrance.RDD
  } as IRequeteDelivrance;
  const validation = Validation.N;
  const avecFiliation = true;
  const copie = true;
  const archive = false;

  const compositionCorps =
    CopieActeTexteDecesComposition.creerCopieActeTexteDeces(
      acte as any as IFicheActe,
      requete,
      validation,
      [],
      avecFiliation,
      copie,
      archive
    );

  const corpsTexteAttendu = `Acte décès`;

  expect(compositionCorps.corps_texte).toBe(corpsTexteAttendu);
});
