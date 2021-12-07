import {
  Decret,
  IDecret
} from "../../../../../../model/etatcivil/commun/IDecret";
import {
  CODE_CERTIFICAT_SITUATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS_RC,
  CODE_CERTIFICAT_SITUATION_PACS_RCA,
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  CODE_CERTIFICAT_SITUATION_RC,
  CODE_CERTIFICAT_SITUATION_RCA,
  CODE_CERTIFICAT_SITUATION_RC_RCA,
  DocumentDelivrance
} from "../../../../../../model/requete/enum/DocumentDelivrance";
import { storeRece } from "../../../../util/storeRece";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Specifications pour les décrêts à renvoyer en fonction du document demandé
//////////////////////////////////////////////////////////////////////////////////////////////////////////

class SpecificationDecret {
  MAP_SPECIFICATION: Map<string, IDecret[]> = new Map();
  private init() {
    const DECRETS_PACS = Decret.getDecretsCertificatSituationPacs(
      storeRece.decrets
    );
    const DECRETS_RC = Decret.getDecretsCertificatSituationRC(
      storeRece.decrets
    );
    const DECRETS_RCA = Decret.getDecretsCertificatSituationRCA(
      storeRece.decrets
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS),
      DECRETS_PACS
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RC),
      [...DECRETS_PACS, ...DECRETS_RC]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RCA),
      [...DECRETS_PACS, ...DECRETS_RCA]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RC_RCA),
      [...DECRETS_PACS, ...DECRETS_RC, ...DECRETS_RCA]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RC_RCA),
      [...DECRETS_RC, ...DECRETS_RCA]
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RC),
      DECRETS_RC
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RCA),
      DECRETS_RCA
    );
  }
  getDecret(idDocumentDemande: string): IDecret[] {
    if (this.MAP_SPECIFICATION.size === 0) {
      this.init();
    }
    return this.MAP_SPECIFICATION.get(idDocumentDemande) || [];
  }
}

export const specificationDecret = new SpecificationDecret();
