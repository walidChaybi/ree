import { getValeurOuVide } from "../../../../views/common/util/Utils";
import { FicheActe, IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { ExistenceContratMariage } from "../../../etatcivil/enum/ExistenceContratMariage";
import { TypeExtrait } from "../../../etatcivil/enum/TypeExtrait";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";
import { CommunExtraitOuCopieActeTexteComposition } from "./CommunExtraitOuCopieActeTexteComposition";

export class ExtraitCopieActeTexteMariageComposition {
  public static creerExtraitCopieActeTexte(
    acteMariage: IFicheActe,
    avecFiliation = false,
    copie = false,
    archive = false
  ) {
    const composition = {} as IExtraitCopieComposition;

    const {
      ecTitulaire1,
      ecTitulaire2
    } = CommunExtraitOuCopieActeTexteComposition.creerExtraitCopie(
      composition,
      acteMariage
    );

    composition.type_document = copie ? "COPIE" : "EXTRAIT";
    composition.nature_acte = "MARIAGE";

    const ecActe = CommunExtraitOuCopieActeTexteComposition.creerEvenementActeCompositionEC(
      acteMariage
    );

    composition.filigrane_archive = archive;

    const enonciationContratDeMariage = ExtraitCopieActeTexteMariageComposition.creerEnonciationContratMariage(
      acteMariage.detailMariage?.existenceContrat,
      acteMariage.detailMariage?.contrat
    ); //<énonciation contrat de mariage>

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
      if (avecFiliation) {
        // TODO
      }

      composition.corps_texte = `${ecActe.leouEnEvenement} ${ecActe.dateEvenement}
a été célébré à ${ecActe.lieuEvenement}
le mariage
de ${ecTitulaire1.prenoms} ${ecTitulaire1.nom} ${ecTitulaire1.partiesNom}
${ecTitulaire1.dateNaissanceOuAge} à ${ecTitulaire1.lieuNaissance}
et de ${ecTitulaire2.prenoms} ${ecTitulaire2.nom} ${ecTitulaire2.partiesNom}
${ecTitulaire2.dateNaissanceOuAge} à ${ecTitulaire2.lieuNaissance}

Contrat de mariage : ${enonciationContratDeMariage}`;
    }

    return composition;
  }

  public static creerEnonciationContratMariage(
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
