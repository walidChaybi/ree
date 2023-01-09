import { Sexe } from "@model/etatcivil/enum/Sexe";
import { ITitulaireRequeteCreation } from "@model/requete/enum/ITitulaireRequeteCreation";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { Residence } from "@model/requete/enum/Residence";
import { SituationFamiliale } from "@model/requete/enum/SituationFamiliale";
import { TypeEvenementUnion } from "@model/requete/enum/TypeEvenementUnion";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { IEvenementUnion } from "@model/requete/IEvenementUnion";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import {
  getDateStringFromDateCompose,
  getFormatDateFromTimestamp
} from "@util/DateUtils";
import { ItemEffetCollectifProps } from "./components/Item/ItemEffetCollectif";
import {
  ItemEnfantMajeurProps,
  ItemEnfantMajeurProps as ItemFraterieProps
} from "./components/Item/ItemEnfantMajeur";
import { ItemParentProps } from "./components/Item/ItemParent";
import { ItemRequeteProps } from "./components/Item/ItemRequete";
import { ItemTitulaireProps } from "./components/Item/ItemTitulaire/ItemTitulaire";
import { ItemUnionProps } from "./components/Item/ItemUnion";
import { ResumeRequeteCreationProps } from "./components/ResumeRequeteCreation";
import { DateCoordonneesType } from "./components/Types";

const mappingIRequeteCreationVersResumeRequeteCreationProps = (
  requeteCreation: IRequeteCreation
): ResumeRequeteCreationProps => {
  const requete: ItemRequeteProps = {
    numeros: {
      rece: requeteCreation.numero,
      sdanf: requeteCreation.provenanceNatali?.numeroDossierNational,
      dila: requeteCreation.provenanceServicePublic?.referenceDila,
      ancienSI: requeteCreation.numeroAncien,
      requeteLiee: undefined // Selon Alice, ne concerne que les requêtes information
    },
    sousType: requeteCreation.sousType.libelle,
    natureDANF: requeteCreation.nature,
    tagPriorisation: requeteCreation.provenanceNatali?.tagPriorisation,
    SDANF: {
      statut: requeteCreation.provenanceNatali?.statutNatali,
      mailAgent: requeteCreation.provenanceNatali?.agentSdanf?.courriel,
      dateDepot: requeteCreation.provenanceNatali?.dateDepot
        ? getFormatDateFromTimestamp(
            requeteCreation.provenanceNatali?.dateDepot
          )
        : undefined,
      datePriseEnCharge: requeteCreation.provenanceNatali
        ?.datePriseEnChargeSdanf
        ? getFormatDateFromTimestamp(
            requeteCreation.provenanceNatali?.datePriseEnChargeSdanf
          )
        : undefined,
      decision: requeteCreation.provenanceNatali?.decisionSdanf
    },
    demandes: {
      francisation: requeteCreation.demandeFrancisation,
      identification: requeteCreation.demandeIdentification
    },
    dossierSignaleInfos: requeteCreation.dossierSignale
      ? requeteCreation.commentaire
      : undefined,
    campagneInfos: requeteCreation.campagne,
    nomInstitution:
      requeteCreation.requerant.qualiteRequerant.institutionnel?.nomInstitution
  };

  const {
    titulaire,
    parentsTitulaire = [],
    union,
    unionsAnterieurs,
    effetsCollectifs,
    enfantsMajeurs,
    frateries
  } = triTitulaires(requeteCreation.titulaires);

  const nbUnionsAnterieurs = unionsAnterieurs?.length;

  return {
    requete,
    titulaire:
      titulaire &&
      mappingITitulaireRequeteCreationVersItemTitulaireProps(
        titulaire,
        parentsTitulaire,
        nbUnionsAnterieurs
      ),
    union: union && mappingITitulaireRequeteCreationVersItemUnionProps(union),
    unionsAnterieurs: mappingTableau(
      mappingITitulaireRequeteCreationVersItemUnionProps,
      unionsAnterieurs
    ),
    effetsCollectifs: mappingTableau(
      mappingITitulaireRequeteCreationVersItemEffetCollectifProps,
      effetsCollectifs
    ),
    enfantsMajeurs: mappingTableau(
      mappingITitulaireRequeteCreationVersItemEnfantMajeurProps,
      enfantsMajeurs
    ),
    frateries: mappingTableau(
      mappingITitulaireRequeteCreationVersItemFraterieProps,
      frateries
    )
  };
};

