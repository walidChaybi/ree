import { ICompositionIdentiteRequerant } from "@model/composition/commun/IRequerantComposition";
import {
  chainesEgalesIgnoreCasse,
  DEUX,
  enMajuscule,
  formatNom,
  formatPrenom,
  getValeurOuUndefined,
  getValeurOuVide,
  SNP,
  UN
} from "@util/Utils";
import { Qualite } from "./enum/Qualite";
import { TypeInstitutionnel } from "./enum/TypeInstitutionnel";
import { TypeLienRequerant } from "./enum/TypeLienRequerant";
import { TypeMandataireReq } from "./enum/TypeMandataireReq";
import { IAdresseRequerant } from "./IAdresseRequerant";
import { IAutreProfessionnel } from "./IAutreProfessionnel";
import { IInstitutionnel } from "./IInstitutionnel";
import { ILienRequerant } from "./ILienRequerant";
import { IMandataireHabilite } from "./IMandataireHabilite";
import { IParticulier } from "./IParticulier";
import { IQualiteRequerant } from "./IQualiteRequerant";
import { ITitulaireRequete, TitulaireRequete } from "./ITitulaireRequete";
import { IUtilisateurRece } from "./IUtilisateurRece";

export interface IRequerant {
  id: string;
  dateCreation: Date;
  nomFamille?: string;
  prenom?: string;
  courriel?: string;
  telephone?: string;
  adresse?: IAdresseRequerant;
  nomUsage?: string;
  qualiteRequerant: IQualiteRequerant;
  lienRequerant?: ILienRequerant;
  courrielAutreContact?: string;
  telephoneAutreContact?: string;
}

