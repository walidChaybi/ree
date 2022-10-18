import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { Residence } from "@model/requete/enum/Residence";
import { SituationFamiliale } from "@model/requete/enum/SituationFamiliale";
import { TypeEvenementUnion } from "@model/requete/enum/TypeEvenementUnion";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { IEvenementUnion } from "@model/requete/IEvenementUnion";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
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
      mappingITitulaireRequeteVersItemTitulaireProps(
        titulaire,
        parentsTitulaire,
        nbUnionsAnterieurs
      ),
    union: union && mappingITitulaireRequeteVersItemUnionProps(union),
    unionsAnterieurs: mappingTableau(
      mappingITitulaireRequeteVersItemUnionProps,
      unionsAnterieurs
    ),
    effetsCollectifs: mappingTableau(
      mappingITitulaireRequeteVersItemEffetCollectifProps,
      effetsCollectifs
    ),
    enfantsMajeurs: mappingTableau(
      mappingITitulaireRequeteVersItemEnfantMajeurProps,
      enfantsMajeurs
    ),
    frateries: mappingTableau(
      mappingITitulaireRequeteVersItemFraterieProps,
      frateries
    )
  };
};

const mappingITitulaireRequeteVersItemTitulaireProps = (
  titulaire: ITitulaireRequete,
  parents: ITitulaireRequete[],
  nbUnionsAnterieurs = 0
): ItemTitulaireProps => {
  return {
    identite: {
      noms: {
        naissance: titulaire.nomNaissance,
        actuel: titulaire.nomActuel,
        francisation: titulaire.nomDemandeFrancisation,
        identification: titulaire.nomDemandeIdentification
      },
      prenoms: {
        naissance: formatagePrenoms(titulaire.prenoms),
        francisation: formatagePrenoms(titulaire.prenomsDemande)
      },
      genre: titulaire.sexe
    },
    naissance: {
      date: mappingDateNaissance(titulaire),
      villeNaissance:
        titulaire.villeNaissance || titulaire.villeEtrangereNaissance,
      arrondissementNaissance: titulaire.arrondissementNaissance,
      regionNaissance: titulaire.regionNaissance,
      paysNaissance: titulaire.paysNaissance,
      anneeNaissance: titulaire.anneeNaissance,
      moisNaissance: titulaire.moisNaissance,
      jourNaissance: titulaire.jourNaissance,
      codePostalNaissance: titulaire.codePostalNaissance
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
      mappingITitulaireRequeteVersItemParentProps,
      parents
    ).sort((a, b) => a.position - b.position)
  };
};

const mappingITitulaireRequeteVersItemParentProps = (
  parent: ITitulaireRequete
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
      genre: parent.sexe
    },
    naissance: {
      date: mappingDateNaissance(parent),
      villeNaissance: parent.villeNaissance || parent.villeEtrangereNaissance,
      arrondissementNaissance: parent.arrondissementNaissance,
      regionNaissance: parent.regionNaissance,
      paysNaissance: parent.paysNaissance,
      anneeNaissance: parent.anneeNaissance,
      moisNaissance: parent.moisNaissance,
      jourNaissance: parent.jourNaissance,
      codePostalNaissance: parent.codePostalNaissance
    },
    position: parent.position,
    nationalites: parent.nationalites || [],
    domiciliation: parent.domiciliationEnfant,
    retenueSdanf: parent.retenueSdanf ?? undefined
  };
};

const mappingITitulaireRequeteVersItemUnionProps = (
  union: ITitulaireRequete
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
      genre: union.sexe
    },
    naissance: {
      date: mappingDateNaissance(union),
      villeNaissance: union.villeNaissance || union.villeEtrangereNaissance,
      arrondissementNaissance: union.arrondissementNaissance,
      regionNaissance: union.regionNaissance,
      paysNaissance: union.paysNaissance,
      anneeNaissance: union.anneeNaissance,
      moisNaissance: union.moisNaissance,
      jourNaissance: union.jourNaissance,
      codePostalNaissance: union.codePostalNaissance
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
    deces: mappingEvenementUnion(
      union.evenementUnions,
      TypeEvenementUnion.DECES
    )
  };
};

