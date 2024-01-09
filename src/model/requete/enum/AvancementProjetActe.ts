/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class AvancementProjetActe extends EnumWithLibelle {
  public static readonly A_SAISIR = new AvancementProjetActe("Projet à saisir");
  public static readonly A_VERIFIER = new AvancementProjetActe(
    "Acte à vérifier"
  );
  public static readonly VERIFIE = new AvancementProjetActe("Acte vérifié");
  public static readonly EN_COURS = new AvancementProjetActe("Projet créé");
  public static readonly VALIDE = new AvancementProjetActe("Projet validé");
  public static readonly INVALIDE = new AvancementProjetActe("Invalidé");
  public static readonly A_SIGNER = new AvancementProjetActe("A signer");
  public static readonly SIGNE = new AvancementProjetActe("Signé");

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

  public static estProjetValide(
    avancementProjetActe: AvancementProjetActe
  ): boolean {
    return avancementProjetActe === AvancementProjetActe.VALIDE;
  }

  public static estASigner(
    avancementProjetActe: AvancementProjetActe
  ): boolean {
    return avancementProjetActe === AvancementProjetActe.A_SIGNER;
  }
  public static estAVerifier(
    avancementProjetActe: AvancementProjetActe
  ): boolean {
    return avancementProjetActe === AvancementProjetActe.A_VERIFIER;
  }
  public static estProjetCree(avancement: AvancementProjetActe) {
    return avancement === AvancementProjetActe.EN_COURS;
  }
}
