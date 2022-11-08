import { Qualite } from "./enum/Qualite";
import { IAutreProfessionnel } from "./IAutreProfessionnel";
import { IInstitutionnel } from "./IInstitutionnel";
import { IMandataireHabilite } from "./IMandataireHabilite";
import { IParticulier } from "./IParticulier";
import { IUtilisateurRece } from "./IUtilisateurRece";

export interface IQualiteRequerant {
  qualite: Qualite;
  utilisateurRece?: IUtilisateurRece;
  particulier?: IParticulier;
  mandataireHabilite?: IMandataireHabilite;
  autreProfessionnel?: IAutreProfessionnel;
  institutionnel?: IInstitutionnel;
}

export const QualiteRequerant = {
  getType(qualiteRequerant: IQualiteRequerant): string | undefined {
    switch (qualiteRequerant.qualite) {
      case Qualite.MANDATAIRE_HABILITE:
        return qualiteRequerant.mandataireHabilite?.type?.libelle;
      case Qualite.AUTRE_PROFESSIONNEL:
        return qualiteRequerant.autreProfessionnel?.nature;
      case Qualite.INSTITUTIONNEL:
        return qualiteRequerant.institutionnel?.type?.libelle;
      default:
        return undefined;
    }
  }
};
