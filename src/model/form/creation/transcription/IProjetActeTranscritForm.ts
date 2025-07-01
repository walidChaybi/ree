import { ETypeActeEtranger, IActeEtrangerDto } from "@model/etatcivil/acte/IActeEtrangerDto";
import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import { ILocalisation } from "@model/etatcivil/acte/ILocalisation";
import {
  EIdentiteDeclarant,
  IDeclarantProjetActeTranscritDto,
  declarantTranscritDtoVide
} from "@model/etatcivil/acte/projetActe/transcription/DeclarantProjetActeTranscrit";
import {
  EPrepositionLieu,
  IEvenementProjetActeTranscritDto
} from "@model/etatcivil/acte/projetActe/transcription/EvenementProjetActeTranscrit";
import {
  FiliationTitulaireProjetActeTranscrit,
  IFiliationTitulaireProjetActeTranscritDto
} from "@model/etatcivil/acte/projetActe/transcription/FiliationTitulaireProjetActeTranscrit";
import { EIdentiteDemandeur, EIdentiteTransmetteur, IFormuleFinaleDto } from "@model/etatcivil/acte/projetActe/transcription/FormuleFinale";
import {
  IProjetActeTranscritPatchDto,
  IProjetActeTranscritPostDto,
  ProjetActeTranscrit
} from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { ITitulaireProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/transcription/TitulaireProjetActeTranscrit";
import { NomSecable } from "@model/etatcivil/commun/NomSecable";
import { CadreNaissance } from "@model/etatcivil/enum/CadreNaissance";
import { ELegalisationApostille } from "@model/etatcivil/enum/ELegalisationApostille";
import { EModeDepot } from "@model/etatcivil/enum/EModeDepot";
import { EPieceProduite } from "@model/etatcivil/enum/EPieceProduite";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import { ConditionChamp, EOperateurCondition } from "@model/form/commun/ConditionChamp";
import { DateHeureFormUtils, IDateHeureForm } from "@model/form/commun/DateForm";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { IParentRequeteTranscription, ParentsRequeteTranscription } from "@model/requete/IParentsRequeteTranscription";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TitulaireRequeteTranscription } from "@model/requete/ITitulaireRequeteTranscription";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import SchemaValidation from "../../../../utils/SchemaValidation";

export interface IProjetActeTranscritForm {
  titulaire: ITitulaireTranscriptionForm;
  declarant: IDeclarantTranscriptionForm;
  parents: IParentsTranscriptionForm;
  mentions: IMentionsTranscriptionForm;
  formuleFinale: IFormuleFinaleTranscriptionForm;
  acteEtranger: IActeEtrangerTranscriptionForm;
  autresEnonciations: { enonciations: string };
}

export interface IActeEtrangerTranscriptionForm {
  typeActe: keyof typeof ETypeActeEtranger;
  infoTypeActe: string;
  dateEnregistrement: IDateHeureForm;
  lieuEnregistrement: ILieuEtranger;
  redacteur: string;
  referenceComplement: string;
}

export interface ILieuEtranger {
  ville: string;
  etatProvince: string;
  pays: string;
  preposition: keyof typeof EPrepositionLieu;
}

export interface ITitulaireTranscriptionForm {
  nomActeEtranger: string;
  nomRetenuOEC: string;
  nomSouhaite: string;
  prenomsChemin: TPrenomsForm;
  nomSecable: NomSecable;
  sexe: keyof typeof ESexe;
  dateNaissance: IDateHeureForm;
  prepositionLieuNaissance: keyof typeof EPrepositionLieu;
  villeNaissance: string;
  regionNaissance: string;
  paysNaissance: string;
  adresseNaissance: string;
}

export interface IParentTranscriptionForm {
  sexe: keyof typeof ESexe | "";
  nom: string;
  prenomsChemin: TPrenomsForm;
  dateNaissance: IDateHeureForm;
  lieuNaissance: ILocalisation;
  profession: string;
  sansProfession: boolean;
  renseignerAge: boolean;
  age: string;
  domicile: ILocalisation;
}

export interface IParentsTranscriptionForm {
  parent1: IParentTranscriptionForm;
  parent2: IParentTranscriptionForm;
  domicileCommun: boolean;
}

