import { ActeInscriptionSauvegardeDto } from "@model/etatcivil/acte/IActeInscriptionSauvegardeDto";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { describe, expect, test } from "vitest";

describe("Test du dto IActeInscriptionSauvegardeDto", () => {
  test("Méthodes ActeInscriptionSauvegardeDto mapResultatGetActesInscriptionsSauvegardes", () => {
    const donneesActeInscriptionSauvegardeIncompletes = {
      idActeOuInscription: "id1",
      type: "BROUILLON",
      personne: { idPersonne: "idPersonne1" }
    };

    expect(ActeInscriptionSauvegardeDto.mapResultatGetActesInscriptionsSauvegardes(donneesActeInscriptionSauvegardeIncompletes)).toEqual({
      ...donneesActeInscriptionSauvegardeIncompletes,
      personne: {
        ...donneesActeInscriptionSauvegardeIncompletes.personne,
        nom: undefined,
        autresNoms: undefined,
        prenoms: undefined,
        dateNaissance: undefined,
        lieuNaissance: undefined,
        sexe: ""
      },
      nature: undefined,
      reference: undefined
    });

    const donneesActeInscriptionSauvegardeCompletes = {
      ...donneesActeInscriptionSauvegardeIncompletes,
      nature: "nature",
      reference: "ref",
      personne: {
        ...donneesActeInscriptionSauvegardeIncompletes.personne,
        nom: "Nom",
        autresNoms: "Nom2 Nom3",
        prenoms: "Prenom",
        dateNaissance: "03/09/1996",
        lieuNaissance: "Nantes, France",
        sexe: "Masculin"
      }
    };

    expect(ActeInscriptionSauvegardeDto.mapResultatGetActesInscriptionsSauvegardes(donneesActeInscriptionSauvegardeCompletes)).toEqual(
      donneesActeInscriptionSauvegardeCompletes
    );
  });

  test("Méthodes ActeInscriptionSauvegardeDto mapParamsGetActesInscriptionsSauvegardes", () => {
    const pieceJustificative: IPieceJustificativeCreation = {
      id: "idPieceJustificative",
      nom: "PJ",
      mimeType: "image/png",
      extension: "png",
      taille: 1670093,
      contenu: "contenu",
      typePieceJustificative: null,
      idFichierNatali: "idFichier",
      ordreNatali: 1,
      libelle: "libelle pièce justificative",
      estPieceAnnexe: false,
      idActe: "idActe",
      idPersonne: "idPersonne",
      nouveauLibelleFichierPJ: "nouveau libelle"
    };

    expect(ActeInscriptionSauvegardeDto.mapParamsGetActesInscriptionsSauvegardes([pieceJustificative])).toEqual([
      {
        idActeOuInscription: "idActe",
        personne: {
          idPersonne: "idPersonne"
        },
        type: "ACTE"
      }
    ]);
  });
});
