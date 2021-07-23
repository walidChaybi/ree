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
import {
  getJourOu1er,
  getMoisNaissanceEnLettre
} from "../../../../../../common/util/DateUtils";
import { getLibelle } from "../../../../../../common/widget/Text";
import { IPhrasesJasperCertificatSituation } from "../GenerationCertificatSituationHook";
interface IInscriptionsInfos {
  infosPacs: IResultatRMCInscription[];
  infosRc: IResultatRMCInscription[];
  infosRca: IResultatRMCInscription[];
}

class DemandeDeliver {
  constructor(public pacs = false, public rc = false, public rca = false) {}

  estDemande(
    dataRMCAutoInscription?: IResultatRMCInscription[]
  ): IInscriptionsInfos {
    const infos = {} as IInscriptionsInfos;
    infos.infosPacs = [];
    infos.infosRc = [];
    infos.infosRca = [];

    if (dataRMCAutoInscription) {
      dataRMCAutoInscription.forEach(data => {
        const typeFiche: TypeFiche = FicheUtil.getTypeFicheFromString(
          data.categorie
        );
        switch (typeFiche) {
          case TypeFiche.RC:
            infos.infosRc.push(data);
            break;
          case TypeFiche.RCA:
            infos.infosRca.push(data);
            break;
          case TypeFiche.PACS:
            infos.infosPacs.push(data);
            break;
        }
      });
    }

    return infos;
  }
}

class SpecificationDeliver {
  constructor(public demande: DemandeDeliver) {}

  getPhraseEtPiecesJointes(
    sexe: Sexe,
    dataRMCAutoInscription?: IResultatRMCInscription[]
  ) {
    let phrasesLiees: string | undefined;
    phrasesLiees = "";

    const infos = this.demande.estDemande(dataRMCAutoInscription);

    phrasesLiees = this.nextPhrase(
      phrasesLiees,
      this.demande.pacs,
      infos.infosPacs,
      sexe,
      TypeFiche.PACS
    );

    phrasesLiees = this.nextPhrase(
      phrasesLiees,
      this.demande.rc,
      infos.infosRc,
      sexe,
      TypeFiche.RC
    );

    phrasesLiees = this.nextPhrase(
      phrasesLiees,
      this.demande.rca,
      infos.infosRca,
      sexe,
      TypeFiche.RCA
    );

    let phrasesPiecesJointes: string | undefined;

    phrasesPiecesJointes = this.getPiecesJointes(this.demande, infos);

    phrasesLiees = phrasesLiees !== "" ? phrasesLiees : undefined;

    return { phrasesLiees, phrasesPiecesJointes };
  }

  nextPhrase(
    phrases: string,
    demande: boolean,
    infos: IResultatRMCInscription[],
    sexe: Sexe,
    type: TypeFiche
  ) {
    const messages = this.getText(type);
    let phraseSuivante = "";
    if (demande && infos.length > 0) {
      infos.forEach((info: IResultatRMCInscription) => {
        if (
          info.anneeInscription &&
          info.numeroInscription &&
          info.dateInscription
        ) {
          phraseSuivante =
            sexe === Sexe.FEMININ ? messages.inscrite : messages.inscrit;
          const date = new Date(info.dateInscription);
          phraseSuivante = this.replaceIndexByValue(phraseSuivante, [
            `${getJourOu1er(date.getDate())} ${getMoisNaissanceEnLettre(
              date.getMonth() + 1
            )} ${date.getFullYear()}`,
            info.anneeInscription,
            info.numeroInscription
          ]);
        }

        phrases = this.addPhrase(phrases, phraseSuivante);
      });
    } else if (demande && infos.length === 0) {
      phrases = this.addPhrase(
        phrases,
        sexe === Sexe.FEMININ ? messages.pasInscrite : messages.pasInscrit
      );
    }
    return phrases;
  }

  addPhrase(phrase: string, phraseSuivante: string) {
    if (phrase === "") {
      return `${phraseSuivante}`;
    } else {
      return `${phrase}\n${phraseSuivante}`;
    }
  }

  replaceIndexByValue(phrase: string, values: string[] | number[]) {
    if (phrase && values) {
      values.forEach((value: string | number, index: number) => {
        const valueToUse = typeof value === "number" ? value.toString() : value;
        phrase = phrase.replace(`{${index}}`, valueToUse);
      });
    }
    return phrase;
  }

  getText(type: TypeFiche) {
    switch (type) {
      case TypeFiche.PACS:
        return {
          inscrite: INSCRITE_PACS,
          inscrit: INSCRIT_PACS,
          pasInscrite: PAS_INSCRITE_PACS,
          pasInscrit: PAS_INSCRIT_PACS
        };
      case TypeFiche.RC:
        return {
          inscrite: INSCRITE_RC,
          inscrit: INSCRIT_RC,
          pasInscrite: PAS_INSCRITE_RC,
          pasInscrit: PAS_INSCRIT_RC
        };
      case TypeFiche.RCA:
        return {
          inscrite: INSCRITE_RCA,
          inscrit: INSCRIT_RCA,
          pasInscrite: PAS_INSCRITE_RCA,
          pasInscrit: PAS_INSCRIT_RCA
        };
      default:
        return {
          inscrite: "",
          inscrit: "",
          pasInscrite: "",
          pasInscrit: ""
        };
    }
  }

