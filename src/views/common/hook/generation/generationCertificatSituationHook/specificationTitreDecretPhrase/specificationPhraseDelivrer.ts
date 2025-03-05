import { Sexe } from "@model/etatcivil/enum/Sexe";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import DateUtils from "@util/DateUtils";
import { replaceIndexByValue } from "@util/Utils";
import { IPhrasesJasperCertificatSituation } from "../GenerationCertificatSituationHook";
import { INbInscriptionsInfos } from "./specificationPhraseRMCAutoVide";
export interface IInfosInscriptions {
  infosPacs: FichePacs[];
  infosRc: FicheRcRca[];
  infosRca: FicheRcRca[];
}

class DemandeDeliver {
  constructor(
    public pacs = false,
    public rc = false,
    public rca = false
  ) {}
}

class SpecificationDeliver {
  constructor(public demande: DemandeDeliver) {}

  getPhraseEtPiecesJointes(sexe: Sexe, infosInscription: IInfosInscriptions) {
    let phrasesLiees: string | undefined;
    phrasesLiees = "";

    phrasesLiees = this.nextPhrase(phrasesLiees, this.demande.pacs, infosInscription.infosPacs, sexe, TypeFiche.PACS);

    phrasesLiees = this.nextPhrase(phrasesLiees, this.demande.rc, infosInscription.infosRc, sexe, TypeFiche.RC);

    phrasesLiees = this.nextPhrase(phrasesLiees, this.demande.rca, infosInscription.infosRca, sexe, TypeFiche.RCA);

    let phrasesPiecesJointes: string | undefined;

    phrasesPiecesJointes = this.getPiecesJointes(this.demande, infosInscription);

    phrasesLiees = phrasesLiees !== "" ? phrasesLiees : undefined;

    return { phrasesLiees, phrasesPiecesJointes };
  }

  nextPhrase(phrases: string, demande: boolean, infosInscription: FichePacs[] | FicheRcRca[], sexe: Sexe, type: TypeFiche) {
    const messages = this.getText(type);
    let phraseSuivante = "";
    if (demande && infosInscription.length > 0) {
      infosInscription.forEach((info: FichePacs | FicheRcRca) => {
        if (info.annee && info.numero && info.dateInscription) {
          phraseSuivante = sexe === Sexe.FEMININ ? messages.inscrite : messages.inscrit;
          const date = new Date(info.dateInscription);
          const infoComplementaire = this.getInfoComplementaire(type, info);

          phraseSuivante = replaceIndexByValue(phraseSuivante, [
            DateUtils.getDateFormatJasper(date),
            info.annee,
            info.numero,
            infoComplementaire
          ]);
        }

        phrases = this.addPhrase(phrases, phraseSuivante);
      });
    } else if (demande && infosInscription.length === 0) {
      phrases = this.addPhrase(phrases, sexe === Sexe.FEMININ ? messages.pasInscrite : messages.pasInscrit);
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

  getInfoComplementaire(type: TypeFiche, info: FichePacs | FicheRcRca) {
    let infoComplementaire = "";
    if (type === TypeFiche.PACS) {
      infoComplementaire = ` (${(info as FichePacs).statut.toLowerCase()})`;
    }

    return infoComplementaire;
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

  getPiecesJointes(demande: DemandeDeliver, infosInscription: IInfosInscriptions) {
    let piecesJointes = "";
    const pacsDemanderEtPresent = demande.pacs && infosInscription.infosPacs.length > 0;
    const rcDemanderEtPresent = demande.rc && infosInscription.infosRc.length > 0;
    const rcaDemanderEtPresent = demande.rca && infosInscription.infosRca.length > 0;

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
const PAS_INSCRIT_PACS = "- N'est pas inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger.";

const PAS_INSCRITE_PACS = "- N'est pas inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger.";
const INSCRIT_PACS =
  "- Est inscrit au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le {0} sous la référence PAC n°{1}-{2}{3}.";
const INSCRITE_PACS =
  "- Est inscrite au registre des PACS des personnes de nationalité étrangère et nées à l’étranger depuis le {0} sous la référence PAC n°{1}-{2}{3}.";
const PAS_INSCRIT_RC = "- N’est pas inscrit au répertoire civil.";
const PAS_INSCRITE_RC = "- N’est pas inscrite au répertoire civil.";
const INSCRIT_RC = "- Est inscrit au répertoire civil depuis le {0} sous la référence RC n°{1}-{2}{3}.";
const INSCRITE_RC = "- Est inscrite au répertoire civil depuis le {0} sous la référence RC n°{1}-{2}{3}.";
const PAS_INSCRIT_RCA = "- N’est pas inscrit au répertoire civil annexe.";
const PAS_INSCRITE_RCA = "- N’est pas inscrite au répertoire civil annexe.";
const INSCRIT_RCA = "- Est inscrit au répertoire civil annexe depuis le {0} sous la référence RCA n°{1}-{2}.";
const INSCRITE_RCA = "- Est inscrite au répertoire civil annexe depuis le {0} sous la référence RCA n°{1}-{2}.";

const PIECE_JOINTE = "A toutes fins utiles, vous trouverez joint(s) à ce certificat :";
const PIECE_JOINTE_PACS = "- la communication des informations relatives à un pacte civil de solidarité";
const PIECE_JOINTE_RC = "- le(s) certificat(s) d’inscription au répertoire civil";
const PIECE_JOINTE_RCA = "- le(s) certificat(s) d’inscription au répertoire civil annexe";

/////////////////////////////////////////////////////////////////////
class SpecificationDeliverPhrase {
  MAP_SPECIFICATION: Map<string, SpecificationDeliver> = new Map();
  private init() {
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, false, false)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(false, true, false)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(false, false, true)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_RC_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(false, true, true)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, true, true)
      )
    );
    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RC),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, true, false)
      )
    );

    this.MAP_SPECIFICATION.set(
      DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_CERTIFICAT_SITUATION_PACS_RCA),
      new SpecificationDeliver(
        //                 Pacs, Rc, Rca
        new DemandeDeliver(true, false, true)
      )
    );
  }

  getPhrasesJasper(idDocumentDemande: string, sexe: Sexe, nbInscriptionsInfos: INbInscriptionsInfos, infosInscription: IInfosInscriptions) {
    let phrasesJasper = {} as IPhrasesJasperCertificatSituation;

    if (this.MAP_SPECIFICATION.size === 0) {
      this.init();
    }

    const specification = this.MAP_SPECIFICATION.get(idDocumentDemande);
    if (specification) {
      phrasesJasper = specification.getPhraseEtPiecesJointes(sexe, infosInscription);
    }
    return phrasesJasper;
  }
}

export const specificationPhraseDelivrer = new SpecificationDeliverPhrase();
