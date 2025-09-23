import EExistenceContratMariage from "@model/etatcivil/enum/EExistenceContratMariage";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { FicheActe } from "../../../etatcivil/acte/FicheActe";
import { ELienParente } from "../../../etatcivil/enum/ELienParente";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { EValidation } from "../../../requete/enum/EValidation";
import {
  CommunExtraitOuCopieActeTexteComposition,
  ICreerExtraitCopieActeTexteAvantCompositionParams,
  IParentsTitulaireCompositionEC,
  ITitulaireCompositionEC
} from "./CommunExtraitOuCopieActeTexteComposition";

export class ExtraitCopieActeTexteMariageComposition {
  public static creerExtraitCopieActeTexteMariage(params: ICreerExtraitCopieActeTexteAvantCompositionParams) {
    const natureActe = NatureActe.MARIAGE.libelle.toUpperCase();
    const corpsTexte =
      EValidation.E !== params.validation
        ? ExtraitCopieActeTexteMariageComposition.getCorpsTexte(params.acte, ChoixDelivrance.estAvecFiliation(params.choixDelivrance))
        : undefined;

    return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
      acte: params.acte,
      natureActe,
      choixDelivrance: params.choixDelivrance,
      sousTypeRequete: params.requete.sousType,
      validation: params.validation,
      corpsTexte,
      mentionsRetirees: params.mentionsRetirees,
      ctv: params.ctv
    });
  }

  private static getCorpsTexte(acteMariage: FicheActe, avecFiliation: boolean) {
    const { ecTitulaire1, ecTitulaire2 } = CommunExtraitOuCopieActeTexteComposition.getTitulairesCorpsTexte(acteMariage);

    let parents1 = "";
    let parents2 = "";
    let parentsAdoptants1 = "";
    let parentsAdoptants2 = "";

    if (avecFiliation) {
      ({ parents1, parentsAdoptants1, parents2, parentsAdoptants2 } = ExtraitCopieActeTexteMariageComposition.getPhrasesParents(
        ecTitulaire1,
        ecTitulaire2
      ));
    }

    // Création de l'événement pour le corps
    const evtActe = CommunExtraitOuCopieActeTexteComposition.getEvenementActeCompositionEC(acteMariage);

    // Création le l'énonciation du contrat pour le corps
    const enonciationContratDeMariage = ExtraitCopieActeTexteMariageComposition.getEnonciationContratMariage(
      acteMariage.detailMariage?.existenceContrat,
      acteMariage.detailMariage?.contrat
    ); //<énonciation contrat de mariage>

    return `${evtActe.leouEnEvenement} ${evtActe.dateEvenement} à ${evtActe.lieuEvenement}
a été célébré le mariage
de ${ecTitulaire1.prenoms} ${ecTitulaire1.nom} ${ecTitulaire1.partiesNom}${this.getNaissance(
      ecTitulaire1.dateNaissanceOuAge,
      ecTitulaire1.lieuNaissance
    )}${parents1}${parentsAdoptants1}
et de ${ecTitulaire2?.prenoms} ${ecTitulaire2?.nom} ${ecTitulaire2?.partiesNom}${this.getNaissance(
      ecTitulaire2?.dateNaissanceOuAge,
      ecTitulaire2?.lieuNaissance
    )}${parents2}${parentsAdoptants2}

Contrat de mariage : ${enonciationContratDeMariage}`;
  }

  //Gestion du retour chariot pour la ligne à propos de la naissance
  private static getNaissance(dateAge: string | undefined, lieu: string | undefined) {
    let naissance = "";
    if (dateAge || lieu) {
      naissance = `
${dateAge}${lieu}`;
    }
    return naissance;
  }

  private static getPhrasesParents(ecTitulaire1: ITitulaireCompositionEC, ecTitulaire2?: ITitulaireCompositionEC) {
    let parents1 = "";
    let parents2 = "";
    let parentsAdoptants1 = "";
    let parentsAdoptants2 = "";
    //Construction phrase parents
    parents1 = this.constructionPhraseParents(
      ecTitulaire1.parentsTitulaire.filter(parent => parent.lienParente === ELienParente.PARENT),
      ELienParente.PARENT
    );
    parentsAdoptants1 = this.constructionPhraseParents(
      ecTitulaire1.parentsTitulaire.filter(parent => parent.lienParente !== ELienParente.PARENT),
      ELienParente.PARENT_ADOPTANT
    );

    //Construction phrase parents adoptants
    if (ecTitulaire2) {
      parents2 = this.constructionPhraseParents(
        ecTitulaire2.parentsTitulaire.filter(parent => parent.lienParente === ELienParente.PARENT),
        ELienParente.PARENT
      );
      parentsAdoptants2 = this.constructionPhraseParents(
        ecTitulaire2.parentsTitulaire.filter(parent => parent.lienParente !== ELienParente.PARENT),
        ELienParente.PARENT_ADOPTANT
      );
    }
    return { parents1, parentsAdoptants1, parents2, parentsAdoptants2 };
  }

  private static constructionPhraseParents(parents: IParentsTitulaireCompositionEC[], lienParente: ELienParente) {
    let resultatPhraseParents = "";
    const parent1 = parents[0]
      ? `
  ${parents[0].filsOuFille} ${parents[0].prenoms} ${parents[0].nom}`
      : "";
    const parent2 = parents[1] ? `${parents[1].prenoms} ${parents[1].nom}` : "";

    resultatPhraseParents = parent1;

    if (parent2 && lienParente === ELienParente.PARENT) {
      resultatPhraseParents += `
  et de ${parent2}`;
    } else if (parent2 && (lienParente === ELienParente.PARENT_ADOPTANT || lienParente === ELienParente.ADOPTANT_CONJOINT_DU_PARENT)) {
      resultatPhraseParents += ` et par ${parent2}`;
    }

    return resultatPhraseParents;
  }

  private static getEnonciationContratMariage(existenceContratMariage?: keyof typeof EExistenceContratMariage, text?: string): string {
    switch (existenceContratMariage) {
      case "OUI":
        return text ?? "";
      case "NON":
        return "Sans contrat préalable";
      default:
        return "--";
    }
  }
}
