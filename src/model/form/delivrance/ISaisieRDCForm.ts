import { nettoyerAttributsDto } from "@model/commun/dtoUtils";
import { IRequerant, Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ETypeLienMandant } from "@model/requete/enum/ETypeLienMandant";
import { ETypeLienRequerant } from "@model/requete/enum/ETypeLienRequerant";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeInstitutionnel } from "@model/requete/enum/TypeInstitutionnel";
import { ETypeMandant } from "@model/requete/enum/TypeMandant";
import { TypeMandataireReq } from "@model/requete/enum/TypeMandataireReq";
import { ETypeRequerantRDC } from "@model/requete/enum/TypeRequerantRDC";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { mapPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { SNP } from "@util/Utils";
import { CaracteresAutorises } from "../../../ressources/Regex";
import { PieceJointe } from "../../../utils/FileUtils";
import SchemaValidation from "../../../utils/SchemaValidation";
import { ConditionChamp, EOperateurCondition } from "../commun/ConditionChamp";
import { DateHeureFormUtils, IDateHeureForm } from "../commun/DateForm";

interface ITitulaireFormRDC {
  nomNaissance: string;
  prenom: string;
  naissance: {
    date: IDateHeureForm;
    pays: string;
  };
}

interface IRequerantRDCForm {
  typeRequerant: keyof typeof ETypeRequerantRDC;
  nom: string;
  nomUsage: string;
  prenom: string;
  type: string;
  nature: string;
  nomInstitution: string;
  raisonSociale: string;
  avecNature: boolean;
}

interface ILienTitulaire {
  lien: keyof typeof ETypeLienRequerant | keyof typeof ETypeLienMandant;
  nature: string;
}

export interface ISaisieRDCForm {
  requete: {
    natureActe: string;
    documentDemande: string;
    nbExemplaire: number;
    motif: string;
    complementMotif: string;
  };
  evenement: {
    date: IDateHeureForm;
    ville: string;
    pays: string;
  };
  titulaires: {
    titulaire1: ITitulaireFormRDC;
    titulaire2: ITitulaireFormRDC;
  };
  requerant: IRequerantRDCForm;
  mandant: {
    type: keyof typeof ETypeMandant;
    raisonSociale: string;
    nom: string;
    prenom: string;
  };
  lienTitulaire: ILienTitulaire;
  piecesJustificatives: PieceJointe[];
}

export const requerantRDCForm = {
  valeursInitiales: (requerant?: IRequerant, titulaires?: ITitulaireRequete[]): IRequerantRDCForm => {
    const qualite = requerant?.qualiteRequerant;
    const qualiteRequerant = (qualite?.qualite.nom as keyof typeof ETypeRequerantRDC) ?? "TITULAIRE1";

    const baseIdentite: IRequerantRDCForm = {
      nom: requerant?.nomFamille ?? "",
      prenom: requerant?.prenom ?? "",
      typeRequerant: qualiteRequerant,
      nomUsage: "",
      nomInstitution: "",
      type: "",
      nature: "",
      raisonSociale: "",
      avecNature: false
    };

    let identiteRequerant = {};

    switch (qualiteRequerant) {
      case "PARTICULIER":
        if (
          requerant &&
          Requerant.estTitulaireX({
            requerant,
            titulaire: TitulaireRequete.getTitulaireParPosition(titulaires || [], 1)
          })
        ) {
          identiteRequerant = {
            ...baseIdentite,
            typeRequerant: "TITULAIRE1"
          };
        } else if (
          requerant &&
          Requerant.estTitulaireX({
            requerant,
            titulaire: TitulaireRequete.getTitulaireParPosition(titulaires || [], 2)
          })
        ) {
          identiteRequerant = {
            ...baseIdentite,
            typeRequerant: "TITULAIRE2"
          };
        } else {
          identiteRequerant = {
            ...baseIdentite,
            nomUsage: qualite?.particulier?.nomUsage ?? ""
          };
        }
        break;
      case "MANDATAIRE_HABILITE":
        identiteRequerant = {
          ...baseIdentite,
          type: TypeMandataireReq.getKey(requerant?.qualiteRequerant.mandataireHabilite?.type) || "",
          raisonSociale: qualite?.mandataireHabilite?.raisonSociale ?? "",
          nature: qualite?.mandataireHabilite?.nature ?? ""
        };
        break;
      case "AUTRE_PROFESSIONNEL":
        identiteRequerant = {
          ...baseIdentite,
          nature: qualite?.autreProfessionnel?.nature ?? "",
          raisonSociale: qualite?.autreProfessionnel?.raisonSociale ?? ""
        };
        break;
      case "INSTITUTIONNEL":
        identiteRequerant = {
          ...baseIdentite,
          type: TypeInstitutionnel.getKey(requerant?.qualiteRequerant.institutionnel?.type),
          nomInstitution: qualite?.institutionnel?.nomInstitution ?? ""
        };
        break;
      default:
        identiteRequerant = {
          ...baseIdentite,
          type: "",
          raisonSociale: "",
          nature: ""
        };
    }

    return identiteRequerant as IRequerantRDCForm;
  },

  schemaValidation: SchemaValidation.objet({
    type: SchemaValidation.texte({
      obligatoire: ConditionChamp.depuisTableau([
        {
          idChampReference: "requerant.typeRequerant",
          operateur: EOperateurCondition.EGAL,
          valeurs: ["MANDATAIRE_HABILITE", "INSTITUTIONNEL"]
        }
      ])
    }),
    nature: SchemaValidation.texte({
      obligatoire: ConditionChamp.depuisTableau([
        { idChampReference: "requerant.typeRequerant", operateur: EOperateurCondition.EGAL, valeurs: ["AUTRE_PROFESSIONNEL"] }
      ])
    })
  })
};

const titulaireRDCForm = {
  valeursInitiales: (titulaire?: ITitulaireRequete): ITitulaireFormRDC => {
    return {
      nomNaissance: titulaire?.nomNaissance ?? "",
      prenom: titulaire?.prenoms?.length ? titulaire?.prenoms[0].prenom : "",
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
        pays: titulaire?.paysNaissance ?? ""
      }
    };
  },
  schemaValidation: () => {
    return SchemaValidation.objet({
      nomNaissance: SchemaValidation.texte({
        obligatoire: false,
        listeRegexp: [{ valeur: CaracteresAutorises }]
      }),
      prenom: SchemaValidation.texte({ obligatoire: false, listeRegexp: [{ valeur: CaracteresAutorises }] }),
      pays: SchemaValidation.texte({
        obligatoire: false,
        listeRegexp: [{ valeur: CaracteresAutorises }]
      })
    });
  }
};

