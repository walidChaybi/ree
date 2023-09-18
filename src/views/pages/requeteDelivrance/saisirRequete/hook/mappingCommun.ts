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
import { genererDefaultValuesPrenoms } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { ParentFormDefaultValues } from "@composant/formulaire/ParentForm";
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
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { IParent } from "@model/requete/IParents";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import { getValeurOuVide } from "@util/Utils";
import { AutreProfessionnelFormDefaultValues } from "../sousFormulaires/requerant/autreProfessionnel/AutreProfessionnelForm";
import { InstitutionnelFormDefaultValues } from "../sousFormulaires/requerant/institutionnel/InstitutionnelForm";
import { MandataireFormDefaultValues } from "../sousFormulaires/requerant/mandataire/MandataireForm";
import { ParticulierFormDefaultValues } from "../sousFormulaires/requerant/particulier/ParticulierForm";

export function getPrenomsTableauStringVersPrenomsOrdonnes(
  prenoms?: Prenoms
): IPrenomOrdonnes[] {
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

export function getPrenomsOrdonneVersPrenomsDefaultValues(
  prenomsOrdonne?: IPrenomOrdonnes[]
): Prenoms {
  const prenomsDefaultValues: Prenoms = genererDefaultValuesPrenoms();
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

export function saisiePJ(requete: IRequeteDelivrance) {
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
        cle: TypePieceJustificative.getKeyForLibelle(
          PJ.typePieceJustificative.libelle
        ),
        libelle: PJ.typePieceJustificative.libelle
      }
    };
  });
}

export const saisieTitulaire = (
  titulaire?: ITitulaireRequete
): ISaisieIdentite | undefined => {
  return titulaire
    ? {
        [NOMS]: {
          [NOM_NAISSANCE]: getValeurOuVide(titulaire.nomNaissance),
          [NOM_USAGE]: getValeurOuVide(titulaire.nomUsage)
        },
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(titulaire.prenoms),
        [SEXE]: getValeurOuVide(titulaire.sexe),
        [NAISSANCE]: {
          [DATE_EVENEMENT]: {
            [JOUR]: getValeurOuVide(titulaire.jourNaissance),
            [MOIS]: getValeurOuVide(titulaire.moisNaissance),
            [ANNEE]: getValeurOuVide(titulaire.anneeNaissance)
          },
          [VILLE_EVENEMENT]: getValeurOuVide(titulaire.villeNaissance),
          [PAYS_EVENEMENT]: getValeurOuVide(titulaire.paysNaissance)
        },
        [NATIONALITE]: getValeurOuVide(titulaire.nationalite.nom),
        [PARENT1]: saisieFiliation(TitulaireRequete.getParent1(titulaire)),
        [PARENT2]: saisieFiliation(TitulaireRequete.getParent2(titulaire))
      }
    : undefined;
};

const saisieFiliation = (parent?: IParent): ISaisieParent => {
  return parent
    ? {
        [NOM_NAISSANCE]: getValeurOuVide(parent.nomNaissance),
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(parent.prenoms)
      }
    : ParentFormDefaultValues;
};

