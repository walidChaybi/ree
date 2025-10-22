/* v8 ignore start A TESTER 03/25 */
import { nettoyerAttributsDto } from "@model/commun/dtoUtils";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ConditionChamp, EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { DateHeureFormUtils, IDateHeureForm } from "@model/form/commun/DateForm";
import { INationalitesForm, NationalitesForm } from "@model/form/commun/NationalitesForm";
import { ObjetFormulaire } from "@model/form/commun/ObjetFormulaire";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import ETypeLienRequerantCreation from "@model/requete/enum/ETypeLienRequerantCreation";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import {
  CaracteresAlphanumeriques,
  CaracteresAutorises,
  CaracteresAutorisesRecherchePays,
  NumeroTelephone
} from "../../../../ressources/Regex";
import { TAvecValeursOptionnelles } from "../../../../types/typeUtils";
import { PieceJointe } from "../../../../utils/FileUtils";
import SchemaValidation from "../../../../utils/SchemaValidation";

export interface IParentFormRCTC {
  identifiant: string;
  nom: string;
  prenoms: TPrenomsForm;
  sexe: string;
  dateNaissance: IDateHeureForm;
  naissance: {
    typeLieu: string;
    ville: string;
    arrondissement: string;
    departement: string;
    etatProvince: string;
    pays: string;
  };
  nationalites: INationalitesForm;
}

const ParentRCTCForm = {
  valeursInitiales: (parent: ITitulaireRequeteCreation | null): IParentFormRCTC => {
    const donneesLieuNaissance = (parent: ITitulaireRequeteCreation | null) => {
      if (!parent?.paysNaissance) {
        return {
          typeLieu: "Inconnu",
          etatProvince: "",
          departement: "",
          estFrance: false
        };
      }

      const estFrance = parent.paysNaissance === "France";
      const regionDepartement = parent.regionNaissance ?? "";

      return {
        typeLieu: estFrance ? "FRANCE" : "ETRANGER",
        etatProvince: estFrance ? "" : regionDepartement,
        departement: estFrance ? regionDepartement : "",
        estFrance
      };
    };

    return {
      identifiant: parent?.id ?? "",
      nom: parent?.nomNaissance ?? "",
      prenoms: PrenomsForm.valeursInitiales(parent?.prenoms),
      sexe: parent?.sexe ?? "",
      dateNaissance: DateHeureFormUtils.valeursDefauts(
        parent
          ? {
              jour: `${parent.jourNaissance ?? ""}`,
              mois: `${parent.moisNaissance ?? ""}`,
              annee: `${parent.anneeNaissance ?? ""}`
            }
          : null
      ),
      naissance: {
        ville: parent?.villeNaissance ?? "",
        arrondissement: parent?.arrondissementNaissance ?? "",
        pays: parent?.paysNaissance ?? "",
        ...donneesLieuNaissance(parent)
      },

      nationalites: NationalitesForm.valeursDefauts(parent?.nationalites)
    };
  },

  valeursVersDto: (parent: IParentFormRCTC, position: 2 | 3) => ({
    id: parent.identifiant || undefined,
    typeObjetTitulaire: TypeObjetTitulaire.FAMILLE,
    qualite: QualiteFamille.getKey(QualiteFamille.PARENT),
    position: position,
    nomNaissance: parent.nom || undefined,
    prenoms: PrenomsForm.versPrenomsOrdonnesDto(parent.prenoms),
    sexe: parent.sexe || undefined,
    jourNaissance: parent.dateNaissance.jour || undefined,
    moisNaissance: parent.dateNaissance.mois || undefined,
    anneeNaissance: parent.dateNaissance.annee || undefined,
    villeNaissance: parent.naissance.ville || undefined,
    arrondissementNaissance: parent.naissance.arrondissement || undefined,
    paysNaissance: parent.naissance.pays || undefined,
    regionNaissance: parent.naissance.etatProvince || parent.naissance.departement || undefined,
    nationalite: "INCONNUE",
    nationalites: NationalitesForm.versDto(parent.nationalites)
  }),

  schemaValidation: (estParent1: boolean) => {
    const cleParent = `parent${estParent1 ? "1" : "2"}`;

    return SchemaValidation.objet({
      nom: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
      prenoms: SchemaValidation.prenoms(`parents.${cleParent}.prenoms.prenom`),
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
        typeLieu: SchemaValidation.texte({}),
        ville: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        arrondissement: SchemaValidation.texte({}),
        departement: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        etatProvince: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        pays: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays }], max: { valeur: 500 } })
      }),
      nationalites: SchemaValidation.objet({
        nationalite1: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
        nationalite2: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
        nationalite3: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] })
      })
    });
  }
};

