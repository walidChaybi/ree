import {
  ADRESSE_COURRIEL,
  ANNEE,
  AUTRE_PROFESSIONNEL,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_POINT_GEO,
  DATE_EVENEMENT,
  INSTITUTI0NNEL,
  JOUR,
  LIEU_DIT,
  MANDATAIRE,
  MOIS,
  NAISSANCE,
  NATIONALITE,
  NATURE,
  NOM,
  NOMS,
  NOM_INSTITUTION,
  NOM_NAISSANCE,
  NOM_USAGE,
  NUMERO_TELEPHONE,
  PARENT1,
  PARENT2,
  PARTICULIER,
  PAYS,
  PAYS_EVENEMENT,
  PRENOM,
  PRENOMS,
  RAISON_SOCIALE,
  SEXE,
  TYPE,
  TYPE_REQUERANT,
  VILLE_EVENEMENT,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import { ParentFormDefaultValues } from "@composant/formulaire/ParentForm";

import { genererDefaultValuesPrenoms } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import {
  ISaisieAdresse,
  ISaisieAutreProfessionnel,
  ISaisieIdentite,
  ISaisieInstitutionnel,
  ISaisieMandataireHabilite,
  ISaisieParent,
  ISaisieParticulier,
  ISaisieRequerant,
  Prenoms
} from "@model/form/delivrance/ISaisirRequetePageForm";
import { IParent } from "@model/requete/IParent";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { PieceJointe } from "@util/FileUtils";
import { DEUX, UN } from "@util/Utils";
import { AutreProfessionnelFormDefaultValues } from "../sousFormulaires/requerant/autreProfessionnel/AutreProfessionnelForm";
import { InstitutionnelFormDefaultValues } from "../sousFormulaires/requerant/institutionnel/InstitutionnelForm";
import { MandataireFormDefaultValues } from "../sousFormulaires/requerant/mandataire/MandataireForm";
import { ParticulierFormDefaultValues } from "../sousFormulaires/requerant/particulier/ParticulierForm";
import { TypeRequerantRDC } from "./../../../../../model/requete/enum/TypeRequerantRDC";

export function getPrenomsTableauStringVersPrenomsOrdonnes(prenoms?: Prenoms): IPrenomOrdonnes[] {
  const prenomsInteresse = [] as IPrenomOrdonnes[];

  if (prenoms) {
    for (const cle in prenoms) {
      if (prenoms[cle]) {
        const numeroOrdre = parseInt(cle.replace("prenom", ""));
        prenomsInteresse.push({ prenom: prenoms[cle], numeroOrdre });
      }
    }
  }

  return prenomsInteresse;
}

export function getPrenomsOrdonneVersPrenomsDefaultValues(prenomsOrdonne?: IPrenomOrdonnes[], typeDeValeurParDefaut?: string): Prenoms {
  const prenomsDefaultValues: Prenoms = genererDefaultValuesPrenoms(typeDeValeurParDefaut);

  if (prenomsOrdonne) {
    for (const prenomOrdonne of prenomsOrdonne) {
      const prenom = prenomOrdonne.prenom;
      const numeroOrdre = prenomOrdonne.numeroOrdre;
      if (prenom) {
        prenomsDefaultValues[`prenom${numeroOrdre}`] = prenom;
      }
    }
  }

  return prenomsDefaultValues;
}

export function saisiePJ(requete: IRequeteDelivrance): PieceJointe[] {
  return requete.piecesJustificatives.map(PJ => {
    return {
      base64File: {
        fileName: PJ.nom || "",
        base64String: PJ.contenu,
        taille: PJ.taille,
        conteneurSwift: PJ.conteneurSwift,
        identifiantSwift: PJ.referenceSwift,
        mimeType: PJ.mimeType,
        extension: PJ.extension
      },
      type: {
        cle: PJ.typePieceJustificative?.id ?? "",
        libelle: PJ.typePieceJustificative?.libelle ?? ""
      }
    };
  });
}

export const saisieTitulaire = (titulaire?: ITitulaireRequete): ISaisieIdentite | undefined => {
  return titulaire
    ? {
        [NOMS]: {
          [NOM_NAISSANCE]: titulaire.nomNaissance ?? "",
          [NOM_USAGE]: titulaire.nomUsage ?? ""
        },
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(titulaire.prenoms),
        [SEXE]: titulaire.sexe,
        [NAISSANCE]: {
          [DATE_EVENEMENT]: {
            [JOUR]: titulaire.jourNaissance?.toString() ?? "",
            [MOIS]: titulaire.moisNaissance?.toString() ?? "",
            [ANNEE]: titulaire.anneeNaissance?.toString() ?? ""
          },
          [VILLE_EVENEMENT]: titulaire.villeNaissance ?? "",
          [PAYS_EVENEMENT]: titulaire.paysNaissance ?? ""
        },
        [NATIONALITE]: titulaire.nationalite.nom,
        [PARENT1]: saisieFiliation(TitulaireRequete.getParent1(titulaire)),
        [PARENT2]: saisieFiliation(TitulaireRequete.getParent2(titulaire))
      }
    : undefined;
};

const saisieFiliation = (parent?: IParent): ISaisieParent => {
  return parent
    ? {
        [NOM_NAISSANCE]: parent.nomNaissance ?? "",
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(parent.prenoms)
      }
    : ParentFormDefaultValues;
};

export const saisieRequerant = (requete: IRequeteDelivrance): ISaisieRequerant => {
  const qualite: Qualite = requete.requerant.qualiteRequerant.qualite;
  const requerant: ISaisieRequerant = {
    [TYPE_REQUERANT]: "",
    [MANDATAIRE]: MandataireFormDefaultValues,
    [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
    [PARTICULIER]: ParticulierFormDefaultValues,
    [AUTRE_PROFESSIONNEL]: AutreProfessionnelFormDefaultValues
  };

  switch (qualite) {
    case Qualite.INSTITUTIONNEL:
      requerant[TYPE_REQUERANT] = TypeRequerantRDC.INSTITUTIONNEL.nom;
      requerant[INSTITUTI0NNEL] = mapRequerantInstitutionnel(requete.requerant);
      break;
    case Qualite.MANDATAIRE_HABILITE:
      requerant[TYPE_REQUERANT] = TypeRequerantRDC.MANDATAIRE.nom;
      requerant[MANDATAIRE] = mapRequerantMandataireHabilite(requete.requerant);
      break;
    case Qualite.AUTRE_PROFESSIONNEL:
      requerant[TYPE_REQUERANT] = TypeRequerantRDC.AUTRE_PROFESSIONNEL.nom;
      requerant[AUTRE_PROFESSIONNEL] = mapRequerantAutreProfessionnel(requete.requerant);
      break;
    case Qualite.PARTICULIER:
      if (
        Requerant.estTitulaireX({
          requerant: requete.requerant,
          titulaire: TitulaireRequete.getTitulaireParPosition(requete.titulaires || [], UN)
        })
      ) {
        requerant[TYPE_REQUERANT] = TypeRequerantRDC.TITULAIRE1.nom;
      } else if (
        Requerant.estTitulaireX({
          requerant: requete.requerant,
          titulaire: TitulaireRequete.getTitulaireParPosition(requete.titulaires || [], DEUX)
        })
      ) {
        requerant[TYPE_REQUERANT] = TypeRequerantRDC.TITULAIRE2.nom;
      } else {
        requerant[TYPE_REQUERANT] = TypeRequerantRDC.PARTICULIER.nom;
        requerant[PARTICULIER] = mapRequerantParticulier(requete.requerant);
      }
      break;
    default:
      requerant[TYPE_REQUERANT] = TypeRequerantRDC.TITULAIRE1.nom;
  }
  return requerant;
};

export const saisieAdresse = (requete: IRequeteDelivrance): ISaisieAdresse => {
  return {
    [VOIE]: requete.requerant.adresse?.ligne4 ?? "",
    [LIEU_DIT]: requete.requerant.adresse?.ligne5 ?? "",
    [COMPLEMENT_DESTINATAIRE]: requete.requerant.adresse?.ligne2 ?? "",
    [COMPLEMENT_POINT_GEO]: requete.requerant.adresse?.ligne3 ?? "",
    [CODE_POSTAL]: requete.requerant.adresse?.codePostal ?? "",
    [COMMUNE]: requete.requerant.adresse?.ville ?? "",
    [PAYS]: requete.requerant.adresse?.pays ?? "",
    [ADRESSE_COURRIEL]: requete.requerant.courriel ?? "",
    [NUMERO_TELEPHONE]: requete.requerant.telephone ?? ""
  };
};

const mapNomPrenomRequerant = (requerant: IRequerant) => {
  return {
    [NOM]: requerant.nomFamille ?? "",
    [PRENOM]: requerant.prenom ?? ""
  };
};

const mapRequerantInstitutionnel = (requerant: IRequerant): ISaisieInstitutionnel => {
  return {
    ...mapNomPrenomRequerant(requerant),
    [TYPE]: TypeInstitutionnel.getKey(requerant.qualiteRequerant.institutionnel?.type),
    [NATURE]: requerant.qualiteRequerant.institutionnel?.nature ?? "",
    [NOM_INSTITUTION]: requerant.qualiteRequerant.institutionnel?.nomInstitution ?? ""
  };
};

const mapRequerantMandataireHabilite = (requerant: IRequerant): ISaisieMandataireHabilite => {
  return {
    ...mapNomPrenomRequerant(requerant),
    [TYPE]: TypeMandataireReq.getKey(requerant.qualiteRequerant.mandataireHabilite?.type),
    [NATURE]: requerant.qualiteRequerant.mandataireHabilite?.nature ?? "",
    [RAISON_SOCIALE]: requerant.qualiteRequerant.mandataireHabilite?.raisonSociale ?? ""
  };
};

const mapRequerantAutreProfessionnel = (requerant: IRequerant): ISaisieAutreProfessionnel => {
  return {
    ...mapNomPrenomRequerant(requerant),
    [NATURE]: requerant.qualiteRequerant.autreProfessionnel?.nature ?? "",
    [RAISON_SOCIALE]: requerant.qualiteRequerant.autreProfessionnel?.raisonSociale ?? ""
  };
};

const mapRequerantParticulier = (requerant: IRequerant): ISaisieParticulier => {
  return {
    [NOM_NAISSANCE]: requerant.nomFamille ?? "",
    [NOM_USAGE]: requerant.qualiteRequerant.particulier?.nomUsage ?? "",
    [PRENOM]: requerant.prenom ?? ""
  };
};