export const saisieRequerant = (
  requete: IRequeteDelivrance
): ISaisieRequerant => {
  const qualite: Qualite = requete.requerant.qualiteRequerant.qualite;
  const requerant = {
    [TYPE_REQUERANT]: qualite.nom,
    [MANDATAIRE]: MandataireFormDefaultValues,
    [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
    [PARTICULIER]: ParticulierFormDefaultValues,
    [AUTRE_PROFESSIONNEL]: AutreProfessionnelFormDefaultValues
  };

  switch (qualite) {
    case Qualite.INSTITUTIONNEL:
      requerant[INSTITUTI0NNEL] = mapRequerantInstitutionnel(requete.requerant);
      break;
    case Qualite.MANDATAIRE_HABILITE:
      requerant[MANDATAIRE] = mapRequerantMandataireHabilite(requete.requerant);
      break;
    case Qualite.AUTRE_PROFESSIONNEL:
      requerant[AUTRE_PROFESSIONNEL] = mapRequerantAutreProfessionnel(
        requete.requerant
      );
      break;
    case Qualite.PARTICULIER:
      if (
        Requerant.estTitulaireX({
          requerant: requete.requerant,
          titulaire: TitulaireRequete.getTitulaireByPosition({
            titulaires: requete.titulaires,
            position: 1
          })
        })
      ) {
        requerant[TYPE_REQUERANT] = "TITULAIRE1";
      } else if (
        Requerant.estTitulaireX({
          requerant: requete.requerant,
          titulaire: TitulaireRequete.getTitulaireByPosition({
            titulaires: requete.titulaires,
            position: 2
          })
        })
      ) {
        requerant[TYPE_REQUERANT] = "TITULAIRE2";
      } else {
        requerant[TYPE_REQUERANT] = "PARTICULIER";
        requerant[PARTICULIER] = mapRequerantParticulier(requete.requerant);
      }
      break;
    default:
      requerant[TYPE_REQUERANT] = "TITULAIRE1";
  }
  return requerant;
};

export const saisieAdresse = (requete: IRequeteDelivrance): ISaisieAdresse => {
  return {
    [VOIE]: getValeurOuVide(requete.requerant.adresse?.ligne4),
    [LIEU_DIT]: getValeurOuVide(requete.requerant.adresse?.ligne5),
    [COMPLEMENT_DESTINATAIRE]: getValeurOuVide(
      requete.requerant.adresse?.ligne2
    ),
    [COMPLEMENT_POINT_GEO]: getValeurOuVide(requete.requerant.adresse?.ligne3),
    [CODE_POSTAL]: getValeurOuVide(requete.requerant.adresse?.codePostal),
    [COMMUNE]: getValeurOuVide(requete.requerant.adresse?.ville),
    [PAYS]: getValeurOuVide(requete.requerant.adresse?.pays),
    [ADRESSE_COURRIEL]: getValeurOuVide(requete.requerant.courriel),
    [NUMERO_TELEPHONE]: getValeurOuVide(requete.requerant.telephone)
  };
};

const mapNomPrenomRequerant = (requerant: IRequerant) => {
  return {
    [NOM]: getValeurOuVide(requerant.nomFamille),
    [PRENOM]: getValeurOuVide(requerant.prenom)
  };
};

const mapRequerantInstitutionnel = (
  requerant: IRequerant
): ISaisieInstitutionnel => {
  return {
    ...mapNomPrenomRequerant(requerant),
    [TYPE]: getValeurOuVide(
      TypeInstitutionnel.getKey(requerant.qualiteRequerant.institutionnel?.type)
    ),
    [NATURE]: getValeurOuVide(
      requerant.qualiteRequerant.institutionnel?.nature
    ),
    [NOM_INSTITUTION]: getValeurOuVide(
      requerant.qualiteRequerant.institutionnel?.nomInstitution
    )
  };
};

const mapRequerantMandataireHabilite = (
  requerant: IRequerant
): ISaisieMandataireHabilite => {
  return {
    ...mapNomPrenomRequerant(requerant),
    [TYPE]: getValeurOuVide(
      TypeMandataireReq.getKey(
        requerant.qualiteRequerant.mandataireHabilite?.type
      )
    ),
    [NATURE]: getValeurOuVide(
      requerant.qualiteRequerant.mandataireHabilite?.nature
    ),
    [RAISON_SOCIALE]: getValeurOuVide(
      requerant.qualiteRequerant.mandataireHabilite?.raisonSociale
    )
  };
};

const mapRequerantAutreProfessionnel = (
  requerant: IRequerant
): ISaisieAutreProfessionnel => {
  return {
    ...mapNomPrenomRequerant(requerant),
    [NATURE]: getValeurOuVide(
      requerant.qualiteRequerant.autreProfessionnel?.nature
    ),
    [RAISON_SOCIALE]: getValeurOuVide(
      requerant.qualiteRequerant.autreProfessionnel?.raisonSociale
    )
  };
};

const mapRequerantParticulier = (requerant: IRequerant): ISaisieParticulier => {
  return {
    [NOM_NAISSANCE]: getValeurOuVide(requerant.nomFamille),
    [NOM_USAGE]: getValeurOuVide(
      requerant.qualiteRequerant.particulier?.nomUsage
    ),
    [PRENOM]: getValeurOuVide(requerant.prenom)
  };
};
