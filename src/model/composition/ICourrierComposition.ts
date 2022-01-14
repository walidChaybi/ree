import {
  IElementsJasperCourrier,
  OptionsJasper
} from "../../views/common/hook/generation/generationCourrierHook/specificationCourrier";
import { IRequeteDelivrance } from "../requete/IRequeteDelivrance";
import {
  CommunComposition,
  ICommunComposition
} from "./commun/ICommunComposition";
import {
  IParametresComposition,
  ParametresComposition
} from "./commun/IParametresComposition";
import {
  IRequerantComposition,
  RequerantComposition
} from "./commun/IRequerantComposition";

export interface ICourrierComposition
  extends IParametresComposition,
    ICommunComposition,
    IRequerantComposition {
  nom_titulaire1: string;
  prenoms_titulaire1: string;
  nom_titulaire2: string;
  prenoms_titulaire2: string;
  options: OptionsJasper[];
  texte_libre: string;
  options_texte_libre: OptionsJasper[];
  reference_acte?: string;
  nature_acte?: string;
  texte_variable_RDD?: string;
  texte_variable_RDC?: string;
}

export const CourrierComposition = {
  creerCourrier(
    requete: IRequeteDelivrance,
    elementsJasper: IElementsJasperCourrier
  ) {
    const courrier = {} as ICourrierComposition;
    if (requete.choixDelivrance) {
      ParametresComposition.ajoutParametres(courrier, true);
    } else {
      ParametresComposition.ajoutParametres(courrier);
    }

    CommunComposition.ajoutParamCommuns(courrier, requete.numero);

    RequerantComposition.ajoutInfosRequerant(
      courrier,
      requete.canal,
      requete.requerant
    );

    // Titulaires
    courrier.nom_titulaire1 = elementsJasper.nomTitulaire1;
    courrier.prenoms_titulaire1 = elementsJasper.prenomsTitulaire1;

    if (elementsJasper.nomTitulaire2 && elementsJasper.prenomsTitulaire2) {
      courrier.nom_titulaire2 = elementsJasper.nomTitulaire2;
      courrier.prenoms_titulaire2 = elementsJasper.prenomsTitulaire2;
    }

    courrier.reference_acte = elementsJasper.referenceActe
      ? elementsJasper.referenceActe
      : undefined;

    courrier.options = elementsJasper.options;

    courrier.texte_libre = elementsJasper.texteLibre;

    courrier.options_texte_libre = elementsJasper.optionsTexteLibre;

    courrier.nature_acte = elementsJasper.natureActe;

    courrier.texte_variable_RDD = elementsJasper.texte_variable_RDD;
    courrier.texte_variable_RDC = elementsJasper.texte_variable_RDC;

    return courrier;
  }
};
