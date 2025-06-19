import { getMentions } from "@api/appels/etatcivilApi";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention, NatureMention } from "@model/etatcivil/enum/NatureMention";
import DateUtils from "@util/DateUtils";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";
import { StatutMention } from "./../../../../../model/etatcivil/enum/StatutMention";

export interface IMentionsParams {
  idActe: string;
  statutMention?: StatutMention;
}

export interface IMentionsResultat {
  mentions?: IMention[];
}

export function useMentionsApiHook(params?: IMentionsParams) {
  const [mentions, setMentions] = useState<IMentionsResultat>();

  useEffect(() => {
    if (params) {
      getMentions(params.idActe, params.statutMention)
        .then(result => {
          setMentions({ mentions: mappingMentions(result.body.data) });
        })
        .catch(error => {
          /* istanbul ignore next */
          setMentions({ mentions: undefined });
          logError({
            messageUtilisateur: "Impossible de récupérer les mentions pour cet acte",
            error
          });
        });
    }
  }, [params]);

  return mentions;
}

export function mappingMentions(mentions: any[]): IMention[] | undefined {
  return mentions?.map(mention => {
    return mention && mappingMention(mention);
  });
}

function mappingMention(mention: any): IMention {
  return {
    id: mention.id,
    numeroOrdre: mention.numeroOrdre,
    numeroOrdreExtrait: mention.numeroOrdreExtrait,
    villeApposition: mention.villeApposition,
    regionApposition: mention.regionApposition,
    dateApposition: DateUtils.getDateFromTimestamp(mention.dateApposition),
    dateCreation: DateUtils.getDateFromTimestamp(mention.dateCreation),
    statut: mappingStatutMention(mention.statut),
    dateStatut: DateUtils.getDateFromTimestamp(mention.dateStatut),
    titulaires: mention.titulaires ? mappingTitulairesMention(mention.titulaires) : [],
    typeMention: mappingTypeMention(mention.typeMention),
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil: mention.autoriteEtatCivil.libelleTypeAutoriteEtatCivil,
      nomOEC: mention.autoriteEtatCivil.nomOEC,
      prenomOEC: mention.autoriteEtatCivil.prenomOEC
    },
    evenement: mention.evenement,
    textes: mappingTexteMention(mention.textes)
  };
}

function mappingTypeMention(typeMention: any): ITypeMention {
  return {
    id: typeMention.idTypeMention,
    libelle: typeMention.libelleType,
    natureMention: NatureMention.depuisId(typeMention.idNatureMention) as INatureMention,
    natureActe: NatureActe.getEnumFor(typeMention.natureActe),
    affecteAnalyseMarginale: typeMention.affecteAnalyseMarginale,
    sousTypes: typeMention.typeMentionEnfantList
      ? typeMention.typeMentionEnfantList.map((sousTypeMention: any) => mappingTypeMention(sousTypeMention))
      : undefined,
    estPresentListeDeroulante: typeMention.estPresentListeDeroulante,
    estSousType: typeMention.estSousType,
    estSaisieAssistee: typeMention.estSaisieAssistee
  };
}

const mappingStatutMention = (statutMention: string): StatutMention => {
  switch (statutMention) {
    case "REPUTEE_NON_ECRITE":
      return StatutMention.REPUTEE_NON_ECRITE;
    case "ANNULEE":
      return StatutMention.ANNULEE;
    case "SIGNEE":
      return StatutMention.SIGNEE;
    case "BROUILLON":
    default:
      return StatutMention.BROUILLON;
  }
};

function mappingTitulairesMention(titulaires: any[]) {
  return titulaires.map(titulaire => {
    return {
      ordre: titulaire.number,
      nom: titulaire.string,
      sexe: titulaire.sexe,
      nationalite: titulaire.nationalite,
      prenoms: titulaire.prenoms ? titulaire.prenoms : []
    };
  });
}

function mappingTexteMention(textes: any) {
  return {
    texteMention: textes.texteMention,
    texteApposition: textes.texteApposition,
    texteOEC: textes.texteOEC,
    texteMentionDelivrance: textes.texteMentionDelivrance,
    texteMentionPlurilingue: textes.texteMentionPlurilingue
  };
}
