/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum ETypeInstitutionnel {
  TRIBUNAL = "Tribunal",
  ADMINISTRATION_PUBLIQUE_ETABLISSEMENT_PUBLIC = "Administration publique / Etablissement public",
  OFFICIER_ETAT_CIVIL = "Officier de l'état civil",
  PROCUREUR_REPUBLIQUE = "Procureur de la République",
  MAIRIE = "Mairie",
  AMBASSADE = "Ambassade",
  POSTE_CONSULAIRE = "Poste consulaire",
  AUTRE = "Autre"
}

/** @deprecated supprimer la classe une fois le typage de la requête de délivrance faite */
export class TypeInstitutionnel extends EnumWithLibelle {
  public static readonly TRIBUNAL = new TypeInstitutionnel("Tribunal");
  public static readonly ADMINISTRATION_PUBLIQUE_ETABLISSEMENT_PUBLIC = new TypeInstitutionnel(
    "Administration publique / Etablissement public"
  );
  public static readonly OFFICIER_ETAT_CIVIL = new TypeInstitutionnel("Officier de l'état civil");
  public static readonly PROCUREUR_REPUBLIQUE = new TypeInstitutionnel("Procureur de la République");
  public static readonly MAIRIE = new TypeInstitutionnel("Mairie");
  public static readonly AMBASSADE = new TypeInstitutionnel("Ambassade");
  public static readonly POSTE_CONSULAIRE = new TypeInstitutionnel("Poste consulaire");
  public static readonly AUTRE = new TypeInstitutionnel("Autre");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeInstitutionnel);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeInstitutionnel);
  }

  public static getKey(obj?: any): string {
    return EnumWithLibelle.getKey(TypeInstitutionnel, obj);
  }
}