  getPiecesJointes(demande: DemandeDeliver, infos: IInscriptionsInfos) {
    let piecesJointes = "";
    const pacsDemanderEtPresent = demande.pacs && infos.infosPacs.length > 0;
    const rcDemanderEtPresent = demande.rc && infos.infosRc.length > 0;
    const rcaDemanderEtPresent = demande.rca && infos.infosRca.length > 0;

    if (pacsDemanderEtPresent || rcDemanderEtPresent || rcaDemanderEtPresent) {
      piecesJointes = PIECE_JOINTE;
    }
    if (pacsDemanderEtPresent) {
      piecesJointes += `\n${PIECE_JOINTE_PACS}`;
    }
    if (rcDemanderEtPresent) {
      piecesJointes += `\n${PIECE_JOINTE_RC}`;
    }
    if (rcaDemanderEtPresent) {
      piecesJointes += `\n${PIECE_JOINTE_RCA}`;
    }

    return piecesJointes;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// SpecificationDelivers pour les phrases à renvoyer en fonction des résultats des RMC Actes et inscritptions
//////////////////////////////////////////////////////////////////////////////////////////////////////////
const PAS_INSCRIT_PACS = getLibelle(
  "N'est pas inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
);
const PAS_INSCRITE_PACS = getLibelle(
  "N'est pas inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger."
);
const INSCRIT_PACS = getLibelle(
  "Est inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le {0} sous la référence PAC n°{1}-{2}."
);
const INSCRITE_PACS = getLibelle(
  "Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le {0} sous la référence PAC n°{1}-{2}."
);
const PAS_INSCRIT_RC = getLibelle("N’est pas inscrit au répertoire civil.");
const PAS_INSCRITE_RC = getLibelle("N’est pas inscrite au répertoire civil.");
const INSCRIT_RC = getLibelle(
  "Est inscrit au répertoire civil depuis le {0} sous la référence RC n°{1}-{2}."
);
const INSCRITE_RC = getLibelle(
  "Est inscrite au répertoire civil depuis le {0} sous la référence RC n°{1}-{2}."
);
const PAS_INSCRIT_RCA = getLibelle(
  "N’est pas inscrit au répertoire civil annexe."
);
const PAS_INSCRITE_RCA = getLibelle(
  "N’est pas inscrite au répertoire civil annexe."
);
const INSCRIT_RCA = getLibelle(
  "Est inscrit au répertoire civil annexe depuis le {0} sous la référence RCA n°{1}-{2}."
);
const INSCRITE_RCA = getLibelle(
  "Est inscrite au répertoire civil annexe depuis le {0} sous la référence RCA n°{1}-{2}."
);

const PIECE_JOINTE = getLibelle(
  "A toutes fins utiles, vous trouverez joint(s) à ce certificat :"
);
const PIECE_JOINTE_PACS = getLibelle(
  "• la communication des informations relatives à un pacte civil de solidarité"
);
const PIECE_JOINTE_RC = getLibelle(
  "• le(s) certificat(s) d’inscription au répertoire civil"
);
const PIECE_JOINTE_RCA = getLibelle(
  "• le(s) certificat(s) d’inscription au répertoire civil annexe"
);

/////////////////////////////////////////////////////////////////////
class SpecificationDeliverPhrase {
  MAP_SPECIFICATION: Map<string, SpecificationDeliver> = new Map();
  private init() {
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, false, false)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RC),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(false, true, false)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(false, false, true)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_RC_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(false, true, true)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RC_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, true, true)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RC),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, true, false)
      )
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.getKeyForNom(CODE_CERTIFICAT_SITUATION_PACS_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, false, true)
      )
    );
  }

  getPhrasesJasper(
    idDocumentDemande: string,
    sexe: Sexe,
    dataRMCAutoActe?: IResultatRMCActe[],
    dataRMCAutoInscription?: IResultatRMCInscription[]
  ) {
    let phrasesJasper = {} as IPhrasesJasperCertificatSituation;

    if (this.MAP_SPECIFICATION.size === 0) {
      this.init();
    }

    const specification = this.MAP_SPECIFICATION.get(idDocumentDemande);
    if (specification) {
      phrasesJasper = specification.getPhraseEtPiecesJointes(
        sexe,
        dataRMCAutoInscription
      );
    }
    return phrasesJasper;
  }
}

export const specificationPhraseDelivrer = new SpecificationDeliverPhrase();
