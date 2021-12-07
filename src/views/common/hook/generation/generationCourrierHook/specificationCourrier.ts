import { IAnalyseMarginale } from "../../../../../model/etatcivil/acte/IAnalyseMarginale";
import {
  FicheActe,
  IFicheActe
} from "../../../../../model/etatcivil/acte/IFicheActe";
import { TitulaireActe } from "../../../../../model/etatcivil/acte/ITitulaireActe";
import {
  OptionCourrier,
  OptionsCourrier
} from "../../../../../model/requete/IOptionCourrier";
import { IPrenomOrdonnes } from "../../../../../model/requete/IPrenomOrdonnes";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "../../../../../model/requete/ITitulaireRequete";
import { SaisieCourrier } from "../../../../pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";
import {
  formatPrenom,
  getValeurOuVide,
  triListeObjetsSurPropriete
} from "../../../util/Utils";

export interface OptionsJasper {
  option?: string;
  option_puce?: string;
}

export interface IElementsJasperCourrier {
  nomTitulaire1: string;
  prenomsTitulaire1: string;
  nomTitulaire2: string;
  prenomsTitulaire2: string;
  options: OptionsJasper[];
  texteLibre: string;
  optionsTexteLibre: OptionsJasper[];
  referenceActe: string;
  natureActe: string;
}

async function ajoutInfosTitulaire(
  elementsJasper: IElementsJasperCourrier,
  requete: IRequeteDelivrance,
  acte?: IFicheActe
) {
  let titulaires = [];
  let analyseMarginale = {} as IAnalyseMarginale;

  if (acte?.id && acte?.analyseMarginales) {
    acte?.analyseMarginales.forEach((analyse: IAnalyseMarginale) => {
      if (analyse.dateFinEffet === null) {
        analyseMarginale = analyse;
      }
    });
  }

  if (analyseMarginale?.titulaires) {
    elementsJasper.referenceActe = FicheActe.getReference(acte);

    titulaires = triListeObjetsSurPropriete(
      [...analyseMarginale.titulaires],
      "ordre"
    );

    elementsJasper.nomTitulaire1 = TitulaireActe.getNom(titulaires[0]);
    elementsJasper.prenomsTitulaire1 = getPrenomsTitulaireActe(
      titulaires[0].prenoms
    );

    if (titulaires.length > 1) {
      elementsJasper.nomTitulaire2 = TitulaireActe.getNom(titulaires[1]);
      elementsJasper.prenomsTitulaire2 = getPrenomsTitulaireActe(
        titulaires[1].prenoms
      );
    }
  } else {
    if (requete.titulaires) {
      titulaires = triListeObjetsSurPropriete(
        [...requete.titulaires],
        "position"
      ) as ITitulaireRequete[];
      elementsJasper.nomTitulaire1 = TitulaireRequete.getNom(titulaires[0]);
      elementsJasper.prenomsTitulaire1 = getPrenomsTitulaireRequete(
        titulaires[0].prenoms
      );

      if (titulaires.length > 1) {
        elementsJasper.nomTitulaire2 = TitulaireRequete.getNom(titulaires[1]);
        elementsJasper.prenomsTitulaire2 = getPrenomsTitulaireRequete(
          titulaires[1].prenoms
        );
      }
    }
  }
}

function getPrenomsTitulaireActe(prenomsTitulaire?: string[]): string {
  let prenoms = "";

  if (prenomsTitulaire) {
    prenoms = prenomsTitulaire.map(prenom => formatPrenom(prenom)).join(", ");
  }
  return prenoms;
}

function getPrenomsTitulaireRequete(
  prenomsTitulaire?: IPrenomOrdonnes[]
): string {
  let prenoms = "";

  if (prenomsTitulaire) {
    const prenomsOrdonnes = triListeObjetsSurPropriete(
      [...prenomsTitulaire],
      "numeroOrdre"
    );
    const tableau: string[] = [];
    prenomsOrdonnes.forEach((p: IPrenomOrdonnes) => tableau.push(p.prenom));
    prenoms = tableau.join(", ");
  }
  return prenoms;
}

const LIMITE_ORDRE_EDITION_OPTION = 900;

function ajoutOptions(
  elementsJasper: IElementsJasperCourrier,
  optionsChoisies?: OptionsCourrier
) {
  if (optionsChoisies && optionsChoisies.length > 0) {
    elementsJasper.options = [];
    elementsJasper.optionsTexteLibre = [];

    optionsChoisies.forEach((option: OptionCourrier) => {
      if (option.ordreEdition < LIMITE_ORDRE_EDITION_OPTION) {
        optionOuOptionAPuce(elementsJasper.options, option);
      } else {
        optionOuOptionAPuce(elementsJasper.optionsTexteLibre, option);
      }
    });
  }
}

function optionOuOptionAPuce(
  tabOptions: OptionsJasper[],
  option: OptionCourrier
) {
  if (option.optionAPuce) {
    tabOptions.push({
      option_puce: getTexteOption(option)
    });
  } else {
    tabOptions.push({
      option: getTexteOption(option)
    });
  }
}

function getTexteOption(option: OptionCourrier) {
  return option.texteOptionCourrierModifier
    ? option.texteOptionCourrierModifier
    : option.texteOptionCourrier;
}

/////////////////////////////////////////////////////////////////////
class SpecificationCourrier {
  getElementsJasper(
    saisieCourrier: SaisieCourrier,
    requete: IRequeteDelivrance,
    optionsChoisies?: OptionsCourrier,
    acte?: IFicheActe
  ) {
    const elementsJasper = {} as IElementsJasperCourrier;

    if (requete && saisieCourrier) {
      elementsJasper.natureActe = getValeurOuVide(
        requete.evenement?.natureActe.libelle
      ).toLowerCase();
      ajoutInfosTitulaire(elementsJasper, requete, acte);
      ajoutOptions(elementsJasper, optionsChoisies);
      elementsJasper.texteLibre = saisieCourrier.texteLibre.texte;
    }
    return elementsJasper;
  }
}

export const specificationCourrier = new SpecificationCourrier();
