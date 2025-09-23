import ETypeDeclarationConjointe from "@model/etatcivil/enum/ETypeDeclarationConjointe";
import { ETypeExtrait } from "@model/etatcivil/enum/TypeExtrait";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DEUX, jointAvecEspace, jointAvecRetourALaLigne, triListeObjetsSurPropriete, TROIS, UN, ZERO } from "@util/Utils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import DateRECE from "../../../../utils/DateRECE";
import { FicheActe } from "../../../etatcivil/acte/FicheActe";
import { Filiation } from "../../../etatcivil/acte/Filiation";
import { IEvenement } from "../../../etatcivil/acte/IEvenement";
import { TitulaireActe } from "../../../etatcivil/acte/TitulaireActe";
import { Mention } from "../../../etatcivil/acte/mention/Mention";
import { ELienParente } from "../../../etatcivil/enum/ELienParente";
import { ENatureActe } from "../../../etatcivil/enum/NatureActe";
import { ESexe } from "../../../etatcivil/enum/Sexe";
import { LIBELLE_FONCTION_AGENT_1, SCEAU_MINISTERE } from "../../../parametres/clesParametres";
import { ParametreBaseRequete } from "../../../parametres/enum/ParametresBaseRequete";
import { ChoixDelivrance } from "../../../requete/enum/ChoixDelivrance";
import { EValidation } from "../../../requete/enum/EValidation";
import { SousTypeDelivrance } from "../../../requete/enum/SousTypeDelivrance";
import { CommunComposition } from "../../commun/ICommunComposition";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";

interface IActeCompositionEC {
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
  sexe: keyof typeof ESexe;
  typeDeclarationConjointe: keyof typeof ETypeDeclarationConjointe | null;
  dateDeclarationConjointe: DateRECE | null;
}

interface ITitulaireAMCompositionEC {
  prenoms: string;
  nom: string;
  partiesNom: string;
  typeDeclarationConjointe: keyof typeof ETypeDeclarationConjointe | null;
  dateDeclarationConjointe: DateRECE | null;
}

export interface IParentsTitulaireCompositionEC {
  prenoms: string;
  nom: string;
  lienParente: string;
  filsOuFille: string;
  lieuNaissanceParent?: string;
  dateNaissanceOuAgeParent?: string;
  sexeParent?: keyof typeof ESexe;
}

export interface ICreerExtraitCopieActeTexteAvantCompositionParams {
  acte: FicheActe;
  requete: IRequeteDelivrance;
  validation: EValidation;
  mentionsRetirees: string[];
  ctv: string;
  choixDelivrance: ChoixDelivrance;
}

interface ICreerExtraitCopieActeTexteParams {
  acte: FicheActe;
  natureActe: string;
  choixDelivrance: ChoixDelivrance;
  sousTypeRequete: SousTypeDelivrance;
  validation: EValidation;
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

