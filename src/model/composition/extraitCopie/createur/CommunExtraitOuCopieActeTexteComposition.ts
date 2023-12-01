import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  DEUX,
  getLibelle,
  getValeurOuVide,
  jointAvecEspace,
  jointAvecRetourALaLigne,
  TROIS,
  UN,
  ZERO
} from "@util/Utils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { IEvenement } from "../../../etatcivil/acte/IEvenement";
import { FicheActe, IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { IFiliation } from "../../../etatcivil/acte/IFiliation";
import {
  ITitulaireActe,
  TitulaireActe
} from "../../../etatcivil/acte/ITitulaireActe";
import { IMention, Mention } from "../../../etatcivil/acte/mention/IMention";
import { LienParente } from "../../../etatcivil/enum/LienParente";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { Sexe } from "../../../etatcivil/enum/Sexe";
import { TypeDeclarationConjointe } from "../../../etatcivil/enum/TypeDeclarationConjointe";
import { TypeExtrait } from "../../../etatcivil/enum/TypeExtrait";
import {
  LIBELLE_FONCTION_AGENT_1,
  SCEAU_MINISTERE
} from "../../../parametres/clesParametres";
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
  typeDeclarationConjointe?: TypeDeclarationConjointe;
  dateDeclarationConjointe?: Date;
}

export interface ITitulaireAMCompositionEC {
  prenoms: string;
  nom: string;
  partiesNom: string;
  typeDeclarationConjointe?: TypeDeclarationConjointe;
  dateDeclarationConjointe?: Date;
}

export interface IParentsTitulaireCompositionEC {
  prenoms: string;
  nom: string;
  lienParente: string;
  filsOuFille: string;
  lieuNaissanceParent?: string;
  dateNaissanceOuAgeParent?: string;
  sexeParent?: Sexe;
}

export interface ICreerExtraitCopieActeTexteAvantCompositionParams {
  acte: IFicheActe;
  requete: IRequeteDelivrance;
  validation: Validation;
  mentionsRetirees: string[];
  ctv: string;
  choixDelivrance: ChoixDelivrance;
}

export interface ICreerExtraitCopieActeTexteParams {
  acte: IFicheActe;
  natureActe: string;
  choixDelivrance: ChoixDelivrance;
  sousTypeRequete: SousTypeDelivrance;
  validation: Validation;
  mentionsRetirees: string[];
  corpsTexte?: string;
  ctv: string;
}

export class CommunExtraitOuCopieActeTexteComposition {
  public static readonly FORMULE_SIGNATURE_DELIVRANCE = [
    "Copie délivrée selon procédé informatisé",
    "Extrait délivré selon procédé informatisé",
    "Données contenues dans la copie d’acte transmises par le Service central d’état civil n’ayant pas valeur authentique",
    "Cette transcription ne tient pas lieu d’acte de naissance"
  ];

  public static readonly FORMULE_NOTICE_DELIVRANCE = [
    "Données contenues dans l'extrait d’acte transmises par le Service central d’état civil n’ayant pas valeur authentique.",
    "Données contenues dans la copie d’acte transmises par le Service central d’état civil n’ayant pas valeur authentique."
  ];

