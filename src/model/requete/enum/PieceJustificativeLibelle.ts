/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class PieceJustificativeLibelle extends EnumWithComplete {
  public static readonly ETAT_CIVIL = new PieceJustificativeLibelle(
    "postulant",
    "etat_civil"
  );
  public static readonly PARENTS_ET_FRATERIE = new PieceJustificativeLibelle(
    "parents",
    "parents_et_fratrie"
  );
  public static readonly PARENTS = new PieceJustificativeLibelle(
    "parent",
    "parents"
  );
  public static readonly UNION_ACTUELLE = new PieceJustificativeLibelle(
    "union actuelle",
    "union_actuelle"
  );
  public static readonly UNIONS_ANTERIEURES = new PieceJustificativeLibelle(
    "union antérieure",
    "unions_anterieures"
  );
  public static readonly ENFANTS = new PieceJustificativeLibelle(
    "enfant",
    "enfants"
  );
  public static readonly DEMANDE_COMPLEMENT = new PieceJustificativeLibelle(
    "demande",
    "demande_complement"
  );

  public static getEnumFromLibelle(str?: string): PieceJustificativeLibelle {
    return str
      ? EnumWithLibelle.getEnumFromLibelle(
          PieceJustificativeLibelle,
          str.replace(/\s+\d+/g, "")
        )
      : undefined;
  }

  public static getNumero(
    libelle: string,
    libelleTraite?: PieceJustificativeLibelle
  ): number | null {
    const match = libelle.match(/\d+/g)?.[0];

    return libelleTraite && match ? Number(match) : null;
  }

  private static readonly ordrePj = [
    PieceJustificativeLibelle.ETAT_CIVIL,
    PieceJustificativeLibelle.PARENTS,
    PieceJustificativeLibelle.PARENTS_ET_FRATERIE,
    PieceJustificativeLibelle.UNION_ACTUELLE,
    PieceJustificativeLibelle.UNIONS_ANTERIEURES,
    PieceJustificativeLibelle.ENFANTS,
    PieceJustificativeLibelle.DEMANDE_COMPLEMENT
  ];

  public static getPriorite = (libellePj?: PieceJustificativeLibelle) =>
    PieceJustificativeLibelle.ordrePj.findIndex(pj => pj === libellePj);
}
