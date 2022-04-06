import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { ICorpsImage } from "../../../etatcivil/acte/imageActe/ICorpsImage";
import { ChoixDelivrance } from "../../../requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../requete/enum/SousTypeDelivrance";
import { Validation } from "../../../requete/enum/Validation";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";
import { CommunExtraitOuCopieActeTexteComposition } from "./CommunExtraitOuCopieActeTexteComposition";

export interface ICreerExtraitCopieActeImageParams {
  acte: IFicheActe;
  natureActe: string;
  choixDelivrance: ChoixDelivrance;
  sousTypeRequete: SousTypeDelivrance;
  validation: Validation;
  avecFiliation: boolean;
  copie: boolean;
  archive: boolean;
  corpsImage?: ICorpsImage;
  erreur?: string;
}

export class CopieActeImageComposition {
  public static creerCopieActeImage(params: ICreerExtraitCopieActeImageParams) {
    const composition = {} as IExtraitCopieComposition;

    // Filigrane archive (le bloc de signature sera automatiquement masqué)
    composition.filigrane_archive = params.archive;

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

    composition.corps_image = CopieActeImageComposition.mapCorpsImage(params.corpsImage);

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

  private static mapCorpsImage(corpsImage? : ICorpsImage) : { images: string }[] | undefined{
    return corpsImage?.images.sort((image1, image2) => image1.noPage - image2.noPage)
    .map((image)=> ({images : image.contenu}))
  }
}
