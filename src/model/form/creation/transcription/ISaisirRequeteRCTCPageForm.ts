import {
  ADRESSE,
  ADRESSE_COURRIEL,
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
  LIEN_REQUERANT,
  LIEU_ACTE_RECONNAISSANCE,
  LIEU_DE_MARIAGE,
  LIEU_DE_NAISSANCE,
  LIEU_DIT,
  NAISSANCE,
  NATIONALITES,
  NATIONALITE_1,
  NATIONALITE_2,
  NATIONALITE_3,
  NATURE_ACTE,
  NOM,
  NOM_ACTE_ETRANGER,
  NOM_SOUHAITE_ACTE_FR,
  NOM_USAGE,
  NUMERO_TELEPHONE,
  PARENTS,
  PARENTS_MARIES,
  PAYS,
  PAYS_DU_MARIAGE,
  PAYS_NAISSANCE,
  PAYS_RECONNAISSANCE,
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
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ConditionChamp, EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { PieceJointe } from "@util/FileUtils";
import { Option } from "@util/Type";
import SchemaValidation from "../../../../utils/SchemaValidation";

/* v8 ignore start à terminer semaine 10/03/25 */
export interface IDateForm {
  jour: string;
  mois: string;
  annee: string;
}

const DateForm = {
  valeursDefauts: (): IDateForm => ({
    jour: "",
    mois: "",
    annee: ""
  })
};

interface IParentFormV2 {
  identifiant: string;
  nom: string;
  prenoms: { [cle: string]: string };
  sexe: string;
  dateNaissance: IDateForm;
  naissance: {
    typeLieu: string;
    ville: string;
    arrondissement: string;
    departement: string;
    etatProvince: string;
    pays: string;
  };
  nationalites: {
    nationalite1: string;
    nationalite2: string;
    nationalite3: string;
  };
}

const ParentForm = {
  valeursDefauts: (): IParentFormV2 => ({
    identifiant: "",
    nom: "",
    prenoms: {},
    sexe: "",
    dateNaissance: DateForm.valeursDefauts(),
    naissance: {
      typeLieu: "",
      ville: "",
      arrondissement: "",
      departement: "",
      etatProvince: "",
      pays: ""
    },
    nationalites: {
      nationalite1: "",
      nationalite2: "",
      nationalite3: ""
    }
  }),

  valeursVersDto: (valeurs: IParentFormV2, position: 2 | 3) => ({
    typeObjetTitulaire: TypeObjetTitulaire.FAMILLE,
    qualite: QualiteFamille.getKey(QualiteFamille.PARENT),
    position: position,
    nomNaissance: valeurs.nom || undefined,
    prenoms: valeurs.prenoms,
    sexe: valeurs.sexe || undefined,
    jourNaissance: valeurs.dateNaissance.jour || undefined,
    moisNaissance: valeurs.dateNaissance.mois || undefined,
    anneeNaissance: valeurs.dateNaissance.annee || undefined,
    villeNaissance: valeurs.naissance.ville || undefined,
    paysNaissance: valeurs.naissance.pays || undefined,
    regionNaissance: valeurs.naissance.etatProvince || undefined,
    nationalite: "INCONNUE",
    nationalites: Object.values(valeurs.nationalites).reduce((nationalitesParent: { nationalite: string }[], nationalite: string) => {
      if (nationalite) {
        nationalitesParent.push({ nationalite: nationalite });
      }

      return nationalitesParent;
    }, [])
  }),

  schemaValidation: (estParent1: boolean) => {
    const cleParent = `parent${estParent1 ? "1" : "2"}`;

    return SchemaValidation.objet({
      nom: SchemaValidation.texte({ obligatoire: false }),
      prenoms: SchemaValidation.prenoms(`parents.${cleParent}.prenoms`),
      sexe: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          {
            idChampReference: `parents.${cleParent}.nom`,
            operateur: EOperateurCondition.DIFF,
            valeurs: [""]
          },
          {
            idChampReference: `parents.${cleParent}.prenoms.prenom1`,
            operateur: EOperateurCondition.DIFF,
            valeurs: [""]
          }
        ]),
        operateurConditionsOu: true
      }),
      dateNaissance: SchemaValidation.dateIncomplete({ obligatoire: false }),
      naissance: SchemaValidation.objet({
        typeLieu: SchemaValidation.texte({ obligatoire: false }),
        ville: SchemaValidation.texte({ obligatoire: false }),
        arrondissement: SchemaValidation.texte({ obligatoire: false }),
        departement: SchemaValidation.texte({ obligatoire: false }),
        etatProvince: SchemaValidation.texte({ obligatoire: false }),
        pays: SchemaValidation.texte({ obligatoire: false })
      }),
      nationalites: SchemaValidation.objet({
        nationalite1: SchemaValidation.texte({ obligatoire: false }),
        nationalite2: SchemaValidation.texte({ obligatoire: false }),
        nationalite3: SchemaValidation.texte({ obligatoire: false })
      })
    });
  }
};

