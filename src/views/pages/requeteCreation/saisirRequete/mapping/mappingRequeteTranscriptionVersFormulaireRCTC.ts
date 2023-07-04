import {
  ADRESSE,
  ADRESSE_COURRIEL,
  ANNEE,
  ARRONDISSEMENT_NAISSANCE,
  AUTRE_ADRESSE_COURRIEL,
  AUTRE_NUMERO_TELEPHONE,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_POINT_GEO,
  DATE_MARIAGE,
  DATE_NAISSANCE,
  DATE_RECONNAISSANCE,
  DEPARTEMENT_NAISSANCE,
  DEPARTEMENT_RECONNAISSANCE,
  IDENTIFIANT,
  JOUR,
  LIEN_REQUERANT,
  LIEU_ACTE_RECONNAISSANCE,
  LIEU_DE_MARIAGE,
  LIEU_DE_NAISSANCE,
  LIEU_DIT,
  MARIAGE,
  MOIS,
  NAISSANCE,
  NATIONALITES,
  NATIONALITE_1,
  NATIONALITE_2,
  NATIONALITE_3,
  NATURE_ACTE,
  NOM,
  NOMS,
  NOM_ACTE_ETRANGER,
  NOM_SOUHAITE_ACTE_FR,
  NOM_USAGE,
  NUMERO_TELEPHONE,
  PARENT1,
  PARENT2,
  PARENTS,
  PARENTS_MARIES,
  PAS_DE_NOM_ACTE_ETRANGER,
  PAS_DE_NOM_CONNU,
  PAS_DE_PRENOM_CONNU,
  PAYS,
  PAYS_DU_MARIAGE,
  PAYS_NAISSANCE,
  PAYS_ORIGINE,
  PAYS_RECONNAISSANCE,
  PAYS_STATUT_REFUGIE,
  PIECES_JOINTES,
  PRENOM,
  PRENOMS,
  RECONNAISSANCE,
  REGION_ETAT_RECONNAISSANCE,
  REGION_NAISSANCE,
  REGISTRE,
  REQUERANT,
  REQUETE,
  SEXE,
  TITULAIRE,
  TITULAIRE_RECONNU,
  VILLE_DE_MARIAGE,
  VILLE_NAISSANCE,
  VILLE_RECONNAISSANCE,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import {
  IAdresseForm,
  IDateForm,
  IEvenementMariageParentsForm,
  IEvenementNaissanceCommunForm,
  IEvenementReconnaissanceTitulaireForm,
  IIdentiteTitulaireForm,
  INationalitesForm,
  IParentForm,
  IRequerantForm,
  IRequeteForm,
  ISaisieRequeteRCTC
} from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IEvenementUnion } from "@model/requete/IEvenementUnion";
import { INationalite } from "@model/requete/INationalite";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { getPrenomsOrdonneVersPrenomsDefaultValues } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import {
  DEUX,
  SNP,
  SPC,
  UN,
  ZERO,
  estRenseigne,
  getValeurOuVide
} from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { AdresseFormDefaultValues } from "@widget/formulaire/adresse/AdresseForm";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { NationalitesFormDefaultValues } from "@widget/formulaire/nationalites/NationalitesForm";
import { IdentiteFormDefaultValues } from "../sousForm/identite/IdentiteTitulaireForm";
import { ParentFormDefaultValues } from "../sousForm/parent/ParentsForm";
import { RequerantFormDefaultValue } from "../sousForm/requerant/RequerantForm";

export function mappingRequeteTranscriptionVersForumlaireRCTC(
  requete?: IRequeteCreation
): ISaisieRequeteRCTC {
  let saisie = {};
  if (requete) {
    const { titulaires, requerant, piecesJustificatives } = requete;

    const titulaireActeTranscritDresse =
      getTitulaireActeTranscitDresseEtDePositionUn(titulaires);
    const parents = TitulaireRequeteCreation.getParentsTries(titulaires);

    saisie = {
      [REQUETE]: saisieRequete(requete),
      [TITULAIRE]: saisieTitulaire(titulaireActeTranscritDresse),
      [PARENTS]: {
        [PARENT1]: saisieParent(parents?.[0]),
        [PARENT2]: parents?.[1] ? saisieParent(parents?.[1]) : undefined,
        [MARIAGE]: saisieEvenementMariage(
          TitulaireRequeteCreation.getEvenementUnionTypeMariage(parents?.[0])
        ),
        [RECONNAISSANCE]: saisieEvenementReconnaissance(
          TitulaireRequeteCreation.getEvenementUnionTypeReconnaissance(
            titulaireActeTranscritDresse
          )
        )
      },
      [REQUERANT]: saisieRequerant(requerant),
      [PIECES_JOINTES]: saisiePJ(piecesJustificatives)
    };
  }
  return saisie as ISaisieRequeteRCTC;
}

