import { Sexe } from "@model/etatcivil/enum/Sexe";
import { DateCoordonneesType } from "@model/requete/DateCoordonneesType";
import { IEvenementUnion } from "@model/requete/IEvenementUnion";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { Residence } from "@model/requete/enum/Residence";
import { SituationFamiliale } from "@model/requete/enum/SituationFamiliale";
import { TypeEvenementUnion } from "@model/requete/enum/TypeEvenementUnion";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import DateUtils from "@util/DateUtils";
import { triPrenoms } from "@util/Utils";
import { ResumeRequeteCreationEtablissementProps } from "./ResumeRequeteCreationEtablissement";
import { ItemEnfantMajeurProps } from "./items/ItemEnfantMajeur";
import { ItemEnfantMineurProps } from "./items/ItemEnfantMineur";
import { ItemFraterieProps } from "./items/ItemFraterie";
import { ItemParentProps } from "./items/ItemParent";
import { ItemRequeteProps } from "./items/ItemRequete";
import { ItemTitulaireProps } from "./items/ItemTitulaire";
import { ItemUnionProps } from "./items/ItemUnion";

const mappingIRequeteCreationVersResumeRequeteCreationProps = (
  requeteCreation?: IRequeteCreation
): ResumeRequeteCreationEtablissementProps => {
  const requete: ItemRequeteProps = {
    numeros: {
      rece: requeteCreation?.numero,
      sdanf: requeteCreation?.provenanceNatali?.numeroDossierNational,
      dila: requeteCreation?.provenanceServicePublic?.referenceDila,
      ancienSI: requeteCreation?.numeroAncien,
      requeteLiee: undefined // Selon Alice, ne concerne que les requêtes information
    },
    sousType: requeteCreation?.sousType.libelle,
    natureDANF: requeteCreation?.nature,
    tagPriorisation: requeteCreation?.provenanceNatali?.tagPriorisation,
    SDANF: {
      statut: requeteCreation?.provenanceNatali?.statutNatali,
      mailAgent: requeteCreation?.provenanceNatali?.agentSdanf?.courriel,
      dateDepot: requeteCreation?.provenanceNatali?.dateDepot
        ? DateUtils.getFormatDateFromTimestamp(requeteCreation?.provenanceNatali?.dateDepot)
        : undefined,
      datePriseEnCharge: requeteCreation?.provenanceNatali?.datePriseEnChargeSdanf
        ? DateUtils.getFormatDateFromTimestamp(requeteCreation?.provenanceNatali?.datePriseEnChargeSdanf)
        : undefined,
      decision: requeteCreation?.provenanceNatali?.decisionSdanf
    },
    demandes: {
      francisation: requeteCreation?.demandeFrancisation,
      identification: requeteCreation?.demandeIdentification
    },
    dossierSignaleInfos: requeteCreation?.dossierSignale ? requeteCreation?.commentaire : undefined,
    campagneInfos: requeteCreation?.campagne,
    nomInstitution: requeteCreation?.requerant.qualiteRequerant.institutionnel?.nomInstitution,
    actions: requeteCreation?.actions || []
  };
  const {
    titulaire,
    parentsTitulaire = [],
    union,
    unionsAnterieurs,
    effetsCollectifs,
    enfantsMineursHorsEffetCollectif,
    enfantsMineursAttenteSDANF,
    enfantsMajeurs,
    frateries
  } = triTitulaires(requeteCreation?.titulaires);

  const nbUnionsAnterieurs = unionsAnterieurs?.length;

  return {
    requete,
    titulaire: titulaire && mappingITitulaireRequeteCreationVersItemTitulaireProps(titulaire, parentsTitulaire, nbUnionsAnterieurs),
    union: union && mappingITitulaireRequeteCreationVersItemUnionProps(union),
    unionsAnterieurs: mappingTableau(mappingITitulaireRequeteCreationVersItemUnionProps, unionsAnterieurs),
    effetsCollectifs: mappingTableau(mappingITitulaireRequeteCreationVersItemEnfantMineurProps, effetsCollectifs),
    enfantsMineursHorsEffetCollectif: mappingTableau(
      mappingITitulaireRequeteCreationVersItemEnfantMineurProps,
      enfantsMineursHorsEffetCollectif
    ),
    enfantsMineursAttenteSDANF: mappingTableau(mappingITitulaireRequeteCreationVersItemEnfantMineurProps, enfantsMineursAttenteSDANF),
    enfantsMajeurs: mappingTableau(mappingITitulaireRequeteCreationVersItemEnfantMajeurProps, enfantsMajeurs),
    frateries: mappingTableau(mappingITitulaireRequeteCreationVersItemFraterieProps, frateries)
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
    situationFamiliale: SituationFamiliale.getEnumFor(titulaire.situationFamiliale),
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
    parents: mappingTableau(mappingITitulaireRequeteCreationVersItemParentProps, parents).sort((a, b) => a.position - b.position)
  };
};

