import { OptionCourrier, OptionCourrierDto, depuisOptionCourrierDtoVersOptionCourrier } from "@model/requete/IOptionCourrier";
import { IOptionCourrierDocumentReponse } from "@model/requete/IOptionCourrierDocumentReponse";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance, IDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { getDocumentReponseAModifier } from "../CourrierFonctions";
import "./scss/OptionsCourrierForm.scss";

export const contenuDisabled = (option: OptionCourrier | undefined, optionsChoisies: OptionCourrier[]): boolean =>
  option === undefined || optionsChoisies.indexOf(option) === -1 || !(option.presenceVariables || option.optionLibre);

const contenuOptionNonModifie = (option: OptionCourrier | undefined): boolean =>
  option !== undefined && !texteOptionCourrierModifie(option);

export const texteOptionCourrierModifie = (option: OptionCourrier): boolean =>
  option.texteOptionCourrier !== option.texteOptionCourrierModifie;

export const classNameContenu = (option: OptionCourrier | undefined, optionsChoisies: OptionCourrier[]): string | undefined => {
  switch (true) {
    case contenuDisabled(option, optionsChoisies):
      return undefined;
    case contenuOptionNonModifie(option):
      return "BordureRouge";
    default:
      return "BordureVerte";
  }
};

export const reinitialiserDisabled = (option: OptionCourrier | undefined, optionsChoisies: OptionCourrier[]): boolean =>
  contenuDisabled(option, optionsChoisies) || contenuOptionNonModifie(option);

// TOREFACTO : Nom de la fonction pas explicite
export const switchOption = (
  opt: OptionCourrier,
  optionsDisponibles: OptionCourrier[],
  optionsChoisies: OptionCourrier[],
  ajouter: boolean
): {
  disponibles: OptionCourrier[];
  choisies: OptionCourrier[];
} => {
  const choisies = (ajouter ? [...optionsChoisies, opt] : optionsChoisies.filter(optionChoisie => optionChoisie.id !== opt.id)).sort(
    (a, b) => a.ordreEdition - b.ordreEdition
  );

  const disponibles = (
    ajouter ? optionsDisponibles.filter(optionDisponible => optionDisponible.id !== opt.id) : [...optionsDisponibles, opt]
  ).sort((a, b) => a.ordreEdition - b.ordreEdition);

  return { disponibles, choisies };
};

// TOREFACTO : Noms de variables à changer
export const initialisationOptions = (optionsDisponibles: OptionCourrier[], optionsChoisies: OptionCourrier[]) => {
  let optsDispos: OptionCourrier[] = [];
  if (optionsChoisies.length === 0) {
    optionsDisponibles.forEach((optDispo: OptionCourrier) => {
      if (optDispo.optionParDefaut) {
        optionsChoisies.push(optDispo);
      } else {
        optsDispos.push(optDispo);
      }
    });
  } else {
    optsDispos = optionsDisponibles.filter(optionDispo => !optionsChoisies.find(optionChoisie => optionChoisie.id === optionDispo.id));
  }
  optsDispos.sort((a, b) => a.ordreEdition - b.ordreEdition);
  optionsChoisies.sort((a, b) => a.ordreEdition - b.ordreEdition);

  return { optsDispos, optsChoisies: optionsChoisies };
};

export const recupererLesOptionsDuCourrier = (requete: TRequete, optionsCourrierPossible: OptionCourrier[]) => {
  const document = getDocumentReponseAModifier(requete as IRequeteDelivrance);
  let optionsDuCourrier: OptionCourrier[] = [];
  if (document?.optionsCourrier) {
    optionsDuCourrier = mappingOptionCourrierDocumentReponse(document.optionsCourrier, optionsCourrierPossible);
  }

  return optionsDuCourrier;
};

const mappingOptionCourrierDocumentReponse = (
  optionsDuCourrier: IOptionCourrierDocumentReponse[],
  optionsCourrierPossible: OptionCourrier[]
): OptionCourrier[] => {
  const optionsDocumentReponse: OptionCourrier[] = [];

  optionsDuCourrier.forEach((optC: IOptionCourrierDocumentReponse) => {
    if (!optC.texte) {
      return;
    }
    const optionPossible = optionsCourrierPossible.find(optP => optP.id === optC.code);

    if (optionPossible) {
      optionPossible.texteOptionCourrierModifie = optC.texte;
      optionsDocumentReponse.push(optionPossible);
    }
  });

  return optionsDocumentReponse;
};

export const recupererLesOptionsDisponiblesPourLeCourrier = (
  options: OptionCourrierDto[],
  documentDelivranceChoisi: IDocumentDelivrance,
  natureActe?: NatureActeRequete
): OptionCourrier[] => {
  const idDocumentDelivrance = DocumentDelivrance.idDepuisCode(documentDelivranceChoisi.code);
  const filtreNatureActe: keyof OptionCourrier | undefined = (() => {
    switch (natureActe) {
      case NatureActeRequete.NAISSANCE:
        return "acteNaissance";
      case NatureActeRequete.DECES:
        return "acteDeces";
      case NatureActeRequete.MARIAGE:
        return "acteMariage";
      default:
        return undefined;
    }
  })();
  options = options.filter(
    (opt: OptionCourrierDto) =>
      opt.documentDelivrance === idDocumentDelivrance && opt.estActif && (filtreNatureActe ? opt[filtreNatureActe] : true)
  );

  return options.map(initialisationOptionCourrier);
};

const initialisationOptionCourrier = (optionDto: OptionCourrierDto): OptionCourrier => {
  let option = depuisOptionCourrierDtoVersOptionCourrier(optionDto);

  if (option.presenceVariables || option.optionLibre) {
    option.texteOptionCourrierModifie = option.texteOptionCourrier;
  }
  return option;
};

export const messageOptionVariables = (options: OptionCourrier[]): boolean => options.some(opt => opt.presenceVariables === true);