const mappingITitulaireRequeteCreationVersItemTitulaireProps = (
  titulaire: ITitulaireRequeteCreation,
  parents: ITitulaireRequeteCreation[],
  nbUnionsAnterieurs = 0
): ItemTitulaireProps => {
  return {
    identite: {
      noms: {
        naissance: titulaire.nomNaissance,
        actuel: titulaire.nomActuel,
        francisation: titulaire.nomDemandeFrancisation,
        identification: titulaire.nomDemandeIdentification,
        usage: titulaire.nomUsage
      },
      prenoms: {
        naissance: formatagePrenoms(titulaire.prenoms),
        francisation: formatagePrenoms(titulaire.prenomsDemande)
      },
      genre: Sexe.getEnumFor(titulaire.sexe)
    },
    naissance: {
      date: mappingDateNaissance(titulaire),
      ville: titulaire.villeNaissance || titulaire.villeEtrangereNaissance,
      arrondissement: titulaire.arrondissementNaissance,
      region: titulaire.regionNaissance,
      pays: titulaire.paysNaissance,
      annee: titulaire.anneeNaissance,
      mois: titulaire.moisNaissance,
      jour: titulaire.jourNaissance,
      codePostal: titulaire.codePostalNaissance
    },
    nbUnionsAnterieurs,
    situationFamiliale: SituationFamiliale.getEnumFor(
      titulaire.situationFamiliale
    ),
    nbMineurs: titulaire.nombreEnfantMineur,
    nationalites: titulaire.nationalites || [],
    domiciliation: {
      lignes: [
        titulaire.domiciliation?.ligne2,
        titulaire.domiciliation?.ligne3,
        titulaire.domiciliation?.ligne4,
        titulaire.domiciliation?.ligne5
      ],
      codePostal: titulaire.domiciliation?.codePostal,
      ville: titulaire.domiciliation?.ville,
      lieuVilleEtranger: titulaire.domiciliation?.villeEtrangere,
      arrondissement: titulaire.domiciliation?.arrondissement,
      regionDeptEtat: titulaire.domiciliation?.region,
      pays: titulaire.domiciliation?.pays
    },
    contacts: {
      mail: titulaire.courriel,
      telephone: titulaire.telephone
    },
    retenueSdanf: titulaire.retenueSdanf ?? undefined,
    parents: mappingTableau(
      mappingITitulaireRequeteCreationVersItemParentProps,
      parents
    ).sort((a, b) => a.position - b.position)
  };
};

const mappingITitulaireRequeteCreationVersItemParentProps = (
  parent: ITitulaireRequeteCreation
): ItemParentProps => {
  return {
    numeros: {
      requeteLiee: parent.numeroDossierNational
    },
    identite: {
      noms: {
        naissance: parent.nomNaissance
      },
      prenoms: {
        naissance: formatagePrenoms(parent.prenoms)
      },
      genre: Sexe.getEnumFor(parent.sexe)
    },
    naissance: {
      date: mappingDateNaissance(parent),
      ville: parent.villeNaissance || parent.villeEtrangereNaissance,
      arrondissement: parent.arrondissementNaissance,
      region: parent.regionNaissance,
      pays: parent.paysNaissance,
      annee: parent.anneeNaissance,
      mois: parent.moisNaissance,
      jour: parent.jourNaissance,
      codePostal: parent.codePostalNaissance
    },
    position: parent.position,
    nationalites: parent.nationalites || [],
    domiciliation: {
      lignes: [
        parent.domiciliation?.ligne2,
        parent.domiciliation?.ligne3,
        parent.domiciliation?.ligne4,
        parent.domiciliation?.ligne5
      ],
      codePostal: parent.domiciliation?.codePostal,
      ville: parent.domiciliation?.ville,
      lieuVilleEtranger: parent.domiciliation?.villeEtrangere,
      arrondissement: parent.domiciliation?.arrondissement,
      regionDeptEtat: parent.domiciliation?.region,
      pays: parent.domiciliation?.pays
    },
    retenueSdanf: parent.retenueSdanf ?? undefined
  };
};

