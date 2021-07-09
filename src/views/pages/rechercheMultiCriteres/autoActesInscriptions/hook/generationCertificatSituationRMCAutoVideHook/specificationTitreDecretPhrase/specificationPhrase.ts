import { Sexe } from "../../../../../../../model/etatcivil/enum/Sexe";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../../../model/etatcivil/enum/TypeFiche";
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
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { getLibelle } from "../../../../../../common/widget/Text";

interface INbInscriptionsInfos {
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

  estVerifiee(
    dataRMCAutoActe?: IResultatRMCActe[],
    dataRMCAutoInscription?: IResultatRMCInscription[]
  ) {
    let cond = dataRMCAutoActe?.length === this.nbActe;
    const nbInscriptionsInfos: INbInscriptionsInfos = this.getNbInscriptionsInfos(
      dataRMCAutoInscription
    );

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

  private getNbInscriptionsInfos(
    dataRMCAutoInscription?: IResultatRMCInscription[]
  ) {
    const infos: INbInscriptionsInfos = { nbRc: 0, nbRca: 0, nbPacs: 0 };

    if (dataRMCAutoInscription) {
      dataRMCAutoInscription.forEach(data => {
        const typeFiche: TypeFiche = FicheUtil.getTypeFicheFromString(
          data.categorie
        );
        switch (typeFiche) {
          case TypeFiche.RC:
            infos.nbRc++;
            break;
          case TypeFiche.RCA:
            infos.nbRca++;
            break;
          case TypeFiche.PACS:
            infos.nbPacs++;
            break;
        }
      });
    }

    return infos;
  }
}

class Specification {
  constructor(
    public condition: Condition,
    public phraseMasculin: string,
    public phraseFeminin: string
  ) {}

  getPhrase(
    sexe: Sexe,
    dataRMCAutoActe?: IResultatRMCActe[],
    dataRMCAutoInscription?: IResultatRMCInscription[]
  ) {
    let phrase: string | undefined;
    if (this.condition.estVerifiee(dataRMCAutoActe, dataRMCAutoInscription)) {
      phrase = sexe === Sexe.FEMININ ? this.phraseFeminin : this.phraseMasculin;
    }
    return phrase;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Specifications pour les phrases à renvoyer en fonction des résultats des RMC Actes et inscritptions
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const PAS_INSCRIT_PACS = getLibelle(
  "N'est pas inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
);
const PAS_INSCRITE_PACS = getLibelle(
  "N'est pas inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
);
const PAS_INSCRIT_RC = getLibelle("N’est pas inscrit au répertoire civil.");
const PAS_INSCRITE_RC = getLibelle("N’est pas inscrite au répertoire civil.");
const PAS_INSCRIT_RCA = getLibelle(
  "N’est pas inscrit au répertoire civil annexe."
);
const PAS_INSCRITE_RCA = getLibelle(
  "N’est pas inscrite au répertoire civil annexe."
);

/////////////////////////////////////////////////////////////////////

class SpecificationPhrase {
  private readonly MAP_SPECIFICATION: Map<string, Specification> = new Map();
  private init() {
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, undefined, undefined),
        PAS_INSCRIT_PACS,
        PAS_INSCRITE_PACS
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RC),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, undefined, 0, undefined),
        PAS_INSCRIT_RC,
        PAS_INSCRITE_RC
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, undefined, undefined, 0),
        PAS_INSCRIT_RCA,
        PAS_INSCRITE_RCA
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RC_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, undefined, 0, 0),
        `${PAS_INSCRIT_RC}\n${PAS_INSCRIT_RCA}`,
        `${PAS_INSCRITE_RC}\n${PAS_INSCRITE_RCA}`
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RC_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, 0, 0),
        `${PAS_INSCRIT_PACS}\n${PAS_INSCRIT_RC}\n${PAS_INSCRIT_RCA}`,
        `${PAS_INSCRITE_PACS}\n${PAS_INSCRITE_RC}\n${PAS_INSCRITE_RCA}`
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RC),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, 0, undefined),
        `${PAS_INSCRIT_PACS}\n${PAS_INSCRIT_RC}`,
        `${PAS_INSCRITE_PACS}\n${PAS_INSCRITE_RC}`
      )
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RCA),
      new Specification(
        //            Acte, Pacs, Rc, Rca
        new Condition(0, 0, undefined, 0),
        `${PAS_INSCRIT_PACS}\n${PAS_INSCRIT_RCA}`,
        `${PAS_INSCRITE_PACS}\n${PAS_INSCRITE_RCA}`
      )
    );
  }

  async getPhrase(
    idDocumentDemande: string,
    sexe: Sexe,
    dataRMCAutoActe?: IResultatRMCActe[],
    dataRMCAutoInscription?: IResultatRMCInscription[]
  ) {
    let phrase: string | undefined;
    await DocumentDelivrance.init();
    if (this.MAP_SPECIFICATION.size === 0) {
      this.init();
    }

    const specification = this.MAP_SPECIFICATION.get(idDocumentDemande);
    if (specification) {
      phrase = specification.getPhrase(
        sexe,
        dataRMCAutoActe,
        dataRMCAutoInscription
      );
    }
    return phrase;
  }
}

export const specificationPhrase = new SpecificationPhrase();
