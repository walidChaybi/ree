import {
  ADRESSE_COURRIEL,
  ANNEE,
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
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import { IParent } from "@model/requete/IParents";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { getValeurOuVide } from "@util/Utils";
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
    for (let i = 0; i < prenomsOrdonne.length; i++) {
      const prenom = prenomsOrdonne[i].prenom;
      const numeroOrdre = prenomsOrdonne[i].numeroOrdre;
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

export const saisieTitulaire = (titulaire?: ITitulaireRequete) => {
  return titulaire
    ? {
        [NOMS]: {
          [NOM_NAISSANCE]: getValeurOuVide(titulaire.nomNaissance),
          [NOM_USAGE]: getValeurOuVide(titulaire.nomUsage)
        },
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(titulaire.prenoms),
        [SEXE]: Sexe.getKey(getValeurOuVide(titulaire.sexe)),
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

const saisieFiliation = (parent?: IParent) => {
  return parent
    ? {
        [NOM_NAISSANCE]: getValeurOuVide(parent.nomNaissance),
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(parent.prenoms)
      }
    : ParentFormDefaultValues;
};

export const saisieRequerant = (requete: IRequeteDelivrance) => {
  switch (requete.requerant.qualiteRequerant.qualite) {
    case Qualite.INSTITUTIONNEL:
      return {
        [TYPE_REQUERANT]: "INSTITUTIONNEL",
        [MANDATAIRE]: MandataireFormDefaultValues,
        [INSTITUTI0NNEL]: {
          [TYPE]: getValeurOuVide(
            TypeInstitutionnel.getKey(
              requete.requerant.qualiteRequerant.institutionnel?.type
            )
          ),
          [NATURE]: getValeurOuVide(
            requete.requerant.qualiteRequerant.institutionnel?.nature
          ),
          [NOM_INSTITUTION]: getValeurOuVide(
            requete.requerant.qualiteRequerant.institutionnel?.nomInstitution
          ),
          [NOM]: getValeurOuVide(requete.requerant.nomFamille),
          [PRENOM]: getValeurOuVide(requete.requerant.prenom)
        },
        [PARTICULIER]: ParticulierFormDefaultValues
      };
    case Qualite.MANDATAIRE_HABILITE:
      return {
        [TYPE_REQUERANT]: "MANDATAIRE",
        [MANDATAIRE]: {
          [TYPE]: getValeurOuVide(
            TypeMandataireReq.getKey(
              requete.requerant.qualiteRequerant.mandataireHabilite?.type
            )
          ),
          [NATURE]: getValeurOuVide(
            requete.requerant.qualiteRequerant.mandataireHabilite?.nature
          ),
          [RAISON_SOCIALE]: getValeurOuVide(
            requete.requerant.qualiteRequerant.mandataireHabilite?.raisonSociale
          ),
          [NOM]: getValeurOuVide(requete.requerant.nomFamille),
          [PRENOM]: getValeurOuVide(requete.requerant.prenom)
        },
        [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
        [PARTICULIER]: ParticulierFormDefaultValues
      };
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
        return {
          [TYPE_REQUERANT]: "TITULAIRE1",
          [MANDATAIRE]: MandataireFormDefaultValues,
          [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
          [PARTICULIER]: ParticulierFormDefaultValues
        };
      } else if (
        Requerant.estTitulaireX({
          requerant: requete.requerant,
          titulaire: TitulaireRequete.getTitulaireByPosition({
            titulaires: requete.titulaires,
            position: 2
          })
        })
      ) {
        return {
          [TYPE_REQUERANT]: "TITULAIRE2",
          [MANDATAIRE]: MandataireFormDefaultValues,
          [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
          [PARTICULIER]: ParticulierFormDefaultValues
        };
      } else {
        return {
          [TYPE_REQUERANT]: "PARTICULIER",
          [MANDATAIRE]: MandataireFormDefaultValues,
          [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
          [PARTICULIER]: {
            [NOM_NAISSANCE]: getValeurOuVide(requete.requerant.nomFamille),
            [NOM_USAGE]: getValeurOuVide(
              requete.requerant.qualiteRequerant.particulier?.nomUsage
            ),
            [PRENOM]: getValeurOuVide(requete.requerant.prenom)
          }
        };
      }
    default:
      return {
        [TYPE_REQUERANT]: "TITULAIRE1",
        [MANDATAIRE]: MandataireFormDefaultValues,
        [INSTITUTI0NNEL]: InstitutionnelFormDefaultValues,
        [PARTICULIER]: ParticulierFormDefaultValues
      };
  }
};

export const saisieAdresse = (requete: IRequeteDelivrance) => {
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
