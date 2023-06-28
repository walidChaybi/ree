/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { HUIT, NEUF } from "./../../../views/common/util/Utils";
import { NatureActeRequete } from "./NatureActeRequete";

export class RolePersonneSauvegardee extends EnumWithComplete {
  public static readonly TITULAIRE = new RolePersonneSauvegardee(
    "TITULAIRE",
    "Titulaire"
  );
  public static readonly PARENT_1 = new RolePersonneSauvegardee(
    "PARENT_1",
    "Parent 1"
  );
  public static readonly PARENT_2 = new RolePersonneSauvegardee(
    "PARENT_2",
    "Parent 2"
  );
  public static readonly TITULAIRE_1 = new RolePersonneSauvegardee(
    "TITULAIRE_1",
    "Titulaire 1"
  );
  public static readonly TITULAIRE_2 = new RolePersonneSauvegardee(
    "TITULAIRE_2",
    "Titulaire 2"
  );
  public static readonly PARENT_1_TITULAIRE_1 = new RolePersonneSauvegardee(
    "PARENT_1_TITULAIRE_1",
    "Parent 1 titulaire 1"
  );
  public static readonly PARENT_2_TITULAIRE_1 = new RolePersonneSauvegardee(
    "PARENT_2_TITULAIRE_1",
    "Parent 2 titulaire 1"
  );
  public static readonly PARENT_1_TITULAIRE_2 = new RolePersonneSauvegardee(
    "PARENT_1_TITULAIRE_2",
    "Parent 1 titulaire 2"
  );
  public static readonly PARENT_2_TITULAIRE_2 = new RolePersonneSauvegardee(
    "PARENT_2_TITULAIRE_2",
    "Parent 2 titulaire 2"
  );

  public static getEnumFor(str: string): RolePersonneSauvegardee {
    return EnumWithComplete.getEnumFor(str, RolePersonneSauvegardee);
  }

  public static getKeyForLibelle(str: string): string {
    return EnumWithComplete.getKeyForLibelle(RolePersonneSauvegardee, str);
  }

  public static getKeyForNom(nom: string): string {
    return EnumWithComplete.getKeyForNom(RolePersonneSauvegardee, nom);
  }

  public static filtreRolesPersonnesSauvegardeesEnFonctionNatureActeRequete(
    natureActeRequete: NatureActeRequete
  ): RolePersonneSauvegardee[] {
    return NatureActeRequete.estMariage(natureActeRequete)
      ? [
          this.TITULAIRE_1,
          this.TITULAIRE_2,
          this.PARENT_1_TITULAIRE_1,
          this.PARENT_2_TITULAIRE_1,
          this.PARENT_1_TITULAIRE_2,
          this.PARENT_2_TITULAIRE_2
        ]
      : [this.TITULAIRE_1, this.PARENT_1, this.PARENT_2];
  }

  public static getEnumForEnFonctionNatureActeRequete(
    str: string,
    estRequeteMariage = false
  ): RolePersonneSauvegardee {
    if (!estRequeteMariage) {
      str = RolePersonneSauvegardee.estParent(str)
        ? str.slice(0, HUIT)
        : str.slice(0, NEUF);
    }
    return this.getEnumFor(str);
  }

  public static estParent(str: string): boolean {
    return str.startsWith("PARENT");
  }
}
