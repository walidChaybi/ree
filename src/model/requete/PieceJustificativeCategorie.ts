/* istanbul ignore file */

import { CAR_ETOILE, chainesEgalesIgnoreCasse, getNombreCommeSuffix } from "@util/Utils";

interface IPieceJustificativeCategorieSpec {
  categorie: string;
  libelleAAfficher: string;
  ordre: number;
}
export class PieceJustificativeCategorie {
  private static readonly piecesJustificativesCategorieSpec: IPieceJustificativeCategorieSpec[] =
    [
      {categorie: "ACTE_NAISSANCE", libelleAAfficher: "AN Postulant", ordre: 1000},
      {categorie: "ETAT_CIVIL_OFPRA", libelleAAfficher: "AN Postulant",ordre: 2000},
      {categorie: "JUSTIF_MODIF_NOM", libelleAAfficher: "Changement de nom postulant",ordre: 3000},
      {categorie: "TITRE_SEJOUR", libelleAAfficher: "Titre de séjour postulant",ordre: 4000},
      {categorie: "PIECE_IDENTITE", libelleAAfficher: "Pièce d'identité postulant",ordre: 5000},
      {categorie: "ACTE_ETAT_CIVIL_PARENT", libelleAAfficher: `AN parent ${CAR_ETOILE}`,ordre: 6000},
      {categorie: "ACTE_MARIAGE_PARENTS", libelleAAfficher: "AM parents",ordre: 7000},
      {categorie: "CNI_PARENTS", libelleAAfficher: `CNI parent ${CAR_ETOILE}`,ordre: 8000},
      {categorie: "RECEPISSE_PACS", libelleAAfficher: "PACS union actuelle",ordre: 9000},
      {categorie: "ACTE_MARIAGE", libelleAAfficher: "AM union actuelle",ordre: 10000},
      {categorie: "PIECE_IDENTITE_CONJOINT", libelleAAfficher: "CNI union actuelle",ordre: 11000},
      {categorie: "ACTE_DECES_CONJOINT", libelleAAfficher: "AD union actuelle",ordre: 12000},
      {categorie: "ACTE_UNION", libelleAAfficher: `Justificatif union antérieure ${CAR_ETOILE}`,ordre: 13000},
      {categorie: "PREUVE_DIVORCE", libelleAAfficher: `Divorce union antérieure ${CAR_ETOILE}`,ordre: 14000},
      {categorie: "DECISION_DISSOLUTION", libelleAAfficher: `Dissolution PACS union antérieure ${CAR_ETOILE}`,ordre: 15000},
      {categorie: "ACTE_NAISSANCE_ENFANT", libelleAAfficher: `AN enfant ${CAR_ETOILE}`,ordre: 16000},
      {categorie: "JUGEMENT_ADOPTION_ENFANT", libelleAAfficher: `Adoption enfant ${CAR_ETOILE}`,ordre: 17000},
      {categorie: "CERTIF_NATION_FR_ENFANT", libelleAAfficher: `CNF enfant ${CAR_ETOILE}`,ordre: 18000},
      {categorie: "PIECE_COMPLEMENTAIRE_ETAT_CIVIL", libelleAAfficher: "Pièce complémentaire demande",ordre: 19000}
    ];

  constructor(
    public readonly libelleAAfficher: string,
    public readonly ordre: number // Numéro d'ordre dans piecesJustificativesCategorieSpec + numéro d'ordre des parents, unions antérieures, enfants, ...
  ) {}

  public static creationPieceJustificativeCategorie(
    categorie: string,
    libelleOrigine: string
  ): PieceJustificativeCategorie {
    const spec: IPieceJustificativeCategorieSpec =
      PieceJustificativeCategorie.piecesJustificativesCategorieSpec.find(
        pieceJustificativeCategorieSpec => chainesEgalesIgnoreCasse(pieceJustificativeCategorieSpec.categorie,categorie)
      ) || PieceJustificativeCategorie.createPieceJustificativeCategorieInconnue(categorie);

    return new PieceJustificativeCategorie(
      PieceJustificativeCategorie.getLibelleAAfficher(spec, libelleOrigine),
      spec.ordre + (getNombreCommeSuffix(libelleOrigine) || 0)
    );
  }

  private static getLibelleAAfficher(
    spec: IPieceJustificativeCategorieSpec,
    libelleOrigine: string
  ): string {
    let libelleAAfficher = spec.libelleAAfficher;
    if (libelleAAfficher.endsWith(CAR_ETOILE)) {
      const ordreEnumeration = getNombreCommeSuffix(libelleOrigine);
      if (ordreEnumeration) {
        libelleAAfficher = libelleAAfficher.replace(CAR_ETOILE,String(ordreEnumeration));
      }
    }
    return libelleAAfficher;
  }

  private static createPieceJustificativeCategorieInconnue(categorie: string) : IPieceJustificativeCategorieSpec {
    return { categorie, libelleAAfficher: "unknown", ordre: 0 };
  }
}
