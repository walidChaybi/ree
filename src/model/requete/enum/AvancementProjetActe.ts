/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class AvancementProjetActe extends EnumWithLibelle {
  public static readonly A_SAISIR = new AvancementProjetActe("A saisir");
  public static readonly A_VERIFIER = new AvancementProjetActe("A vérifier");
  public static readonly VERIFIE = new AvancementProjetActe("Vérifié");
  public static readonly EN_COURS = new AvancementProjetActe("En cours");
  public static readonly VALIDE = new AvancementProjetActe("Validé");
  public static readonly INVALIDE = new AvancementProjetActe("Invalidé");

  public static getEnumFor(str?: string) {
    return EnumWithLibelle.getEnumFor(str, AvancementProjetActe);
  }

  public static getKey(valeur: AvancementProjetActe): string {
    return EnumWithLibelle.getKey(AvancementProjetActe, valeur);
  }

  public static estASaisir(
    avancementProjetActe: AvancementProjetActe
  ): boolean {
    return avancementProjetActe === AvancementProjetActe.A_SAISIR;
  }
}
