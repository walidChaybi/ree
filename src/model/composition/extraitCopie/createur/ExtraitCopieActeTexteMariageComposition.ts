import { getValeurOuVide } from "../../../../views/common/util/Utils";
import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { ExistenceContratMariage } from "../../../etatcivil/enum/ExistenceContratMariage";
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

    if (archive) {
      composition.filigrane_archive = true;
    }

    if (avecFiliation) {
      // TODO
    }

    const enonciationContratDeMariage = ExtraitCopieActeTexteMariageComposition.creerEnonciationContratMariage(
      acteMariage.detailMariage?.existenceContrat,
      acteMariage.detailMariage?.contrat
    ); //<énonciation contrat de mariage>

    if (copie && acteMariage.corpsText) {
      // Si une copie est demandée (et non un extrait) pour un acte texte
      composition.corps_texte = acteMariage.corpsText;
    } else {
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
