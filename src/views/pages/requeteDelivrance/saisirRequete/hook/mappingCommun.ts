import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { FileExtension, MimeType } from "file-type";

export function getPrenoms(prenoms?: any): IPrenomOrdonnes[] {
  const prenomsInteresse = [] as IPrenomOrdonnes[];
  if (prenoms?.prenom1) {
    prenomsInteresse.push({ prenom: prenoms.prenom1, numeroOrdre: 1 });
  }
  if (prenoms?.prenom2) {
    prenomsInteresse.push({ prenom: prenoms.prenom2, numeroOrdre: 2 });
  }
  if (prenoms?.prenom3) {
    prenomsInteresse.push({ prenom: prenoms.prenom3, numeroOrdre: 3 });
  }
  return prenomsInteresse;
}



export function saisiePJ(requete: IRequeteDelivrance) {
  return requete.piecesJustificatives.map(PJ => {
    return {
      base64File: {
        fileName: PJ.nom || "",
        base64String: PJ.contenu,
        taille: PJ.taille,
        conteneurSwift: PJ.conteneurSwift,
        identifiantSwift: PJ.referenceSwift,
        mimeType: PJ.mimeType as MimeType,
        extension: PJ.extension as FileExtension
      },
      type: {
        value: TypePieceJustificative.getKeyForLibelle(
          PJ.typePieceJustificative.libelle
        ),
        str: PJ.typePieceJustificative.libelle
      }
    };
  });
}
