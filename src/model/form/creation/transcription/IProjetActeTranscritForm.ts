/* v8 ignore start a faire Lundi 31 Mars @ Adrien_Bonvin */
import { IActeEtrangerDto } from "@model/etatcivil/acte/IActeEtrangerDto";
import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import {
  EIdentiteDeclarant,
  IDeclarantProjetActeTranscritDto,
  declarantTranscritDtoVide
} from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/DeclarantProjetActeTranscrit";
import { IEvenementProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/EvenementProjetActeTranscrit";
import { IFiliationTitulaireProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/FiliationTitulaireProjetActeTranscrit";
import {
  EIdentiteDemandeur,
  EIdentiteTransmetteur,
  IFormuleFinaleDto
} from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/FormuleFinale";
import {
  IProjetActeTranscritPatchDto,
  IProjetActeTranscritPostDto,
  ProjetActeTranscrit
} from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";
import { ITitulaireProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/TitulaireProjetActeTranscrit";
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
import { IDateForm } from "@model/form/commun/DateForm";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { ILocalisation } from "@model/requete/IParents";
import { IParentTranscription, ParentsRequeteTranscription } from "@model/requete/IParentsRequeteTranscription";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TitulaireRequeteTranscription } from "@model/requete/ITitulaireRequeteTranscription";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
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

export interface IActeEtrangerTranscription {
  typeActe?: string;
  infoTypeActe?: string;
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
  nomActeEtranger: string;
  nomRetenuOEC: string;
  nomSouhaite: string | null;
  prenomsChemin?: TPrenomsForm;
  nomSecable: NomSecable;
  sexe: keyof typeof ESexe;
  dateNaissance: IDateForm | null;
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
  identite: keyof typeof EIdentiteDeclarant;
  nom: string | null;
  prenomsChemin?: TPrenomsForm;
  sexe: keyof typeof ESexe | null;
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
  identiteDemandeur: keyof typeof EIdentiteDemandeur;
  nom?: string | null;
  prenomsChemin?: TPrenomsForm;
  qualite?: string | null;
  pieceProduite: keyof typeof EPieceProduite;
  legalisationApostille: string;
  autresPieces?: string | null;
  modeDepot: string;
  identiteTransmetteur: keyof typeof EIdentiteTransmetteur;
}

export const ProjetTranscriptionForm = {
  valeursInitiales: (requete: IRequeteCreationTranscription, projetActe: ProjetActeTranscrit | null): IProjetActeTranscritForm => {
    const titulaire = TitulaireRequeteTranscription.getTitulaireTranscriptionDepuisTitulairesRequeteTranscription(requete.titulaires);
    const parents = ParentsRequeteTranscription.getParentsRequeteTranscription(requete.titulaires);
    return {
      titulaire: TitulaireRequeteTranscription.mappingTitulaireRequeteTranscriptionVersTitulaireForm(
        titulaire,
        projetActe?.titulaires?.[0],
        projetActe?.evenement
      ),
      parents: {
        parent1: ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(
          parents?.parent1,
          projetActe?.titulaires?.[0].filiations.parent1
        ),
        parent2: ParentsRequeteTranscription.mappingParentRequeteTranscriptionVersParentForm(
          parents?.parent2,
          projetActe?.titulaires?.[0].filiations.parent2
        ),
        domicileCommun: Boolean(projetActe?.titulaires?.[0].filiations.parent2?.domicileCommun)
      },
      declarant: {
        identite: projetActe?.declarant.identiteDeclarant ?? "PERE",
        nom: projetActe?.declarant.nom ?? "",
        prenomsChemin: PrenomsForm.valeursInitiales(projetActe?.declarant.prenoms),
        sexe: projetActe?.declarant.sexe ?? null,
        age: projetActe?.declarant.age,
        qualite: projetActe?.declarant.qualite ?? "",
        profession: projetActe?.declarant.profession ?? "",
        sansProfession: Boolean(projetActe?.declarant.sansProfession),
        domicile: {
          typeLieu: (() => {
            switch (true) {
              case Boolean(projetActe?.declarant.adresseDomicile?.pays):
                return projetActe?.declarant.adresseDomicile?.pays?.toUpperCase().trim() === "FRANCE" ? "France" : "Étranger";
              case Boolean(projetActe?.declarant.adresseDomicile?.ville) || Boolean(projetActe?.declarant.adresseDomicile?.region):
                return "Étranger";
              default:
                return "Inconnu";
            }
          })(),
          ville: projetActe?.declarant.adresseDomicile?.ville ?? "",
          departement:
            projetActe?.declarant.adresseDomicile?.pays?.toUpperCase().trim() === "FRANCE"
              ? (projetActe?.declarant.adresseDomicile?.region ?? "")
              : "",
          etatProvince:
            projetActe?.declarant.adresseDomicile?.pays?.toUpperCase().trim() !== "FRANCE"
              ? (projetActe?.declarant.adresseDomicile?.region ?? "")
              : "",
          pays: projetActe?.declarant.adresseDomicile?.pays ?? "",
          adresse: projetActe?.declarant.adresseDomicile?.voie ?? ""
        },

        complement: projetActe?.declarant.complementDeclarant ?? ""
      },
      autresEnonciations: {
        enonciations: projetActe?.acteEtranger.texteEnonciations ?? ""
      },
      acteEtranger: {
        typeActe: projetActe?.acteEtranger.typeActeEtranger ?? "ACTE_DRESSE",
        infoTypeActe: projetActe?.acteEtranger.infoTypeActe ?? "",
        dateEnregistrement: {
          jour: projetActe?.acteEtranger.jourEnregistrement ?? "",
          mois: projetActe?.acteEtranger.moisEnregistrement ?? "",
          annee: projetActe?.acteEtranger.anneeEnregistrement ?? ""
        },
        lieuEnregistrement: {
          ville: projetActe?.acteEtranger.adresseEnregistrement?.ville ?? "",
          etatProvince: projetActe?.acteEtranger.adresseEnregistrement?.region ?? "",
          pays: projetActe?.acteEtranger.adresseEnregistrement?.pays ?? ""
        },
        redacteur: projetActe?.acteEtranger.redacteur ?? "",
        referenceComplement: projetActe?.acteEtranger.reference ?? projetActe?.acteEtranger.complement ?? ""
      },
      mentions: {
        mentions: projetActe?.acteEtranger.mentions ?? ""
      },
      formuleFinale: {
        identiteDemandeur: projetActe?.formuleFinale.identiteDemandeur ?? "PARENT_1",
        nom: projetActe?.formuleFinale.nomDemandeur ?? "",
        prenomsChemin: PrenomsForm.depuisStringDto(projetActe?.formuleFinale.prenomDemandeur?.split(",") ?? []),
        qualite: projetActe?.formuleFinale.qualiteDemandeur ?? "",
        pieceProduite: projetActe?.formuleFinale.pieceProduite ?? "COPIE",
        autresPieces: projetActe?.formuleFinale.autresPieces ?? "",
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
      annee: Number(valeursSaisies.titulaire?.dateNaissance?.annee) || null,
      mois: Number(valeursSaisies.titulaire?.dateNaissance?.mois) || null,
      jour: Number(valeursSaisies.titulaire?.dateNaissance?.jour) || null,
      heure: valeursSaisies.titulaire?.dateNaissance?.heure ? Number(valeursSaisies.titulaire.dateNaissance.heure) : null,
      minute: valeursSaisies.titulaire?.dateNaissance?.minute ? Number(valeursSaisies.titulaire.dateNaissance.minute) : null,
      pays: valeursSaisies.titulaire?.paysNaissance || null,
      ville: valeursSaisies.titulaire?.villeNaissance || null,
      region: valeursSaisies.titulaire?.regionNaissance || null,
      voie: valeursSaisies.titulaire?.adresseNaissance || null,
      neDansLeMariage: true,
      arrondissement: null,
      departement: null
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
    ...ProjetTranscriptionForm.versDtoPost(valeursSaisies),
    id: projetActe.id,
    statut: projetActe.statut,
    type: projetActe.type,
    evenement: {
      ...ProjetTranscriptionForm.versDtoPost(valeursSaisies).evenement,
      id: projetActe?.evenement.id
    },
    analyseMarginales: projetActe.analysesMarginales[0]
      ? [
          {
            ...projetActe.analysesMarginales[0],
            dateDebut: projetActe.analysesMarginales[0].dateDebut.versTimestamp(),
            dateFin: projetActe.analysesMarginales[0].dateFin?.versTimestamp(),
            titulaires: projetActe.analysesMarginales[0].titulaires[0]
              ? [
                  {
                    ...projetActe.analysesMarginales[0].titulaires[0],
                    nom: valeursSaisies.titulaire.nomRetenuOEC.trim(),
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
  const estDeclarantTiers = projetActeTranscription.declarant.identite === ("TIERS" as keyof typeof EIdentiteDeclarant);

  return {
    ...(estDeclarantTiers
      ? {
          complementDeclarant: projetActeTranscription.declarant.complement ?? null,
          nom: projetActeTranscription.declarant.nom ?? null,
          prenoms: PrenomsForm.versPrenomsOrdonnesDto(projetActeTranscription.declarant.prenomsChemin) ?? null,
          sexe: projetActeTranscription.declarant.sexe ?? "INCONNU",
          age: projetActeTranscription.declarant.age ?? null,
          qualite: projetActeTranscription.declarant?.qualite ?? null,
          sansProfession: projetActeTranscription.declarant.sansProfession || null,
          profession: projetActeTranscription.declarant?.profession ?? null,
          adresseDomicile: localisationVersAdresse(projetActeTranscription.declarant.domicile) ?? null
        }
      : declarantTranscritDtoVide),
    identiteDeclarant: projetActeTranscription.declarant.identite
  };
};

const localisationVersAdresse = (domicile: ILocalisation | undefined): IAdresse | null => {
  if (LieuxUtils.estPaysInconnu(domicile?.typeLieu)) return null;

  return {
    ville: domicile?.ville ?? "",
    arrondissement: (LieuxUtils.estPaysFrance(domicile?.typeLieu) && domicile?.arrondissement) || "",
    voie: domicile?.adresse ?? "",
    region: getRegionDomicile(domicile) ?? "",
    pays: (LieuxUtils.estPaysFrance(domicile?.typeLieu) ? "France" : domicile?.pays) ?? ""
  };
};

const mapTitulaire = (
  projetActe: IProjetActeTranscritForm,
  naissanceTitulaireEvenement: IEvenementProjetActeTranscritDto
): ITitulaireProjetActeTranscritDto => {
  const Titulaire: ITitulaireTranscription = projetActe.titulaire;
  const prenoms: string[] = PrenomsForm.versPrenomsStringDto(projetActe.titulaire?.prenomsChemin);
  const lieuDeNaissanceConnu = !LieuxUtils.estPaysInconnu(Titulaire.paysNaissance?.trim() ?? "Inconnu");
  return {
    nomActeEtranger: Titulaire.nomActeEtranger,
    nom: Titulaire.nomRetenuOEC.trim(),
    nomPartie1: Titulaire.nomSecable.nomPartie1 || null,
    nomPartie2: Titulaire.nomSecable.nomPartie2 || null,
    prenoms,
    sexe: Titulaire.sexe,
    ordre: 1,
    naissance: { ...naissanceTitulaireEvenement },
    pasDePrenom: !prenoms.length,
    domicile: lieuDeNaissanceConnu
      ? {
          ville: Titulaire.villeNaissance ?? "",
          region: Titulaire.regionNaissance ?? "",
          pays: Titulaire.paysNaissance ?? "",
          voie: Titulaire.adresseNaissance ?? ""
        }
      : null,
    filiations: mapFiliations(projetActe)
  };
};

const mapFiliationParParent = (
  parentForm: IParentTranscription,
  ordre: number,
  domicileCommun: boolean = false
): IFiliationTitulaireProjetActeTranscritDto => {
  return {
    nom: parentForm.nom?.trim() ?? "", // Nom est toujours défini, la condition est vérifiée avant l'appel de la fonction
    prenoms: PrenomsForm.versPrenomsStringDto(parentForm.prenomsChemin),
    sexe: (parentForm.sexe as keyof typeof ESexe) ?? null,
    naissance: mapFiliationNaissance(parentForm),
    lienParente: LienParente.PARENT,
    ordre,
    age: Number(parentForm.age) || null,
    sansProfession: parentForm.sansProfession ?? null,
    profession: parentForm.profession ?? null,
    domicile: ((ordre === 1 || !domicileCommun) && mapFiliationDomicile(parentForm)) || null,
    domicileCommun: (ordre === 2 && domicileCommun) || null
  };
};

const mapFiliationDomicile = (parentForm: IParentTranscription): IAdresse => {
  const lieuDomicileConnu = !LieuxUtils.estPaysInconnu(parentForm.domicile?.typeLieu);
  const lieuDomicileEstFrance = LieuxUtils.estPaysFrance(parentForm.domicile?.typeLieu);

  return {
    pays: (lieuDomicileConnu && (lieuDomicileEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.domicile?.pays)) || "",
    ville: (lieuDomicileConnu && parentForm.domicile?.ville) || "",
    region: getRegionDomicile(parentForm.domicile),
    arrondissement:
      (lieuDomicileEstFrance &&
        LieuxUtils.estVilleMarseilleLyonParis(parentForm.domicile?.ville?.trim()) &&
        parentForm.domicile?.arrondissement) ||
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
      return (!LieuxUtils.estVilleParis(domicile?.ville?.trim()) && domicile?.departement) || "";
    default:
      return "";
  }
};

const mapFiliationNaissance = (parentForm: IParentTranscription): IEvenementProjetActeTranscritDto => {
  const lieuNaissanceConnu = !LieuxUtils.estPaysInconnu(parentForm.lieuNaissance?.typeLieu);
  const lieuNaissanceEstFrance = LieuxUtils.estPaysFrance(parentForm.lieuNaissance?.typeLieu);

  return {
    annee: Number(parentForm.dateNaissance?.annee) || null,
    mois: Number(parentForm.dateNaissance?.mois) || null,
    jour: Number(parentForm.dateNaissance?.jour) || null,
    heure: parentForm.dateNaissance?.heure ? Number(parentForm.dateNaissance?.heure) : null,
    minute: parentForm.dateNaissance?.minute ? Number(parentForm.dateNaissance?.minute) : null,
    neDansLeMariage: null,
    ville: (lieuNaissanceConnu && parentForm.lieuNaissance?.ville) || null,
    arrondissement:
      (lieuNaissanceEstFrance &&
        LieuxUtils.estVilleMarseilleLyonParis(parentForm.lieuNaissance?.ville?.trim()) &&
        parentForm.lieuNaissance?.arrondissement) ||
      null,
    region: getRegionNaissanceFiliation(parentForm),
    pays: (lieuNaissanceConnu && (lieuNaissanceEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.lieuNaissance?.pays)) || null,
    voie: (lieuNaissanceConnu && parentForm.lieuNaissance?.adresse) || null,
    departement:
      (lieuNaissanceEstFrance &&
        !LieuxUtils.estVilleParis(parentForm.lieuNaissance?.ville?.trim()) &&
        parentForm.lieuNaissance?.departement) ||
      null
  };
};

const getRegionNaissanceFiliation = (parentForm: IParentTranscription): string | null => {
  switch (true) {
    case LieuxUtils.estPaysEtranger(parentForm.lieuNaissance?.typeLieu):
      return parentForm.lieuNaissance?.etatProvince || null;
    case LieuxUtils.estPaysFrance(parentForm.lieuNaissance?.typeLieu):
      return (!LieuxUtils.estVilleParis(parentForm.lieuNaissance?.ville?.trim()) && parentForm.lieuNaissance?.departement) || null;
    default:
      return null;
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

const estParentRenseigne = (parent: IParentTranscription): boolean => {
  return Boolean(parent.nom) || Boolean(parent.prenomsChemin?.prenom1);
};

const mapFormuleFinale = (projetActe: IProjetActeTranscritForm): IFormuleFinaleDto => {
  return {
    identiteDemandeur: projetActe.formuleFinale.identiteDemandeur || null,
    nomDemandeur: projetActe.formuleFinale?.nom ?? null,
    prenomDemandeur: PrenomsForm.versPrenomsStringDto(projetActe.formuleFinale?.prenomsChemin).join(", ") || null,
    qualiteDemandeur: projetActe.formuleFinale?.qualite ?? null,
    pieceProduite: (projetActe.formuleFinale.pieceProduite as keyof typeof EPieceProduite) || null,
    legalisation: (projetActe.formuleFinale.legalisationApostille as keyof typeof ELegalisationApostille) || null,
    autresPieces: projetActe.formuleFinale?.autresPieces ?? null,
    modeDepot: (projetActe.formuleFinale.modeDepot as keyof typeof EModeDepot) || null,
    identiteTransmetteur: projetActe.formuleFinale.identiteTransmetteur || null,
    nomTransmetteur: projetActe.formuleFinale.nom || null
  };
};

const mapActeEtranger = (projetActe: IProjetActeTranscritForm): IActeEtrangerDto => {
  return {
    texteEnonciations: projetActe.autresEnonciations?.enonciations ?? null,
    typeActeEtranger: projetActe.acteEtranger?.typeActe ?? null,
    infoTypeActe: projetActe.acteEtranger?.infoTypeActe || "",
    cadreNaissance: CadreNaissance.NE_DANS_LE_MARIAGE,
    jourEnregistrement: projetActe.acteEtranger.dateEnregistrement?.jour ?? null,
    moisEnregistrement: projetActe.acteEtranger.dateEnregistrement?.mois ?? null,
    anneeEnregistrement: projetActe.acteEtranger.dateEnregistrement?.annee ?? null,
    adresseEnregistrement: {
      ville: projetActe.acteEtranger.lieuEnregistrement?.ville ?? "",
      region: projetActe.acteEtranger.lieuEnregistrement?.etatProvince ?? "",
      pays: projetActe.acteEtranger.lieuEnregistrement?.pays ?? ""
    },
    redacteur: projetActe.acteEtranger?.redacteur ?? null,
    reference: projetActe.acteEtranger?.referenceComplement || null,
    complement: projetActe.acteEtranger?.referenceComplement || null,
    mentions: projetActe.mentions.mentions ?? null
  };
};
/* v8 ignore end */
