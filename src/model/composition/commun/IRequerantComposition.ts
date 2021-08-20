import { getValeurOuVide } from "../../../views/common/util/Utils";
import { LieuxUtils } from "../../LieuxUtils";
import { Qualite } from "../../requete/v2/enum/Qualite";
import { TypeCanal } from "../../requete/v2/enum/TypeCanal";
import { IRequerant } from "../../requete/v2/IRequerant";

export interface IRequerantComposition {
  identite_requerant_ligne_1: string;
  identite_requerant_ligne_2?: string;
  adresse_requerant: {
    ligne2: string;
    ligne3: string;
    ligne4: string;
    ligne5: string;
    ligne6: string;
    ligne7: string;
  };
}

function isParticulierOuUtilisateur(
  requerant: IRequerant
): requerant is IRequerant {
  return (
    requerant.qualiteRequerant?.qualite === Qualite.PARTICULIER ||
    requerant.qualiteRequerant?.qualite === Qualite.UTILISATEUR_RECE
  );
}

function isRaisonSociale(requerant: IRequerant): requerant is IRequerant {
  return (
    requerant.qualiteRequerant?.qualite === Qualite.MANDATAIRE_HABILITE ||
    requerant.qualiteRequerant?.qualite === Qualite.INSTITUTIONNEL ||
    requerant.qualiteRequerant?.qualite === Qualite.AUTRE_PROFESSIONNEL
  );
}

function isNotEmpty(str: any) {
  return str && str.length !== 0;
}

function isAdresseToutesLignes(
  obj: IRequerantComposition
): obj is IRequerantComposition {
  return (
    isNotEmpty(obj.identite_requerant_ligne_2) &&
    isNotEmpty(obj.adresse_requerant.ligne2) &&
    isNotEmpty(obj.adresse_requerant.ligne3) &&
    isNotEmpty(obj.adresse_requerant.ligne5) &&
    isNotEmpty(obj.adresse_requerant.ligne7)
  );
}

export const RequerantComposition = {
  ajoutInfosRequerant(
    obj: IRequerantComposition,
    canal?: TypeCanal,
    requerant?: IRequerant
  ) {
    if (requerant) {
      // Affichage de l'identité du requérant sur 1 ou 2 lignes selon le type
      if (isParticulierOuUtilisateur(requerant)) {
        obj.identite_requerant_ligne_1 = `${requerant.nomFamille} ${requerant.prenom}`;
      }
      if (isRaisonSociale(requerant)) {
        if (requerant?.qualiteRequerant.mandataireHabilite?.raisonSociale) {
          obj.identite_requerant_ligne_1 = `${requerant?.qualiteRequerant.mandataireHabilite?.raisonSociale}`;
          obj.identite_requerant_ligne_2 = `${requerant.nomFamille} ${requerant.prenom}`;
        } else {
          obj.identite_requerant_ligne_1 = `${requerant.nomFamille} ${requerant.prenom}`;
        }
      }

      if (canal === TypeCanal.COURRIER && requerant.adresse) {
        obj.adresse_requerant = {
          ligne2: getValeurOuVide(requerant.adresse.ligne2),
          ligne3: getValeurOuVide(requerant.adresse.ligne3),
          ligne4: getValeurOuVide(requerant.adresse.ligne4),
          ligne5: getValeurOuVide(requerant.adresse.ligne5),
          ligne6: `${getValeurOuVide(
            requerant.adresse.codePostal
          )} ${getValeurOuVide(requerant.adresse.ville)}`,
          ligne7: LieuxUtils.affichagePaysCourrier(requerant.adresse.pays)
        };
      }

      if (isAdresseToutesLignes(obj)) {
        obj.adresse_requerant.ligne2 = `${obj.adresse_requerant.ligne2} ${obj.adresse_requerant.ligne3}`;
        obj.adresse_requerant.ligne3 = obj.adresse_requerant.ligne4;
        obj.adresse_requerant.ligne4 = obj.adresse_requerant.ligne5;
        obj.adresse_requerant.ligne6 = obj.adresse_requerant.ligne7;
        obj.adresse_requerant.ligne7 = "";
      }
    }
  }
};
