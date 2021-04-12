import { Qualite } from "./enum/Qualite";
import { IUtilisateurRece } from "./IUtilisateurRece";
import { IParticulier } from "./IParticulier";
import { IMandataireHabilite } from "./IMandataireHabilite";
import { IAutreProfessionnel } from "./IAutreProfessionnel";
import { IInstitutionnel } from "./IInstitutionnel";

export interface IQualiteRequerant {
  qualite: Qualite;
  utilisateurRece?: IUtilisateurRece;
  particulier?: IParticulier;
  mandataireHabilite?: IMandataireHabilite;
  autreProfessionnel?: IAutreProfessionnel;
  institutionnel?: IInstitutionnel;
}
