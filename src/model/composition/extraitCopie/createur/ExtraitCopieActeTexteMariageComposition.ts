import { getValeurOuVide } from "../../../../views/common/util/Utils";
import { FicheActe, IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { ExistenceContratMariage } from "../../../etatcivil/enum/ExistenceContratMariage";
import { LienParente } from "../../../etatcivil/enum/LienParente";
import { TypeExtrait } from "../../../etatcivil/enum/TypeExtrait";
import { ChoixDelivrance } from "../../../requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../requete/enum/SousTypeDelivrance";
import { Validation } from "../../../requete/enum/Validation";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";
import {
  CommunExtraitOuCopieActeTexteComposition,
  IParentsTitulaireCompositionEC,
  ITitulaireCompositionEC
} from "./CommunExtraitOuCopieActeTexteComposition";

export class ExtraitCopieActeTexteMariageComposition {
  public static creerExtraitCopieActeTexte(
    acteMariage: IFicheActe,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    validation: Validation,
    avecFiliation = false,
    copie = false,
    archive = false
  ) {
    const composition = {} as IExtraitCopieComposition;

    // Filigrane archive (le bloc de signature sera automatiquement masqué)
    composition.filigrane_archive = archive;

    // Création de l'entête
    CommunExtraitOuCopieActeTexteComposition.creerReferenceActeEtDateDuJour(
      composition,
      acteMariage
    );

    // Type et nature de document
    composition.type_document = copie ? "COPIE" : "EXTRAIT";
    composition.nature_acte = "MARIAGE";

    CommunExtraitOuCopieActeTexteComposition.créerAnalyseMarginale(
      composition,
      acteMariage
    );

    // Récupération de l'éventuelle rectification qui remplacera le corps
    const corpsExtraitRectification = FicheActe.getCorpsExtraitRectificationTexte(
      acteMariage,
      avecFiliation
        ? TypeExtrait.EXTRAIT_AVEC_FILIATION
        : TypeExtrait.EXTRAIT_SANS_FILIATION
    );

    if (copie && acteMariage.corpsText) {
      // Une copie est demandée (et non un extrait) pour un acte texte
      composition.corps_texte = acteMariage.corpsText;
    } else if (corpsExtraitRectification) {
      // L'acte comporte un corps d'extrait modifié correspondant au type d'extrait traité : extrait avec ou sans filiation
      composition.corps_texte = corpsExtraitRectification;
    } else {
      composition.corps_texte = ExtraitCopieActeTexteMariageComposition.getCorpsTexte(
        acteMariage,
        avecFiliation
      );
    }

    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(
      composition,
      choixDelivrance,
      sousTypeRequete,
      acteMariage.nature,
      validation,
      archive
    );
    return composition;
  }

  private static getCorpsTexte(
    acteMariage: IFicheActe,
    avecFiliation: boolean
  ) {
    const {
      ecTitulaire1,
      ecTitulaire2
    } = CommunExtraitOuCopieActeTexteComposition.getTitulairesCorpsText(
      acteMariage
    );

    let parents1 = "";
    let parents2 = "";
    let parentsAdoptants1 = "";
    let parentsAdoptants2 = "";

    if (avecFiliation) {
      ({
        parents1,
        parentsAdoptants1,
        parents2,
        parentsAdoptants2
      } = ExtraitCopieActeTexteMariageComposition.getPhrasesParents(
        ecTitulaire1,
        ecTitulaire2
      ));
    }

    // Création de l'événement pour le corps
    const evtActe = CommunExtraitOuCopieActeTexteComposition.getEvenementActeCompositionEC(
      acteMariage
    );

    // Création le l'énonciation du contrat pour le corps
    const enonciationContratDeMariage = ExtraitCopieActeTexteMariageComposition.getEnonciationContratMariage(
      acteMariage.detailMariage?.existenceContrat,
      acteMariage.detailMariage?.contrat
    ); //<énonciation contrat de mariage>

    return `${evtActe.leouEnEvenement} ${evtActe.dateEvenement}
a été célébré à ${evtActe.lieuEvenement}
le mariage
de ${ecTitulaire1.prenoms} ${ecTitulaire1.nom} ${ecTitulaire1.partiesNom}
${ecTitulaire1.dateNaissanceOuAge} à ${ecTitulaire1.lieuNaissance}${parents1}${parentsAdoptants1}
et de ${ecTitulaire2.prenoms} ${ecTitulaire2.nom} ${ecTitulaire2.partiesNom}
${ecTitulaire2.dateNaissanceOuAge} à ${ecTitulaire2.lieuNaissance}${parents2}${parentsAdoptants2}

Contrat de mariage : ${enonciationContratDeMariage}`;
  }

  private static getPhrasesParents(
    ecTitulaire1: ITitulaireCompositionEC,
    ecTitulaire2: ITitulaireCompositionEC
  ) {
    let parents1 = "";
    let parents2 = "";
    let parentsAdoptants1 = "";
    let parentsAdoptants2 = "";
    //Construction phrase parents
    parents1 = this.constructionPhraseParents(
      ecTitulaire1.parentsTitulaire.filter(
        parent => parent.lienParente === LienParente.PARENT
      ),
      LienParente.PARENT
    );
    parentsAdoptants1 = this.constructionPhraseParents(
      ecTitulaire1.parentsTitulaire.filter(
        parent => parent.lienParente !== LienParente.PARENT
      ),
      LienParente.PARENT_ADOPTANT
    );

    //Construction phrase parents adoptants
    parents2 = this.constructionPhraseParents(
      ecTitulaire2.parentsTitulaire.filter(
        parent => parent.lienParente === LienParente.PARENT
      ),
      LienParente.PARENT
    );
    parentsAdoptants2 = this.constructionPhraseParents(
      ecTitulaire2.parentsTitulaire.filter(
        parent => parent.lienParente !== LienParente.PARENT
      ),
      LienParente.PARENT_ADOPTANT
    );
    return { parents1, parentsAdoptants1, parents2, parentsAdoptants2 };
  }

  private static constructionPhraseParents(
    parents: IParentsTitulaireCompositionEC[],
    lienParente: LienParente
  ) {
    let resultatPhraseParents = "";
    const parent1 = parents[0]
      ? `
  ${parents[0].filsOuFille} ${parents[0].prenoms} ${parents[0].nom}`
      : "";
    const parent2 = parents[1] ? `${parents[1].prenoms} ${parents[1].nom}` : "";

    resultatPhraseParents = parent1;

    if (parent2 && lienParente === LienParente.PARENT) {
      resultatPhraseParents += `
  et de ${parent2}`;
    } else if (
      parent2 &&
      (lienParente === LienParente.PARENT_ADOPTANT ||
        lienParente === LienParente.ADOPTANT_CONJOINT_DU_PARENT)
    ) {
      resultatPhraseParents += ` et par ${parent2}`;
    }

    return resultatPhraseParents;
  }

  private static getEnonciationContratMariage(
    existanceContratMariage?: ExistenceContratMariage,
    text?: string
  ): string {
    let enonciationContratMariage;
    switch (existanceContratMariage) {
      case ExistenceContratMariage.OUI:
        enonciationContratMariage = getValeurOuVide(text);
        break;
      case ExistenceContratMariage.NON:
        enonciationContratMariage = "Sans contrat préalable";
        break;

      default:
        enonciationContratMariage = "--";
        break;
    }
    return enonciationContratMariage;
  }
}
