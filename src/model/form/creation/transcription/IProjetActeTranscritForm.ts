/* v8 ignore start a faire Lundi 31 Mars @ Adrien_Bonvin */
import { NomSecable } from "@model/etatcivil/commun/NomSecable";
import { Identite } from "@model/etatcivil/enum/Identite";
import { ConditionChamp, EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { IDateForm } from "@model/form/commun/DateForm";
import { TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { ILocalisation } from "@model/requete/IParents";
import { IParentTranscription, ParentsRequeteTranscription } from "@model/requete/IParentsRequeteTranscription";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TitulaireRequeteTranscription } from "@model/requete/ITitulaireRequeteTranscription";
import SchemaValidation from "../../../../utils/SchemaValidation";

export interface IProjetActeTranscritForm {
  titulaire: ITitulaireTranscription;
  declarant: IDeclarantTranscription;
  parents: IParentsTranscription;
  mentions: IMentionsTranscription;
  formuleFinale: IFormuleFinaleTranscription;
  acteEtranger: IActeEtrangerTranscription;
  autresEnonciations?: { enonciations: string };
}

export interface IProjetActeTranscritProps {
  requete: IRequeteCreationTranscription;
}

export interface IActeEtrangerTranscription {
  typeActe?: string;
  typeActeAutre?: string;
  dateEnregistrement?: IDateForm;
  lieuEnregistrement?: ILieuEtranger;
  redacteur?: string;
  referenceComplement: string;
}

export interface ILieuEtranger {
  ville?: string;
  etatProvince?: string;
  pays?: string;
}

export interface ITitulaireTranscription {
  nomActeEtranger: string | null;
  nomRetenuOEC: string;
  nomSouhaite: string | null;
  prenomsChemin?: TPrenomsForm;
  nomSecable: NomSecable;
  sexe: string | null;
  dateNaissance: IDateForm | null;
  secable: boolean | null;
  villeNaissance: string | null;
  regionNaissance: string | null;
  paysNaissance: string | null;
  adresseNaissance: string | null;
}

export interface IParentsTranscription {
  parent1: IParentTranscription;
  parent2: IParentTranscription;
  domicileCommun?: boolean;
}

export interface IDeclarantTranscription {
  identite: string;
  nom: string | null;
  prenomsChemin?: TPrenomsForm;
  sexe: string | null;
  age?: number | null;
  qualite?: string | null;
  profession?: string | null;
  sansProfession?: boolean;
  domicile?: ILocalisation;
  complement?: string | null;
}

export interface IMentionsTranscription {
  mentions?: string | null;
}

export interface IFormuleFinaleTranscription {
  identiteDemandeur: string;
  nom?: string | null;
  prenomsChemin?: TPrenomsForm;
  qualite?: string | null;
  piecesProduites: string;
  legalisationApostille: string;
  autresPieces?: string | null;
  modeDepot: string;
  identiteTransmetteur: string;
}

export const ProjetTranscriptionForm = {
  valeursInitiales: (requete: IRequeteCreationTranscription): IProjetActeTranscritForm => {
    const titulaire = TitulaireRequeteTranscription.getTitulaireTranscriptionDepuisTitulairesRequeteTranscription(requete.titulaires);
    const parents = ParentsRequeteTranscription.getParentsRequeteTranscription(requete.titulaires);

    return {
      titulaire: TitulaireRequeteTranscription.mappingTitulaireRequeteTranscriptionVersTitulaireForm(titulaire),
      declarant: {
        identite: Identite.getKey(Identite.PERE),
        nom: "",
        prenomsChemin: { prenom1: "", nombrePrenomsAffiches: 1 },
        sexe: null,
        age: null,
        qualite: "",
        profession: "",
        sansProfession: false,
        domicile: { typeLieu: "Inconnu" }
      },
      parents: {
        parent1: ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(parents?.parent1),
        parent2: ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(parents?.parent2)
      },
      acteEtranger: {
        typeActe: "ACTE_DRESSE",
        referenceComplement: ""
      },
      mentions: {
        mentions: ""
      },
      formuleFinale: {
        identiteDemandeur: Identite.getKey(Identite.PERE),
        nom: "",
        prenomsChemin: { prenom1: "", nombrePrenomsAffiches: 1 },
        qualite: "",
        piecesProduites: "COPIE",
        autresPieces: "",
        legalisationApostille: "",
        modeDepot: "TRANSMISE",
        identiteTransmetteur: "Identique au demandeur"
      }
    };
  },
  schemaValidation: () => {
    const TitulaireSchemaValidationFormulaire = SchemaValidation.objet({
      nomActeEtranger: SchemaValidation.texte({ obligatoire: false }),
      nomRetenuOEC: SchemaValidation.texte({ obligatoire: true }),
      prenomsChemin: SchemaValidation.prenoms("titulaire.prenomsChemin.prenom"),
      sexe: SchemaValidation.texte({ obligatoire: false }),
      dateNaissance: SchemaValidation.dateIncomplete({ obligatoire: true }),
      villeNaissance: SchemaValidation.texte({ obligatoire: false }),
      regionNaissance: SchemaValidation.texte({ obligatoire: false }),
      paysNaissance: SchemaValidation.texte({ obligatoire: false }),
      adresseNaissance: SchemaValidation.texte({ obligatoire: false })
    });

    const AdresseSchemaValidationFormulaire = (prefix: string) =>
      SchemaValidation.objet({
        typeLieu: SchemaValidation.texte({ obligatoire: false }),
        ville: SchemaValidation.texte({
          obligatoire: ConditionChamp.depuisTableau([
            {
              idChampReference: `${prefix}.typeLieu`,
              operateur: EOperateurCondition.EGAL,
              valeurs: ["France"]
            }
          ])
        }),
        adresse: SchemaValidation.texte({ obligatoire: false }),
        departement: SchemaValidation.texte({
          obligatoire: ConditionChamp.depuisTableau([
            {
              idChampReference: `${prefix}.typeLieu`,
              operateur: EOperateurCondition.EGAL,
              valeurs: ["France"]
            },
            {
              idChampReference: `${prefix}.ville`,
              operateur: EOperateurCondition.DIFF,
              valeurs: ["Paris"]
            }
          ])
        }).transform(val => val?.toLowerCase?.()),
        arrondissement: SchemaValidation.texte({ obligatoire: false }),
        pays: SchemaValidation.texte({ obligatoire: false }),
        etatProvince: SchemaValidation.texte({ obligatoire: false })
      }).test("au-moins-un-champ-etranger", "La saisie d'au moins un champ est obligatoire", function (adresse, context) {
        if (adresse.typeLieu !== "Étranger") {
          return true;
        }

        if (!(Boolean(adresse.ville) || Boolean(adresse.pays) || Boolean(adresse.etatProvince))) {
          return context.createError({
            path: `${context.path}.ville`,
            message: "La saisie d'au moins un champ est obligatoire"
          });
        }

        return true;
      });

    const ParentSchemaValidationFormulaire = (parentId: number) => {
      const parentPrefix = `parents.parent${parentId}`;

      return SchemaValidation.objet({
        nom: SchemaValidation.texte({ obligatoire: false }),
        prenoms: SchemaValidation.prenoms(`${parentPrefix}.prenoms.prenom`),
        sexe: SchemaValidation.texte({ obligatoire: false }).test(
          "sexe-required-if-nom-or-prenom",
          "Le sexe est obligatoire lorsque le nom ou le prénom est renseigné",
          function (valeurSexe) {
            const parent = this.parent;

            const aNom = parent.nom && parent.nom.trim() !== "";
            const aPrenom = parent.prenomsChemin.prenom1 && parent.prenomsChemin.prenom1.trim() !== "";

            if ((aNom || aPrenom) && !valeurSexe) {
              return false;
            }

            return true;
          }
        ),
        dateNaissance: SchemaValidation.dateIncomplete({ obligatoire: false }),
        renseignerAge: SchemaValidation.booleen({ obligatoire: false }),
        age: SchemaValidation.entier({ obligatoire: false }),
        lieuNaissance: AdresseSchemaValidationFormulaire(`${parentPrefix}.lieuNaissance`),
        profession: SchemaValidation.texte({ obligatoire: false }),
        sansProfession: SchemaValidation.booleen({ obligatoire: false }),
        domicile: AdresseSchemaValidationFormulaire(`${parentPrefix}.domicile`)
      });
    };

    const ParentsSchemaValidationFormulaire = SchemaValidation.objet({
      parent1: ParentSchemaValidationFormulaire(1),
      parent2: ParentSchemaValidationFormulaire(2)
    });

    const DeclarantSchemaValidationFormulaire = SchemaValidation.objet({
      identite: SchemaValidation.texte({ obligatoire: true }),
      nom: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          {
            idChampReference: "declarant.identite",
            operateur: EOperateurCondition.EGAL,
            valeurs: ["TIERS"]
          }
        ])
      }),
      prenomsChemin: SchemaValidation.prenoms("declarant.prenomsChemin.prenom"),
      age: SchemaValidation.entier({ obligatoire: false }),
      qualite: SchemaValidation.texte({ obligatoire: false }),
      profession: SchemaValidation.texte({ obligatoire: false }),
      domicile: AdresseSchemaValidationFormulaire("declarant.domicile"),
      complement: SchemaValidation.texte({ obligatoire: false })
    });

    const MentionsSchemaValidationFormulaire = SchemaValidation.objet({
      mentions: SchemaValidation.texte({ obligatoire: false })
    });

    const FormuleFinaleSchemaValidationFormulaire = SchemaValidation.objet({
      identiteDemandeur: SchemaValidation.texte({ obligatoire: true }),
      nom: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          {
            idChampReference: "formuleFinale.identiteDemandeur",
            operateur: EOperateurCondition.EGAL,
            valeurs: ["TIERS"]
          }
        ])
      }),
      prenomsChemin: SchemaValidation.prenoms("mentionsEtFormuleFinale.prenomsChemin.prenom"),
      qualite: SchemaValidation.texte({ obligatoire: false }),
      piecesProduites: SchemaValidation.texte({ obligatoire: true }),
      legalisationApostille: SchemaValidation.texte({ obligatoire: false }),
      autresPieces: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          {
            idChampReference: "formuleFinale.piecesProduites",
            operateur: EOperateurCondition.EGAL,
            valeurs: ["COPIES", "COPIES_ET_TRADUCTION"]
          }
        ])
      }),
      modeDepot: SchemaValidation.texte({ obligatoire: true }),
      identiteTransmetteur: SchemaValidation.texte({ obligatoire: true })
    });

    const LieuEnregistrementSchemaValidation = SchemaValidation.objet({
      ville: SchemaValidation.texte({
        obligatoire: false
      }),
      etatProvince: SchemaValidation.texte({
        obligatoire: false
      }),
      pays: SchemaValidation.texte({
        obligatoire: false
      })
    });

    const ActeEtrangerSchemaValidationFormulaire = SchemaValidation.objet({
      typeActe: SchemaValidation.listeDeroulante({
        obligatoire: true,
        options: ["ACTE_DRESSE", "ACTE_TRANSCRIT", "ACTE_ENREGISTRE", "JUGEMENT_DECLARATIF", "JUGEMENT_SUPPLETIF", "AUTRE"]
      }),
      typeActeAutre: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          {
            idChampReference: "acteEtranger.typeActe",
            operateur: EOperateurCondition.EGAL,
            valeurs: ["AUTRE"]
          }
        ])
      }),
      dateEnregistrement: SchemaValidation.dateIncomplete({
        obligatoire: false,
        bloquerDateFuture: true
      }),
      lieuEnregistrement: LieuEnregistrementSchemaValidation,
      redacteur: SchemaValidation.texte({
        obligatoire: false
      }),
      referenceComplement: SchemaValidation.texte({
        obligatoire: false
      })
    });
    return SchemaValidation.objet({
      titulaire: TitulaireSchemaValidationFormulaire,
      declarant: DeclarantSchemaValidationFormulaire,
      parents: ParentsSchemaValidationFormulaire,
      mentions: MentionsSchemaValidationFormulaire,
      formuleFinale: FormuleFinaleSchemaValidationFormulaire,
      acteEtranger: ActeEtrangerSchemaValidationFormulaire
    });
  }
};
/* v8 ignore end */
