/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class PieceJustificativeCategorie extends EnumWithComplete {
  public static readonly ACTE_NAISSANCE = new PieceJustificativeCategorie(
    "AN",
    "ACTE_NAISSANCE"
  );
  public static readonly ETAT_CIVIL_OFPRA = new PieceJustificativeCategorie(
    "AN",
    "ETAT_CIVIL_OFPRA"
  );
  public static readonly JUSTIF_MODIF_NOM = new PieceJustificativeCategorie(
    "Changement de nom",
    "JUSTIF_MODIF_NOM"
  );
  public static readonly TITRE_SEJOUR = new PieceJustificativeCategorie(
    "Titre de séjour",
    "TITRE_SEJOUR"
  );
  public static readonly PIECE_IDENTITE = new PieceJustificativeCategorie(
    "Pièce d'identité",
    "PIECE_IDENTITE"
  );
  public static readonly ACTE_ETAT_CIVIL_PARENT =
    new PieceJustificativeCategorie("AN", "ACTE_ETAT_CIVIL_PARENT");
  public static readonly ACTE_MARIAGE_PARENTS = new PieceJustificativeCategorie(
    "AM",
    "ACTE_MARIAGE_PARENTS"
  );
  public static readonly CNI_PARENTS = new PieceJustificativeCategorie(
    "CNI",
    "cni_parents"
  );
  public static readonly RECEPISSE_PACS = new PieceJustificativeCategorie(
    "PACS",
    "RECEPISSE_PACS"
  );
  public static readonly ACTE_MARIAGE = new PieceJustificativeCategorie(
    "AM",
    "ACTE_MARIAGE"
  );
  public static readonly PIECE_IDENTITE_CONJOINT =
    new PieceJustificativeCategorie("PIECE_IDENTITE_CONJOINT", "CNI");
  public static readonly ACTE_DECES_CONJOINT = new PieceJustificativeCategorie(
    "AD",
    "ACTE_DECES_CONJOINT"
  );
  public static readonly ACTE_UNION = new PieceJustificativeCategorie(
    "Justificatif",
    "ACTE_UNION"
  );
  public static readonly PREUVE_DIVORCE = new PieceJustificativeCategorie(
    "Divorce",
    "PREUVE_DIVORCE"
  );
  public static readonly DECISION_DISSOLUTION = new PieceJustificativeCategorie(
    "Dissolution PACS",
    "DECISION_DISSOLUTION"
  );
  public static readonly ACTE_NAISSANCE_ENFANT =
    new PieceJustificativeCategorie("AN", "ACTE_NAISSANCE_ENFANT");
  public static readonly JUGEMENT_ADOPTION_ENFANT =
    new PieceJustificativeCategorie("Adoption", "JUGEMENT_ADOPTION_ENFANT");
  public static readonly CERTIF_NATION_FR_ENFANT =
    new PieceJustificativeCategorie("CNF", "CERTIF_NATION_FR_ENFANT");
  public static readonly PIECE_COMPLEMENTAIRE_ETAT_CIVIL =
    new PieceJustificativeCategorie(
      "Pièce complémentaire",
      "PIECE_COMPLEMENTAIRE_ETAT_CIVIL"
    );

  public static getEnumFromLibelle(str?: string): PieceJustificativeCategorie {
    return str
      ? EnumWithLibelle.getEnumFromLibelle(PieceJustificativeCategorie, str)
      : undefined;
  }

  private static readonly ordrePj = [
    PieceJustificativeCategorie.ACTE_NAISSANCE,
    PieceJustificativeCategorie.ETAT_CIVIL_OFPRA,
    PieceJustificativeCategorie.JUSTIF_MODIF_NOM,
    PieceJustificativeCategorie.TITRE_SEJOUR,
    PieceJustificativeCategorie.PIECE_IDENTITE,
    PieceJustificativeCategorie.ACTE_ETAT_CIVIL_PARENT,
    PieceJustificativeCategorie.ACTE_MARIAGE_PARENTS,
    PieceJustificativeCategorie.CNI_PARENTS,
    PieceJustificativeCategorie.RECEPISSE_PACS,
    PieceJustificativeCategorie.ACTE_MARIAGE,
    PieceJustificativeCategorie.PIECE_IDENTITE_CONJOINT,
    PieceJustificativeCategorie.ACTE_DECES_CONJOINT,
    PieceJustificativeCategorie.ACTE_UNION,
    PieceJustificativeCategorie.PREUVE_DIVORCE,
    PieceJustificativeCategorie.DECISION_DISSOLUTION,
    PieceJustificativeCategorie.ACTE_NAISSANCE_ENFANT,
    PieceJustificativeCategorie.JUGEMENT_ADOPTION_ENFANT,
    PieceJustificativeCategorie.CERTIF_NATION_FR_ENFANT,
    PieceJustificativeCategorie.PIECE_COMPLEMENTAIRE_ETAT_CIVIL
  ];

  public static getPriorite = (categoriePj: PieceJustificativeCategorie) =>
    PieceJustificativeCategorie.ordrePj.findIndex(pj => pj === categoriePj);
}
