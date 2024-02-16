import { getMentions } from "@api/appels/etatcivilApi";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { getDateFromTimestamp } from "@util/DateUtils";
import { logError } from "@util/LogManager";
import { useEffect, useState } from "react";

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
          /* istanbul ignore next */
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

export function mappingMentions(mentions: any[]): IMention[] | undefined {
  return (
    mentions &&
    mentions.map(mention => {
      return mention && mappingMention(mention);
    })
  );
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
    id: typeMention.idTypeMention,
    libelle: typeMention.libelleType,
    natureMention: NatureMention.getEnumFor(typeMention.idNatureMention),
    natureActe: NatureActe.getEnumFor(typeMention.natureActe),
    affecteAnalyseMarginale: typeMention.affecteAnalyseMarginale,
    sousTypes: typeMention.typeMentionEnfantList
      ? typeMention.typeMentionEnfantList.map((sousTypeMention: any) =>
          mappingTypeMention(sousTypeMention)
        )
      : undefined
  };
}

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