  public static creerExtraitCopieActeTexte(
    params: ICreerExtraitCopieActeTexteParams
  ) {
    const composition = {} as IExtraitCopieComposition;

    if (SousTypeDelivrance.estRDD(params.sousTypeRequete)) {
      // Ajout du ctv pour la signature pour les RDD
      composition.code_CTV = params.ctv;
    }

    // Filigrane archive (le bloc de signature sera automatiquement masqué)
    composition.filigrane_archive = ChoixDelivrance.estCopieArchive(
      params.choixDelivrance
    );

    // Création de l'entête
    CommunExtraitOuCopieActeTexteComposition.creerReferenceActeEtDateDuJour(
      composition,
      params.acte
    );

    const estCopie = ChoixDelivrance.estCopieIntegraleOuArchive(
      params.choixDelivrance
    );

    // Type et nature de document
    composition.type_document = estCopie ? "COPIE" : "EXTRAIT";
    composition.nature_acte = params.natureActe;

    CommunExtraitOuCopieActeTexteComposition.creerAnalyseMarginale(
      composition,
      params.acte
    );

    // Erreur (Dans le cas d'un manque d'information pour la génération du document)
    composition.erreur =
      Validation.E === params.validation
        ? getLibelle(
            "L'absence d'informations ne permet pas de générer l'extrait."
          )
        : undefined;

    if (!composition.erreur) {
      // Récupération de l'éventuelle rectification qui remplacera le corps
      const corpsExtraitRectification =
        FicheActe.getCorpsExtraitRectificationTexte(
          params.acte,
          ChoixDelivrance.estAvecFiliation(params.choixDelivrance)
            ? TypeExtrait.EXTRAIT_AVEC_FILIATION
            : TypeExtrait.EXTRAIT_SANS_FILIATION
        );

      const texteMentions =
        CommunExtraitOuCopieActeTexteComposition.getTexteMentions(
          params.acte.mentions,
          estCopie,
          params.mentionsRetirees
        );

      if (texteMentions.length > 0) {
        composition.mentions = jointAvecRetourALaLigne(texteMentions);
      }

      if (estCopie && params.acte.corpsTexte) {
        // Une copie est demandée (et non un extrait) pour un acte texte
        composition.corps_texte = params.acte.corpsTexte.texte;
      } else if (corpsExtraitRectification) {
        // L'acte comporte un corps d'extrait modifié correspondant au type d'extrait traité : extrait avec ou sans filiation
        composition.corps_texte = corpsExtraitRectification;
      } else {
        composition.corps_texte = params.corpsTexte;
      }
    }

    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(
      composition,
      params.choixDelivrance,
      params.sousTypeRequete,
      params.acte.nature,
      params.validation
    );

    CommunExtraitOuCopieActeTexteComposition.creerBlocNotice(
      composition,
      params.choixDelivrance,
      params.sousTypeRequete,
      params.acte.nature,
      params.validation
    );

    return composition;
  }

  public static getTitulairesCorpsText(acte: IFicheActe): {
    ecTitulaire1: ITitulaireCompositionEC;
    ecTitulaire2?: ITitulaireCompositionEC;
  } {
    // Récupération des titulaires AM
    const [titulaireAM1, titulaireAM2] =
      FicheActe.getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe(acte);

    const ecTitulaire1 =
      CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(
        acte,
        titulaireAM1
      );

    let ecTitulaire2;
    if (titulaireAM2) {
      ecTitulaire2 =
        CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(
          acte,
          titulaireAM2
        );
    }

    return { ecTitulaire1, ecTitulaire2 };
  }

  public static getTitulaireCorpsText(
    acte: IFicheActe
  ): ITitulaireCompositionEC {
    return CommunExtraitOuCopieActeTexteComposition.getTitulairesCorpsText(acte)
      .ecTitulaire1;
  }

