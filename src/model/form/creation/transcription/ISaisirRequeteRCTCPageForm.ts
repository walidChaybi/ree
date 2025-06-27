/* v8 ignore start A TESTER 03/25 */
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ConditionChamp, EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { DateHeureFormUtils, IDateHeureForm } from "@model/form/commun/DateForm";
import { INationalitesForm, NationalitesForm } from "@model/form/commun/NationalitesForm";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { IRequeteConsulaire } from "@model/requete/IRequeteConsulaire";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeLienRequerantCreation } from "@model/requete/enum/TypeLienRequerantCreation";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { PieceJointe } from "@util/FileUtils";
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
    const donneesLieuNaissance = (() => {
      const estFrance = parent?.paysNaissance === "France";
      const regionDepartement = parent?.regionNaissance ?? "";

      return {
        region: estFrance ? "" : regionDepartement,
        departement: estFrance ? regionDepartement : "",
        estFrance
      };
    })();

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
        typeLieu: parent?.paysNaissance ? (donneesLieuNaissance.estFrance ? "FRANCE" : "ETRANGER") : "Inconnu",
        ville: parent?.villeNaissance ?? "",
        arrondissement: parent?.arrondissementNaissance ?? "",
        departement: donneesLieuNaissance.departement,
        etatProvince: donneesLieuNaissance.region,
        pays: parent?.paysNaissance ?? ""
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
      nom: SchemaValidation.texte({ obligatoire: false }),
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

export interface ISaisieRequeteRCTCForm {
  requete: {
    natureActe: string;
    lienRequerant: string;
    registre: string;
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
  service: {
    avecService: boolean;
    idService: string;
  };
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

    return {
      requete: {
        natureActe: ENatureActeTranscrit.NAISSANCE_MINEUR,
        lienRequerant: TypeLienRequerantCreation.getKey(TypeLienRequerantCreation.PERE_MERE),
        registre: requete?.villeRegistre ?? ""
      },
      titulaire: {
        identifiant: titulaire?.id ?? "",
        nomActeEtranger: titulaire?.nomNaissance ?? "",
        nomSouhaite: titulaire?.nomSouhaite ?? "",
        prenoms: PrenomsForm.valeursInitiales(titulaire?.prenoms),
        sexe: titulaire?.sexe ?? "",
        naissance: {
          date: DateHeureFormUtils.valeursDefauts(
            titulaire
              ? {
                  jour: `${titulaire.jourNaissance ?? ""}`,
                  mois: `${titulaire.moisNaissance ?? ""}`,
                  annee: `${titulaire.anneeNaissance ?? ""}`
                }
              : null
          ),
          ville: titulaire?.villeNaissance ?? "",
          etatProvince: titulaire?.regionNaissance ?? "",
          pays: titulaire?.paysNaissance ?? ""
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
                  jour: `${mariageParent1.jour ?? ""}`,
                  mois: `${mariageParent1.mois ?? ""}`,
                  annee: `${mariageParent1.annee ?? ""}`
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
          ville: mariageParent1?.ville ?? "",
          pays: mariageParent1?.pays ?? ""
        },
        reconnaissance: {
          identifiant: reconnaissance?.id ?? "",
          titulaireReconnu: reconnaissance ? "oui" : "",
          date: DateHeureFormUtils.valeursDefauts(
            reconnaissance
              ? {
                  jour: `${reconnaissance.jour ?? ""}`,
                  mois: `${reconnaissance.mois ?? ""}`,
                  annee: `${reconnaissance.annee ?? ""}`
                }
              : null
          ),
          ...donneesLieuReconnaissance
        }
      },
      requerant: {
        id: requete?.requerant.id ?? "",
        nom: requete?.requerant.nomFamille ?? "",
        nomUsage: requete?.requerant.nomUsage ?? "",
        prenom: requete?.requerant.prenom ?? "",
        adresse: {
          complementDestinataire: requete?.requerant.adresse?.ligne2 ?? "",
          complementPointGeo: requete?.requerant.adresse?.ligne3 ?? "",
          voie: requete?.requerant.adresse?.ligne4 ?? "",
          lieuDit: requete?.requerant.adresse?.ligne5 ?? "",
          codePostal: requete?.requerant.adresse?.codePostal ?? "",
          commune: requete?.requerant.adresse?.ville ?? "",
          pays: requete?.requerant.adresse?.pays ?? "",
          adresseCourriel: requete?.requerant.courriel ?? "",
          numeroTelephone: requete?.requerant.telephone ?? ""
        },
        autreAdresseCourriel: requete?.requerant.courrielAutreContact ?? "",
        autreNumeroTelephone: requete?.requerant.telephoneAutreContact ?? ""
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
        })) ?? [],
      service: {
        avecService: false,
        idService: ""
      }
    };
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
      prenoms: SchemaValidation.prenoms("titulaire.prenoms.prenom"),
      sexe: SchemaValidation.texte({ obligatoire: true }),
      naissance: SchemaValidation.objet({
        date: SchemaValidation.dateIncomplete({ obligatoire: true }),
        ville: SchemaValidation.texte({ obligatoire: false }),
        etatProvince: SchemaValidation.texte({ obligatoire: false }),
        pays: SchemaValidation.texte({ obligatoire: false })
      })
    }),
    parents: SchemaValidation.objet({
      parent1: ParentRCTCForm.schemaValidation(true),
      parent2: ParentRCTCForm.schemaValidation(false),
      mariage: SchemaValidation.objet({
        parentsMaries: SchemaValidation.texte({ obligatoire: false }),
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
    }),
    service: SchemaValidation.objet({
      idService: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          { idChampReference: "service.avecService", operateur: EOperateurCondition.EGAL, valeurs: ["true"] }
        ])
      })
    })
  })
};
/* v8 ignore end */
