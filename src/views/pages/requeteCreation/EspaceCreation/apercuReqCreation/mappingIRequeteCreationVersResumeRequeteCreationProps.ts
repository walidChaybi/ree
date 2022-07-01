import { QualiteFamille } from "../../../../../model/requete/enum/QualiteFamille";
import { TypeObjetTitulaire } from "../../../../../model/requete/enum/TypeObjetTitulaire";
import { IPrenomOrdonnes } from "../../../../../model/requete/IPrenomOrdonnes";
import { IRequeteCreation } from "../../../../../model/requete/IRequeteCreation";
import { ITitulaireRequete } from "../../../../../model/requete/ITitulaireRequete";
import { getDateStringFromDateCompose } from "../../../../common/util/DateUtils";
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

const mappingIRequeteCreationVersResumeRequeteCreationProps = (
  requeteCreation: IRequeteCreation
): ResumeRequeteCreationProps => {
  const requete: ItemRequeteProps = {
    numeros: {
      rece: requeteCreation.numero,
      dila: requeteCreation.provenanceServicePublic?.referenceDila,
      ancienSI: requeteCreation.numeroAncien,
      requeteLiee: requeteCreation.idEntiteRattachement //TODO: -> requete information
    },
    sousType: requeteCreation.sousType.libelle,
    natureDANF: requeteCreation.nature,
    SDANF: {
      statut: requeteCreation.provenanceNatali?.statutNatali,
      mailAgent: requeteCreation.provenanceNatali?.agentSdanf.courriel,
      dateDepot: requeteCreation.provenanceNatali?.dateDepot,
      datePriseEnCharge:
        requeteCreation.provenanceNatali?.dataPriseEnChargeSdanf,
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
    parentsPostulant,
    unions,
    effetsCollectifs,
    enfantsMajeurs,
    frateries
  } = triTitulaires(requeteCreation.titulaires);

  return {
    requete,
    postulant: mappingITitulaireRequeteVersItemTitulaireProps(
      postulant,
      parentsPostulant
    ),
    unions: mappingTableau(mappingITitulaireRequeteVersItemUnionProps, unions),
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
  titulaire?: ITitulaireRequete,
  parents?: ITitulaireRequete[]
): ItemTitulaireProps | undefined => {
  return titulaire
    ? {
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
        nbUnionsAnterieurs: 0, //TODO: recupérer le nombre d'unions antérieurs ? evenementUnion - (celui avec situationactuel = faux)
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
      }
    : undefined;
};

const mappingITitulaireRequeteVersItemParentProps = (
  parent?: ITitulaireRequete
): ItemParentProps | undefined => {
  return parent
    ? {
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
        nationalites: parent.nationalites || []
      }
    : undefined;
};

const mappingITitulaireRequeteVersItemUnionProps = (
  union: ITitulaireRequete
): ItemUnionProps => {
  const A_REMPLACER = "Non Trouvé";

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
    mariage: {
      date: A_REMPLACER,
      ville: A_REMPLACER,
      arrondissement: A_REMPLACER,
      regionDeptEtat: A_REMPLACER,
      pays: A_REMPLACER
    },
    PACS: {
      date: A_REMPLACER,
      ville: A_REMPLACER,
      arrondissement: A_REMPLACER,
      regionDeptEtat: A_REMPLACER,
      pays: A_REMPLACER
    },
    union: {
      date: A_REMPLACER,
      ville: A_REMPLACER,
      arrondissement: A_REMPLACER,
      regionDeptEtat: A_REMPLACER,
      pays: A_REMPLACER
    },
    dissolution: {
      date: A_REMPLACER,
      ville: A_REMPLACER,
      arrondissement: A_REMPLACER,
      regionDeptEtat: A_REMPLACER,
      pays: A_REMPLACER
    },
    deces: {
      date: A_REMPLACER,
      ville: A_REMPLACER,
      arrondissement: A_REMPLACER,
      regionDeptEtat: A_REMPLACER,
      pays: A_REMPLACER
    }
  };
};

const mappingITitulaireRequeteVersItemEffetCollectifProps = (
  effetCollectif: ITitulaireRequete
): ItemEffetCollectifProps => {
  const statut =
    effetCollectif.valideEffetCollectif === "OUI"
      ? "Validé"
      : effetCollectif.demandeEffetCollectif
      ? "Proposé"
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
    residence: effetCollectif.domiciliationEnfant,
    domiciliation: {
      lignes: [
        effetCollectif.domiciliation?.ligne2,
        effetCollectif.domiciliation?.ligne3,
        effetCollectif.domiciliation?.ligne4,
        effetCollectif.domiciliation?.ligne5
      ],
      codePostal: effetCollectif.domiciliation?.codePostal,
      ville: effetCollectif.domiciliation?.ville,
      lieuVilleEtranger: effetCollectif.domiciliation?.villeEtrangere,
      pays: effetCollectif.domiciliation?.pays
    },
    parent: mappingITitulaireRequeteVersItemParentProps(
      effetCollectif.parent2Enfant
    )
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
  const unions = titulaires?.filter(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.FAMILLE &&
      (titulaire.qualite === QualiteFamille.CONJOINT_ACTUEL ||
        titulaire.qualite === QualiteFamille.ANCIEN_CONJOINT)
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
  const postulant = titulaires?.filter(
    titulaire =>
      titulaire.typeObjetTitulaire === TypeObjetTitulaire.POSTULANT_NATIONALITE
  )[0];

  return {
    postulant,
    parentsPostulant,
    unions,
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

// Map chaque enfants de "tab" avec "mapper", ou retourne "[]" si "tab" est vide
const mappingTableau = <IObject, ObjectType>(
  mapper: (child: IObject) => ObjectType,
  tab?: IObject[]
) => (tab ? tab.map(child => mapper(child)) : []);

export default mappingIRequeteCreationVersResumeRequeteCreationProps;