export interface ISaisieRequeteRCTCForm {
  requete: {
    natureActe: string;
    lienRequerant: keyof typeof ETypeLienRequerantCreation;
    typeRegistre: {
      id: string;
      poste: string;
    };
  };
  titulaire: {
    identifiant: string;
    nomActeEtranger: string;
    nomSouhaite: string;
    prenoms: TPrenomsForm;
    sexe: string;
    naissance: {
      date: IDateHeureForm;
      ville: string;
      etatProvince: string;
      pays: string;
    };
  };
  parents: {
    parent1: IParentFormRCTC;
    avecParent2: boolean;
    parent2: IParentFormRCTC;
    mariage: {
      idMariageParent1?: string;
      idMariageParent2?: string;
      parentsMaries: string;
      date: IDateHeureForm;
      lieu: string;
      ville: string;
      pays: string;
    };
    reconnaissance: {
      identifiant: string;
      titulaireReconnu: string;
      date: IDateHeureForm;
      lieu: string;
      ville: string;
      region: string;
      departement: string;
      pays: string;
    };
  };
  requerant: {
    id: string;
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

export const SaisieRequeteRCTCForm = {
  valeursInitiales: (requete: IRequeteConsulaire | null): ISaisieRequeteRCTCForm => {
    const titulaire = requete?.titulaires[0] ?? null;
    const parent1 = requete?.titulaires[1] ?? null;
    const parent2 = requete?.titulaires[2] ?? null;
    const reconnaissance = titulaire?.evenementUnions?.find(evenement => evenement.type === NatureActe.getKey(NatureActe.RECONNAISSANCE));
    const mariageParent1 = parent1?.evenementUnions?.find(evenement => evenement.type === NatureActe.getKey(NatureActe.MARIAGE));
    const mariageParent2 = parent2?.evenementUnions?.find(evenement => evenement.type === NatureActe.getKey(NatureActe.MARIAGE));

    const donneesLieuReconnaissance = (() => {
      const lieu = (() => {
        switch (mariageParent1?.pays) {
          case "France":
            return "FRANCE";
          case undefined:
            return "";
          default:
            return "ETRANGER";
        }
      })();
      const regionDepartement = reconnaissance?.region ?? "";

      return {
        lieu: lieu,
        ville: reconnaissance?.ville ?? "",
        departement: lieu === "FRANCE" ? regionDepartement : "",
        region: lieu === "FRANCE" ? "" : regionDepartement,
        pays: reconnaissance?.pays ?? ""
      };
    })();

    return ObjetFormulaire.remplacerValeursAbsentesParChainesVides<TAvecValeursOptionnelles<ISaisieRequeteRCTCForm>>({
      requete: {
        natureActe: ENatureActeTranscrit.NAISSANCE_MINEUR,
        lienRequerant: requete?.lienRequerant?.typeLienRequerant ?? "PERE_MERE",
        typeRegistre: {
          id: requete?.typeRegistre?.id,
          poste: requete?.typeRegistre?.poste
        }
      },
      titulaire: {
        identifiant: titulaire?.id,
        nomActeEtranger: titulaire?.nomNaissance,
        nomSouhaite: titulaire?.nomSouhaite,
        prenoms: PrenomsForm.valeursInitiales(titulaire?.prenoms),
        sexe: titulaire?.sexe,
        naissance: {
          date: DateHeureFormUtils.valeursDefauts(
            titulaire
              ? {
                  jour: titulaire.jourNaissance?.toString(),
                  mois: titulaire.moisNaissance?.toString(),
                  annee: titulaire.anneeNaissance?.toString()
                }
              : null
          ),
          ville: titulaire?.villeNaissance,
          etatProvince: titulaire?.regionNaissance,
          pays: titulaire?.paysNaissance
        }
      },
      parents: {
        parent1: ParentRCTCForm.valeursInitiales(parent1),
        avecParent2: Boolean(parent2),
        parent2: ParentRCTCForm.valeursInitiales(parent2),
        mariage: {
          idMariageParent1: mariageParent1?.id,
          idMariageParent2: mariageParent2?.id,
          parentsMaries: mariageParent1 ? "oui" : "",
          date: DateHeureFormUtils.valeursDefauts(
            mariageParent1
              ? {
                  jour: mariageParent1.jour?.toString(),
                  mois: mariageParent1.mois?.toString(),
                  annee: mariageParent1.annee?.toString()
                }
              : null
          ),
          lieu: (() => {
            switch (mariageParent1?.pays) {
              case "France":
                return "FRANCE";
              case undefined:
                return "";
              default:
                return "ETRANGER";
            }
          })(),
          ville: mariageParent1?.ville,
          pays: mariageParent1?.pays
        },
        reconnaissance: {
          identifiant: reconnaissance?.id,
          titulaireReconnu: reconnaissance ? "oui" : "",
          date: DateHeureFormUtils.valeursDefauts(
            reconnaissance
              ? {
                  jour: reconnaissance.jour?.toString(),
                  mois: reconnaissance.mois?.toString(),
                  annee: reconnaissance.annee?.toString()
                }
              : null
          ),
          ...donneesLieuReconnaissance
        }
      },
      requerant: {
        id: requete?.requerant.id,
        nom: requete?.requerant.nomFamille,
        nomUsage: requete?.requerant.nomUsage,
        prenom: requete?.requerant.prenom,
        adresse: {
          complementDestinataire: requete?.requerant.adresse?.ligne2,
          complementPointGeo: requete?.requerant.adresse?.ligne3,
          voie: requete?.requerant.adresse?.ligne4,
          lieuDit: requete?.requerant.adresse?.ligne5,
          codePostal: requete?.requerant.adresse?.codePostal,
          commune: requete?.requerant.adresse?.ville,
          pays: requete?.requerant.adresse?.pays,
          adresseCourriel: requete?.requerant.courriel,
          numeroTelephone: requete?.requerant.telephone
        },
        autreAdresseCourriel: requete?.requerant.courrielAutreContact,
        autreNumeroTelephone: requete?.requerant.telephoneAutreContact
      },
      pieceJointe:
        requete?.piecesJustificatives?.map<PieceJointe>(piece => ({
          type: (() => {
            const type = TypePieceJustificative.depuisId(piece.typePieceJustificative as unknown as string);

            return type ? { cle: type.id, libelle: type.libelle } : undefined;
          })(),
          base64File: {
            fileName: piece.nom,
            base64String: "",
            taille: piece.taille,
            conteneurSwift: piece.conteneurSwift,
            identifiantSwift: piece.referenceSwift
          }
        })) ?? []
    });
  },

  versDto: (valeurs: ISaisieRequeteRCTCForm) => {
    const mariageParents = valeurs.parents.mariage.parentsMaries
      ? {
          type: NatureActe.getKey(NatureActe.MARIAGE),
          jour: valeurs.parents.mariage.date.jour || undefined,
          mois: valeurs.parents.mariage.date.mois || undefined,
          annee: valeurs.parents.mariage.date.annee || undefined,
          ville: valeurs.parents.mariage.ville || undefined,
          pays: valeurs.parents.mariage.pays || undefined
        }
      : undefined;

    return nettoyerAttributsDto({
      typeRegistre: {
        id: valeurs.requete.typeRegistre.id,
        poste: valeurs.requete.typeRegistre.poste
      },
      canal: TypeCanal.COURRIER.nom,
      type: TypeRequete.CREATION.nom,
      sousType: SousTypeCreation.RCTC.nom,
      provenance: Provenance.COURRIER.nom,
      natureActeTranscrit: valeurs.requete.natureActe || undefined,
      lienRequerant: { typeLienRequerant: valeurs.requete.lienRequerant || undefined },
      titulaires: [
        {
          id: valeurs.titulaire.identifiant || undefined,
          typeObjetTitulaire: TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
          position: 1,
          nomNaissance: valeurs.titulaire.nomActeEtranger || "SNP",
          nomSouhaite: valeurs.titulaire.nomSouhaite || undefined,
          prenoms: PrenomsForm.versPrenomsOrdonnesDto(valeurs.titulaire.prenoms),
          sexe: valeurs.titulaire.sexe || undefined,
          jourNaissance: valeurs.titulaire.naissance.date.jour || undefined,
          moisNaissance: valeurs.titulaire.naissance.date.mois || undefined,
          anneeNaissance: valeurs.titulaire.naissance.date.annee,
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
        ...(valeurs.parents.parent1.nom || valeurs.parents.parent1.prenoms.prenom1
          ? [
              {
                ...ParentRCTCForm.valeursVersDto(valeurs.parents.parent1, 2),
                evenementUnions: mariageParents ? [{ id: valeurs.parents.mariage.idMariageParent1, ...mariageParents }] : []
              }
            ]
          : []),
        ...(valeurs.parents.avecParent2 && (valeurs.parents.parent2.nom || valeurs.parents.parent2.prenoms.prenom1)
          ? [
              {
                ...ParentRCTCForm.valeursVersDto(valeurs.parents.parent2, 3),
                evenementUnions: mariageParents ? [{ id: valeurs.parents.mariage.idMariageParent2, ...mariageParents }] : []
              }
            ]
          : [])
      ],
      requerant: {
        id: valeurs.requerant.id || undefined,
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
    });
  },

  schemaValidation: SchemaValidation.objet({
    requete: SchemaValidation.objet({
      natureActe: SchemaValidation.texte({ obligatoire: true }),
      lienRequerant: SchemaValidation.texte({ obligatoire: true }),
      typeRegistre: SchemaValidation.objet({
        poste: SchemaValidation.texte({ obligatoire: true })
      })
    }),
    titulaire: SchemaValidation.objet({
      nomActeEtranger: SchemaValidation.texte({ obligatoire: true, listeRegexp: [{ valeur: CaracteresAutorises }] }),
      nomSouhaite: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
      prenoms: SchemaValidation.prenoms("titulaire.prenoms.prenom"),
      sexe: SchemaValidation.texte({ obligatoire: true }),
      naissance: SchemaValidation.objet({
        date: SchemaValidation.dateIncomplete({ obligatoire: true }),
        ville: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        etatProvince: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        pays: SchemaValidation.texte({
          listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays }],
          max: { valeur: 500 }
        })
      })
    }),
    parents: SchemaValidation.objet({
      parent1: ParentRCTCForm.schemaValidation(true),
      parent2: ParentRCTCForm.schemaValidation(false),
      mariage: SchemaValidation.objet({
        parentsMaries: SchemaValidation.texte({}),
        date: SchemaValidation.dateIncomplete({}),
        lieu: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
        ville: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        pays: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays }], max: { valeur: 500 } })
      }),
      reconnaissance: SchemaValidation.objet({
        titulaireReconnu: SchemaValidation.texte({}),
        date: SchemaValidation.dateIncomplete({}),
        lieu: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        ville: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        region: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 500 } }),
        departement: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
        pays: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays }], max: { valeur: 500 } })
      })
    }),
    requerant: SchemaValidation.objet({
      nom: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
      nomUsage: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
      prenom: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
      adresse: SchemaValidation.objet({
        voie: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
        lieuDit: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }] }),
        complementDestinataire: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 38 } }),
        complementPointGeo: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 38 } }),
        codePostal: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAlphanumeriques }], max: { valeur: 38 } }),
        commune: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorises }], max: { valeur: 38 } }),
        pays: SchemaValidation.texte({ listeRegexp: [{ valeur: CaracteresAutorisesRecherchePays }], max: { valeur: 38 } }),
        adresseCourriel: SchemaValidation.courriel({}),
        numeroTelephone: SchemaValidation.texte({ listeRegexp: [{ valeur: NumeroTelephone }] })
      }),
      autreAdresseCourriel: SchemaValidation.courriel({}),
      autreNumeroTelephone: SchemaValidation.texte({ listeRegexp: [{ valeur: NumeroTelephone }] })
    })
  })
};
/* v8 ignore stop */
