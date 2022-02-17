import {
  AnalyseMarginale,
  IAnalyseMarginale
} from "../../../../model/etatcivil/acte/IAnalyseMarginale";
import {
  DEUX,
  getValeurOuVide,
  TROIS,
  UN,
  ZERO
} from "../../../../views/common/util/Utils";
import { EtatCivilUtil } from "../../../../views/common/utilMetier/EtatCivilUtil";
import { LieuxUtils } from "../../../../views/common/utilMetier/LieuxUtils";
import { FicheActe, IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import {
  ITitulaireActe,
  TitulaireActe
} from "../../../etatcivil/acte/ITitulaireActe";
import { LienParente } from "../../../etatcivil/enum/LienParente";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { Sexe } from "../../../etatcivil/enum/Sexe";
import { TypeExtrait } from "../../../etatcivil/enum/TypeExtrait";
import { LIBELLE_FONCTION_AGENT_1 } from "../../../parametres/clesParametres";
import { ParametreBaseRequete } from "../../../parametres/enum/ParametresBaseRequete";
import { ChoixDelivrance } from "../../../requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../requete/enum/SousTypeDelivrance";
import { Validation } from "../../../requete/enum/Validation";
import { CommunComposition } from "../../commun/ICommunComposition";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";

export interface IActeCompositionEC {
  leouEnEvenement: string;
  dateEvenement: string;
  heureEvenement: string;
  lieuEvenement: string;
}

export interface ITitulaireCompositionEC {
  prenoms: string;
  nom: string;
  partiesNom: string;
  lieuNaissance: string;
  dateNaissanceOuAge: string;
  parentsTitulaire: IParentsTitulaireCompositionEC[];
  sexe: Sexe;
}

export interface ITitulaireAMCompositionEC {
  prenoms: string;
  nom: string;
}

export interface IParentsTitulaireCompositionEC {
  prenoms: string;
  nom: string;
  lienParente: string;
  filsOuFille: string;
}

interface ICreerExtraitCopieActeTexteParams {
  acte: IFicheActe;
  natureActe: string;
  choixDelivrance: ChoixDelivrance;
  sousTypeRequete: SousTypeDelivrance;
  validation: Validation;
  avecFiliation: boolean;
  copie: boolean;
  archive: boolean;
  getCorpsTexte?: string;
  erreur?: string;
}

export class CommunExtraitOuCopieActeTexteComposition {
  public static readonly FORMULE_SIGNATURE_DELIVRANCE = [
    "Copie délivrée selon procédé informatisé",
    "Extrait délivré selon procédé informatisé",
    "Données contenues dans la copie d’acte transmises par le Service central d’état civil n’ayant pas valeur authentique",
    "Cette transcription ne tient pas lieu d’acte de naissance"
  ];

  public static creerExtraitCopieActeTexte(
    params: ICreerExtraitCopieActeTexteParams
  ) {
    const composition = {} as IExtraitCopieComposition;

    // Filigrane archive (le bloc de signature sera automatiquement masqué)
    composition.filigrane_archive = params.archive;

    // Création de l'entête
    CommunExtraitOuCopieActeTexteComposition.creerReferenceActeEtDateDuJour(
      composition,
      params.acte
    );

    // Type et nature de document
    composition.type_document = params.copie ? "COPIE" : "EXTRAIT";
    composition.nature_acte = params.natureActe;

    CommunExtraitOuCopieActeTexteComposition.creerAnalyseMarginale(
      composition,
      params.acte
    );

    // Récupération de l'éventuelle rectification qui remplacera le corps
    const corpsExtraitRectification =
      FicheActe.getCorpsExtraitRectificationTexte(
        params.acte,
        params.avecFiliation
          ? TypeExtrait.EXTRAIT_AVEC_FILIATION
          : TypeExtrait.EXTRAIT_SANS_FILIATION
      );

    // Erreur (Dans le cas d'un manque d'information pour la génération du document)
    composition.erreur = params.erreur;

    if (!params.erreur) {
      if (params.copie && params.acte.corpsText) {
        // Une copie est demandée (et non un extrait) pour un acte texte
        composition.corps_texte = params.acte.corpsText;
      } else if (corpsExtraitRectification) {
        // L'acte comporte un corps d'extrait modifié correspondant au type d'extrait traité : extrait avec ou sans filiation
        composition.corps_texte = corpsExtraitRectification;
      } else {
        composition.corps_texte = params.getCorpsTexte;
      }  
    }

    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(
      composition,
      params.choixDelivrance,
      params.sousTypeRequete,
      params.acte.nature,
      params.validation,
      params.archive
    );
    return composition;
  }

  public static getTitulairesCorpsText(acte: IFicheActe) {
    const titulaire1 = acte.titulaires[0];
    const titulaire2 = acte.titulaires[1];

    const ecTitulaire1 =
      CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(
        titulaire1
      );

    const ecTitulaire2 =
      CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(
        titulaire2
      );
    return { ecTitulaire1, ecTitulaire2 };
  }

  public static getTitulaireCorpsText(acte: IFicheActe) {
    const titulaire = acte.titulaires[0];

    const ecTitulaire1 =
      CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(
        titulaire
      );
    return { ecTitulaire1 };
  }

  public static creerAnalyseMarginale(
    composition: IExtraitCopieComposition,
    acte: IFicheActe
  ) {
    // Titulaires analyse marginale
    if (acte.analyseMarginales) {
      const { titulaireAMCompositionEC1, titulaireAMCompositionEC2 } =
        CommunExtraitOuCopieActeTexteComposition.getTitulairesAnalayseMarginaleCompositionEC(
          acte.analyseMarginales
        );

      if (titulaireAMCompositionEC1) {
        composition.nom_titulaire1 = titulaireAMCompositionEC1.nom;
        composition.prenoms_titulaire1 = titulaireAMCompositionEC1.prenoms;
      }
      if (titulaireAMCompositionEC2) {
        composition.nom_titulaire2 = titulaireAMCompositionEC2.nom;
        composition.prenoms_titulaire2 = titulaireAMCompositionEC2.prenoms;
      }
    }
  }

  public static creerReferenceActeEtDateDuJour(
    composition: IExtraitCopieComposition,
    acte: IFicheActe
  ) {
    CommunComposition.ajoutDateDujour(composition);
    composition.reference_acte = FicheActe.getReference(acte);
  }

  private static getTitulairesAnalayseMarginaleCompositionEC(
    analyseMarginales: IAnalyseMarginale[]
  ) {
    let titulaireAMCompositionEC1: ITitulaireAMCompositionEC | undefined;
    let titulaireAMCompositionEC2: ITitulaireAMCompositionEC | undefined;
    const analyseMarginale =
      AnalyseMarginale.getLaBonneAnalyseMarginale(analyseMarginales);

    const { titulaireAM1, titulaireAM2 } =
      AnalyseMarginale.getTitulairesDansLeBonOrdre(analyseMarginale);

    if (titulaireAM1) {
      titulaireAMCompositionEC1 = {
        nom: EtatCivilUtil.getNomOuVide(titulaireAM1.nom),
        prenoms: EtatCivilUtil.getPrenomsOuVide(titulaireAM1.prenoms)
      };
    }
    if (titulaireAM2) {
      titulaireAMCompositionEC2 = {
        nom: EtatCivilUtil.getNomOuVide(titulaireAM2.nom),
        prenoms: EtatCivilUtil.getPrenomsOuVide(titulaireAM2.prenoms)
      };
    }

    return { titulaireAMCompositionEC1, titulaireAMCompositionEC2 };
  }

  public static creerDateNaissanceOuAgeDeTitulaire(
    titulaire: ITitulaireActe
  ): string {
    let dateNaissanceOuAgeDeTitulaire = "";
    const sexeTitulaire = titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe)
      : Sexe.INCONNU;
    const neOuNeeTitulaire = EtatCivilUtil.formatNeOuNee(sexeTitulaire); //né(e) [accord selon genre du titulaire]
    if (titulaire.naissance?.annee) {
      const leOuEnDateNaissanceTitulaire = EtatCivilUtil.formatLeOuEn(
        titulaire.naissance?.jour
      ).toLowerCase(); // le (ou en) [selon présence ou non d’une date de naissance complète]
      const dateNaissanceTitulaire = EtatCivilUtil.formatDateEvenement(
        titulaire.naissance
      ); //<date de naissance titulaire)>
      dateNaissanceOuAgeDeTitulaire = `${neOuNeeTitulaire} ${leOuEnDateNaissanceTitulaire} ${dateNaissanceTitulaire}`;
    } else if (titulaire.age) {
      const ageOuAgee = EtatCivilUtil.formatAgeOuAgee(sexeTitulaire); //âgé(e) [accord selon genre du titulaire]

      dateNaissanceOuAgeDeTitulaire = `${ageOuAgee} de ${getValeurOuVide(
        titulaire.age
      )} ans ${neOuNeeTitulaire}`; //(OU âgé(e) [accord selon genre du titulaire] de <âge titulaire au moment de l’événement> ans né(e) [accord selon genre du titulaire]
    }

    return dateNaissanceOuAgeDeTitulaire;
  }

  public static getEvenementActeCompositionEC(
    acte: IFicheActe
  ): IActeCompositionEC {
    const leouEnEvenement = EtatCivilUtil.formatLeOuEn(acte.evenement?.jour);
    const dateEvenement = EtatCivilUtil.formatDateEvenement(acte.evenement); //[selon présence ou non d’une date d’événement complète] <date Evènement Acte>
    const heureEvenement = EtatCivilUtil.formatHeureEvenement(acte.evenement); //[à <heure évènement> si elle est renseignée]
    const lieuEvenement = acte.evenement?.lieuReprise
      ? acte.evenement.lieuReprise
      : LieuxUtils.getLieuExtraitCopie(
          acte.evenement?.ville,
          acte.evenement?.region,
          acte.evenement?.pays
        ); //<Lieu Evénement Acte>

    return { leouEnEvenement, dateEvenement, heureEvenement, lieuEvenement };
  }

  public static creerTitulaireCompositionEC(
    titulaire: ITitulaireActe
  ): ITitulaireCompositionEC {
    const prenoms = EtatCivilUtil.getPrenomsOuVide(titulaire.prenoms); //<Prénom(s) titulaire 1)>
    const nom = EtatCivilUtil.getNomOuVide(titulaire.nom); //<Nom titulaire 1>
    const partiesNom = EtatCivilUtil.formatPartiesNomOuVide(
      titulaire.nomPartie1,
      titulaire.nomPartie2
    ); //(1re partie : <Nom 1ère partie titulaire 1>  2nde partie : <Nom 2nde partie titulaire 1>)

    const lieuNaissance = titulaire.naissance?.lieuReprise
      ? titulaire.naissance.lieuReprise
      : LieuxUtils.getLieuExtraitCopie(
          titulaire.naissance?.ville,
          titulaire.naissance?.region,
          titulaire.naissance?.pays,
          titulaire.naissance?.arrondissement
        ); // <Lieu de naissance titulaire 1>

    const dateNaissanceOuAge =
      this.creerDateNaissanceOuAgeDeTitulaire(titulaire);

    const parents = TitulaireActe.getParents(titulaire);

    const parentsTitulaire = parents.map(parent => {
      const prenomsParent = EtatCivilUtil.getPrenomsOuVide(parent.prenoms); //<Prénom(s) filiation)>
      const nomParent = EtatCivilUtil.getNomOuVide(parent.nom); //<Nom filiation>
      const lienParente = parent.lienParente;
      const filsOuFille =
        parent.lienParente === LienParente.PARENT
          ? this.creerFilsOuFilleDeFiliationTitulaire(titulaire) //'fils de', 'fille de' ou 'de' [accord selon genre du titulaire]
          : this.creerFilsOuFilleDeFiliationAdoptantTitulaire(titulaire); //'adopté par', 'adoptée par' [accord selon genre du titulaire]
      return {
        prenoms: prenomsParent,
        nom: nomParent,
        lienParente,
        filsOuFille
      };
    });

    const sexe = titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe)
      : Sexe.INCONNU;

    return {
      prenoms,
      nom,
      partiesNom,
      lieuNaissance,
      dateNaissanceOuAge,
      parentsTitulaire,
      sexe
    };
  }

  public static creerFilsOuFilleDeFiliationTitulaire(
    titulaire: ITitulaireActe
  ): string {
    const sexeTitulaire = titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe)
      : Sexe.INCONNU;
    return EtatCivilUtil.formatFilsOuFille(sexeTitulaire); //fils ou fille [accord selon genre du titulaire]
  }

  public static creerFilsOuFilleDeFiliationAdoptantTitulaire(
    titulaire: ITitulaireActe
  ): string {
    const sexeTitulaire = titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe)
      : Sexe.INCONNU;
    return EtatCivilUtil.formatFilsOuFilleAdoptant(sexeTitulaire); //adopté ou adoptée [accord selon genre du titulaire]
  }

  public static creerBlocSignature(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    natureActe: NatureActe,
    validation: Validation,
    archive: boolean
  ) {
    if (validation === Validation.E || archive) {
      composition.pas_de_bloc_signature = true;
    } else {
      composition.pas_de_bloc_signature = false;
      CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(
        composition,
        choixDelivrance,
        sousTypeRequete,
        natureActe
      );

      // Ajout de la date de délivrance
      CommunComposition.ajoutDateDeDelivrance(composition);

      if (sousTypeRequete === SousTypeDelivrance.RDDP) {
        composition.pas_de_signature = true;
        composition.pas_de_nomPrenomAgent = true;
      } else {
        //Ajout du cachet
        composition.cachet_signature = ParametreBaseRequete.getEnumFor(
          LIBELLE_FONCTION_AGENT_1
        ).libelle;
      }
    }
  }

  public static creerFormuleSignatureDelivrance(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    natureActe: NatureActe
  ) {
    // Formule de signature délivrance
    if (
      sousTypeRequete === SousTypeDelivrance.RDD ||
      sousTypeRequete === SousTypeDelivrance.RDC
    ) {
      if (choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE) {
        composition.formule_signature_delivrance =
          CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[
            ZERO
          ];
      } else if (
        choixDelivrance ===
          ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION ||
        choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
      ) {
        if (natureActe === NatureActe.ADOPTION_SIMPLE) {
          composition.formule_signature_delivrance =
            CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[
              TROIS
            ];
        } else {
          composition.formule_signature_delivrance =
            CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[
              UN
            ];
        }
      }
    } else if (sousTypeRequete === SousTypeDelivrance.RDDP) {
      composition.formule_signature_delivrance =
        CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[
          DEUX
        ];
    }
  }
}
