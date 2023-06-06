import {
  CODE_TRANSCRIPTION_ACTE,
  CODE_TRANSCRIPTION_AUTRE,
  CODE_TRANSCRIPTION_PARENT_TITULAIRE_ACTE,
  CODE_TRANSCRIPTION_TITULAIRE_ACTE
} from "../enum/TypePieceJustificative";
import { IDocumentPJ } from "../IDocumentPj";
import { IPieceJustificative } from "./IPieceJustificative";

export interface IPieceJustificativeCreation extends IPieceJustificative {
  idFichierNatali: string;
  ordreNatali: number;
  libelle: string;
  estPieceAnnexe: boolean;
  idRc?: string;
  idRca?: string;
  idPacs?: string;
  idActe?: string;
  idPersonne?: string;
  documentPj?: IDocumentPJ;
  nouveauLibelleFichierPJ: string;
  natureActeInscription?: string;
}

export class PieceJustificativeCreation {
  private static readonly pieceJustificativeCreationSpec = {
    [CODE_TRANSCRIPTION_ACTE]: {
      ordre: 1000
    },
    [CODE_TRANSCRIPTION_TITULAIRE_ACTE]: {
      ordre: 2000
    },
    [CODE_TRANSCRIPTION_PARENT_TITULAIRE_ACTE]: {
      ordre: 3000
    },
    [CODE_TRANSCRIPTION_AUTRE]: {
      ordre: 4000
    }
  };

  public static getNumeroOrdre(
    pjCreation: IPieceJustificativeCreation
  ): number {
    const spec =
      //@ts-ignore
      PieceJustificativeCreation.pieceJustificativeCreationSpec[
        pjCreation.typePieceJustificative.code
      ];
    return spec ? spec.ordre : 0;
  }

  public static setOrdre(piecesJustificatives: IPieceJustificativeCreation[]) {
    let cpt = 0;
    [...piecesJustificatives]
      .sort((pj1, pj2) => pj1.nom.localeCompare(pj2.nom))
      .forEach(pieceJustificative => {
        const ordre = this.getNumeroOrdre(pieceJustificative) + cpt;
        cpt++;
        pieceJustificative.ordreNatali = ordre;
      });
  }

  public static tri(
    piecesJustificatives?: IPieceJustificativeCreation[]
  ): IPieceJustificativeCreation[] {
    return (
      piecesJustificatives?.sort(
        (pj1, pj2) => pj1.ordreNatali - pj2.ordreNatali
      ) || []
    );
  }

  public static getIdActeInscription(
    pieceJustificative: IPieceJustificativeCreation
  ): string {
    return (
      pieceJustificative.idRc ||
      pieceJustificative.idRca ||
      pieceJustificative.idPacs ||
      pieceJustificative.idActe ||
      ""
    );
  }

  public static getTypeActeInscription(
    pieceJustificative: IPieceJustificativeCreation
  ): string | undefined {
    return pieceJustificative.idRc
      ? "INSCRIPTION_RC"
      : pieceJustificative.idRca
      ? "INSCRIPTION_RCA"
      : pieceJustificative.idPacs
      ? "PACS"
      : pieceJustificative.idActe
      ? "ACTE"
      : undefined;
  }
}
