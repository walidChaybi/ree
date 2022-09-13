import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  CODE_CERTIFICAT_SITUATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS_RC,
  CODE_CERTIFICAT_SITUATION_PACS_RCA,
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  CODE_CERTIFICAT_SITUATION_RC,
  CODE_CERTIFICAT_SITUATION_RCA,
  CODE_CERTIFICAT_SITUATION_RC_RCA
} from "@model/requete/enum/DocumentDelivranceConstante";
import { getLibelle } from "@util/Utils";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Specifications pour le titre à renvoyer en fonction du document demandé
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const TITRE_PACS = getLibelle(
  `CERTIFICAT DE SITUATION RELATIF AU
REGISTRE DES PACS DES PERSONNES DE NATIONALITÉ ÉTRANGÈRE ET NÉES À L'ÉTRANGER
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
);
const TITRE_PACS_RC = getLibelle(
  `CERTIFICAT DE SITUATION RELATIF AU
REGISTRE DES PACS DES PERSONNES DE NATIONALITÉ ÉTRANGÈRE ET NÉES À L'ÉTRANGER
ET RÉPERTOIRE CIVIL
DÉTENUS PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
);
const TITRE_PACS_RCA = getLibelle(
  `CERTIFICAT DE SITUATION RELATIF AU
REGISTRE DES PACS DES PERSONNES DE NATIONALITÉ ÉTRANGÈRE ET NÉES A L'ÉTRANGER
ET RÉPERTOIRE CIVIL ANNEXE
DÉTENUS PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
);

const TITRE_PACS_RC_RCA = getLibelle(
  `CERTIFICAT DE SITUATION RELATIF AU
REGISTRE DES PACS DES PERSONNES DE NATIONALITE ÉTRANGÈRE ET NÉES À L'ÉTRANGER,
RÉPERTOIRE CIVIL ET RÉPERTOIRE CIVIL ANNEXE
DÉTENUS PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
);
const TITRE_RC_RCA = getLibelle(
  `CERTIFICAT DE SITUATION RELATIF AU 
RÉPERTOIRE CIVIL ET AU RÉPERTOIRE CIVIL ANNEXE
DÉTENUS PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
);
const TITRE_RC = getLibelle(
  `CERTIFICAT DE SITUATION RELATIF AU
RÉPERTOIRE CIVIL
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
);

const TITRE_RCA = getLibelle(
  `CERTIFICAT DE SITUATION RELATIF AU
RÉPERTOIRE CIVIL ANNEXE
DÉTENU PAR LE SERVICE CENTRAL D'ÉTAT CIVIL`
);

/////////////////////////////////////////////////////////////////////

class SpecificationTitre {
  MAP_SPECIFICATION: Map<string, string> = new Map();
  private init() {
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS),
      TITRE_PACS
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RC),
      TITRE_PACS_RC
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RCA),
      TITRE_PACS_RCA
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RC_RCA),
      TITRE_PACS_RC_RCA
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RC_RCA),
      TITRE_RC_RCA
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RC),
      TITRE_RC
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RCA),
      TITRE_RCA
    );
  }

  getTitre(idDocumentDemande: string): string {
    if (this.MAP_SPECIFICATION.size === 0) {
      this.init();
    }

    return this.MAP_SPECIFICATION.get(idDocumentDemande) || "";
  }
}

export const specificationTitre = new SpecificationTitre();
