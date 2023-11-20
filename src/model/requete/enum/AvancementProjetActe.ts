/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class AvancementProjetActe extends EnumWithLibelle {
  public static readonly A_SAISIR = new AvancementProjetActe("A saisir");
  public static readonly A_VERIFIER = new AvancementProjetActe("A vérifier");
  public static readonly VERIFIE = new AvancementProjetActe("Vérifié");
  public static readonly EN_COURS = new AvancementProjetActe("En cours");
  public static readonly VALIDE = new AvancementProjetActe("Validé");
  public static readonly INVALIDE = new AvancementProjetActe("Invalidé");
  // Ajout pour faire fonctionner le code, mais sera ajouté proprement via l'US d'ajout des nouveaux avancements
  public static readonly A_SIGNER = new AvancementProjetActe("A signer");

  public static getAvancementsMasquantAcquisitionjDecret(): AvancementProjetActe[] {
    return [
      AvancementProjetActe.A_SAISIR,
      AvancementProjetActe.EN_COURS,
      AvancementProjetActe.VALIDE
    ];
  }

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

  public static estASigner(
    avancementProjetActe: AvancementProjetActe
  ): boolean {
    return avancementProjetActe === AvancementProjetActe.A_SIGNER;
  }
}
