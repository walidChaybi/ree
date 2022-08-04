import { QualiteFamille } from "../../../../../model/requete/enum/QualiteFamille";
import { TypeEvenementUnion } from "../../../../../model/requete/enum/TypeEvenementUnion";
import { TypeObjetTitulaire } from "../../../../../model/requete/enum/TypeObjetTitulaire";
import { IEvenementUnion } from "../../../../../model/requete/IEvenementUnion";
import { IPrenomOrdonnes } from "../../../../../model/requete/IPrenomOrdonnes";
import { IRequeteCreation } from "../../../../../model/requete/IRequeteCreation";
import { ITitulaireRequete } from "../../../../../model/requete/ITitulaireRequete";
import {
  getDateStringFromDateCompose,
  getFormatDateFromTimestamp
} from "../../../../common/util/DateUtils";
import { ItemEffetCollectifProps } from "./components/Item/ItemEffetCollectif";
import {
  ItemEnfantMajeurProps,
  ItemEnfantMajeurProps as ItemFraterieProps
} from "./components/Item/ItemEnfantMajeur";
import { ItemParentProps } from "./components/Item/ItemParent";
import { ItemRequeteProps } from "./components/Item/ItemRequete";
import { ItemTitulaireProps } from "./components/Item/ItemTitulaire";
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
    postulant,
    parentsPostulant = [],
    union,
    unionsAnterieurs,
    effetsCollectifs,
    enfantsMajeurs,
    frateries
  } = triTitulaires(requeteCreation.titulaires);

  const nbUnionsAnterieurs = unionsAnterieurs?.length;

  return {
    requete,
    postulant:
      postulant &&
      mappingITitulaireRequeteVersItemTitulaireProps(
        postulant,
        parentsPostulant,
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
        naissance: mappingPrenoms(titulaire.prenoms),
        francisation: mappingPrenoms(titulaire.prenomsDemande)
      },
      genre: titulaire.sexe
    },
    naissance: {
      date: mappingDateNaissance(titulaire),
      ville: titulaire.villeNaissance || titulaire.villeEtrangereNaissance,
      arrondissement: titulaire.arrondissementNaissance,
      regionDeptEtat: titulaire.regionNaissance,
      pays: titulaire.paysNaissance
    },
    nbUnionsAnterieurs,
    situationFamiliale: titulaire.situationFamiliale,
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
    parents: mappingTableau(
      mappingITitulaireRequeteVersItemParentProps,
      parents
    )
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
        naissance: mappingPrenoms(parent.prenoms)
      },
      genre: parent.sexe
    },
    naissance: {
      date: mappingDateNaissance(parent),
      ville: parent.villeNaissance || parent.villeEtrangereNaissance,
      arrondissement: parent.arrondissementNaissance,
      regionDeptEtat: parent.regionNaissance,
      pays: parent.paysNaissance
    },
    nationalites: parent.nationalites || [],
    domiciliation: parent.domiciliationEnfant
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
        naissance: mappingPrenoms(union.prenoms)
      },
      genre: union.sexe
    },
    naissance: {
      date: mappingDateNaissance(union),
      ville: union.villeNaissance || union.villeEtrangereNaissance,
      arrondissement: union.arrondissementNaissance,
      regionDeptEtat: union.regionNaissance,
      pays: union.paysNaissance
    },
    nationalites: union.nationalites || [],
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
        naissance: mappingPrenoms(effetCollectif.prenoms),
        francisation: mappingPrenoms(effetCollectif.prenomsDemande)
      },
      genre: effetCollectif.sexe
    },
    naissance: {
      date: mappingDateNaissance(effetCollectif),
      ville:
        effetCollectif.villeNaissance || effetCollectif.villeEtrangereNaissance,
      arrondissement: effetCollectif.arrondissementNaissance,
      regionDeptEtat: effetCollectif.regionNaissance,
      pays: effetCollectif.paysNaissance
    },
    nationalites: effetCollectif.nationalites || [],
    statut,
    residence: effetCollectif.residence,
    domiciliation: effetCollectif.domiciliationEnfant,
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
        naissance: mappingPrenoms(enfantMajeur.prenoms)
      },
      genre: enfantMajeur.sexe
    },
    naissance: {
      date: mappingDateNaissance(enfantMajeur),
      ville:
        enfantMajeur.villeNaissance || enfantMajeur.villeEtrangereNaissance,
      arrondissement: enfantMajeur.arrondissementNaissance,
      regionDeptEtat: enfantMajeur.regionNaissance,
      pays: enfantMajeur.paysNaissance
    },
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
        naissance: mappingPrenoms(fraterie.prenoms)
      },
      genre: fraterie.sexe
    },
    naissance: {
      date: mappingDateNaissance(fraterie),
      ville: fraterie.villeNaissance || fraterie.villeEtrangereNaissance,
      arrondissement: fraterie.arrondissementNaissance,
      regionDeptEtat: fraterie.regionNaissance,
      pays: fraterie.paysNaissance
    },
    nationalites: fraterie.nationalites || []
  };
};

const triTitulaires = (titulaires?: ITitulaireRequete[]) => {
  const parentsPostulant = titulaires?.filter(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaire.qualite === QualiteFamille.PARENT
  );
  const union = titulaires?.find(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaire.qualite === QualiteFamille.CONJOINT_ACTUEL
  );
  const unionsAnterieurs = titulaires?.filter(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaire.qualite === QualiteFamille.ANCIEN_CONJOINT
  );
  const effetsCollectifs = titulaires?.filter(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaire.qualite === QualiteFamille.ENFANT_MINEUR
  );
  const enfantsMajeurs = titulaires?.filter(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaire.qualite === QualiteFamille.ENFANT_MAJEUR
  );
  const frateries = titulaires?.filter(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      titulaire.qualite === QualiteFamille.FRATRIE
  );
  const postulant = titulaires?.find(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.POSTULANT_NATIONALITE
  );

  return {
    postulant,
    parentsPostulant,
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

const mappingPrenoms = (prenoms?: IPrenomOrdonnes[]) =>
  prenoms ? triPrenoms(prenoms) : [];

const mappingDateNaissance = ({
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
    ville: evenementUnion?.ville,
    arrondissement: evenementUnion?.arrondissement,
    regionDeptEtat: evenementUnion?.region,
    pays: evenementUnion?.pays
  };
};

// Map chaque enfants de "tab" avec "mapper", ou retourne "[]" si "tab" est vide
const mappingTableau = <IObject, ObjectType>(
  mapper: (child: IObject) => ObjectType,
  tab?: IObject[]
) => (tab ? tab.map(child => mapper(child)) : []);

export default mappingIRequeteCreationVersResumeRequeteCreationProps;