const saisiePJ = (requete: IRequeteDelivrance): PieceJointe[] => {
  return requete.piecesJustificatives.map(PJ => {
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
        cle: PJ.typePieceJustificative?.id ?? "",
        libelle: PJ.typePieceJustificative?.libelle ?? ""
      }
    };
  });
};

const mapEvenement = (valeurs: ISaisieRDCForm) => {
  if (NatureActeRequete.NAISSANCE === NatureActeRequete.getEnumFor(valeurs.requete.natureActe)) {
    const titulaire1 = valeurs.titulaires.titulaire1;

    return {
      natureActe: valeurs.requete.natureActe,
      jour: titulaire1.naissance.date.jour,
      mois: titulaire1.naissance.date.mois,
      annee: titulaire1.naissance.date.annee,
      pays: titulaire1.naissance.pays
    };
  }

  const evenement = valeurs.evenement;

  return {
    natureActe: valeurs.requete.natureActe,
    jour: evenement.date.jour,
    mois: evenement.date.mois,
    annee: evenement.date.annee,
    ville: evenement.ville,
    pays: evenement.pays
  };
};

const mapTitulaire = (titulaire: ITitulaireFormRDC, position: number) => {
  return {
    position,
    nomNaissance: titulaire.nomNaissance || SNP,
    prenoms: titulaire.prenom ? [{ prenom: titulaire.prenom, numeroOrdre: 1 }] : undefined,
    jourNaissance: titulaire.naissance.date.jour,
    moisNaissance: titulaire.naissance.date.mois,
    anneeNaissance: titulaire.naissance.date.annee,
    paysNaissance: titulaire.naissance.pays,
    sexe: "INCONNU",
    nationalite: "INCONNUE"
  };
};