const mappingITitulaireRequeteCreationVersItemUnionProps = (
  union: ITitulaireRequeteCreation
): ItemUnionProps => {
  return {
    numeros: {
      requeteLiee: union.numeroDossierNational
    },
    identite: {
      noms: {
        naissance: union.nomNaissance
      },
      prenoms: {
        naissance: formatagePrenoms(union.prenoms)
      },
      genre: Sexe.getEnumFor(union.sexe)
    },
    naissance: {
      date: mappingDateNaissance(union),
      ville: union.villeNaissance || union.villeEtrangereNaissance,
      arrondissement: union.arrondissementNaissance,
      region: union.regionNaissance,
      pays: union.paysNaissance,
      annee: union.anneeNaissance,
      mois: union.moisNaissance,
      jour: union.jourNaissance,
      codePostal: union.codePostalNaissance
    },
    nationalites: union.nationalites || [],
    retenueSdanf: union.retenueSdanf ?? undefined,
    mariage: mappingEvenementUnion(
      union.evenementUnions,
      TypeEvenementUnion.MARIAGE
    ),
    PACS: mappingEvenementUnion(union.evenementUnions, TypeEvenementUnion.PACS),
    union: mappingEvenementUnion(
      union.evenementUnions,
      TypeEvenementUnion.UNION
    ),
    dissolution: mappingEvenementUnion(
      union.evenementUnions,
      TypeEvenementUnion.DISSOLUTION_DIVORCE
    ),
    deces: mappingEvenementUnionDeces(union.deces)
  };
};

const mappingEvenementUnionDeces = (dateDeces: any): DateCoordonneesType => {
  return {
    date: getDateStringFromDateCompose(
      dateDeces?.annee
        ? {
            jour: dateDeces.jour?.toString(),
            mois: dateDeces.mois?.toString(),
            annee: dateDeces.annee?.toString()
          }
        : undefined
    ),
    ville: dateDeces?.ville,
    arrondissement: dateDeces?.arrondissement,
    region: dateDeces?.region,
    pays: dateDeces?.pays
  };
};

const mappingITitulaireRequeteCreationVersItemEffetCollectifProps = (
  effetCollectif: ITitulaireRequeteCreation
): ItemEffetCollectifProps => {
  // TODO: cette version de la condition sera correcte lorsque demandeEffetCollectif sera utilisé (voir avec Alice)
  // const statut =
  //   effetCollectif.valideEffetCollectif === "OUI"
  //     ? "Validé"
  //     : effetCollectif.demandeEffetCollectif
  //     ? "Proposé"
  //     : undefined;
  const statut =
    effetCollectif.valideEffetCollectif === "OUI"
      ? "Validé"
      : effetCollectif.valideEffetCollectif === "NON"
      ? "Non validé"
      : undefined;

  return {
    numeros: {
      requeteLiee: effetCollectif.numeroDossierNational
    },
    identite: {
      noms: {
        naissance: effetCollectif.nomNaissance,
        actuel: effetCollectif.nomActuel,
        francisation: effetCollectif.nomDemandeFrancisation,
        usage: effetCollectif.nomUsage
      },
      prenoms: {
        naissance: formatagePrenoms(effetCollectif.prenoms),
        francisation: formatagePrenoms(effetCollectif.prenomsDemande)
      },
      genre: Sexe.getEnumFor(effetCollectif.sexe)
    },
    naissance: {
      date: mappingDateNaissance(effetCollectif),
      ville:
        effetCollectif.villeNaissance || effetCollectif.villeEtrangereNaissance,
      arrondissement: effetCollectif.arrondissementNaissance,
      region: effetCollectif.regionNaissance,
      pays: effetCollectif.paysNaissance,
      annee: effetCollectif.anneeNaissance,
      mois: effetCollectif.moisNaissance,
      jour: effetCollectif.jourNaissance,
      codePostal: effetCollectif.codePostalNaissance
    },
    nationalites: effetCollectif.nationalites || [],
    statut,
    residence: Residence.getEnumFor(effetCollectif.residence),
    domiciliation: effetCollectif.domiciliationEnfant,
    retenueSdanf: effetCollectif.retenueSdanf ?? undefined,
    parent:
      effetCollectif.parent2Enfant &&
      mappingITitulaireRequeteCreationVersItemParentProps(
        effetCollectif.parent2Enfant
      )
  };
};

