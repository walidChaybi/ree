/* istanbul ignore file */

import { CAR_ETOILE, chainesEgalesIgnoreCasse, getNombreCommeSuffix } from "@util/Utils";

interface ICategorieDocumentSpec {
  categorie: string;
  libelleAAfficher: string;
  ordre: number;
}
export class CategorieDocument {
  private static readonly piecesJustificativesCategorieSpec: ICategorieDocumentSpec[] =
    [
      {categorie: "ACTE_NAISSANCE", libelleAAfficher: "AN Postulant", ordre: 1000},
      {categorie: "ETAT_CIVIL_OFPRA", libelleAAfficher: "AN Postulant",ordre: 2000},
      {categorie: "JUSTIF_MODIF_NOM", libelleAAfficher: "Changement de nom postulant",ordre: 3000},
      {categorie: "ACTE_ETAT_CIVIL_PARENT", libelleAAfficher: `AN parent ${CAR_ETOILE}`,ordre: 4000},
      {categorie: "ACTE_MARIAGE_PARENTS", libelleAAfficher: "AM parents",ordre: 5000},
      {categorie: "CNI_PARENTS", libelleAAfficher: `CNI parent ${CAR_ETOILE}`,ordre: 6000},
      {categorie: "RECEPISSE_PACS", libelleAAfficher: "PACS union actuelle",ordre: 7000},
      {categorie: "ACTE_MARIAGE", libelleAAfficher: "AM union actuelle",ordre: 8000},
      {categorie: "PIECE_IDENTITE_CONJOINT", libelleAAfficher: "CNI union actuelle",ordre: 9000},
      {categorie: "ACTE_DECES_CONJOINT", libelleAAfficher: "AD union actuelle",ordre: 10000},
      {categorie: "ACTE_UNION", libelleAAfficher: `Justificatif union antérieure ${CAR_ETOILE}`,ordre: 11000},
      {categorie: "PREUVE_DIVORCE", libelleAAfficher: `Divorce union antérieure ${CAR_ETOILE}`,ordre: 12000},
      {categorie: "DECISION_DISSOLUTION", libelleAAfficher: `Dissolution PACS union antérieure ${CAR_ETOILE}`,ordre: 13000},
      {categorie: "ACTE_NAISSANCE_ENFANT", libelleAAfficher: `AN enfant ${CAR_ETOILE}`,ordre: 14000},
      {categorie: "JUGEMENT_ADOPTION_ENFANT", libelleAAfficher: `Adoption enfant ${CAR_ETOILE}`,ordre: 15000},
      {categorie: "CERTIF_NATION_FR_ENFANT", libelleAAfficher: `CNF enfant ${CAR_ETOILE}`,ordre: 16000},
      {categorie: "PIECE_COMPLEMENTAIRE_ETAT_CIVIL", libelleAAfficher: "Pièce complémentaire demande",ordre: 17000},
      {categorie: "TITRE_SEJOUR", libelleAAfficher: "Titre de séjour postulant",ordre: 18000},
      {categorie: "PIECE_IDENTITE", libelleAAfficher: "Pièce d'identité postulant",ordre: 19000},
    ];

  constructor(
    public readonly libelleAAfficher: string,
    public readonly ordre: number // Numéro d'ordre dans piecesJustificativesCategorieSpec + numéro d'ordre des parents, unions antérieures, enfants, ...
  ) {}

  public static creationCategorieDocument(
    categorie: string,
    libelleOrigine: string
  ): CategorieDocument {
    const spec: ICategorieDocumentSpec =
      CategorieDocument.piecesJustificativesCategorieSpec.find(
        categorieDocumentSpec => chainesEgalesIgnoreCasse(categorieDocumentSpec.categorie,categorie)
      ) || CategorieDocument.createCategorieDocumentInconnue(categorie);

    return new CategorieDocument(
      CategorieDocument.getLibelleAAfficher(spec, libelleOrigine),
      spec.ordre + (getNombreCommeSuffix(libelleOrigine) || 0)
    );
  }

  private static getLibelleAAfficher(
    spec: ICategorieDocumentSpec,
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

  private static createCategorieDocumentInconnue(categorie: string) : ICategorieDocumentSpec {
    return { categorie, libelleAAfficher: "unknown", ordre: 0 };
  }
}