export function saisieRequete(requete: IRequeteCreation): IRequeteForm {
  return {
    [NATURE_ACTE]: getValeurOuVide(
      NatureActeTranscription.getKey(requete.natureActeTranscrit)
    ),
    [LIEN_REQUERANT]: getValeurOuVide(requete.lienRequerant.typeLienRequerant),
    [REGISTRE]: { cle: requete.villeRegistre, libelle: requete.villeRegistre }
  };
}

export function saisieRequerant(requerant?: IRequerant): IRequerantForm {
  return requerant
    ? {
        [ADRESSE]: saisieAdresse(requerant),
        [NOM]: getValeurOuVide(requerant.nomFamille),
        [NOM_USAGE]: getValeurOuVide(requerant.nomUsage),
        [PRENOM]: getValeurOuVide(requerant.prenom),
        [AUTRE_ADRESSE_COURRIEL]: getValeurOuVide(
          requerant.courrielAutreContact
        ),
        [AUTRE_NUMERO_TELEPHONE]: getValeurOuVide(
          requerant.telephoneAutreContact
        )
      }
    : RequerantFormDefaultValue;
}

export function saisieAdresse(requerant?: IRequerant): IAdresseForm {
  return requerant
    ? {
        [VOIE]: getValeurOuVide(requerant.adresse?.ligne4),
        [LIEU_DIT]: getValeurOuVide(requerant.adresse?.ligne5),
        [COMPLEMENT_DESTINATAIRE]: getValeurOuVide(requerant.adresse?.ligne2),
        [COMPLEMENT_POINT_GEO]: getValeurOuVide(requerant.adresse?.ligne3),
        [CODE_POSTAL]: getValeurOuVide(requerant.adresse?.codePostal),
        [COMMUNE]: getValeurOuVide(requerant.adresse?.ville),
        [PAYS]: getValeurOuVide(requerant.adresse?.pays),
        [ADRESSE_COURRIEL]: getValeurOuVide(requerant.courriel),
        [NUMERO_TELEPHONE]: getValeurOuVide(requerant.telephone)
      }
    : AdresseFormDefaultValues;
}

export function saisieTitulaire(
  titulaire?: ITitulaireRequeteCreation
): IIdentiteTitulaireForm {
  return titulaire
    ? ({
        [IDENTIFIANT]: getValeurOuVide(titulaire.id),
        [NOMS]: {
          [PAS_DE_NOM_ACTE_ETRANGER]: pasDeNomOuFalse(
            titulaire.nomNaissance,
            "pasDeNomActeEtranger"
          ),
          [NOM_ACTE_ETRANGER]: getValeurOuVide(titulaire.nomNaissance),
          [NOM_SOUHAITE_ACTE_FR]: getValeurOuVide(titulaire.nomSouhaite)
        },
        [SEXE]: getValeurOuVide(titulaire.sexe),
        [PAS_DE_PRENOM_CONNU]: pasDePrenomOuFalse(
          titulaire.prenoms?.[0].prenom
        ),
        // TODO Prenoms a rajouter quand la MR 855 sera sur develop
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(titulaire.prenoms),
        [DATE_NAISSANCE]: getDateNaissance(titulaire),
        [NAISSANCE]: getInformationsLieuNaissance(titulaire)
      } as IIdentiteTitulaireForm)
    : IdentiteFormDefaultValues;
}

export function saisieEvenementMariage(
  evenementMariage?: IEvenementUnion
): IEvenementMariageParentsForm {
  return {
    [IDENTIFIANT]: getValeurOuVide(evenementMariage?.id),
    [PARENTS_MARIES]: estCheckboxCochee(evenementMariage?.annee),
    [DATE_MARIAGE]: getDateEvenement(evenementMariage),
    [LIEU_DE_MARIAGE]: getLieuEvenement(evenementMariage?.pays),
    [VILLE_DE_MARIAGE]: getValeurOuVide(evenementMariage?.ville),
    [PAYS_DU_MARIAGE]: getValeurOuVide(evenementMariage?.pays)
  };
}

export function saisieEvenementReconnaissance(
  evenementReconnaissance?: IEvenementUnion
): IEvenementReconnaissanceTitulaireForm {
  return {
    [IDENTIFIANT]: getValeurOuVide(evenementReconnaissance?.id),
    [TITULAIRE_RECONNU]: estCheckboxCochee(evenementReconnaissance?.annee),
    [DATE_RECONNAISSANCE]: getDateEvenement(evenementReconnaissance),
    [LIEU_ACTE_RECONNAISSANCE]: getLieuEvenement(evenementReconnaissance?.pays),
    [VILLE_RECONNAISSANCE]: getValeurOuVide(evenementReconnaissance?.ville),
    [REGION_ETAT_RECONNAISSANCE]: getValeurOuVide(
      evenementReconnaissance?.region
    ),
    [DEPARTEMENT_RECONNAISSANCE]: getValeurOuVide(
      evenementReconnaissance?.region
    ),
    [PAYS_RECONNAISSANCE]: getValeurOuVide(evenementReconnaissance?.pays)
  };
}