const mappingITitulaireRequeteCreationVersItemEnfantMajeurProps = (
  enfantMajeur: ITitulaireRequeteCreation
): ItemEnfantMajeurProps => {
  return {
    identite: {
      noms: {
        naissance: enfantMajeur.nomNaissance
      },
      prenoms: {
        naissance: formatagePrenoms(enfantMajeur.prenoms)
      },
      genre: Sexe.getEnumFor(enfantMajeur.sexe)
    },
    naissance: {
      date: mappingDateNaissance(enfantMajeur),
      ville:
        enfantMajeur.villeNaissance || enfantMajeur.villeEtrangereNaissance,
      arrondissement: enfantMajeur.arrondissementNaissance,
      region: enfantMajeur.regionNaissance,
      pays: enfantMajeur.paysNaissance,
      annee: enfantMajeur.anneeNaissance,
      mois: enfantMajeur.moisNaissance,
      jour: enfantMajeur.jourNaissance,
      codePostal: enfantMajeur.codePostalNaissance
    },
    retenueSdanf: enfantMajeur.retenueSdanf ?? undefined,
    nationalites: enfantMajeur.nationalites || []
  };
};

const mappingITitulaireRequeteCreationVersItemFraterieProps = (
  fraterie: ITitulaireRequeteCreation
): ItemFraterieProps => {
  return {
    identite: {
      noms: {
        naissance: fraterie.nomNaissance
      },
      prenoms: {
        naissance: formatagePrenoms(fraterie.prenoms)
      },
      genre: Sexe.getEnumFor(fraterie.sexe)
    },
    naissance: {
      date: mappingDateNaissance(fraterie),
      ville: fraterie.villeNaissance || fraterie.villeEtrangereNaissance,
      arrondissement: fraterie.arrondissementNaissance,
      region: fraterie.regionNaissance,
      pays: fraterie.paysNaissance,
      annee: fraterie.anneeNaissance,
      mois: fraterie.moisNaissance,
      jour: fraterie.jourNaissance,
      codePostal: fraterie.codePostalNaissance
    },
    nationalites: fraterie.nationalites || [],
    retenueSdanf: fraterie.retenueSdanf ?? undefined
  };
};

const triTitulaires = (titulaires?: ITitulaireRequeteCreation[]) => {
  const parentsTitulaire = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.PARENT
  );
  const union = titulaires?.find(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.CONJOINT_ACTUEL
  );
  const unionsAnterieurs = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.ANCIEN_CONJOINT
  );
  const effetsCollectifs = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.ENFANT_MINEUR
  );
  const enfantsMajeurs = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.ENFANT_MAJEUR
  );
  const frateries = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.FRATRIE
  );
  const titulaire = titulaires?.find(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire ===
      TypeObjetTitulaire.POSTULANT_NATIONALITE
  );

  return {
    titulaire,
    parentsTitulaire,
    union,
    unionsAnterieurs,
    effetsCollectifs,
    enfantsMajeurs,
    frateries
  };
};

const triPrenoms = (prenoms: IPrenomOrdonnes[]): string[] =>
  [...prenoms]
    .sort((a, b) => a.numeroOrdre - b.numeroOrdre)
    .map(prenom => prenom.prenom);

export const formatagePrenoms = (prenoms?: IPrenomOrdonnes[]) =>
  prenoms ? triPrenoms(prenoms) : [];

export const mappingDateNaissance = ({
  jourNaissance,
  moisNaissance,
  anneeNaissance
}: ITitulaireRequeteCreation) =>
  getDateStringFromDateCompose(
    anneeNaissance
      ? {
          jour: jourNaissance?.toString(),
          mois: moisNaissance?.toString(),
          annee: anneeNaissance?.toString()
        }
      : undefined
  );

const mappingEvenementUnion = (
  evenementUnions: IEvenementUnion[] | undefined,
  type: TypeEvenementUnion
): DateCoordonneesType => {
  const evenementUnion = evenementUnions?.find(evt => evt.type === type);

  return {
    date: getDateStringFromDateCompose(
      evenementUnion?.annee
        ? {
            jour: evenementUnion.jour?.toString(),
            mois: evenementUnion.mois?.toString(),
            annee: evenementUnion.annee?.toString()
          }
        : undefined
    ),
    ville: evenementUnion?.ville,
    arrondissement: evenementUnion?.arrondissement,
    region: evenementUnion?.region,
    pays: evenementUnion?.pays
  };
};

// Map chaque enfants de "tab" avec "mapper", ou retourne "[]" si "tab" est vide
const mappingTableau = <IObject, ObjectType>(
  mapper: (child: IObject) => ObjectType,
  tab?: IObject[]
) => (tab ? tab.map(child => mapper(child)) : []);

export default mappingIRequeteCreationVersResumeRequeteCreationProps;
