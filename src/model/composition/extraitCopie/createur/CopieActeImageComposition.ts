import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { ICorpsImage } from "../../../etatcivil/acte/imageActe/ICorpsImage";
import { Validation } from "../../../requete/enum/Validation";
import { IRequeteDelivrance } from "../../../requete/IRequeteDelivrance";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";
import { CommunExtraitOuCopieActeTexteComposition } from "./CommunExtraitOuCopieActeTexteComposition";

export interface ICreerExtraitCopieActeImageParams {
  acte: IFicheActe;
  natureActe: string;
  requete: IRequeteDelivrance;
  validation: Validation;
  choixDelivrance: ChoixDelivrance;
  corpsImage?: ICorpsImage;
  erreur?: string;
  ctv: string;
}

export class CopieActeImageComposition {
  public static creerCopieActeImage(params: ICreerExtraitCopieActeImageParams) {
    const composition = {} as IExtraitCopieComposition;

    composition.code_CTV = params.ctv;

    // Filigrane archive (le bloc de signature sera automatiquement masqué)
    composition.filigrane_archive = ChoixDelivrance.estCopieArchive(
      params.choixDelivrance
    );

    // Création de l'entête
    CommunExtraitOuCopieActeTexteComposition.creerReferenceActeEtDateDuJour(
      composition,
      params.acte
    );

    // Type et nature de document
    composition.type_document = "COPIE";
    composition.nature_acte = params.natureActe;

    // Erreur (Dans le cas d'un manque d'information pour la génération du document)
    composition.erreur = params.erreur;

    composition.corps_image = CopieActeImageComposition.mapCorpsImage(
      params.corpsImage
    );

    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(
      composition,
      params.choixDelivrance,
      params.requete.sousType,
      params.acte.nature,
      params.validation
    );

    CommunExtraitOuCopieActeTexteComposition.creerBlocNotice(
      composition,
      params.choixDelivrance,
      params.requete.sousType,
      params.acte.nature,
      params.validation
    );

    return composition;
  }

  private static mapCorpsImage(corpsImage?: ICorpsImage): string[] | undefined {
    return corpsImage?.images
      .sort((image1, image2) => image1.noPage - image2.noPage)
      .map(image => image.contenu);
  }
}
