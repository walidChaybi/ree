/* istanbul ignore file */
import { TypeMention } from "../../model/etatcivil/acte/mention/ITypeMention";
import { MandataireRc } from "../../model/etatcivil/enum/MandataireRc";
import { NatureMention } from "../../model/etatcivil/enum/NatureMention";
import { NatureRc } from "../../model/etatcivil/enum/NatureRc";
import { NatureRca } from "../../model/etatcivil/enum/NatureRca";
import { TypeAlerte } from "../../model/etatcivil/enum/TypeAlerte";
import { ParametreBaseRequete } from "../../model/parametres/enum/ParametresBaseRequete";
import { DocumentDelivrance } from "../../model/requete/enum/DocumentDelivrance";
import { TypePieceJustificative } from "../../model/requete/enum/TypePieceJustificative";

export class GestionnaireNomenclature {
  static async chargerToutesLesNomenclatures() {
    // Nomenclatures EtatCivil
    await NatureRc.init();
    await NatureRca.init();
    await MandataireRc.init();
    await NatureMention.init();
    await TypeAlerte.init();
    await TypeMention.init();
    // Nomenclatures Requete
    await DocumentDelivrance.init();
    await TypePieceJustificative.init();
    // Parametre Base Requete
    await ParametreBaseRequete.init();
  }
}