  public static creerExtraitCopieActeTexte(params: ICreerExtraitCopieActeTexteParams) {
    const composition = {} as IExtraitCopieComposition;

    if (SousTypeDelivrance.estRDD(params.sousTypeRequete)) {
      // Ajout du ctv pour la signature pour les RDD
      composition.code_CTV = params.ctv;
    }

    // Filigrane archive (le bloc de signature sera automatiquement masqué)
    composition.filigrane_archive = ChoixDelivrance.estCopieArchive(params.choixDelivrance);

    // Création de l'entête
    CommunExtraitOuCopieActeTexteComposition.creerReferenceActeEtDateDuJour(composition, params.acte);

    const estCopie = ChoixDelivrance.estCopieIntegraleOuArchive(params.choixDelivrance);

    // Type et nature de document
    composition.type_document = estCopie ? "COPIE" : "EXTRAIT";
    composition.nature_acte = params.natureActe;

    CommunExtraitOuCopieActeTexteComposition.creerAnalyseMarginale(composition, params.acte);

    // Erreur (Dans le cas d'un manque d'information pour la génération du document)
    composition.erreur = EValidation.E === params.validation ? "L'absence d'informations ne permet pas de générer l'extrait." : undefined;

    if (!composition.erreur) {
      // Récupération de l'éventuelle rectification qui remplacera le corps
      const typeExtrait: keyof typeof ETypeExtrait =
        params.choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION ? "EXTRAIT_AVEC_FILIATION" : "EXTRAIT_SANS_FILIATION";

      const corpsExtraitRectification = params.acte.rectificationsCorpsExtrait.find(
        rectification => rectification.type === typeExtrait
      )?.texte;

      const texteMentions = CommunExtraitOuCopieActeTexteComposition.getTexteMentions(
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

    CommunExtraitOuCopieActeTexteComposition.creerBlocNotice(composition, params.choixDelivrance, params.sousTypeRequete);

    return composition;
  }

  public static getTitulairesCorpsTexte(acte: FicheActe): {
    ecTitulaire1: ITitulaireCompositionEC;
    ecTitulaire2?: ITitulaireCompositionEC;
  } {
    // Récupération des titulaires AM
    const [titulaireAM1, titulaireAM2] = acte.getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe();

    const ecTitulaire1 = CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(acte, titulaireAM1);

    let ecTitulaire2;
    if (titulaireAM2) {
      ecTitulaire2 = CommunExtraitOuCopieActeTexteComposition.creerTitulaireCompositionEC(acte, titulaireAM2);
    }

    return { ecTitulaire1, ecTitulaire2 };
  }

  public static getTitulaireCorpsTexte(acte: FicheActe): ITitulaireCompositionEC {
    return CommunExtraitOuCopieActeTexteComposition.getTitulairesCorpsTexte(acte).ecTitulaire1;
  }

  public static creerAnalyseMarginale(composition: IExtraitCopieComposition, acte: FicheActe) {
    if (acte.nature === "RECONNAISSANCE") {
      // Titulaires de l'acte dans le cas d'une reconnaissance.
      const titulaireActe1 = acte.titulaires.find(titulaire => titulaire.ordre === UN);
      const titulaireActe2 = acte.titulaires.find(titulaire => titulaire.ordre === DEUX);
      if (titulaireActe1) {
        composition.nom_titulaire1 = titulaireActe1.nom ?? "";
        composition.prenoms_titulaire1 = jointAvecEspace(titulaireActe1.prenoms ?? []);
      }
      if (titulaireActe2) {
        composition.nom_titulaire2 = titulaireActe2.nom ?? "";
        composition.prenoms_titulaire2 = jointAvecEspace(titulaireActe2.prenoms ?? []);
      }
    } else if (acte.analysesMarginales) {
      // Titulaires analyse marginale
      const [titulaireAMCompositionEC1, titulaireAMCompositionEC2] =
        CommunExtraitOuCopieActeTexteComposition.getTitulairesAnalayseMarginaleCompositionEC(acte);

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

  public static creerReferenceActeEtDateDuJour(composition: IExtraitCopieComposition, acte: FicheActe) {
    CommunComposition.ajoutDateDujour(composition);
    composition.reference_acte = acte.referenceActe;
  }

  public static getTitulairesAnalayseMarginaleCompositionEC(acte: FicheActe): ITitulaireAMCompositionEC[] {
    return acte
      .getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe()
      .map(CommunExtraitOuCopieActeTexteComposition.creerTitulaireAMCompositionEC);
  }

  private static creerTitulaireAMCompositionEC(titulaireAM1: TitulaireActe): ITitulaireAMCompositionEC {
    return {
      nom: EtatCivilUtil.getNomOuVide(titulaireAM1.nom),
      prenoms: EtatCivilUtil.getPrenomsOuVide(titulaireAM1.prenoms),
      typeDeclarationConjointe: titulaireAM1.typeDeclarationConjointe,
      dateDeclarationConjointe: titulaireAM1.dateDeclarationConjointe,
      partiesNom: EtatCivilUtil.formatPartiesNomOuVide(titulaireAM1.nomPartie1, titulaireAM1.nomPartie2) //(1re partie : <Nom 1re partie titulaire 1>  2nde partie : <Nom 2nde partie titulaire 1>)
    };
  }

  public static creerDateNaissanceOuAgeDeTitulaireOuFiliation(titulaireOuFiliation: TitulaireActe | Filiation): string {
    let dateNaissanceOuAgeDeTitulaire = "";
    const sexeTitulaire = titulaireOuFiliation.sexe ?? "INCONNU";
    const neOuNeeTitulaire = EtatCivilUtil.formatNeOuNee(sexeTitulaire); //né(e) [accord selon genre du titulaire/filiation]
    if (titulaireOuFiliation.naissance?.annee) {
      const leOuEnDateNaissanceTitulaire = EtatCivilUtil.formatLeOuEn(titulaireOuFiliation.naissance?.jour).toLowerCase(); // le (ou en) [selon présence ou non d’une date de naissance complète]
      const dateNaissanceTitulaire = EtatCivilUtil.formatDateEvenement(titulaireOuFiliation.naissance); //<date de naissance titulaire/filiation)>
      dateNaissanceOuAgeDeTitulaire = `${neOuNeeTitulaire} ${leOuEnDateNaissanceTitulaire} ${dateNaissanceTitulaire}`;
    } else if (titulaireOuFiliation.age) {
      const ageOuAgee = EtatCivilUtil.formatAgeOuAgee(sexeTitulaire); //âgé(e) [accord selon genre du titulaire/filiation]

      dateNaissanceOuAgeDeTitulaire = `${ageOuAgee} de ${titulaireOuFiliation.age} ans`; //(OU âgé(e) [accord selon genre du titulaire/filiation] de <âge titulaireFiliation au moment de l’événement> ans né(e) [accord selon genre du titulaire]
    }

    return dateNaissanceOuAgeDeTitulaire;
  }

  public static getEvenementActeCompositionEC(acte: FicheActe): IActeCompositionEC {
    const leouEnEvenement = EtatCivilUtil.formatLeOuEn(acte.evenement?.jour);
    const dateEvenement = EtatCivilUtil.formatDateEvenement(acte.evenement ?? undefined); //[selon présence ou non d’une date d’événement complète] <date Evènement Acte>
    const heureEvenement = EtatCivilUtil.formatHeureEvenement(acte.evenement ?? undefined); //[à <heure évènement> si elle est renseignée]
    const lieuEvenement =
      acte.evenement?.lieuReprise ?? LieuxUtils.getLieuExtraitCopie(acte.evenement?.ville, acte.evenement?.region, acte.evenement?.pays); //<Lieu Evénement Acte>

    return { leouEnEvenement, dateEvenement, heureEvenement, lieuEvenement };
  }

  public static creerTitulaireCompositionEC(acte: FicheActe, titulaire: TitulaireActe): ITitulaireCompositionEC {
    const estActeMariageOuDecesEtPaysInconnu =
      (acte.nature === "DECES" || acte.nature === "MARIAGE") && LieuxUtils.estPaysInconnu(titulaire.naissance?.pays);
    const prenoms = EtatCivilUtil.getPrenomsOuVide(titulaire.prenoms); //<Prénom(s) titulaire 1)>
    const nom = EtatCivilUtil.getNomOuVide(titulaire.nom); //<Nom titulaire 1>
    const partiesNom = EtatCivilUtil.formatPartiesNomOuVide(titulaire.nomPartie1, titulaire.nomPartie2); //(1re partie : <Nom 1re partie titulaire 1>  2nde partie : <Nom 2nde partie titulaire 1>)

    const lieuNaissance = this.formatLieuNaissance(
      titulaire,
      titulaire.getLieuDeRepriseOuLieuNaissance(estActeMariageOuDecesEtPaysInconnu)
    ); // <Lieu de naissance titulaire>

    const dateNaissanceOuAge = this.creerDateNaissanceOuAgeDeTitulaireOuFiliation(titulaire);

    const parents = titulaire.filiations.filter(filiation =>
      ["PARENT", "PARENT_ADOPTANT", "ADOPTANT_CONJOINT_DU_PARENT"].includes(filiation.lienParente)
    );

    const parentsTitulaire: IParentsTitulaireCompositionEC[] = parents.map((parent: Filiation): IParentsTitulaireCompositionEC => {
      const estActeDeNaissanceEtPaysInconnu = acte.nature === "NAISSANCE" && LieuxUtils.estPaysInconnu(parent.naissance?.pays);
      const prenomsParent = EtatCivilUtil.getPrenomsOuVide(parent.prenoms); //<Prénom(s) filiation)>
      const nomParent = EtatCivilUtil.getNomOuVide(parent.nom); //<Nom filiation>
      const lienParente = parent.lienParente;
      const filsOuFille =
        parent.lienParente === ELienParente.PARENT
          ? this.creerFilsOuFilleDeFiliationTitulaire(titulaire.sexe) //'fils de', 'fille de' ou 'de' [accord selon genre du titulaire]
          : this.creerFilsOuFilleDeFiliationAdoptantTitulaire(titulaire.sexe); //'adopté par', 'adoptée par' [accord selon genre du titulaire]
      const lieuNaissanceParent = this.formatLieuNaissance(parent, parent.getLieuDeRepriseOuLieuNaissance(estActeDeNaissanceEtPaysInconnu)); // <Lieu de naissance parent>
      const dateNaissanceOuAgeParent = this.creerDateNaissanceOuAgeDeTitulaireOuFiliation(parent);
      const sexeParent = parent.sexe ?? "INCONNU";

      return {
        prenoms: prenomsParent,
        nom: nomParent,
        lienParente,
        filsOuFille,
        lieuNaissanceParent,
        dateNaissanceOuAgeParent,
        sexeParent
      };
    });

    return {
      prenoms,
      nom,
      partiesNom,
      lieuNaissance,
      dateNaissanceOuAge,
      parentsTitulaire,
      sexe: titulaire.sexe ?? "INCONNU",
      typeDeclarationConjointe: titulaire.typeDeclarationConjointe,
      dateDeclarationConjointe: titulaire.dateDeclarationConjointe
    };
  }

  public static formatLieuNaissance(individu: TitulaireActe | Filiation, lieuNaissance: string): string {
    let lieuNaissanceFormate = "";

    const neOuNee = individu.sexe === "FEMININ" ? "née" : "né";

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

  public static creerLieuNaissanceDeTitulaireOuFiliation(naissance?: IEvenement): string {
    return (
      naissance?.lieuReprise ??
      LieuxUtils.getLieuExtraitCopie(naissance?.ville, naissance?.region, naissance?.pays, naissance?.arrondissement)
    );
  }

  public static creerFilsOuFilleDeFiliationTitulaire(sexe: keyof typeof ESexe): string {
    switch (sexe) {
      case "FEMININ":
        return "fille de";
      case "MASCULIN":
        return "fils de";
      default:
        return "de";
    }
  }

  public static creerFilsOuFilleDeFiliationAdoptantTitulaire(sexe: keyof typeof ESexe): string {
    return sexe === "FEMININ" ? "adoptée par" : "adopté par";
  }

  public static creerBlocSignature(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    natureActe: keyof typeof ENatureActe,
    validation: EValidation
  ) {
    if (validation === EValidation.E || ChoixDelivrance.estCopieArchive(choixDelivrance)) {
      composition.pas_de_bloc_signature = true;
    } else {
      composition.pas_de_bloc_signature = false;
      composition.sceau_ministere = ParametreBaseRequete.depuisCle(SCEAU_MINISTERE)?.libelle ?? "";
      CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousTypeRequete, natureActe);

      // Ajout de la date de délivrance
      CommunComposition.ajoutDateDeDelivrance(composition);

      if (sousTypeRequete === SousTypeDelivrance.RDDP) {
        composition.pas_de_signature = true;
        composition.pas_de_nomPrenomAgent = true;
      } else {
        //Ajout du cachet
        composition.cachet_signature = ParametreBaseRequete.depuisCle(LIBELLE_FONCTION_AGENT_1)?.libelle ?? "";
      }
    }
  }

  public static creerBlocNotice(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance
  ) {
    if (sousTypeRequete !== SousTypeDelivrance.RDDP) {
      composition.pas_de_bloc_notice = true;
    } else {
      composition.pas_de_bloc_signature = true;
      composition.pas_de_bloc_notice = false;
      composition.pas_de_nomPrenomAgent = true;

      CommunExtraitOuCopieActeTexteComposition.creerFormuleNoticeDelivrance(composition, choixDelivrance);

      // Ajout de la date de délivrance
      CommunComposition.ajoutDateDujour(composition);
    }
  }

  public static creerFormuleSignatureDelivrance(
    composition: IExtraitCopieComposition,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    natureActe: keyof typeof ENatureActe
  ) {
    // Formule de signature délivrance
    if (sousTypeRequete === SousTypeDelivrance.RDD || sousTypeRequete === SousTypeDelivrance.RDC) {
      if (choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE) {
        composition.formule_signature_delivrance = CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[ZERO];
      } else if (
        choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION ||
        choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
      ) {
        if (natureActe === "ADOPTION_SIMPLE") {
          composition.formule_signature_delivrance = CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[TROIS];
        } else {
          composition.formule_signature_delivrance = CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[UN];
        }
      }
    } else if (sousTypeRequete === SousTypeDelivrance.RDDP) {
      composition.formule_signature_delivrance = CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[DEUX];
    }
  }

  public static creerFormuleNoticeDelivrance(composition: IExtraitCopieComposition, choixDelivrance: ChoixDelivrance) {
    // Formule de notice délivrance
    if (choixDelivrance === ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE) {
      composition.formule_notice_delivrance = CommunExtraitOuCopieActeTexteComposition.FORMULE_NOTICE_DELIVRANCE[UN];
    } else if (
      choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION ||
      choixDelivrance === ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
    ) {
      composition.formule_notice_delivrance = CommunExtraitOuCopieActeTexteComposition.FORMULE_NOTICE_DELIVRANCE[ZERO];
    }
  }

  public static getTexteMentions(mentions: Mention[] | undefined, copie: boolean, idMentionsRetirees: string[]): string[] {
    if (!mentions) return [];

    const mentionsFiltrees = mentions.filter(
      mention => (mention.textes?.texteMention ?? mention.textes?.texteMentionDelivrance) && !idMentionsRetirees.includes(mention.id)
    );

    return triListeObjetsSurPropriete(
      mentionsFiltrees,
      mentionsFiltrees.every(mention => mention.numeroOrdreExtrait !== null) ? "numeroOrdreExtrait" : "numeroOrdre"
    ).map(mention => (copie ? mention.getTexteCopie() : mention.getTexteExtrait()));
  }
}
