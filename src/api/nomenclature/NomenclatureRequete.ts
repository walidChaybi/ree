/* istanbul ignore file */

import { CourrierDelivrance } from "../../model/requete/v2/enum/CourrierDelivrance";
import { DocumentDelivrance } from "../../model/requete/v2/enum/DocumentDelivrance";
import { TypePieceJustificative } from "../../model/requete/v2/enum/TypePieceJustificative";
import { logError } from "../../views/common/util/LogManager";
import { premiereLettreEnMajusculeLeResteEnMinuscule } from "../../views/common/util/Utils";
import { getNomenclatureRequete } from "../appels/requeteApi";

const TYPE_PIECE_JUSTIFICATIVE = "TYPE_PIECE_JUSTIFICATIVE";
const DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";
export const COURRIER_DELIVRANCE = "COURRIER_DELIVRANCE";

export async function peupleTypePieceJustificative() {
  if (!TypePieceJustificative.contientEnums()) {
    try {
      const typesPieceJustificative = await getNomenclatureRequete(
        TYPE_PIECE_JUSTIFICATIVE
      );

      TypePieceJustificative.clean();
      for (const data of typesPieceJustificative.body.data) {
        TypePieceJustificative.addEnum(
          data.id,
          new TypePieceJustificative(
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle)
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur:
          "Impossible de charger les types de pièces justificatives",
        error
      });
    }
  }
}

export async function peupleDocumentDelivrance() {
  if (!DocumentDelivrance.contientEnums()) {
    try {
      const documentsDelivrence = await getNomenclatureRequete(
        DOCUMENT_DELIVRANCE
      );

      DocumentDelivrance.clean();
      for (const data of documentsDelivrence.body.data) {
        DocumentDelivrance.addEnum(
          data.id,
          new DocumentDelivrance(
            data.code,
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle),
            data.categorie
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur:
          "Impossible de charger les types de documents de délivrance",
        error
      });
    }
  }
}

export async function peupleCourrierDelivrance() {
  if (!CourrierDelivrance.contientEnums()) {
    try {
      const courriersDelivrence = await getNomenclatureRequete(
        COURRIER_DELIVRANCE
      );

      CourrierDelivrance.clean();
      for (const data of courriersDelivrence.body.data) {
        CourrierDelivrance.addEnum(
          data.id,
          new CourrierDelivrance(
            data.code,
            premiereLettreEnMajusculeLeResteEnMinuscule(data.libelle),
            data.categorie
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur:
          "Impossible de charger les types de courriers de délivrance",
        error
      });
    }
  }
}
