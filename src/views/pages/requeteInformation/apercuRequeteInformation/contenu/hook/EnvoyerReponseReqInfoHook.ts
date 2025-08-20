import { HTTP_STATUS_OK } from "@api/ApiManager";
import { getEnvoyerMail } from "@api/appels/mailApi";
import { IMail } from "@model/mail/IMail";
import { IPieceJustificativeMail } from "@model/mail/IPieceJustificativeMail";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";
import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { getObjetRequeteInfoLibelle } from "@model/requete/enum/ObjetRequeteInfo";
import DateUtils from "@util/DateUtils";
import { useEffect, useState } from "react";
import AfficherMessage, { estTableauErreurApi } from "../../../../../../utils/AfficherMessage";
import { PieceJointe } from "../../../../../../utils/FileUtils";
import { ISauvegarderReponseReqInfoParams } from "./SauvegarderReponseReqInfoHook";

export interface IEnvoyerReponseReqInfoParams {
  reponseSaisie: ISauvegarderReponseReqInfoParams;
  requete: IRequeteInformation;
  piecesJointes?: PieceJointe[];
}

enum ERequeteMail {
  REQUETE_INFO = "REQUETE_INFO",
  REQUETE_INFO_ORIGINE = "REQUETE_INFO_ORIGINE"
}

export function useEnvoyerReponsesReqInfoHook(params: IEnvoyerReponseReqInfoParams | undefined) {
  const [mailEnvoyer, setMailEnvoyer] = useState<boolean | undefined>();

  useEffect(() => {
    if (params?.reponseSaisie) {
      const mail = getReponseAEnvoyer(params.reponseSaisie, params.requete, params.piecesJointes);
      getEnvoyerMail(mail)
        .then(result => {
          setMailEnvoyer(result.status === HTTP_STATUS_OK);
        })
        .catch(erreurs => {
          AfficherMessage.erreur("Impossible d'envoyer le mail avec votre réponse", {
            erreurs: estTableauErreurApi(erreurs) ? erreurs : []
          });
        });
    }
  }, [params]);
  return mailEnvoyer;
}

function getReponseAEnvoyer(
  reponseSaisie: ISauvegarderReponseReqInfoParams,
  requete: IRequeteInformation,
  piecesJointes?: PieceJointe[]
): IMail {
  const mail = {} as IMail;

  if (requete.requerant.courriel) {
    const commentaire = requete.commentaire?.trim();
    const codeModele = commentaire ? ERequeteMail.REQUETE_INFO_ORIGINE : ERequeteMail.REQUETE_INFO;

    mail.codeModele = codeModele;
    mail.versionModele = "1.0.0";
    mail.listeDestinataire = [requete.requerant.courriel];
    mail.listeDestinataireCopie = [];
    mail.listeDestinataireCopieCache = [];
    mail.champs = {
      champ1: requete.sousType.libelle, // "Sous-type demande"
      champ2: getObjetRequeteInfoLibelle(requete.objet), //  "Objet demande"
      champ3: ComplementObjetRequete.estReponseLibreAgent(requete.complementObjet) ? "--" : requete.complementObjet.libelle, //  "Complément objet demande"
      champ4: requete.numero, // "Référence demande"
      champ5: DateUtils.getFormatDateFromTimestamp(requete.dateCreation), //  "Date création demande"
      champ6: reponseSaisie.corpsMail //  "Contenu"
    };

    if (codeModele === ERequeteMail.REQUETE_INFO_ORIGINE) {
      mail.champs.champ7 = requete.commentaire;
    }

    mail.listePieceJointe = [];
    if (piecesJointes && piecesJointes.length > 0) {
      piecesJointes.forEach((pj: PieceJointe) => {
        mail.listePieceJointe.push({
          nom: pj.base64File.fileName,
          contenuBase64: pj.base64File.base64String,
          mimeType: pj.base64File.mimeType
        } as IPieceJustificativeMail);
      });
    }
  }
  return mail;
}