const mapTitulaires = (valeursSaisies: ISaisieRDCForm) => {
  const estTitulaireVide = (titulaire: ITitulaireFormRDC) =>
    !titulaire.nomNaissance && !titulaire.prenom && DateHeureFormUtils.estDateVide(titulaire.naissance.date);

  const natureActe = NatureActeRequete.getEnumFor(valeursSaisies.requete.natureActe);

  const titulaires = [mapTitulaire(valeursSaisies.titulaires.titulaire1, 1)];

  if (NatureActeRequete.MARIAGE === natureActe && !estTitulaireVide(valeursSaisies.titulaires.titulaire2)) {
    titulaires.push(mapTitulaire(valeursSaisies.titulaires.titulaire2, 2));
  }

  return titulaires;
};

const mapRequerant = (valeursSaisies: ISaisieRDCForm) => {
  const { requerant, titulaires } = valeursSaisies;

  let informationsSupplementaires = {};

  switch (requerant.typeRequerant) {
    case "TITULAIRE1":
      informationsSupplementaires = {
        qualite: Qualite.PARTICULIER.nom,
        nomFamille: titulaires.titulaire1.nomNaissance,
        prenom: titulaires.titulaire1.prenom
      };
      break;
    case "TITULAIRE2":
      informationsSupplementaires = {
        qualite: Qualite.PARTICULIER.nom,
        nomFamille: valeursSaisies.titulaires.titulaire2.nomNaissance,
        prenom: titulaires.titulaire2.prenom
      };
      break;
    case "MANDATAIRE_HABILITE":
      informationsSupplementaires = {
        nomFamille: requerant.nom,
        prenom: requerant.prenom,
        detailQualiteMandataireHabilite: {
          type: requerant.type,
          nature: requerant.nature,
          raisonSociale: requerant.raisonSociale
        }
      };
      break;
    case "INSTITUTIONNEL":
      informationsSupplementaires = {
        nomFamille: requerant.nom,
        prenom: requerant.prenom,
        detailQualiteInstitutionnel: {
          type: requerant.type,
          nature: requerant.nature,
          nomInstitution: requerant.nomInstitution ?? ""
        }
      };
      break;
    case "PARTICULIER":
      informationsSupplementaires = {
        nomFamille: requerant.nom || SNP,
        prenom: requerant.prenom
      };
      break;
    case "AUTRE_PROFESSIONNEL":
      informationsSupplementaires = {
        nomFamille: requerant.nom,
        prenom: requerant.prenom,
        detailQualiteAutreProfessionnel: {
          nature: requerant.nature,
          raisonSociale: requerant.raisonSociale
        }
      };
      break;
    default:
      break;
  }

  return {
    qualite: requerant.typeRequerant,
    ...informationsSupplementaires
  };
};

const getPiecesJustificativesAGarder = (valeursSaisies: ISaisieRDCForm) => {
  return valeursSaisies.piecesJustificatives?.filter(pj => !pj.base64File.base64String).map(mapPieceJustificative);
};