interface ISaisieRequeteRCTCForm {
  requete: {
    natureActe: string;
    lienRequerant: string;
    registre: string;
  };
  titulaire: {
    identifiant: string;
    nomActeEtranger: string;
    nomSouhaite: string;
    prenoms: { [cle: string]: string };
    sexe: string;
    dateNaissance: IDateForm;
    naissance: {
      ville: string;
      etatProvince: string;
      pays: string;
    };
  };
  parents: {
    parent1: IParentFormV2;
    parent2: IParentFormV2;
    mariage: {
      identifiant: string;
      parentsMaries: string;
      date: IDateForm;
      lieu: string;
      ville: string;
      pays: string;
    };
    reconnaissance: {
      identifiant: string;
      titulaireReconnu: string;
      date: IDateForm;
      lieu: string;
      ville: string;
      region: string;
      departement: string;
      pays: string;
    };
  };
  requerant: {
    nom: string;
    nomUsage: string;
    prenom: string;
    adresse: {
      voie: string;
      lieuDit: string;
      complementDestinataire: string;
      complementPointGeo: string;
      codePostal: string;
      commune: string;
      pays: string;
      adresseCourriel: string;
      numeroTelephone: string;
    };
    autreAdresseCourriel: string;
    autreNumeroTelephone: string;
  };
  pieceJointe: PieceJointe[];
}