export interface IDeclarantTranscriptionForm {
  identite: keyof typeof EIdentiteDeclarant;
  nom: string;
  prenomsChemin: TPrenomsForm;
  sexe: keyof typeof ESexe;
  age: string;
  qualite: string;
  profession: string;
  sansProfession: boolean;
  domicile: ILocalisation;
  complement: string;
}

export interface IMentionsTranscriptionForm {
  mentions: string;
}

export interface IFormuleFinaleTranscriptionForm {
  identiteDemandeur: keyof typeof EIdentiteDemandeur;
  nom: string;
  prenomsChemin: TPrenomsForm;
  qualite: string;
  pieceProduite: keyof typeof EPieceProduite;
  legalisationApostille: string;
  autresPieces: string;
  modeDepot: keyof typeof EModeDepot;
  identiteTransmetteur: keyof typeof EIdentiteTransmetteur;
}

export const ProjetActeNaissanceTranscriptionForm = {
  valeursInitiales: (
    requete: IRequeteCreationTranscription,
    projetActe: ProjetActeTranscrit | null
  ): IProjetActeTranscritForm /* NOSONAR */ => {
    const donneesTitulaireParents: Pick<IProjetActeTranscritForm, "titulaire" | "parents"> = projetActe
      ? (() => {
          const titulaireProjetActe = projetActe.titulaires?.[0];

          return {
            titulaire: {
              nomActeEtranger: titulaireProjetActe?.nomActeEtranger ?? "",
              nomRetenuOEC: titulaireProjetActe?.nom ?? "",
              nomSouhaite: "",
              nomSecable: {
                nomPartie1: titulaireProjetActe?.nomPartie1 ?? "",
                nomPartie2: titulaireProjetActe?.nomPartie2 ?? "",
                secable: Boolean(titulaireProjetActe?.nomPartie2)
              },
              prenomsChemin: PrenomsForm.valeursInitiales(
                titulaireProjetActe?.prenoms?.map((prenom: string, index: number) => ({ prenom: prenom, numeroOrdre: index + 1 })) ?? []
              ),
              sexe: titulaireProjetActe?.sexe ?? null,
              dateNaissance: DateHeureFormUtils.valeursDefauts(
                {
                  jour: titulaireProjetActe?.naissance?.jour?.toString(),
                  mois: titulaireProjetActe?.naissance?.mois?.toString(),
                  annee: titulaireProjetActe?.naissance?.annee?.toString(),
                  heure: projetActe.evenement?.heure?.toString(),
                  minute: projetActe.evenement?.minute?.toString()
                },
                true
              ),
              prepositionLieuNaissance: titulaireProjetActe?.naissance.preposition ?? "A",
              villeNaissance: titulaireProjetActe?.naissance.ville ?? "",
              regionNaissance: titulaireProjetActe?.naissance.region ?? "",
              paysNaissance: titulaireProjetActe?.naissance.pays ?? "",
              adresseNaissance: titulaireProjetActe?.naissance.voie ?? ""
            },
            parents: {
              parent1: mappingParentProjetActeVersParentForm(titulaireProjetActe.filiations.parent1),
              parent2: mappingParentProjetActeVersParentForm(titulaireProjetActe.filiations.parent2),
              domicileCommun: Boolean(titulaireProjetActe?.filiations.parent2?.domicileCommun)
            }
          };
        })()
      : (() => {
          const titulaire = TitulaireRequeteTranscription.getTitulaireTranscriptionDepuisTitulairesRequeteTranscription(requete.titulaires);
          const parents = ParentsRequeteTranscription.getDepuisTitulairesRequeteTranscription(requete.titulaires);

          return {
            titulaire: {
              nomActeEtranger: titulaire?.nomNaissance ?? "",
              nomRetenuOEC: "",
              nomSouhaite: titulaire?.nomSouhaite ?? "",
              nomSecable: {
                nomPartie1: "",
                nomPartie2: "",
                secable: false
              },
              prenomsChemin: PrenomsForm.valeursInitiales(titulaire?.prenoms ?? []),
              sexe: (titulaire?.sexe as keyof typeof ESexe) ?? null,
              dateNaissance: DateHeureFormUtils.valeursDefauts(
                {
                  jour: titulaire?.jourNaissance?.toString(),
                  mois: titulaire?.moisNaissance?.toString(),
                  annee: titulaire?.anneeNaissance?.toString()
                },
                true
              ),
              prepositionLieuNaissance: "A",
              villeNaissance: titulaire?.villeNaissance ?? "",
              regionNaissance: titulaire?.regionNaissance ?? "",
              paysNaissance: titulaire?.paysNaissance ?? "",
              adresseNaissance: ""
            },
            parents: {
              parent1: mappingParentRequeteVersParentForm(parents?.parent1),
              parent2: mappingParentRequeteVersParentForm(parents?.parent2),
              domicileCommun: false
            }
          };
        })();

    return {
      ...donneesTitulaireParents,
      declarant: {
        identite: projetActe?.declarant?.identiteDeclarant ?? "PERE",
        nom: projetActe?.declarant?.nom ?? "",
        prenomsChemin: PrenomsForm.valeursInitiales(projetActe?.declarant?.prenoms),
        sexe: projetActe?.declarant?.sexe ?? "INCONNU",
        age: projetActe?.declarant?.age?.toString() ?? "",
        qualite: projetActe?.declarant?.qualite ?? "",
        profession: projetActe?.declarant?.profession ?? "",
        sansProfession: Boolean(projetActe?.declarant?.sansProfession),
        domicile: {
          typeLieu: (() => {
            switch (true) {
              case Boolean(projetActe?.declarant.adresseDomicile?.pays):
                return projetActe?.declarant.adresseDomicile?.pays?.toUpperCase() === "FRANCE" ? "France" : "Étranger";
              case Boolean(projetActe?.declarant.adresseDomicile?.ville) || Boolean(projetActe?.declarant.adresseDomicile?.region):
                return "Étranger";
              default:
                return "Inconnu";
            }
          })(),
          ville: projetActe?.declarant.adresseDomicile?.ville ?? "",
          departement:
            projetActe?.declarant.adresseDomicile?.pays?.toUpperCase() === "FRANCE"
              ? (projetActe?.declarant.adresseDomicile?.region ?? "")
              : "",
          etatProvince:
            projetActe?.declarant.adresseDomicile?.pays?.toUpperCase() !== "FRANCE"
              ? (projetActe?.declarant.adresseDomicile?.region ?? "")
              : "",
          pays: projetActe?.declarant?.adresseDomicile?.pays ?? "",
          adresse: projetActe?.declarant?.adresseDomicile?.voie ?? "",
          arrondissement: projetActe?.declarant?.adresseDomicile?.arrondissement ?? ""
        },

        complement: projetActe?.declarant.complementDeclarant ?? ""
      },
      autresEnonciations: {
        enonciations: projetActe?.acteEtranger?.texteEnonciations ?? ""
      },
      acteEtranger: {
        typeActe: projetActe?.acteEtranger?.typeActeEtranger ?? "ACTE_DRESSE",
        infoTypeActe: projetActe?.acteEtranger?.infoTypeActe ?? "",
        dateEnregistrement: {
          jour: projetActe?.acteEtranger?.jourEnregistrement ?? "",
          mois: projetActe?.acteEtranger?.moisEnregistrement ?? "",
          annee: projetActe?.acteEtranger?.anneeEnregistrement ?? ""
        },
        lieuEnregistrement: {
          ville: projetActe?.acteEtranger?.adresseEnregistrement?.ville ?? "",
          etatProvince: projetActe?.acteEtranger?.adresseEnregistrement?.region ?? "",
          pays: projetActe?.acteEtranger?.adresseEnregistrement?.pays ?? "",
          preposition: projetActe?.acteEtranger?.adresseEnregistrement?.preposition ?? "A"
        },
        redacteur: projetActe?.acteEtranger?.redacteur ?? "",
        referenceComplement: projetActe?.acteEtranger?.reference ?? projetActe?.acteEtranger?.complement ?? ""
      },
      mentions: {
        mentions: projetActe?.acteEtranger?.mentions ?? ""
      },
      formuleFinale: {
        identiteDemandeur: projetActe?.formuleFinale.identiteDemandeur ?? "PARENT_1",
        nom: projetActe?.formuleFinale.nomDemandeur ?? "",
        prenomsChemin: PrenomsForm.depuisStringDto(projetActe?.formuleFinale.prenomDemandeur?.split(",") ?? []),
        qualite: projetActe?.formuleFinale.qualiteDemandeur ?? "",
        pieceProduite: projetActe?.formuleFinale.pieceProduite ?? "COPIE",
        autresPieces: projetActe?.formuleFinale.autresPieces || "",
        legalisationApostille: projetActe?.formuleFinale.legalisation ?? "",
        modeDepot: projetActe?.formuleFinale.modeDepot ?? "TRANSMISE",
        identiteTransmetteur: projetActe?.formuleFinale.identiteTransmetteur ?? "LE_REQUERANT"
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

    const AdresseSchemaValidationFormulaire = (prefix: string, estDeclarant = false) =>
      SchemaValidation.objet({
        typeLieu: SchemaValidation.texte({ obligatoire: false }),
        ville: SchemaValidation.texte({
          obligatoire: ConditionChamp.depuisTableau([
            {
              idChampReference: `${prefix}.typeLieu`,
              operateur: EOperateurCondition.EGAL,
              valeurs: ["France"]
            },
            ...(estDeclarant
              ? [
                  {
                    idChampReference: "declarant.identite",
                    operateur: EOperateurCondition.EGAL,
                    valeurs: ["TIERS"]
                  }
                ]
              : [])
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
            },
            ...(estDeclarant
              ? [
                  {
                    idChampReference: "declarant.identite",
                    operateur: EOperateurCondition.EGAL,
                    valeurs: ["TIERS"]
                  }
                ]
              : [])
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
        nom: SchemaValidation.texte({
          obligatoire:
            parentId === 1
              ? ConditionChamp.depuisTableau([
                  { idChampReference: "parents.parent1.prenomsChemin.prenom1", operateur: EOperateurCondition.EGAL, valeurs: [""] }
                ])
              : false
        }),
        prenomsChemin: SchemaValidation.prenoms(`${parentPrefix}.prenomsChemin.prenom`),
        sexe: SchemaValidation.texte({ obligatoire: false }).test(
          "sexe-required-if-nom-or-prenom",
          "Le sexe est obligatoire lorsque le nom ou le prénom est renseigné",
          function (valeurSexe) {
            const parent = this.parent;

            const aNom = parent.nom && parent.nom !== "";
            const aPrenom = parent.prenomsChemin.prenom1 && parent.prenomsChemin.prenom1 !== "";

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
      domicile: AdresseSchemaValidationFormulaire("declarant.domicile", true),
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
      pieceProduite: SchemaValidation.texte({ obligatoire: true }),
      legalisationApostille: SchemaValidation.texte({ obligatoire: false }),
      autresPieces: SchemaValidation.texte({
        obligatoire: ConditionChamp.depuisTableau([
          {
            idChampReference: "formuleFinale.pieceProduite",
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
      infoTypeActe: SchemaValidation.texte({
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
  },
  versDtoPost: (valeursSaisies: IProjetActeTranscritForm): IProjetActeTranscritPostDto => {
    const naissanceTitulaireEvenement: IEvenementProjetActeTranscritDto = {
      annee: Number(valeursSaisies.titulaire?.dateNaissance?.annee),
      mois: Number(valeursSaisies.titulaire?.dateNaissance?.mois) || undefined,
      jour: Number(valeursSaisies.titulaire?.dateNaissance?.jour) || undefined,
      heure: valeursSaisies.titulaire?.dateNaissance?.heure ? Number(valeursSaisies.titulaire.dateNaissance.heure) : undefined,
      minute: valeursSaisies.titulaire?.dateNaissance?.minute ? Number(valeursSaisies.titulaire.dateNaissance.minute) : undefined,
      pays: valeursSaisies.titulaire?.paysNaissance || undefined,
      ville: valeursSaisies.titulaire?.villeNaissance || undefined,
      region: valeursSaisies.titulaire?.regionNaissance || undefined,
      voie: valeursSaisies.titulaire?.adresseNaissance || undefined,
      neDansLeMariage: true
    };

    return {
      modeCreation: ETypeRedactionActe.TRANSCRIT,
      nature: "NAISSANCE",
      evenement: naissanceTitulaireEvenement,
      titulaires: [mapTitulaire(valeursSaisies, naissanceTitulaireEvenement)],
      acteEtranger: mapActeEtranger(valeursSaisies),
      formuleFinale: mapFormuleFinale(valeursSaisies),
      analyseMarginales: [],
      visibiliteArchiviste: TypeVisibiliteArchiviste.getKey(TypeVisibiliteArchiviste.NON),
      declarant: mapDeclarantProjectActe(valeursSaisies),
      mentions: []
    };
  },
  versDtoPatch: (valeursSaisies: IProjetActeTranscritForm, projetActe: ProjetActeTranscrit): IProjetActeTranscritPatchDto => ({
    ...ProjetActeNaissanceTranscriptionForm.versDtoPost(valeursSaisies),
    id: projetActe.id,
    statut: projetActe.statut,
    type: projetActe.type,
    evenement: {
      ...ProjetActeNaissanceTranscriptionForm.versDtoPost(valeursSaisies).evenement,
      id: projetActe?.evenement.id
    },
    analyseMarginales: projetActe.analysesMarginales[0]
      ? [
          {
            id: projetActe.analysesMarginales[0].id,
            estValide: projetActe.analysesMarginales[0].estValide,
            dateDebut: projetActe.analysesMarginales[0].dateDebut.versTimestamp(),
            dateFin: projetActe.analysesMarginales[0].dateFin?.versTimestamp(),
            titulaires: projetActe.analysesMarginales[0].titulaires[0]
              ? [
                  {
                    ordre: projetActe.analysesMarginales[0].titulaires[0].ordre,
                    nom: valeursSaisies.titulaire.nomRetenuOEC,
                    prenoms: PrenomsForm.versPrenomsStringDto(valeursSaisies.titulaire.prenomsChemin)
                  }
                ]
              : []
          }
        ]
      : []
  })
};

const mapDeclarantProjectActe = (projetActeTranscription: IProjetActeTranscritForm): IDeclarantProjetActeTranscritDto => {
  const estDeclarantTiers = projetActeTranscription.declarant.identite === "TIERS";

  return {
    ...(estDeclarantTiers
      ? {
          complementDeclarant: projetActeTranscription.declarant.complement || undefined,
          nom: projetActeTranscription.declarant.nom || undefined,
          prenoms: PrenomsForm.versPrenomsOrdonnesDto(projetActeTranscription.declarant.prenomsChemin) || undefined,
          sexe: projetActeTranscription.declarant.sexe || "",
          age: projetActeTranscription.declarant.age ? parseInt(projetActeTranscription.declarant.age) : undefined,
          qualite: projetActeTranscription.declarant?.qualite || undefined,
          sansProfession: projetActeTranscription.declarant.sansProfession || undefined,
          profession: projetActeTranscription.declarant?.profession || undefined,
          adresseDomicile: localisationVersAdresse(projetActeTranscription.declarant.domicile) || undefined
        }
      : declarantTranscritDtoVide),
    identiteDeclarant: projetActeTranscription.declarant.identite
  };
};

const localisationVersAdresse = (domicile: ILocalisation | undefined): IAdresse | null => {
  if (LieuxUtils.estPaysInconnu(domicile?.typeLieu)) return null;

  return {
    ville: domicile?.ville || undefined,
    arrondissement: (LieuxUtils.estPaysFrance(domicile?.typeLieu) && domicile?.arrondissement) || undefined,
    voie: domicile?.adresse ?? undefined,
    region: getRegionDomicile(domicile) ?? undefined,
    pays: (LieuxUtils.estPaysFrance(domicile?.typeLieu) ? "France" : domicile?.pays) ?? undefined
  };
};

const mapTitulaire = (
  projetActe: IProjetActeTranscritForm,
  naissanceTitulaireEvenement: IEvenementProjetActeTranscritDto
): ITitulaireProjetActeTranscritDto => {
  const titulaire: ITitulaireTranscriptionForm = projetActe.titulaire;
  const prenoms: string[] = PrenomsForm.versPrenomsStringDto(projetActe.titulaire?.prenomsChemin);
  return {
    nomActeEtranger: titulaire.nomActeEtranger,
    nom: titulaire.nomRetenuOEC,
    nomPartie1: titulaire.nomSecable.nomPartie1 || undefined,
    nomPartie2: titulaire.nomSecable.nomPartie2 || undefined,
    prenoms,
    sexe: titulaire.sexe,
    ordre: 1,
    naissance: { ...naissanceTitulaireEvenement },
    pasDePrenom: !prenoms.length,
    filiations: mapFiliations(projetActe)
  };
};

const mapFiliationParParent = (
  parentForm: IParentTranscriptionForm,
  ordre: number,
  domicileCommun: boolean = false
): IFiliationTitulaireProjetActeTranscritDto => {
  return {
    nom: parentForm.nom ?? "", // Nom est toujours défini, la condition est vérifiée avant l'appel de la fonction
    prenoms: PrenomsForm.versPrenomsStringDto(parentForm.prenomsChemin),
    sexe: parentForm.sexe || undefined,
    naissance: mapFiliationNaissance(parentForm),
    lienParente: LienParente.PARENT,
    ordre,
    age: Number(parentForm.age) || undefined,
    sansProfession: parentForm.sansProfession,
    profession: parentForm.profession || undefined,
    domicile: ((ordre === 1 || !domicileCommun) && mapFiliationDomicile(parentForm)) || undefined,
    domicileCommun: (ordre === 2 && domicileCommun) || undefined
  };
};

const mapFiliationDomicile = (parentForm: IParentTranscriptionForm): IAdresse => {
  const lieuDomicileConnu = !LieuxUtils.estPaysInconnu(parentForm.domicile?.typeLieu);
  const lieuDomicileEstFrance = LieuxUtils.estPaysFrance(parentForm.domicile?.typeLieu);

  return {
    pays: (lieuDomicileConnu && (lieuDomicileEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.domicile?.pays)) || "",
    ville: (lieuDomicileConnu && parentForm.domicile?.ville) || undefined,
    region: getRegionDomicile(parentForm.domicile),
    arrondissement:
      (lieuDomicileEstFrance && LieuxUtils.estVilleMarseilleLyonParis(parentForm.domicile?.ville) && parentForm.domicile?.arrondissement) ||
      undefined,
    voie: (lieuDomicileConnu && parentForm.domicile?.adresse) || undefined
  };
};

const getRegionDomicile = (domicile?: ILocalisation): string => {
  if (!domicile) return "";

  switch (true) {
    case LieuxUtils.estPaysEtranger(domicile?.typeLieu):
      return domicile?.etatProvince ?? "";
    case LieuxUtils.estPaysFrance(domicile?.typeLieu):
      return (!LieuxUtils.estVilleParis(domicile?.ville) && domicile?.departement) || "";
    default:
      return "";
  }
};

const mapFiliationNaissance = (parentForm: IParentTranscriptionForm): IEvenementProjetActeTranscritDto => {
  const lieuNaissanceConnu = !LieuxUtils.estPaysInconnu(parentForm.lieuNaissance?.typeLieu);
  const lieuNaissanceEstFrance = LieuxUtils.estPaysFrance(parentForm.lieuNaissance?.typeLieu);

  return {
    annee: Number(parentForm.dateNaissance?.annee) || undefined,
    mois: Number(parentForm.dateNaissance?.mois) || undefined,
    jour: Number(parentForm.dateNaissance?.jour) || undefined,
    heure: parentForm.dateNaissance?.heure ? Number(parentForm.dateNaissance?.heure) : undefined,
    minute: parentForm.dateNaissance?.minute ? Number(parentForm.dateNaissance?.minute) : undefined,
    ville: (lieuNaissanceConnu && parentForm.lieuNaissance?.ville) || undefined,
    arrondissement:
      (lieuNaissanceEstFrance &&
        LieuxUtils.estVilleMarseilleLyonParis(parentForm.lieuNaissance?.ville) &&
        parentForm.lieuNaissance?.arrondissement) ||
      undefined,
    region: getRegionNaissanceFiliation(parentForm),
    pays: (lieuNaissanceConnu && (lieuNaissanceEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.lieuNaissance?.pays)) || undefined,
    voie: (lieuNaissanceConnu && parentForm.lieuNaissance?.adresse) || undefined,
    departement:
      (lieuNaissanceEstFrance && !LieuxUtils.estVilleParis(parentForm.lieuNaissance?.ville) && parentForm.lieuNaissance?.departement) ||
      undefined
  };
};

const getRegionNaissanceFiliation = (parentForm: IParentTranscriptionForm): string | undefined => {
  switch (true) {
    case LieuxUtils.estPaysEtranger(parentForm.lieuNaissance?.typeLieu):
      return parentForm.lieuNaissance?.etatProvince || undefined;
    case LieuxUtils.estPaysFrance(parentForm.lieuNaissance?.typeLieu):
      return (!LieuxUtils.estVilleParis(parentForm.lieuNaissance?.ville) && parentForm.lieuNaissance?.departement) || undefined;
    default:
      return undefined;
  }
};

const mapFiliations = (projetActe: IProjetActeTranscritForm): IFiliationTitulaireProjetActeTranscritDto[] => {
  let filiation: IFiliationTitulaireProjetActeTranscritDto[] = [];
  const listeParents = [];
  projetActe.parents.parent1 && estParentRenseigne(projetActe.parents.parent1) && listeParents.push(projetActe.parents.parent1);
  projetActe.parents.parent2 && estParentRenseigne(projetActe.parents.parent2) && listeParents.push(projetActe.parents.parent2);
  listeParents.forEach((parent, index) => {
    const ordreDuParent = index + 1;
    filiation = [...filiation, mapFiliationParParent(parent, ordreDuParent, projetActe.parents?.domicileCommun)];
  });
  return filiation;
};

const estParentRenseigne = (parent: IParentTranscriptionForm): boolean => {
  return Boolean(parent.nom) || Boolean(parent.prenomsChemin?.prenom1);
};

const mapFormuleFinale = (projetActe: IProjetActeTranscritForm): IFormuleFinaleDto => {
  return {
    identiteDemandeur: projetActe.formuleFinale.identiteDemandeur,
    nomDemandeur: projetActe.formuleFinale?.nom || undefined,
    prenomDemandeur: PrenomsForm.versPrenomsStringDto(projetActe.formuleFinale?.prenomsChemin).join(", ") || undefined,
    qualiteDemandeur: projetActe.formuleFinale?.qualite || undefined,
    pieceProduite: projetActe.formuleFinale.pieceProduite,
    legalisation: (projetActe.formuleFinale.legalisationApostille as keyof typeof ELegalisationApostille) || undefined,
    autresPieces: projetActe.formuleFinale?.autresPieces || undefined,
    modeDepot: projetActe.formuleFinale.modeDepot,
    identiteTransmetteur: projetActe.formuleFinale.identiteTransmetteur,
    nomTransmetteur: projetActe.formuleFinale.nom || undefined
  };
};

const mapActeEtranger = (projetActe: IProjetActeTranscritForm): IActeEtrangerDto => {
  return {
    texteEnonciations: projetActe.autresEnonciations?.enonciations || undefined,
    typeActeEtranger: projetActe.acteEtranger?.typeActe || undefined,
    infoTypeActe: projetActe.acteEtranger?.infoTypeActe || undefined,
    cadreNaissance: CadreNaissance.NE_DANS_LE_MARIAGE,
    jourEnregistrement: projetActe.acteEtranger.dateEnregistrement?.jour || undefined,
    moisEnregistrement: projetActe.acteEtranger.dateEnregistrement?.mois || undefined,
    anneeEnregistrement: projetActe.acteEtranger.dateEnregistrement?.annee || undefined,
    adresseEnregistrement: {
      ville: projetActe.acteEtranger.lieuEnregistrement?.ville || undefined,
      region: projetActe.acteEtranger.lieuEnregistrement?.etatProvince || undefined,
      pays: projetActe.acteEtranger.lieuEnregistrement?.pays || undefined
    },
    redacteur: projetActe.acteEtranger?.redacteur || undefined,
    reference: projetActe.acteEtranger?.referenceComplement || undefined,
    complement: projetActe.acteEtranger?.referenceComplement || undefined,
    mentions: projetActe.mentions.mentions || undefined
  };
};

const determinerTypeLieu = (pays?: string, ville?: string, region?: string): "France" | "Étranger" | "Inconnu" => {
  if (pays) {
    return pays.toUpperCase().trim() === "FRANCE" ? "France" : "Étranger";
  }

  if (ville || region) {
    return "Étranger";
  }

  return "Inconnu";
};

export const mappingParentRequeteVersParentForm = (parentRequete?: IParentRequeteTranscription): IParentTranscriptionForm => {
  const estNaissanceFranceOuEtranger = determinerTypeLieu(
    parentRequete?.paysNaissance,
    parentRequete?.villeNaissance,
    parentRequete?.regionNaissance
  );

  const estDomicileFranceOuEtranger = determinerTypeLieu(
    parentRequete?.domiciliation?.pays,
    parentRequete?.domiciliation?.ville,
    parentRequete?.domiciliation?.departement ?? parentRequete?.domiciliation?.etatProvince
  );

  return {
    sexe: parentRequete?.sexe ?? "",
    nom: parentRequete?.nomUsage ?? parentRequete?.nomNaissance ?? "",
    prenomsChemin: PrenomsForm.valeursInitiales(parentRequete?.prenoms),
    dateNaissance: DateHeureFormUtils.valeursDefauts({
      jour: parentRequete?.jourNaissance?.toString(),
      mois: parentRequete?.moisNaissance?.toString(),
      annee: parentRequete?.anneeNaissance?.toString()
    }),
    lieuNaissance: {
      typeLieu: estNaissanceFranceOuEtranger,
      preposition: "A",
      ville: parentRequete?.villeNaissance ?? "",
      departement: estNaissanceFranceOuEtranger === "France" ? parentRequete?.regionNaissance : "",
      etatProvince: estNaissanceFranceOuEtranger === "Étranger" ? parentRequete?.regionNaissance : "",
      arrondissement: parentRequete?.arrondissementNaissance ?? "",
      pays: parentRequete?.paysNaissance ?? "",
      adresse: ""
    },
    domicile: {
      typeLieu: estDomicileFranceOuEtranger,
      ville: parentRequete?.domiciliation?.ville ?? "",
      preposition: "A",
      adresse: parentRequete?.domiciliation?.adresse ?? "",
      departement: estDomicileFranceOuEtranger === "France" ? parentRequete?.domiciliation?.departement : "",
      arrondissement: parentRequete?.domiciliation?.arrondissement ?? "",
      pays: parentRequete?.domiciliation?.pays ?? "",
      etatProvince: estDomicileFranceOuEtranger === "Étranger" ? parentRequete?.domiciliation?.etatProvince : ""
    },
    renseignerAge: false,
    age: "",
    sansProfession: false,
    profession: ""
  };
};

const mappingParentProjetActeVersParentForm = (
  parentProjetActe?: FiliationTitulaireProjetActeTranscrit | null
): IParentTranscriptionForm => {
  const estNaissanceFranceOuEtranger = determinerTypeLieu(
    parentProjetActe?.naissance?.pays,
    parentProjetActe?.naissance?.ville,
    parentProjetActe?.naissance?.region
  );

  const estDomicileFranceOuEtranger = determinerTypeLieu(
    parentProjetActe?.domicile?.pays,
    parentProjetActe?.domicile?.ville,
    parentProjetActe?.domicile?.region
  );

  return {
    sexe: parentProjetActe?.sexe ?? "",
    nom: parentProjetActe?.nom ?? "",
    prenomsChemin: PrenomsForm.valeursInitiales(
      parentProjetActe?.prenoms?.map((prenom: string, index: number) => ({ prenom: prenom, numeroOrdre: index + 1 }))
    ),
    dateNaissance: DateHeureFormUtils.valeursDefauts({
      jour: parentProjetActe?.naissance?.jour?.toString(),
      mois: parentProjetActe?.naissance?.mois?.toString(),
      annee: parentProjetActe?.naissance?.annee?.toString()
    }),
    lieuNaissance: {
      typeLieu: estNaissanceFranceOuEtranger,
      preposition: parentProjetActe?.naissance?.preposition ?? "A",
      ville: parentProjetActe?.naissance?.ville ?? "",
      departement: estNaissanceFranceOuEtranger === "France" ? parentProjetActe?.naissance?.region : "",
      etatProvince: estNaissanceFranceOuEtranger === "Étranger" ? parentProjetActe?.naissance?.region : "",
      arrondissement: parentProjetActe?.naissance?.arrondissement ?? "",
      pays: parentProjetActe?.naissance?.pays ?? "",
      adresse: parentProjetActe?.naissance?.voie ?? ""
    },
    sansProfession: parentProjetActe?.sansProfession ?? false,
    profession: parentProjetActe?.profession ?? "",
    domicile: {
      typeLieu: estDomicileFranceOuEtranger,
      preposition: parentProjetActe?.domicile?.preposition ?? "A",
      ville: parentProjetActe?.domicile?.ville ?? "",
      adresse: parentProjetActe?.domicile?.voie ?? "",
      departement: estDomicileFranceOuEtranger === "France" ? parentProjetActe?.domicile?.region : "",
      arrondissement: parentProjetActe?.domicile?.arrondissement ?? "",
      pays: parentProjetActe?.domicile?.pays ?? "",
      etatProvince: estDomicileFranceOuEtranger === "Étranger" ? parentProjetActe?.domicile?.region : ""
    },
    renseignerAge: (parentProjetActe?.age && !parentProjetActe?.naissance?.annee) || false,
    age: parentProjetActe?.age?.toString() ?? ""
  };
};
