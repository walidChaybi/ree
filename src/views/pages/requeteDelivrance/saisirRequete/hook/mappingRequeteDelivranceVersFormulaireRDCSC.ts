import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import { getValeurOuVide } from "@util/Utils";
import { FileExtension, MimeType } from "file-type";
import {
  ADRESSE,
  DOCUMENT,
  PIECES_JOINTES,
  REQUERANT,
  SaisieRequeteRDCSC,
  TITULAIRES
} from "../modelForm/ISaisirRDCSCPageModel";
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
  PARTICULIER,
  PAYS,
  PAYS_EVENEMENT,
  PRENOM,
  PRENOMS,
  PRENOM_1,
  PRENOM_2,
  PRENOM_3,
  RAISON_SOCIALE,
  SEXE,
  TYPE,
  TYPE_REQUERANT,
  VILLE_EVENEMENT,
  VOIE
} from "../modelForm/ISaisirRequetePageModel";
import {
  institutionnelVide,
  interesseVide,
  mandataireVide,
  particulierVide
} from "../SaisirRequeteUtils";

export function mappingRequeteDelivranceVersFormulaireRDCSC(
  requete: IRequeteDelivrance
): SaisieRequeteRDCSC {
  const { titulaires, documentDemande, piecesJustificatives } = requete;

  const saisie = {
    [DOCUMENT]: DocumentDelivrance.getUuidFromDocument(documentDemande),
    [TITULAIRES]: {
      titulaire1: saisieTitulaire(
        TitulaireRequete.getTitulaireByPosition({ titulaires, position: 1 })
      ),
      titulaire2: saisieTitulaire(
        TitulaireRequete.getTitulaireByPosition({ titulaires, position: 2 })
      )
    },
    [REQUERANT]: saisieRequerant(requete),
    [ADRESSE]: saisieAdresse(requete)
  } as SaisieRequeteRDCSC;

  if (piecesJustificatives.length !== 0) {
    saisie[PIECES_JOINTES] = saisiePJ(requete);
  }

  return saisie;
}

const saisieTitulaire = (titulaire: ITitulaireRequete | undefined) => {
  return titulaire
    ? {
        [NOMS]: {
          [NOM_NAISSANCE]: getValeurOuVide(titulaire.nomNaissance),
          [NOM_USAGE]: getValeurOuVide(titulaire.nomUsage)
        },
        [PRENOMS]: {
          [PRENOM_1]: TitulaireRequete.getPrenom1(titulaire),
          [PRENOM_2]: TitulaireRequete.getPrenom2(titulaire),
          [PRENOM_3]: TitulaireRequete.getPrenom3(titulaire)
        },
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
        [NATIONALITE]: getValeurOuVide(titulaire.nationalite.nom)
      }
    : interesseVide;
};

const saisieRequerant = (requete: IRequeteDelivrance) => {
  switch (requete.requerant.qualiteRequerant.qualite) {
    case Qualite.INSTITUTIONNEL:
      return {
        [TYPE_REQUERANT]: "INSTITUTIONNEL",
        [MANDATAIRE]: mandataireVide,
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
        [PARTICULIER]: particulierVide
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
        [INSTITUTI0NNEL]: institutionnelVide,
        [PARTICULIER]: particulierVide
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
          [MANDATAIRE]: mandataireVide,
          [INSTITUTI0NNEL]: institutionnelVide,
          [PARTICULIER]: particulierVide
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
          [MANDATAIRE]: mandataireVide,
          [INSTITUTI0NNEL]: institutionnelVide,
          [PARTICULIER]: particulierVide
        };
      } else {
        return {
          [TYPE_REQUERANT]: "PARTICULIER",
          [MANDATAIRE]: mandataireVide,
          [INSTITUTI0NNEL]: institutionnelVide,
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
        [MANDATAIRE]: mandataireVide,
        [INSTITUTI0NNEL]: institutionnelVide,
        [PARTICULIER]: particulierVide
      };
  }
};

const saisieAdresse = (requete: IRequeteDelivrance) => {
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

const saisiePJ = (requete: IRequeteDelivrance) => {
  return requete.piecesJustificatives.map(PJ => {
    return {
      base64File: {
        fileName: PJ.nom || "",
        base64String: PJ.contenu,
        taille: PJ.taille,
        conteneurSwift: PJ.conteneurSwift,
        identifiantSwift: PJ.referenceSwift,
        mimeType: PJ.mimeType as MimeType,
        extension: PJ.extension as FileExtension
      },
      type: {
        value: TypePieceJustificative.getKeyForLibelle(
          PJ.typePieceJustificative.libelle
        ),
        str: PJ.typePieceJustificative.libelle
      }
    };
  });
};