const SaisieRequeteRCTCForm = {
  valeurDefaut: (): ISaisieRequeteRCTCForm => ({
    requete: {
      natureActe: "",
      lienRequerant: "",
      registre: ""
    },
    titulaire: {
      identifiant: "",
      nomActeEtranger: "",
      nomSouhaite: "",
      prenoms: {},
      sexe: "",
      dateNaissance: DateForm.valeursDefauts(),
      naissance: {
        ville: "",
        etatProvince: "",
        pays: ""
      }
    },
    parents: {
      parent1: ParentForm.valeursDefauts(),
      parent2: ParentForm.valeursDefauts(),
      mariage: {
        identifiant: "",
        parentsMaries: "",
        date: DateForm.valeursDefauts(),
        lieu: "",
        ville: "",
        pays: ""
      },
      reconnaissance: {
        identifiant: "",
        titulaireReconnu: "",
        date: DateForm.valeursDefauts(),
        lieu: "",
        ville: "",
        region: "",
        departement: "",
        pays: ""
      }
    },
    requerant: {
      nom: "",
      nomUsage: "",
      prenom: "",
      adresse: {
        voie: "",
        lieuDit: "",
        complementDestinataire: "",
        complementPointGeo: "",
        codePostal: "",
        commune: "",
        pays: "",
        adresseCourriel: "",
        numeroTelephone: ""
      },
      autreAdresseCourriel: "",
      autreNumeroTelephone: ""
    },
    pieceJointe: []
  }),

  valeursVersDto: (valeurs: ISaisieRequeteRCTCForm) => {
    const mariageParents = valeurs.parents.mariage.parentsMaries
      ? {
          id: valeurs.parents.mariage.identifiant || undefined,
          type: NatureActe.getKey(NatureActe.MARIAGE),
          jour: valeurs.parents.mariage.date.jour || undefined,
          mois: valeurs.parents.mariage.date.mois || undefined,
          annee: valeurs.parents.mariage.date.annee || undefined,
          ville: valeurs.parents.mariage.ville || undefined,
          pays: valeurs.parents.mariage.pays || undefined
        }
      : undefined;

    return {
      villeRegistre: valeurs.requete.registre,
      canal: TypeCanal.COURRIER.nom,
      type: TypeRequete.CREATION.nom,
      sousType: SousTypeCreation.RCTC.nom,
      provenance: Provenance.COURRIER.nom,
      natureActeTranscrit: valeurs.requete.natureActe || undefined,
      lienRequerant: { typeLienRequerant: valeurs.requete.lienRequerant || undefined },
      titulaires: [
        {
          id: valeurs.titulaire.identifiant,
          typeObjetTitulaire: TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
          position: 1,
          nomNaissance: valeurs.titulaire.nomActeEtranger || "SNP",
          nomSouhaite: valeurs.titulaire.nomSouhaite || undefined,
          prenoms: valeurs.titulaire.prenoms,
          sexe: valeurs.titulaire.sexe || undefined,
          jourNaissance: valeurs.titulaire.dateNaissance.jour || undefined,
          moisNaissance: valeurs.titulaire.dateNaissance.mois || undefined,
          anneeNaissance: valeurs.titulaire.dateNaissance.annee,
          villeNaissance: valeurs.titulaire.naissance.ville || undefined,
          paysNaissance: valeurs.titulaire.naissance.pays || undefined,
          regionNaissance: valeurs.titulaire.naissance.etatProvince || undefined,
          nationalite: "INCONNUE",
          evenementUnions: valeurs.parents.reconnaissance.titulaireReconnu
            ? [
                {
                  id: valeurs.parents.reconnaissance.identifiant || undefined,
                  type: NatureActe.getKey(NatureActe.RECONNAISSANCE),
                  jour: valeurs.parents.reconnaissance.date.jour || undefined,
                  mois: valeurs.parents.reconnaissance.date.mois || undefined,
                  annee: valeurs.parents.reconnaissance.date.annee || undefined,
                  ville: valeurs.parents.reconnaissance.ville || undefined,
                  region: valeurs.parents.reconnaissance.region || valeurs.parents.reconnaissance.departement || undefined,
                  pays: valeurs.parents.reconnaissance.pays
                }
              ]
            : []
        },
        ...(valeurs.parents.parent1.nom || valeurs.parents.parent1.prenoms
          ? [
              {
                ...ParentForm.valeursVersDto(valeurs.parents.parent1, 2),
                evenementUnions: mariageParents ? [mariageParents] : []
              }
            ]
          : []),
        ...(valeurs.parents.parent2.nom || valeurs.parents.parent2.prenoms
          ? [
              {
                ...ParentForm.valeursVersDto(valeurs.parents.parent1, 3),
                evenementUnions: mariageParents ? [mariageParents] : []
              }
            ]
          : [])
      ],
      requerant: {
        nomFamille: valeurs.requerant.nom || undefined,
        detailQualiteParticulier: {
          nomUsage: valeurs.requerant.nomUsage || undefined
        },
        prenom: valeurs.requerant.prenom || undefined,
        adresse: {
          ligne2: valeurs.requerant.adresse.complementDestinataire || undefined,
          ligne3: valeurs.requerant.adresse.complementPointGeo || undefined,
          ligne4: valeurs.requerant.adresse.voie || undefined,
          ligne5: valeurs.requerant.adresse.lieuDit || undefined,
          codePostal: valeurs.requerant.adresse.codePostal || undefined,
          ville: valeurs.requerant.adresse.commune || undefined,
          pays: valeurs.requerant.adresse.pays || undefined
        },
        qualite: Qualite.PARTICULIER.nom,
        courriel: valeurs.requerant.adresse.adresseCourriel || undefined,
        telephone: valeurs.requerant.adresse.numeroTelephone || undefined,
        courrielAutreContact: valeurs.requerant.autreAdresseCourriel || undefined,
        telephoneAutreContact: valeurs.requerant.autreNumeroTelephone || undefined
      }
    };
  },

  schemaValidation: SchemaValidation.objet({
    requete: SchemaValidation.objet({
      natureActe: SchemaValidation.texte({ obligatoire: true }),
      lienRequerant: SchemaValidation.texte({ obligatoire: true }),
      registre: SchemaValidation.texte({ obligatoire: true })
    }),
    titulaire: SchemaValidation.objet({
      nomActeEtranger: SchemaValidation.texte({ obligatoire: true }),
      nomSouhaite: SchemaValidation.texte({ obligatoire: false }),
      prenoms: SchemaValidation.prenoms("titulaire.prenoms"),
      sexe: SchemaValidation.texte({ obligatoire: true }),
      dateNaissance: SchemaValidation.dateIncomplete({ obligatoire: true }),
      naissance: SchemaValidation.objet({
        ville: SchemaValidation.texte({ obligatoire: false }),
        etatProvince: SchemaValidation.texte({ obligatoire: false }),
        pays: SchemaValidation.texte({ obligatoire: false })
      })
    }),
    parents: SchemaValidation.objet({
      parent1: ParentForm.schemaValidation(true),
      parent2: ParentForm.schemaValidation(false),
      mariage: SchemaValidation.objet({
        parentsMaries: SchemaValidation.texte({ obligatoire: true }),
        date: SchemaValidation.dateIncomplete({ obligatoire: false }),
        lieu: SchemaValidation.texte({ obligatoire: false }),
        ville: SchemaValidation.texte({ obligatoire: false }),
        pays: SchemaValidation.texte({ obligatoire: false })
      }),
      reconnaissance: SchemaValidation.objet({
        titulaireReconnu: SchemaValidation.texte({ obligatoire: false }),
        date: SchemaValidation.dateIncomplete({ obligatoire: false }),
        lieu: SchemaValidation.texte({ obligatoire: false }),
        ville: SchemaValidation.texte({ obligatoire: false }),
        region: SchemaValidation.texte({ obligatoire: false }),
        departement: SchemaValidation.texte({ obligatoire: false }),
        pays: SchemaValidation.texte({ obligatoire: false })
      })
    }),
    requerant: SchemaValidation.objet({
      nom: SchemaValidation.texte({ obligatoire: false }),
      nomUsage: SchemaValidation.texte({ obligatoire: false }),
      prenom: SchemaValidation.texte({ obligatoire: false }),
      adresse: SchemaValidation.objet({
        voie: SchemaValidation.texte({ obligatoire: false }),
        lieuDit: SchemaValidation.texte({ obligatoire: false }),
        complementDestinataire: SchemaValidation.texte({ obligatoire: false }),
        complementPointGeo: SchemaValidation.texte({ obligatoire: false }),
        codePostal: SchemaValidation.texte({ obligatoire: false }),
        commune: SchemaValidation.texte({ obligatoire: false }),
        pays: SchemaValidation.texte({ obligatoire: false }),
        adresseCourriel: SchemaValidation.texte({ obligatoire: false }),
        numeroTelephone: SchemaValidation.texte({ obligatoire: false })
      }),
      autreAdresseCourriel: SchemaValidation.texte({ obligatoire: false }),
      autreNumeroTelephone: SchemaValidation.texte({ obligatoire: false })
    })
  })
};
/* v8 ignore end */

