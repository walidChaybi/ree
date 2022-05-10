import { Sexe } from "../../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../../model/requete/enum/DocumentDelivrance";
import {
  CODE_CERTIFICAT_SITUATION_PACS,
  CODE_CERTIFICAT_SITUATION_PACS_RC,
  CODE_CERTIFICAT_SITUATION_PACS_RCA,
  CODE_CERTIFICAT_SITUATION_PACS_RC_RCA,
  CODE_CERTIFICAT_SITUATION_RC,
  CODE_CERTIFICAT_SITUATION_RCA,
  CODE_CERTIFICAT_SITUATION_RC_RCA
} from "../../../../../../model/requete/enum/DocumentDelivranceConstante";
import { getLibelle } from "../../../../util/Utils";
import { IPhrasesJasperCertificatSituation } from "../GenerationCertificatSituationHook";

export interface INbInscriptionsInfos {
  nbActe: number;
  nbPacs: number;
  nbRc: number;
  nbRca: number;
}

class Condition {
  constructor(
    public nbActe: number,
    public nbPacs?: number,
    public nbRc?: number,
    public nbRca?: number
  ) {}

  estVerifiee(nbInscriptionsInfos: INbInscriptionsInfos) {
    let cond = nbInscriptionsInfos.nbActe === this.nbActe;

    if (this.nbPacs !== undefined) {
      cond = cond && this.nbPacs === nbInscriptionsInfos.nbPacs;
    }

    if (this.nbRc !== undefined) {
      cond = cond && this.nbRc === nbInscriptionsInfos.nbRc;
    }

    if (this.nbRca !== undefined) {
      cond = cond && this.nbRca === nbInscriptionsInfos.nbRca;
    }

    return cond;
  }
}

class Specification {
  constructor(
    public condition: Condition,
    public phraseMasculin: string,
    public phraseFeminin: string
  ) {}

  getPhrase(sexe: Sexe, nbInscriptionsInfos: INbInscriptionsInfos) {
    let phrasesLiees: string | undefined;
    phrasesLiees = "";

    if (this.condition.estVerifiee(nbInscriptionsInfos)) {
      phrasesLiees =
        sexe === Sexe.FEMININ ? this.phraseFeminin : this.phraseMasculin;
    }

    phrasesLiees = phrasesLiees !== "" ? phrasesLiees : undefined;
    return { phrasesLiees };
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Specifications pour les phrases à renvoyer en fonction des résultats des RMC Actes et inscritptions
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const PAS_INSCRIT_PACS = getLibelle(
  "- N'est pas inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
);
const PAS_INSCRITE_PACS = getLibelle(
  "- N'est pas inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
);
const PAS_INSCRIT_RC = getLibelle("- N’est pas inscrit au répertoire civil.");
const PAS_INSCRITE_RC = getLibelle("- N’est pas inscrite au répertoire civil.");
const PAS_INSCRIT_RCA = getLibelle(
  "- N’est pas inscrit au répertoire civil annexe."
);
const PAS_INSCRITE_RCA = getLibelle(
  "- N’est pas inscrite au répertoire civil annexe."
);

/////////////////////////////////////////////////////////////////////

class SpecificationPhrase {
  MAP_SPECIFICATION: Map<string, Specification> = new Map();
  private init() {
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, undefined, undefined),
        PAS_INSCRIT_PACS,
        PAS_INSCRITE_PACS
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RC),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, undefined, 0, undefined),
        PAS_INSCRIT_RC,
        PAS_INSCRITE_RC
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, undefined, undefined, 0),
        PAS_INSCRIT_RCA,
        PAS_INSCRITE_RCA
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_RC_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, undefined, 0, 0),
        `${PAS_INSCRIT_RC}\n${PAS_INSCRIT_RCA}`,
        `${PAS_INSCRITE_RC}\n${PAS_INSCRITE_RCA}`
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RC_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, 0, 0),
        `${PAS_INSCRIT_PACS}\n${PAS_INSCRIT_RC}\n${PAS_INSCRIT_RCA}`,
        `${PAS_INSCRITE_PACS}\n${PAS_INSCRITE_RC}\n${PAS_INSCRITE_RCA}`
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RC),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, 0, undefined),
        `${PAS_INSCRIT_PACS}\n${PAS_INSCRIT_RC}`,
        `${PAS_INSCRITE_PACS}\n${PAS_INSCRITE_RC}`
      )
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForCode(CODE_CERTIFICAT_SITUATION_PACS_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, undefined, 0),
        `${PAS_INSCRIT_PACS}\n${PAS_INSCRIT_RCA}`,
        `${PAS_INSCRITE_PACS}\n${PAS_INSCRITE_RCA}`
      )
    );
  }

  getPhrasesJasper(
    idDocumentDemande: string,
    sexe: Sexe,
    nbInscriptionsInfos: INbInscriptionsInfos
  ): IPhrasesJasperCertificatSituation {
    let phrasesJasper = {} as IPhrasesJasperCertificatSituation;
    if (this.MAP_SPECIFICATION.size === 0) {
      this.init();
    }

    const specification = this.MAP_SPECIFICATION.get(idDocumentDemande);
    if (specification) {
      phrasesJasper = specification.getPhrase(sexe, nbInscriptionsInfos);
    }
    return phrasesJasper;
  }
}

export const specificationPhraseRMCAutoVide = new SpecificationPhrase();
