import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export enum EQualiteRequerant {
  UTILISATEUR_RECE = "Utilisateur RECE",
  PARTICULIER = "Particulier",
  MANDATAIRE_HABILITE = "Mandataire habilité",
  AUTRE_PROFESSIONNEL = "Autre professionnel",
  INSTITUTIONNEL = "Institutionnel"
}

export class Qualite extends EnumWithComplete {
  public static readonly UTILISATEUR_RECE = new Qualite("UTILISATEUR_RECE", "Utilisateur RECE");
  public static readonly PARTICULIER = new Qualite("PARTICULIER", "Particulier");
  public static readonly MANDATAIRE_HABILITE = new Qualite("MANDATAIRE_HABILITE", "Mandataire habilité");
  public static readonly AUTRE_PROFESSIONNEL = new Qualite("AUTRE_PROFESSIONNEL", "Autre professionnel");
  public static readonly INSTITUTIONNEL = new Qualite("INSTITUTIONNEL", "Institutionnel");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Qualite);
  }

  public static estMandataireHabilite(qualite?: Qualite): boolean {
    return qualite === Qualite.MANDATAIRE_HABILITE;
  }

  public static estInstitutionnel(qualite?: Qualite): boolean {
    return qualite === Qualite.INSTITUTIONNEL;
  }

  public static estAutreProfessionel(qualite?: Qualite): boolean {
    return qualite === Qualite.AUTRE_PROFESSIONNEL;
  }

  public static estParticulier(qualite?: Qualite): boolean {
    return qualite === Qualite.PARTICULIER;
  }

  public static estUtilisateurRece(qualite?: Qualite): boolean {
    return qualite === Qualite.UTILISATEUR_RECE;
  }
}
