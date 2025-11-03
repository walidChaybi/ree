import { IImage } from "@model/etatcivil/acte/imageActe/IImage";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { FicheActe } from "../../../etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "../../../requete/IRequeteDelivrance";
import { EValidation } from "../../../requete/enum/EValidation";
import { IExtraitCopieComposition } from "../IExtraitCopieComposition";
import { CommunExtraitOuCopieActeTexteComposition } from "./CommunExtraitOuCopieActeTexteComposition";

interface ICreerExtraitCopieActeImageParams {
  acte: FicheActe;
  natureActe: string;
  requete: IRequeteDelivrance;
  validation: EValidation;
  choixDelivrance: ChoixDelivrance;
  images?: IImage[];
  erreur?: string;
  ctv: string;
}

export class CopieActeImageComposition {
  public static creerCopieActeImage(params: ICreerExtraitCopieActeImageParams) {
    const composition = {} as IExtraitCopieComposition;

    composition.code_CTV = params.ctv;

    // Filigrane archive (le bloc de signature sera automatiquement masqué)
    composition.filigrane_archive = ChoixDelivrance.estCopieArchive(params.choixDelivrance);

    // Création de l'entête
    CommunExtraitOuCopieActeTexteComposition.creerReferenceActeEtDateDuJour(composition, params.acte);

    // Type et nature de document
    composition.type_document = "COPIE";
    composition.nature_acte = params.natureActe;

    // Erreur (Dans le cas d'un manque d'information pour la génération du document)
    composition.erreur = params.erreur;

    composition.corps_image = CopieActeImageComposition.mapImages(params.images);

    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(
      composition,
      params.choixDelivrance,
      params.requete.sousType,
      params.acte.nature,
      params.validation
    );

    CommunExtraitOuCopieActeTexteComposition.creerBlocNotice(composition, params.choixDelivrance, params.requete.sousType);

    return composition;
  }

  private static mapImages(images?: IImage[]): string[] | undefined {
    return images?.sort((image1, image2) => image1.noPage - image2.noPage).map(image => image.contenu);
  }
}
