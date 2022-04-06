import { useEffect, useState } from "react";
import { getMentions } from "../../../../../api/appels/etatcivilApi";
import { IMention } from "../../../../../model/etatcivil/acte/mention/IMention";
import { ITypeMention } from "../../../../../model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "../../../../../model/etatcivil/enum/NatureActe";
import { NatureMention } from "../../../../../model/etatcivil/enum/NatureMention";
import { getDateFromTimestamp } from "../../../util/DateUtils";
import { logError } from "../../../util/LogManager";

export interface IMentionsResultat {
  mentions?: IMention[];
}

export function useMentionsApiHook(idActe?: string) {
  const [mentions, setMentions] = useState<IMentionsResultat>();

  useEffect(() => {
    if (idActe) {
      getMentions(idActe)
        .then(result => {
          setMentions({ mentions: mappingMentions(result.body.data) });
        })
        .catch(error => {
          setMentions({ mentions: undefined });
          logError({
            messageUtilisateur:
              "Impossible de récupérer les mentions pour cet acte",
            error
          });
        });
    }
  }, [idActe]);

  return mentions;
}

function mappingMentions(mentions: any[]): IMention[] {
  return mentions.map(element => {
    return mappingMention(element);
  });
}

function mappingMention(mention: any): IMention {
  return {
    id: mention.id,
    numeroOrdre: mention.numeroOrdre,
    numeroOrdreExtrait: mention.numeroOrdreExtrait,
    villeApposition: mention.villeApposition,
    regionApposition: mention.regionApposition,
    dateApposition: getDateFromTimestamp(mention.dateApposition),
    dateCreation: getDateFromTimestamp(mention.dateCreation),
    statut: mention.StatutMention,
    dateStatut: getDateFromTimestamp(mention.dateStatut),
    titulaires: mention.titulaires
      ? mappingTitulairesMention(mention.titulaires)
      : [],
    typeMention: mappingTypeMention(mention.typeMention),
    autoriteEtatCivil: {
      libelleTypeAutoriteEtatCivil:
        mention.autoriteEtatCivil.libelleTypeAutoriteEtatCivil,
      nomOEC: mention.autoriteEtatCivil.nomOEC,

      prenomOEC: mention.autoriteEtatCivil.prenomOEC
    },
    evenement: mention.evenement,
    textes: mappingTexteMention(mention.textes)
  };
}

export function mappingTypeMention(typeMention: any): ITypeMention {
  return {
    codeType: typeMention.codeType,
    libelleType: typeMention.libelleTyp,
    codeSousType: typeMention.codeSousType,
    libelleSousType: typeMention.libelleSousType,
    estActif: typeMention.estActif,
    modeInformatisation: typeMention.modeInformatisation,
    nature: NatureMention.getEnumFor(typeMention.nature.id),
    sousTypeParDefaut: typeMention.sousTypeParDefaut,
    natureActe: NatureActe.getEnumFor(typeMention.natureActe)
  };
}

function mappingTitulairesMention(titulaires: any[]) {
  return titulaires.map(titulaire => {
    return {
      ordre: titulaire.number,
      nom: titulaire.string,
      sexe: titulaire.sexe,
      nationalite: titulaire.nationalite,
      prenoms: titulaire.prenoms.map
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