export interface IParentForm {
  [IDENTIFIANT]: string;
  [NOM]: string;
  [PRENOMS]: IPrenomsForm;
  [SEXE]: string;
  [DATE_NAISSANCE]: IDateForm;
  [NAISSANCE]: IEvenementNaissanceForm;
  [NATIONALITES]: INationalitesForm;
}

export interface ISaisieRequeteRCTC {
  [REQUETE]: IRequeteForm;
  [TITULAIRE]: IIdentiteTitulaireForm;
  [PARENTS]: {
    parent1: IParentForm;
    parent2: IParentForm;
    mariage: IEvenementMariageParentsForm;
    [RECONNAISSANCE]: IEvenementReconnaissanceTitulaireForm;
  };
  [REQUERANT]: IRequerantForm;
  [PIECES_JOINTES]?: PieceJointe[];
}

export interface IRequeteForm {
  [NATURE_ACTE]: string;
  [LIEN_REQUERANT]: string;
  [REGISTRE]: Option;
}

export interface IIdentiteTitulaireForm {
  [IDENTIFIANT]: string;
  [NOM_ACTE_ETRANGER]: string;
  [NOM_SOUHAITE_ACTE_FR]: string;
  [PRENOMS]: IPrenomsForm;
  [SEXE]: string;
  [DATE_NAISSANCE]: IDateForm;
  [NAISSANCE]: IEvenementNaissanceCommunForm;
}