export const SaisieRDCForm = {
  valeursInitiales: (requete: IRequeteDelivrance | null): ISaisieRDCForm => {
    const titulaire1 = TitulaireRequete.getTitulaireParPosition(requete?.titulaires || [], 1);
    const titulaire2 = TitulaireRequete.getTitulaireParPosition(requete?.titulaires || [], 2);
    const mandant = requete?.mandant;

    return {
      requete: {
        natureActe: requete?.evenement?.natureActe.nom ?? "NAISSANCE",
        documentDemande: requete?.documentDemande?.id ?? "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
        motif: MotifDelivrance.getKey(requete?.motif) || MotifDelivrance.getKey(MotifDelivrance.NON_PRECISE_PAR_REQUERANT),
        nbExemplaire: requete?.nbExemplaireImpression ?? 1,
        complementMotif: requete?.complementMotif ?? ""
      },
      evenement: {
        date: DateHeureFormUtils.valeursDefauts(
          requete?.evenement
            ? {
                jour: `${requete?.evenement?.jour ?? ""}`,
                mois: `${requete?.evenement?.mois ?? ""}`,
                annee: `${requete?.evenement?.annee ?? ""}`
              }
            : null
        ),
        ville: requete?.evenement?.ville ?? "",
        pays: requete?.evenement?.pays ?? ""
      },
      titulaires: {
        titulaire1: titulaireRDCForm.valeursInitiales(titulaire1),
        titulaire2: titulaireRDCForm.valeursInitiales(titulaire2)
      },
      requerant: requerantRDCForm.valeursInitiales(requete?.requerant, requete?.titulaires),
      mandant: {
        type: mandant?.type || "PERSONNE_PHYSIQUE",
        nom: mandant?.nom ?? "",
        prenom: mandant?.prenom ?? "",
        raisonSociale: mandant?.raisonSociale ?? ""
      },
      lienTitulaire: ((): ILienTitulaire => {
        if (mandant) {
          return {
            lien: mandant?.typeLien || "TITULAIRE",
            nature: mandant?.natureLien ?? ""
          };
        }
        return {
          lien: requete?.requerant?.lienRequerant?.lien || "TITULAIRE",
          nature: requete?.requerant?.lienRequerant?.natureLien ?? ""
        };
      })(),
      piecesJustificatives: requete?.piecesJustificatives.length ? saisiePJ(requete) : []
    };
  },
  versDto: (valeursSaisies: ISaisieRDCForm) => {
    return nettoyerAttributsDto({
      type: TypeRequete.DELIVRANCE.nom,
      sousType: SousTypeDelivrance.RDC.nom,
      canal: TypeCanal.COURRIER.nom,
      provenance: Provenance.COURRIER.nom,
      documentDemande: valeursSaisies.requete.documentDemande,
      motif: valeursSaisies.requete.motif,
      nombreExemplairesDemandes: valeursSaisies.requete.nbExemplaire,
      complementMotif: valeursSaisies.requete.complementMotif,
      evenement: mapEvenement(valeursSaisies),
      mandant:
        valeursSaisies.requerant.typeRequerant === "MANDATAIRE_HABILITE"
          ? {
              typeMandant: valeursSaisies.mandant.type,
              nom: valeursSaisies.mandant.nom,
              prenom: valeursSaisies.mandant.prenom,
              raisonSociale: valeursSaisies.mandant.raisonSociale,
              lienMandant: valeursSaisies.lienTitulaire.lien,
              natureLien: valeursSaisies.lienTitulaire.nature
            }
          : undefined,
      titulaires: mapTitulaires(valeursSaisies),
      requerant: mapRequerant(valeursSaisies),
      lienRequerant: !["INSTITUTIONNEL", "AUTRE_PROFESSIONNEL"].includes(valeursSaisies.requerant.typeRequerant)
        ? {
            typeLienRequerant: valeursSaisies.lienTitulaire.lien,
            natureLien: valeursSaisies.lienTitulaire.nature
          }
        : undefined,
      piecesJustificatives: getPiecesJustificativesAGarder(valeursSaisies)
    });
  },
  schemaValidation: SchemaValidation.objet({
    requete: SchemaValidation.objet({
      complementMotif: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          { idChampReference: "requete.motif", operateur: EOperateurCondition.EGAL, valeurs: ["AUTRE"] }
        ])
      })
    }),
    evenement: SchemaValidation.objet({
      date: SchemaValidation.dateIncomplete({ obligatoire: false }),
      ville: SchemaValidation.texte({ obligatoire: false }),
      pays: SchemaValidation.texte({ obligatoire: false })
    }),
    titulaires: SchemaValidation.objet({
      titulaire1: titulaireRDCForm.schemaValidation(),
      titulaire2: titulaireRDCForm.schemaValidation()
    }),
    requerant: requerantRDCForm.schemaValidation,
    lienTitulaire: SchemaValidation.objet({
      nature: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          { idChampReference: "lienTitulaire.lien", operateur: EOperateurCondition.EGAL, valeurs: ["AUTRE"] }
        ])
      })
    })
  })
};
