import {
  CODE_CERTIFICAT_SITUATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS_RC,
  CODE_CERTIFICAT_SITUATION_PACS_RCA,
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  CODE_CERTIFICAT_SITUATION_RC,
  CODE_CERTIFICAT_SITUATION_RCA,
  CODE_CERTIFICAT_SITUATION_RC_RCA,
  DocumentDelivrance
} from "../../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { getLibelle } from "../../../../../../common/widget/Text";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Specifications pour les décrêts à renvoyer en fonction du document demandé
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const DECRE1_PACS = getLibelle("Article 515-3-1 du Code civil");
const DECRE2_PACS = getLibelle(
  "Article 1 du décret 2006-1806 du 23 décembre 2006 modifié"
);
const DECRE3_PACS = getLibelle("Article 6 du décret 2012-966 du 20 août 2012");
const DECRE4_PACS = getLibelle(
  "Article 4-2 du décret 65-422 du 1er juin 1965 modifié"
);
const DECRETS_PACS = [DECRE1_PACS, DECRE2_PACS, DECRE3_PACS, DECRE4_PACS];

const DECRET_RC = getLibelle(
  "Article 4 du décret 65-422 du 1er juin 1965 modifié"
);
const DECRET_RCA = getLibelle(
  "Article 4-1 du décret 65-422 du 1er juin 1965 modifié"
);

/////////////////////////////////////////////////////////////////////

class SpecificationDecret {
  MAP_SPECIFICATION: Map<string, string[]> = new Map();
  private init() {
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS),
      DECRETS_PACS
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RC),
      [...DECRETS_PACS, DECRET_RC]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RCA),
      [...DECRETS_PACS, DECRET_RCA]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RC_RCA),
      [...DECRETS_PACS, DECRET_RC, DECRET_RCA]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RC_RCA),
      [DECRET_RC, DECRET_RCA]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RC),
      [DECRET_RC]
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RCA),
      [DECRET_RCA]
    );
  }
  async getDecret(idDocumentDemande: string): Promise<string[]> {
    await DocumentDelivrance.init();
    if (this.MAP_SPECIFICATION.size === 0) {
      this.init();
    }
    return this.MAP_SPECIFICATION.get(idDocumentDemande) || [];
  }
}

export const specificationDecret = new SpecificationDecret();