const mappingITitulaireRequeteCreationVersItemParentProps = (parent: ITitulaireRequeteCreation): ItemParentProps => {
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
      lignes: [parent.domiciliation?.ligne2, parent.domiciliation?.ligne3, parent.domiciliation?.ligne4, parent.domiciliation?.ligne5],
      codePostal: parent.domiciliation?.codePostal,
      ville: parent.domiciliation?.ville,
      lieuVilleEtranger: parent.domiciliation?.villeEtrangere,
      arrondissement: parent.domiciliation?.arrondissement,
      regionDeptEtat: parent.domiciliation?.region,
      pays: parent.domiciliation?.pays
    },
    domiciliationParent2: parent.domiciliationEnfant,
    retenueSdanf: parent.retenueSdanf ?? undefined
  };
};

const mappingITitulaireRequeteCreationVersItemUnionProps = (union: ITitulaireRequeteCreation): ItemUnionProps => {
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
    mariage: mappingEvenementUnion(union.evenementUnions, TypeEvenementUnion.MARIAGE),
    PACS: mappingEvenementUnion(union.evenementUnions, TypeEvenementUnion.PACS),
    union: mappingEvenementUnion(union.evenementUnions, TypeEvenementUnion.UNION),
    dissolution: mappingEvenementUnion(union.evenementUnions, TypeEvenementUnion.DISSOLUTION_DIVORCE),
    deces: mappingEvenementUnionDeces(union.deces)
  };
};

