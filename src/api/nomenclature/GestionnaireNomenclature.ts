/* istanbul ignore file */
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";

export class GestionnaireNomenclature {
  static async chargerToutesLesNomenclatures() {
    // Nomenclatures EtatCivil
    // await NatureRc.init();
    // await NatureRca.init();
    // await MandataireRc.init();
    // await NatureMention.init();
    // await TypeAlerte.init();
    // await TypeMention.init();
    // await TypePopinSignature.init();
    // Nomenclatures Requete
    // await DocumentDelivrance.init();
    // await TypePieceJustificative.init();
    // await PaysSecabilite.init();
    // Parametre Base Requete
    await ParametreBaseRequete.init();
  }
}