  public static creerAnalyseMarginale(
    composition: IExtraitCopieComposition,
    acte: IFicheActe
  ) {
    if (NatureActe.estReconnaissance(acte.nature)) {
      // Titulaires de l'acte dans le cas d'une reconnaissance.
      const titulaireActe1 = acte.titulaires.find(
        titulaire => titulaire.ordre === UN
      );
      const titulaireActe2 = acte.titulaires.find(
        titulaire => titulaire.ordre === DEUX
      );
      if (titulaireActe1) {
        composition.nom_titulaire1 = getValeurOuVide(titulaireActe1.nom);
        composition.prenoms_titulaire1 = getValeurOuVide(
          jointAvecEspace(titulaireActe1.prenoms ?? [])
        );
      }
      if (titulaireActe2) {
        composition.nom_titulaire2 = getValeurOuVide(titulaireActe2.nom);
        composition.prenoms_titulaire2 = getValeurOuVide(
          jointAvecEspace(titulaireActe2.prenoms ?? [])
        );
      }
    } else if (acte.analyseMarginales) {
      // Titulaires analyse marginale
      const { titulaireAMCompositionEC1, titulaireAMCompositionEC2 } =
        CommunExtraitOuCopieActeTexteComposition.getTitulairesAnalayseMarginaleCompositionEC(
          acte
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

  public static getTitulairesAnalayseMarginaleCompositionEC(acte: IFicheActe) {
    let titulaireAMCompositionEC1: ITitulaireAMCompositionEC | undefined;
    let titulaireAMCompositionEC2: ITitulaireAMCompositionEC | undefined;

    const titulairesAMs =
      FicheActe.getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe(acte);

    if (titulairesAMs[0]) {
      titulaireAMCompositionEC1 =
        CommunExtraitOuCopieActeTexteComposition.creerTitulaireAMCompositionEC(
          titulairesAMs[0]
        );
    }
    if (titulairesAMs[1]) {
      titulaireAMCompositionEC2 =
        CommunExtraitOuCopieActeTexteComposition.creerTitulaireAMCompositionEC(
          titulairesAMs[1]
        );
    }

    return { titulaireAMCompositionEC1, titulaireAMCompositionEC2 };
  }

  private static creerTitulaireAMCompositionEC(
    titulaireAM1: ITitulaireActe
  ): ITitulaireAMCompositionEC {
    const partiesNom = EtatCivilUtil.formatPartiesNomOuVide(
      titulaireAM1.nomPartie1,
      titulaireAM1.nomPartie2
    ); //(1re partie : <Nom 1ère partie titulaire 1>  2nde partie : <Nom 2nde partie titulaire 1>)

    return {
      nom: EtatCivilUtil.getNomOuVide(titulaireAM1.nom),
      prenoms: EtatCivilUtil.getPrenomsOuVide(titulaireAM1.prenoms),
      typeDeclarationConjointe: titulaireAM1.typeDeclarationConjointe,
      dateDeclarationConjointe: titulaireAM1.dateDeclarationConjointe,
      partiesNom
    };
  }

  public static creerDateNaissanceOuAgeDeTitulaireOuFiliation(
    titulaireOuFiliation: ITitulaireActe | IFiliation
  ): string {
    let dateNaissanceOuAgeDeTitulaire = "";
    const sexeTitulaire = TitulaireActe.getSexeOuInconnu(titulaireOuFiliation);
    const neOuNeeTitulaire = EtatCivilUtil.formatNeOuNee(sexeTitulaire); //né(e) [accord selon genre du titulaire/filiation]
    if (titulaireOuFiliation.naissance?.annee) {
      const leOuEnDateNaissanceTitulaire = EtatCivilUtil.formatLeOuEn(
        titulaireOuFiliation.naissance?.jour
      ).toLowerCase(); // le (ou en) [selon présence ou non d’une date de naissance complète]
      const dateNaissanceTitulaire = EtatCivilUtil.formatDateEvenement(
        titulaireOuFiliation.naissance
      ); //<date de naissance titulaire/filiation)>
      dateNaissanceOuAgeDeTitulaire = `${neOuNeeTitulaire} ${leOuEnDateNaissanceTitulaire} ${dateNaissanceTitulaire}`;
    } else if (titulaireOuFiliation.age) {
      const ageOuAgee = EtatCivilUtil.formatAgeOuAgee(sexeTitulaire); //âgé(e) [accord selon genre du titulaire/filiation]

      dateNaissanceOuAgeDeTitulaire = `${ageOuAgee} de ${getValeurOuVide(
        titulaireOuFiliation.age
      )} ans`; //(OU âgé(e) [accord selon genre du titulaire/filiation] de <âge titulaireFiliation au moment de l’événement> ans né(e) [accord selon genre du titulaire]
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
    acte: IFicheActe,
    titulaire: ITitulaireActe
  ): ITitulaireCompositionEC {
    const estActeMariageOuDecesEtPaysInconnu =
      (FicheActe.estActeDeces(acte) || FicheActe.estActeMariage) &&
      LieuxUtils.estPaysInconnu(titulaire.naissance?.pays);
    const prenoms = EtatCivilUtil.getPrenomsOuVide(titulaire.prenoms); //<Prénom(s) titulaire 1)>
    const nom = EtatCivilUtil.getNomOuVide(titulaire.nom); //<Nom titulaire 1>
    const partiesNom = EtatCivilUtil.formatPartiesNomOuVide(
      titulaire.nomPartie1,
      titulaire.nomPartie2
    ); //(1re partie : <Nom 1ère partie titulaire 1>  2nde partie : <Nom 2nde partie titulaire 1>)

    const lieuNaissance = this.formatLieuNaissance(
      titulaire,
      TitulaireActe.getLieuDeRepriseOuLieuNaissance(
        titulaire,
        estActeMariageOuDecesEtPaysInconnu
      )
    ); // <Lieu de naissance titulaire>

    const dateNaissanceOuAge =
      this.creerDateNaissanceOuAgeDeTitulaireOuFiliation(titulaire);

    const parents = TitulaireActe.getTousLesParents(titulaire);

    const parentsTitulaire: IParentsTitulaireCompositionEC[] = parents.map(
      (parent: IFiliation): IParentsTitulaireCompositionEC => {
        const estActeDeNaissanceEtPaysInconnu =
          FicheActe.estActeNaissance(acte) &&
          LieuxUtils.estPaysInconnu(parent.naissance?.pays);
        const prenomsParent = EtatCivilUtil.getPrenomsOuVide(parent.prenoms); //<Prénom(s) filiation)>
        const nomParent = EtatCivilUtil.getNomOuVide(parent.nom); //<Nom filiation>
        const lienParente = parent.lienParente;
        const filsOuFille =
          parent.lienParente === LienParente.PARENT
            ? this.creerFilsOuFilleDeFiliationTitulaire(titulaire) //'fils de', 'fille de' ou 'de' [accord selon genre du titulaire]
            : this.creerFilsOuFilleDeFiliationAdoptantTitulaire(titulaire); //'adopté par', 'adoptée par' [accord selon genre du titulaire]
        const lieuNaissanceParent = this.formatLieuNaissance(
          parent,
          TitulaireActe.getLieuDeRepriseOuLieuNaissance(
            parent,
            estActeDeNaissanceEtPaysInconnu
          )
        ); // <Lieu de naissance parent>
        const dateNaissanceOuAgeParent =
          this.creerDateNaissanceOuAgeDeTitulaireOuFiliation(parent);
        const sexeParent = TitulaireActe.getSexeOuInconnu(parent);

        return {
          prenoms: prenomsParent,
          nom: nomParent,
          lienParente,
          filsOuFille,
          lieuNaissanceParent,
          dateNaissanceOuAgeParent,
          sexeParent
        };
      }
    );

    const sexe = TitulaireActe.getSexeOuInconnu(titulaire);

    return {
      prenoms,
      nom,
      partiesNom,
      lieuNaissance,
      dateNaissanceOuAge,
      parentsTitulaire,
      sexe,
      typeDeclarationConjointe: titulaire.typeDeclarationConjointe,
      dateDeclarationConjointe: titulaire.dateDeclarationConjointe
    };
  }

  public static formatLieuNaissance(
    individu: ITitulaireActe | IFiliation,
    lieuNaissance: string
  ): string {
    let lieuNaissanceFormate = "";

    const neOuNee = EtatCivilUtil.formatNeOuNee(individu.sexe);

    if (lieuNaissance && individu.naissance?.annee) {
      //date renseignée : né.e *date* à *lieu*
      lieuNaissanceFormate = ` à ${lieuNaissance}`;
    } else if (lieuNaissance && individu.age) {
      //age renseigné : agé.e de *age* né.e à *lieu*
      lieuNaissanceFormate = ` ${neOuNee} à ${lieuNaissance}`;
    } else if (lieuNaissance) {
      //date et age non renseignés : suppression de l'espace
      lieuNaissanceFormate = `${neOuNee} à ${lieuNaissance}`;
    }
    return lieuNaissanceFormate;
  }

  public static creerLieuNaissanceDeTitulaireOuFiliation(
    naissance?: IEvenement
  ): string {
    return naissance?.lieuReprise
      ? naissance.lieuReprise
      : LieuxUtils.getLieuExtraitCopie(
          naissance?.ville,
          naissance?.region,
          naissance?.pays,
          naissance?.arrondissement
        );
  }

  public static creerFilsOuFilleDeFiliationTitulaire(
    titulaire: ITitulaireActe
  ): string {
    const sexeTitulaire = titulaire.sexe ? titulaire.sexe : Sexe.INCONNU;
    return EtatCivilUtil.formatFilsOuFille(sexeTitulaire); //fils ou fille [accord selon genre du titulaire]
  }

  public static creerFilsOuFilleDeFiliationAdoptantTitulaire(
    titulaire: ITitulaireActe
  ): string {
    const sexeTitulaire = titulaire.sexe ? titulaire.sexe : Sexe.INCONNU;
    return EtatCivilUtil.formatFilsOuFilleAdoptant(sexeTitulaire); //adopté ou adoptée [accord selon genre du titulaire]
  }

  public static creerBlocSignature(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    natureActe: NatureActe,
    validation: Validation
  ) {
    if (
      validation === Validation.E ||
      ChoixDelivrance.estCopieArchive(choixDelivrance)
    ) {
      composition.pas_de_bloc_signature = true;
    } else {
      composition.pas_de_bloc_signature = false;
      composition.sceau_ministere =
        ParametreBaseRequete.getEnumFor(SCEAU_MINISTERE)?.libelle;
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

  public static creerBlocNotice(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    natureActe: NatureActe,
    validation: Validation
  ) {
    if (sousTypeRequete !== SousTypeDelivrance.RDDP) {
      composition.pas_de_bloc_notice = true;
    } else {
      composition.pas_de_bloc_signature = true;
      composition.pas_de_bloc_notice = false;
      composition.pas_de_nomPrenomAgent = true;

      CommunExtraitOuCopieActeTexteComposition.creerFormuleNoticeDelivrance(
        composition,
        choixDelivrance,
        sousTypeRequete,
        natureActe
      );

      // Ajout de la date de délivrance
      CommunComposition.ajoutDateDujour(composition);
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

  public static creerFormuleNoticeDelivrance(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    natureActe: NatureActe
  ) {
    // Formule de notice délivrance
    if (choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE) {
      composition.formule_notice_delivrance =
        CommunExtraitOuCopieActeTexteComposition.FORMULE_NOTICE_DELIVRANCE[UN];
    } else if (
      choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION ||
      choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    ) {
      composition.formule_notice_delivrance =
        CommunExtraitOuCopieActeTexteComposition.FORMULE_NOTICE_DELIVRANCE[
          ZERO
        ];
    }
  }

  public static getTexteMentions(
    mentions: IMention[],
    copie: boolean,
    idMentionsRetirees: string[]
  ): string[] {
    const texteMentions: string[] = [];

    let mentionsFiltrees =
      Mention.filtreAvecTexteMentionEtTexteMentionDelivrance(mentions);

    mentionsFiltrees = mentionsFiltrees.filter(mention => {
      return !idMentionsRetirees.some(
        idMentionRetiree => idMentionRetiree === mention.id
      );
    });

    const mentionsTriees =
      Mention.trierMentionsNumeroOrdreExtraitOuOrdreApposition(
        mentionsFiltrees
      );

    mentionsTriees.forEach(mention => {
      if (mention.textes) {
        texteMentions.push(
          copie
            ? Mention.getTexteCopie(mention)
            : Mention.getTexteExtrait(mention)
        );
      }
    });

    return texteMentions;
  }
}