export function estCheckboxCochee(valeur?: number): string {
  return valeur ? "OUI" : "NON";
}

export function getDateEvenement(evenement?: IEvenementUnion): IDateForm {
  return evenement
    ? {
        [JOUR]: getValeurOuVide(evenement.jour),
        [MOIS]: getValeurOuVide(evenement.mois),
        [ANNEE]: getValeurOuVide(evenement.annee)
      }
    : DateDefaultValues;
}

export function getDateNaissance(
  titulaire?: ITitulaireRequeteCreation
): IDateForm {
  return titulaire
    ? {
        [JOUR]: getValeurOuVide(titulaire.jourNaissance),
        [MOIS]: getValeurOuVide(titulaire.moisNaissance),
        [ANNEE]: getValeurOuVide(titulaire.anneeNaissance)
      }
    : DateDefaultValues;
}

export function saisieParent(parent?: ITitulaireRequeteCreation): IParentForm {
  return parent
    ? ({
        [IDENTIFIANT]: parent.id,
        [PAS_DE_NOM_CONNU]: pasDeNomOuFalse(
          parent.nomNaissance,
          "pasDeNomConnu"
        ),
        [NOM]: parent.nomNaissance,
        [PAS_DE_PRENOM_CONNU]: pasDePrenomOuFalse(parent.prenoms?.[0].prenom),
        [PRENOMS]: getPrenomsOrdonneVersPrenomsDefaultValues(parent.prenoms),
        [SEXE]: getValeurOuVide(parent.sexe),
        [DATE_NAISSANCE]: getDateNaissance(parent),
        [NAISSANCE]: {
          [LIEU_DE_NAISSANCE]: getLieuEvenement(parent.paysNaissance),
          [DEPARTEMENT_NAISSANCE]: getValeurOuVide(parent.regionNaissance),
          ...getInformationsLieuNaissance(parent)
        },
        [PAYS_STATUT_REFUGIE]: getValeurOuVide(parent.paysStatutRefugie),
        [PAYS_ORIGINE]: getValeurOuVide(parent.paysOrigine),
        [NATIONALITES]: getNationalites(parent.nationalites)
      } as IParentForm)
    : ParentFormDefaultValues;
}

export function getTitulaireActeTranscitDresseEtDePositionUn(
  titulairesReq?: ITitulaireRequeteCreation[]
): ITitulaireRequeteCreation | undefined {
  const titulairesActeTranscritDresse =
    TitulaireRequeteCreation.getTitulairesTries(titulairesReq);
  return TitulaireRequeteCreation.getTitulaireByPosition({
    titulaires: titulairesActeTranscritDresse,
    position: 1
  });
}

export function getLieuEvenement(pays?: string): string {
  if (LieuxUtils.estPaysFrance(pays)) {
    return "FRANCE";
  } else if (estRenseigne(pays) && !LieuxUtils.estPaysFrance(pays)) {
    return "ETRANGER";
  } else {
    return "INCONNU";
  }
}

export function getInformationsLieuNaissance(
  titulaire: ITitulaireRequeteCreation
): IEvenementNaissanceCommunForm {
  return {
    [VILLE_NAISSANCE]: getValeurOuVide(titulaire.villeNaissance),
    [ARRONDISSEMENT_NAISSANCE]: getValeurOuVide(
      titulaire.arrondissementNaissance
    ),
    [REGION_NAISSANCE]: getValeurOuVide(titulaire.regionNaissance),
    [PAYS_NAISSANCE]: getValeurOuVide(titulaire.paysNaissance)
  };
}

export function pasDeNomOuFalse(
  nomNaissance: string,
  nomCheckbox: string
): string | string[] {
  return nomNaissance === SNP ? [nomCheckbox] : "false";
}

export function pasDePrenomOuFalse(prenom1?: string): string | string[] {
  if (prenom1) {
    return prenom1 === SPC ? ["pasDePrenomConnu"] : "false";
  } else {
    return ["pasDePrenomConnu"];
  }
}

export function getNationalites(
  nationalites?: INationalite[]
): INationalitesForm {
  return nationalites?.length
    ? {
        [NATIONALITE_1]: getValeurOuVide(nationalites?.[ZERO])?.nationalite,
        [NATIONALITE_2]: getValeurOuVide(nationalites?.[UN])?.nationalite,
        [NATIONALITE_3]: getValeurOuVide(nationalites?.[DEUX])?.nationalite
      }
    : NationalitesFormDefaultValues;
}

export function saisiePJ(piecesJustificatives?: IPieceJustificativeCreation[]) {
  return piecesJustificatives?.map(PJ => {
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
        value: TypePieceJustificative.getKeyForLibelle(
          PJ.typePieceJustificative.libelle
        ),
        str: PJ.typePieceJustificative.libelle
      }
    };
  });
}