export type IEvenementNaissanceCommunForm = Omit<IEvenementNaissanceForm, "lieuNaissance" | "departementNaissance">;

export interface INomsForm {
  [NOM_ACTE_ETRANGER]: string;
  [NOM_SOUHAITE_ACTE_FR]: string;
}

export interface IPrenomsForm {
  [key: string]: string;
}

export interface IEvenementNaissanceForm {
  [VILLE_NAISSANCE]: string;
  [REGION_NAISSANCE]: string;
  [PAYS_NAISSANCE]: string;
  [ARRONDISSEMENT_NAISSANCE]: string;
  [LIEU_DE_NAISSANCE]: string;
  [DEPARTEMENT_NAISSANCE]: string;
  ville?: string;
  typeLieu?: string;
  pays?: string;
  arrondissement?: string;
  departement?: string;
  etatProvince?: string;
  adresse?: string;
}

export interface INationalitesForm {
  [NATIONALITE_1]: string;
  [NATIONALITE_2]: string;
  [NATIONALITE_3]: string;
}

export interface IEvenementMariageParentsForm {
  [IDENTIFIANT]: string;
  [PARENTS_MARIES]: string;
  [DATE_MARIAGE]: IDateForm;
  [LIEU_DE_MARIAGE]: string;
  [VILLE_DE_MARIAGE]: string;
  [PAYS_DU_MARIAGE]: string;
}

export interface IEvenementReconnaissanceTitulaireForm {
  [IDENTIFIANT]: string;
  [TITULAIRE_RECONNU]: string;
  [DATE_RECONNAISSANCE]: IDateForm;
  [LIEU_ACTE_RECONNAISSANCE]: string;
  [VILLE_RECONNAISSANCE]: string;
  [REGION_ETAT_RECONNAISSANCE]: string;
  [DEPARTEMENT_RECONNAISSANCE]: string;
  [PAYS_RECONNAISSANCE]: string;
}

export interface IRequerantForm {
  [NOM]: string;
  [NOM_USAGE]: string;
  [PRENOM]: string;
  [AUTRE_ADRESSE_COURRIEL]: string;
  [AUTRE_NUMERO_TELEPHONE]: string;
  [ADRESSE]: IAdresseForm;
}

export interface IAdresseForm {
  [VOIE]: string;
  [LIEU_DIT]: string;
  [COMPLEMENT_DESTINATAIRE]: string;
  [COMPLEMENT_POINT_GEO]: string;
  [CODE_POSTAL]: string;
  [COMMUNE]: string;
  [PAYS]: string;
  [ADRESSE_COURRIEL]: string;
  [NUMERO_TELEPHONE]: string;
}