const mappingEvenementUnionDeces = (dateDeces: any): DateCoordonneesType => {
  return {
    date: DateUtils.getDateStringFromDateCompose(
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

const mappingITitulaireRequeteCreationVersItemEnfantMineurProps = (enfantMineur: ITitulaireRequeteCreation): ItemEnfantMineurProps => {
  // TODO: cette version de la condition sera correcte lorsque demandeEffetCollectif sera utilisé (voir avec Alice)
  // const statut =
  //   effetCollectif.valideEffetCollectif === "OUI"
  //     ? "Validé"
  //     : effetCollectif.demandeEffetCollectif
  //     ? "Proposé"
  //     : undefined;
  const statut =
    enfantMineur.valideEffetCollectif === "OUI" ? "Validé" : enfantMineur.valideEffetCollectif === "NON" ? "Non validé" : "Non renseigné";

  return {
    numeros: {
      requeteLiee: enfantMineur.numeroDossierNational
    },
    identite: {
      noms: {
        naissance: enfantMineur.nomNaissance,
        actuel: enfantMineur.nomActuel,
        francisation: enfantMineur.nomDemandeFrancisation,
        usage: enfantMineur.nomUsage
      },
      prenoms: {
        naissance: formatagePrenoms(enfantMineur.prenoms),
        francisation: formatagePrenoms(enfantMineur.prenomsDemande)
      },
      genre: Sexe.getEnumFor(enfantMineur.sexe)
    },
    naissance: {
      date: mappingDateNaissance(enfantMineur),
      ville: enfantMineur.villeNaissance || enfantMineur.villeEtrangereNaissance,
      arrondissement: enfantMineur.arrondissementNaissance,
      region: enfantMineur.regionNaissance,
      pays: enfantMineur.paysNaissance,
      annee: enfantMineur.anneeNaissance,
      mois: enfantMineur.moisNaissance,
      jour: enfantMineur.jourNaissance,
      codePostal: enfantMineur.codePostalNaissance
    },
    nationalites: enfantMineur.nationalites || [],
    statut,
    residence: Residence.getEnumFor(enfantMineur.residence),
    domiciliation: enfantMineur.domiciliationEnfant,
    retenueSdanf: enfantMineur.retenueSdanf ?? undefined,
    parent: enfantMineur.parent2Enfant && mappingITitulaireRequeteCreationVersItemParentProps(enfantMineur.parent2Enfant)
  };
};

const mappingITitulaireRequeteCreationVersItemEnfantMajeurProps = (enfantMajeur: ITitulaireRequeteCreation): ItemEnfantMajeurProps => {
  return {
    numeros: {
      requeteLiee: enfantMajeur.numeroDossierNational
    },
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
      ville: enfantMajeur.villeNaissance || enfantMajeur.villeEtrangereNaissance,
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

const mappingITitulaireRequeteCreationVersItemFraterieProps = (fraterie: ITitulaireRequeteCreation): ItemFraterieProps => {
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
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE && titulaireRequete.qualite === QualiteFamille.PARENT
  );
  const union = titulaires?.find(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE && titulaireRequete.qualite === QualiteFamille.CONJOINT_ACTUEL
  );
  const unionsAnterieurs = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE && titulaireRequete.qualite === QualiteFamille.ANCIEN_CONJOINT
  );
  const effetsCollectifs = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.ENFANT_MINEUR &&
      titulaireRequete.valideEffetCollectif === "OUI"
  );
  const enfantsMineursHorsEffetCollectif = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.ENFANT_MINEUR &&
      titulaireRequete.valideEffetCollectif === "NON"
  );
  const enfantsMineursAttenteSDANF = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaireRequete.qualite === QualiteFamille.ENFANT_MINEUR &&
      (!titulaireRequete.valideEffetCollectif || titulaireRequete.valideEffetCollectif === "NON_RENSEIGNE")
  );
  const enfantsMajeurs = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE && titulaireRequete.qualite === QualiteFamille.ENFANT_MAJEUR
  );
  const frateries = titulaires?.filter(
    titulaireRequete =>
      titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE && titulaireRequete.qualite === QualiteFamille.FRATRIE
  );
  const titulaire = titulaires?.find(titulaireRequete => titulaireRequete.typeObjetTitulaire === TypeObjetTitulaire.POSTULANT_NATIONALITE);

  return {
    titulaire,
    parentsTitulaire,
    union,
    unionsAnterieurs,
    effetsCollectifs,
    enfantsMineursHorsEffetCollectif,
    enfantsMineursAttenteSDANF,
    enfantsMajeurs,
    frateries
  };
};

export const formatagePrenoms = (prenoms?: IPrenomOrdonnes[]) => (prenoms ? triPrenoms(prenoms) : []);

const mappingDateNaissance = ({ jourNaissance, moisNaissance, anneeNaissance }: ITitulaireRequeteCreation) =>
  DateUtils.getDateStringFromDateCompose(
    anneeNaissance
      ? {
          jour: jourNaissance?.toString(),
          mois: moisNaissance?.toString(),
          annee: anneeNaissance?.toString()
        }
      : undefined
  );

const mappingEvenementUnion = (evenementUnions: IEvenementUnion[] | undefined, type: TypeEvenementUnion): DateCoordonneesType => {
  const evenementUnion = evenementUnions?.find(evt => evt.type === type);

  return {
    date: DateUtils.getDateStringFromDateCompose(
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
const mappingTableau = <IObject, ObjectType>(mapper: (child: IObject) => ObjectType, tab?: IObject[]) =>
  tab ? tab.map(child => mapper(child)) : [];

export default mappingIRequeteCreationVersResumeRequeteCreationProps;
