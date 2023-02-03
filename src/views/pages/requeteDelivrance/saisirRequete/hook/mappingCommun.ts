import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { getValeurOuVide } from "@util/Utils";
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

export function getPieceJustificative(pj: any) {
  const piece = getDocumentSwift(pj);
  piece.typePieceJustificative = pj.type?.value;
  return piece as IPieceJustificative;
}

export function getPieceComplementInformation(pci: any) {
  const piece = getDocumentSwift(pci);
  piece.provenance = "OEC";
  return piece;
}

export function getDocumentSwift(document: any): any {
  return {
    nom: document.base64File.fileName,
    contenu: document.base64File.base64String,
    mimeType: document.base64File.mimeType,
    taille: document.base64File.taille,
    extension: document.base64File.extension,
    referenceSwift: getValeurOuVide(document.base64File.identifiantSwift),
    conteneurSwift: getValeurOuVide(document.base64File.conteneurSwift)
  };
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
