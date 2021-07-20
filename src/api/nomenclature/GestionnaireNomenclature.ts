import { MandataireRc } from "../../model/etatcivil/enum/MandataireRc";
import { NatureRc } from "../../model/etatcivil/enum/NatureRc";
import { NatureRca } from "../../model/etatcivil/enum/NatureRca";
import { ParametreBaseRequete } from "../../model/parametres/enum/ParametresBaseRequete";
import { DocumentDelivrance } from "../../model/requete/v2/enum/DocumentDelivrance";
import { TypePieceJustificative } from "../../model/requete/v2/enum/TypePieceJustificative";

export class GestionnaireNomenclature {
  static async chargerToutesLesNomenclatures() {
    // Nomenclature EtatCivil
    await NatureRc.init();
    await NatureRca.init();
    await MandataireRc.init();
    // Nomenclature Requete
    await DocumentDelivrance.init();
    await TypePieceJustificative.init();
    // Parametre Base Requete
    await ParametreBaseRequete.init();
  }
}
