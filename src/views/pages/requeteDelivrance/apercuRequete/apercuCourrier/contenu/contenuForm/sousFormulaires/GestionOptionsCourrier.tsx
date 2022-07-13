import { DocumentDelivrance } from "../../../../../../../../model/requete/enum/DocumentDelivrance";
import { NatureActeRequete } from "../../../../../../../../model/requete/enum/NatureActeRequete";
import {
  OptionCourrier,
  OptionsCourrier
} from "../../../../../../../../model/requete/IOptionCourrier";
import { IOptionCourrierDocumentReponse } from "../../../../../../../../model/requete/IOptionCourrierDocumentReponse";
import { TRequete } from "../../../../../../../../model/requete/IRequete";
import { IRequeteDelivrance } from "../../../../../../../../model/requete/IRequeteDelivrance";
import { getDocumentReponseAModifier } from "../CourrierFonctions";
import "./scss/OptionsCourrierForm.scss";

export function optionAPuce(option: OptionCourrier | undefined): boolean {
  return option !== undefined && option.optionAPuce;
}

export function optionPresenceVariables(
  option: OptionCourrier | undefined
): boolean {
  return option !== undefined && option.presenceVariables;
}

export function optionOptionLibre(option: OptionCourrier | undefined): boolean {
  return option !== undefined && option.optionLibre;
}

export function contenuDisabled(
  option: OptionCourrier | undefined,
  optionsChoisies: OptionsCourrier
): boolean {
  return (
    option === undefined ||
    (option !== undefined && optionsChoisies.indexOf(option) === -1) ||
    !(optionPresenceVariables(option) || optionOptionLibre(option))
  );
}

export function contenuOptionNonModifier(
  option: OptionCourrier | undefined
): boolean {
  return option !== undefined && !texteOptionCourrierModifie(option);
}

export const texteOptionCourrierModifie = (option: OptionCourrier): boolean =>
  option.texteOptionCourrier !== option.texteOptionCourrierModifier;

export function classNameContenu(
  option: OptionCourrier | undefined,
  optionsChoisies: OptionsCourrier
): string | undefined {
  let className: string | undefined;
  if (contenuDisabled(option, optionsChoisies)) {
    className = undefined;
  } else if (contenuOptionNonModifier(option)) {
    className = "BordureRouge";
  } else {
    className = "BordureVerte";
  }
  return className;
}

export function reinitialiserDisabled(
  option: OptionCourrier | undefined,
  optionsChoisies: OptionsCourrier
): boolean {
  return (
    contenuDisabled(option, optionsChoisies) || contenuOptionNonModifier(option)
  );
}

export function switchOption(
  opt: OptionCourrier,
  tabAvecAjout: OptionsCourrier,
  tabAvecSuppression: OptionsCourrier
): {
  optionsAvecAjout: OptionCourrier[];
  optionsAvecSuppression: OptionCourrier[];
} {
  const optionsAvecAjout = [...tabAvecAjout, opt];
  optionsAvecAjout.sort((a, b) => (a.ordreEdition > b.ordreEdition ? 1 : -1));

  const index = tabAvecSuppression.indexOf(opt);
  const optionsAvecSuppression = [
    ...tabAvecSuppression.slice(0, index),
    ...tabAvecSuppression.slice(index + 1)
  ];
  optionsAvecSuppression.sort((a, b) =>
    a.ordreEdition > b.ordreEdition ? 1 : -1
  );

  return { optionsAvecAjout, optionsAvecSuppression };
}

export function initialisationOptions(
  optionsDisponibles: OptionsCourrier,
  optionsChoisies: OptionsCourrier
) {
  let optsDispos: OptionsCourrier = [];
  if (optionsChoisies.length === 0) {
    optionsDisponibles.forEach((optDispo: OptionCourrier, index: number) => {
      if (optDispo.optionParDefaut) {
        optionsChoisies.push(optDispo);
      } else {
        optsDispos.push(optDispo);
      }
    });
  } else {
    optsDispos = optionsDisponibles;
    optionsChoisies.forEach((optChoisie: OptionCourrier) => {
      optsDispos = optsDispos.filter(
        (_, index: number) => index !== optsDispos.indexOf(optChoisie)
      );
    });
  }

  return { optsDispos, optsChoisies: optionsChoisies };
}

export function recupererLesOptionsDuCourrier(
  requete: TRequete,
  optionsCourrierPossible: OptionsCourrier
) {
  const document = getDocumentReponseAModifier(requete as IRequeteDelivrance);
  let optionsDuCourrier: OptionsCourrier = [];
  if (document && document.optionsCourrier) {
    optionsDuCourrier = mappingOptionCourrierDocumentReponse(
      document.optionsCourrier,
      optionsCourrierPossible
    );
  }

  return optionsDuCourrier;
}

function mappingOptionCourrierDocumentReponse(
  optionsDuCourrier: IOptionCourrierDocumentReponse[],
  optionsCourrierPossible: OptionsCourrier
) {
  const optionsDocumentReponse = [] as OptionsCourrier;
  optionsDuCourrier.forEach((optC: IOptionCourrierDocumentReponse) => {
    const optionPossible = optionsCourrierPossible.find(
      optP => optP.id === optC.code
    );
    if (optionPossible && optC.texte) {
      optionPossible.texteOptionCourrierModifier = optC.texte;
      optionsDocumentReponse.push(optionPossible);
    }
  });

  return optionsDocumentReponse;
}

export function recupererLesOptionsDisponiblesPourLeCourrier(
  options: OptionsCourrier,
  documentDelivranceChoisi: DocumentDelivrance,
  nature?: NatureActeRequete
): OptionsCourrier {
  const idDocumentDelivrance = DocumentDelivrance.getKeyForCode(
    documentDelivranceChoisi.code
  );
  options = options.filter(
    (opt: OptionCourrier) =>
      opt.documentDelivrance === idDocumentDelivrance && opt.estActif
  );
  if (nature) {
    options = filtreSurNatureActe(options, nature);
  }

  return initialisationDesOptionsModifiables(options);
}

function filtreSurNatureActe(
  options: OptionsCourrier,
  nature: NatureActeRequete
): OptionsCourrier {
  switch (nature) {
    case NatureActeRequete.NAISSANCE:
      return options.filter((opt: OptionCourrier) => opt.acteNaissance);

    case NatureActeRequete.DECES:
      return options.filter((opt: OptionCourrier) => opt.acteDeces);

    case NatureActeRequete.MARIAGE:
      return options.filter((opt: OptionCourrier) => opt.acteMariage);
    default:
      return options;
  }
}

function initialisationDesOptionsModifiables(
  options: OptionsCourrier
): OptionsCourrier {
  options.forEach((opt: OptionCourrier) => {
    if (opt.presenceVariables || opt.optionLibre) {
      opt.texteOptionCourrierModifier = opt.texteOptionCourrier;
    }
  });
  return options;
}

export function messageOptionVariables(options: OptionsCourrier) {
  return options.some(opt => opt.presenceVariables === true);
}
