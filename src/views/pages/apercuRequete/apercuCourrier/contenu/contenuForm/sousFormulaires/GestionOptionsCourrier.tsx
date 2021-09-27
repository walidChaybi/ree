import { DocumentDelivrance } from "../../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { TypeNatureActe } from "../../../../../../../model/requete/v2/enum/TypeNatureActe";
import {
  OptionCourrier,
  OptionsCourrier
} from "../../../../../../../model/requete/v2/IOptionCourrier";
import { IOptionCourrierDocumentReponse } from "../../../../../../../model/requete/v2/IOptionCourrierDocumentReponse";
import { TRequete } from "../../../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../../../model/requete/v2/IRequeteDelivrance";
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
  return (
    option !== undefined &&
    option.texteOptionCourrier === option.texteOptionCourrierModifier
  );
}

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
  const optsDispos: OptionsCourrier = [];
  if (optionsChoisies.length === 0) {
    optionsDisponibles.forEach((optDispo: OptionCourrier, index: number) => {
      if (optDispo.optionParDefaut) {
        optionsChoisies.push(optDispo);
      } else {
        optsDispos.push(optDispo);
      }
    });
  } else {
    optionsChoisies.forEach((optChoisie: OptionCourrier) => {
      optionsDisponibles.forEach((optDispo: OptionCourrier, index: number) => {
        if (optDispo.code !== optChoisie.code) {
          optsDispos.push(optDispo);
        }
      });
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
  nature?: TypeNatureActe
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
  nature: TypeNatureActe
): OptionsCourrier {
  switch (nature) {
    case TypeNatureActe.NAISSANCE:
      return options.filter((opt: OptionCourrier) => opt.acteNaissance);

    case TypeNatureActe.DECES:
      return options.filter((opt: OptionCourrier) => opt.acteDeces);

    case TypeNatureActe.MARIAGE:
      return options.filter((opt: OptionCourrier) => opt.acteDeces);
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
