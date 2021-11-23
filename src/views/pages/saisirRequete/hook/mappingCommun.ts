import { IPrenomOrdonnes } from "../../../../model/requete/v2/IPrenomOrdonnes";
import { IPieceJustificative } from "../../../common/types/RequeteType";
import { getValeurOuVide } from "../../../common/util/Utils";

export function getPrenoms(prenoms: any): IPrenomOrdonnes[] {
  const prenomsInteresse = [] as IPrenomOrdonnes[];
  if (prenoms.prenom1 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom1, numeroOrdre: 1 });
  }
  if (prenoms.prenom2 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom2, numeroOrdre: 2 });
  }
  if (prenoms.prenom3 !== "") {
    prenomsInteresse.push({ prenom: prenoms.prenom3, numeroOrdre: 3 });
  }
  return prenomsInteresse;
}

export function getPiecesJustificatives(
  nouvellesPiecesJointes: any
): IPieceJustificative[] {
  return nouvellesPiecesJointes
    ? nouvellesPiecesJointes.map((pj: any) => getPieceJustificative(pj))
    : [];
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