export const Requerant = {
  getNomFamille(requerant?: IRequerant): string {
    return requerant ? formatNom(requerant.nomFamille) : "";
  },
  getNomUsageOuNomFamille(requerant?: IRequerant): string | undefined {
    let nom = requerant?.nomFamille;
    if (Qualite.estParticulier(requerant?.qualiteRequerant.qualite) && requerant?.qualiteRequerant.particulier?.nomUsage) {
      nom = requerant?.qualiteRequerant.particulier?.nomUsage;
    }
    return nom;
  },
  getPrenom(requerant?: IRequerant): string {
    return requerant && requerant.prenom ? formatPrenom(requerant.prenom) : "";
  },
  getNomPrenom(requerant?: IRequerant): string | undefined {
    let nomPrenom = "";
    if (requerant) {
      nomPrenom = requerant.nomFamille + " ";
      nomPrenom += requerant.prenom ? requerant.prenom : "";
      nomPrenom += "\n";
    }
    return nomPrenom;
  },
  getRaisonSociale(requerant?: IRequerant): string | undefined {
    let raisonSociale: string | undefined;
    switch (requerant?.qualiteRequerant.qualite) {
      case Qualite.MANDATAIRE_HABILITE:
        raisonSociale = requerant.qualiteRequerant.mandataireHabilite?.raisonSociale;
        break;
      case Qualite.INSTITUTIONNEL:
        raisonSociale = requerant.qualiteRequerant.institutionnel?.nomInstitution;
        break;
      case Qualite.AUTRE_PROFESSIONNEL:
        raisonSociale = requerant.qualiteRequerant.autreProfessionnel?.raisonSociale;
        break;
      default:
        break;
    }

    return raisonSociale;
  },
  estTitulaireX({ requerant, titulaire }: { requerant: IRequerant; titulaire?: ITitulaireRequete }) {
    let titulaireResultat = { nom: "", prenom: "" };

    if (titulaire) {
      const { nomNaissance } = titulaire;
      titulaireResultat = {
        nom: nomNaissance === SNP ? "" : (nomNaissance ?? ""),
        prenom: TitulaireRequete.getPrenom1(titulaire)
      };
    }

    return titulaireResultat.nom === requerant.nomFamille && chainesEgalesIgnoreCasse(titulaireResultat.prenom, requerant.prenom);
  },
  estUnTitulaire({ requerant, titulaires }: { requerant?: IRequerant; titulaires?: ITitulaireRequete[] }) {
    return requerant
      ? Requerant.estTitulaireX({
          titulaire: TitulaireRequete.getTitulaireParPosition(titulaires || [], UN),
          requerant
        }) ||
          Requerant.estTitulaireX({
            titulaire: TitulaireRequete.getTitulaireParPosition(titulaires || [], DEUX),
            requerant
          })
      : false;
  },
  estParticulierOuUtilisateur(requerant: IRequerant): requerant is IRequerant {
    return (
      Qualite.estParticulier(requerant.qualiteRequerant?.qualite) || Qualite.estMandataireHabilite(requerant.qualiteRequerant?.qualite)
    );
  },
  estRaisonSociale(requerant?: IRequerant): boolean {
    return (
      Qualite.estMandataireHabilite(requerant?.qualiteRequerant?.qualite) ||
      Qualite.estInstitutionnel(requerant?.qualiteRequerant?.qualite) ||
      Qualite.estAutreProfessionel(requerant?.qualiteRequerant?.qualite)
    );
  },
  composerIdentite(requerant?: IRequerant): ICompositionIdentiteRequerant {
    // Récupération des informations selon type et données connues.
    const raisonSociale = enMajuscule(Requerant.estRaisonSociale(requerant) ? Requerant.getRaisonSociale(requerant) : "");
    const nom = enMajuscule(Requerant.getNomUsageOuNomFamille(requerant));
    const prenom = enMajuscule(Requerant.getPrenom(requerant));

    // Composition des lignes 1 et 2
    let ligne1: string | undefined = getValeurOuUndefined(raisonSociale);
    let ligne2: string | undefined;
    if (ligne1) {
      ligne2 = `${prenom} ${nom}`;
    } else {
      ligne1 = `${prenom} ${nom}`;
    }

    return { ligne1, ligne2 };
  },

  ///////// mapping des requerants venant du serveur //////////
  mappingRequerant(requerant: any): IRequerant {
    return {
      id: requerant.id,
      dateCreation: requerant.dateCreation,
      nomFamille: getValeurOuVide(requerant.nomFamille),
      nomUsage: getValeurOuVide(requerant.detailQualiteParticulier?.nomUsage),
      prenom: getValeurOuVide(requerant.prenom),
      courriel: requerant.courriel,
      telephone: requerant.telephone,
      adresse: requerant.adresse as IAdresseRequerant,
      lienRequerant: requerant.lienRequerant ? getLienRequerant(requerant.lienRequerant) : undefined,
      qualiteRequerant: getQualiteRequerant(requerant),
      telephoneAutreContact: requerant.telephoneAutreContact,
      courrielAutreContact: requerant.courrielAutreContact
    };
  }
};

///////// mapping des requerants venant du serveur //////////
function getLienRequerant(lienRequerant: any): ILienRequerant {
  return {
    id: lienRequerant.id,
    lien: TypeLienRequerant.getEnumFor(lienRequerant.typeLienRequerant),
    natureLien: lienRequerant.nature
  };
}

function getQualiteRequerant(requerant: any): IQualiteRequerant {
  return {
    qualite: Qualite.getEnumFor(requerant.qualite),
    utilisateurRece: requerant.detailQualiteRece as IUtilisateurRece,
    particulier: requerant.detailQualiteParticulier as IParticulier,
    mandataireHabilite: getMandataireHabilite(requerant.detailQualiteMandataireHabilite),
    autreProfessionnel: requerant.detailQualiteAutreProfessionnel as IAutreProfessionnel,
    institutionnel: getInstitutionnel(requerant.detailQualiteInstitutionnel)
  };
}

function getMandataireHabilite(mandataire: any): IMandataireHabilite {
  if (mandataire) {
    return {
      type: TypeMandataireReq.getEnumFor(mandataire.type),
      raisonSociale: mandataire.raisonSociale,
      nature: mandataire.nature,
      crpcen: mandataire.crpcen
    };
  }
  return {} as IMandataireHabilite;
}

function getInstitutionnel(institutionnel: any): IInstitutionnel {
  if (institutionnel) {
    return {
      type: TypeInstitutionnel.getEnumFor(institutionnel.type),
      nomInstitution: institutionnel.nomInstitution,
      nature: institutionnel.nature
    };
  }
  return {} as IInstitutionnel;
}
