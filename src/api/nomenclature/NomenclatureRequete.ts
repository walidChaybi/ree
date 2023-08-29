/* istanbul ignore file */

import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { PaysSecabilite } from "@model/requete/enum/PaysSecabilite";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { logError } from "@util/LogManager";
import {
  formatPremieresLettresMajusculesNomCompose,
  premiereLettreEnMajuscule
} from "@util/Utils";
import { getNomenclatureRequete } from "../appels/requeteApi";

const TYPE_PIECE_JUSTIFICATIVE = "TYPE_PIECE_JUSTIFICATIVE";
const DOCUMENT_DELIVRANCE = "DOCUMENT_DELIVRANCE";
const PAYS_SECABILITE = "PAYS_SECABILITE";
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
            data.code,
            premiereLettreEnMajuscule(data.libelle),
            data.categorie,
            data.typeRequete,
            Number(data.ordre) || 0,
            data.typeRedactionActe || undefined
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
            premiereLettreEnMajuscule(data.libelle),
            data.categorie,
            data.texteLibre,
            data.categorieDocumentDelivrance
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

export async function peuplePaysSecabilite() {
  if (!PaysSecabilite.contientEnums()) {
    try {
      const paysSecabilite = await getNomenclatureRequete(PAYS_SECABILITE);

      PaysSecabilite.clean();
      for (const data of paysSecabilite.body.data) {
        PaysSecabilite.addEnum(
          data.id,
          new PaysSecabilite(
            data.code,
            formatPremieresLettresMajusculesNomCompose(data.libelle),
            data.categorie
          )
        );
      }
    } catch (error) {
      logError({
        messageUtilisateur: "Impossible de charger la liste des pays sécables",
        error
      });
    }
  }
}