const mappingITitulaireRequeteVersItemEffetCollectifProps = (
  effetCollectif: ITitulaireRequete
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
        francisation: effetCollectif.nomDemandeFrancisation
      },
      prenoms: {
        naissance: formatagePrenoms(effetCollectif.prenoms),
        francisation: formatagePrenoms(effetCollectif.prenomsDemande)
      },
      genre: effetCollectif.sexe
    },
    naissance: {
      date: mappingDateNaissance(effetCollectif),
      villeNaissance:
        effetCollectif.villeNaissance || effetCollectif.villeEtrangereNaissance,
      arrondissementNaissance: effetCollectif.arrondissementNaissance,
      regionNaissance: effetCollectif.regionNaissance,
      paysNaissance: effetCollectif.paysNaissance,
      anneeNaissance: effetCollectif.anneeNaissance,
      moisNaissance: effetCollectif.moisNaissance,
      jourNaissance: effetCollectif.jourNaissance,
      codePostalNaissance: effetCollectif.codePostalNaissance
    },
    nationalites: effetCollectif.nationalites || [],
    statut,
    residence: Residence.getEnumFor(effetCollectif.residence),
    domiciliation: effetCollectif.domiciliationEnfant,
    retenueSdanf: effetCollectif.retenueSdanf ?? undefined,
    parent:
      effetCollectif.parent2Enfant &&
      mappingITitulaireRequeteVersItemParentProps(effetCollectif.parent2Enfant)
  };
};

const mappingITitulaireRequeteVersItemEnfantMajeurProps = (
  enfantMajeur: ITitulaireRequete
): ItemEnfantMajeurProps => {
  return {
    identite: {
      noms: {
        naissance: enfantMajeur.nomNaissance
      },
      prenoms: {
        naissance: formatagePrenoms(enfantMajeur.prenoms)
      },
      genre: enfantMajeur.sexe
    },
    naissance: {
      date: mappingDateNaissance(enfantMajeur),
      villeNaissance:
        enfantMajeur.villeNaissance || enfantMajeur.villeEtrangereNaissance,
      arrondissementNaissance: enfantMajeur.arrondissementNaissance,
      regionNaissance: enfantMajeur.regionNaissance,
      paysNaissance: enfantMajeur.paysNaissance,
      anneeNaissance: enfantMajeur.anneeNaissance,
      moisNaissance: enfantMajeur.moisNaissance,
      jourNaissance: enfantMajeur.jourNaissance,
      codePostalNaissance: enfantMajeur.codePostalNaissance
    },
    retenueSdanf: enfantMajeur.retenueSdanf ?? undefined,
    nationalites: enfantMajeur.nationalites || []
  };
};

const mappingITitulaireRequeteVersItemFraterieProps = (
  fraterie: ITitulaireRequete
): ItemFraterieProps => {
  return {
    identite: {
      noms: {
        naissance: fraterie.nomNaissance
      },
      prenoms: {
        naissance: formatagePrenoms(fraterie.prenoms)
      },
      genre: fraterie.sexe
    },
    naissance: {
      date: mappingDateNaissance(fraterie),
      villeNaissance:
        fraterie.villeNaissance || fraterie.villeEtrangereNaissance,
      arrondissementNaissance: fraterie.arrondissementNaissance,
      regionNaissance: fraterie.regionNaissance,
      paysNaissance: fraterie.paysNaissance,
      anneeNaissance: fraterie.anneeNaissance,
      moisNaissance: fraterie.moisNaissance,
      jourNaissance: fraterie.jourNaissance,
      codePostalNaissance: fraterie.codePostalNaissance
    },
    nationalites: fraterie.nationalites || [],
    retenueSdanf: fraterie.retenueSdanf ?? undefined
  };
};

const triTitulaires = (titulaires?: ITitulaireRequete[]) => {
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
}: ITitulaireRequete) =>
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
    villeNaissance: evenementUnion?.ville,
    arrondissementNaissance: evenementUnion?.arrondissement,
    regionNaissance: evenementUnion?.region,
    paysNaissance: evenementUnion?.pays
  };
};

// Map chaque enfants de "tab" avec "mapper", ou retourne "[]" si "tab" est vide
const mappingTableau = <IObject, ObjectType>(
  mapper: (child: IObject) => ObjectType,
  tab?: IObject[]
) => (tab ? tab.map(child => mapper(child)) : []);

export default mappingIRequeteCreationVersResumeRequeteCreationProps;
