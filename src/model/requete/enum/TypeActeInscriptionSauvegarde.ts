/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";

export class TypeActeInscriptionSauvegarde extends EnumWithComplete {
  public static readonly ACTE = new TypeActeInscriptionSauvegarde(
    "ACTE",
    "Acte à transcrire"
  );
  public static readonly TITULAIRE = new TypeActeInscriptionSauvegarde(
    "TITULAIRE",
    "Titulaire"
  );
  public static readonly PARENT = new TypeActeInscriptionSauvegarde(
    "PARENT",
    "Parents du titulaire"
  );
  public static readonly AUTRE = new TypeActeInscriptionSauvegarde(
    "AUTRE",
    "Autres pièces justificatives"
  );

  public static getEnumFor(str: string): TypeActeInscriptionSauvegarde {
    return EnumWithComplete.getEnumFor(str, TypeActeInscriptionSauvegarde);
  }

  public static getKeyForNom(nom: string): string {
    return EnumWithComplete.getKeyForNom(TypeActeInscriptionSauvegarde, nom);
  }
}
