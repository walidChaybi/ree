import { Option } from "@util/Type";
import { ELibelleSousTypeCreation, ESousTypeCreation, SousTypeCreation } from "./SousTypeCreation";
import { ELibelleSousTypeDelivrance, ESousTypeDelivrance, SousTypeDelivrance } from "./SousTypeDelivrance";
import { ELibelleSousTypeInformation, ESousTypeInformation, SousTypeInformation } from "./SousTypeInformation";
import { ELibelleSousTypeMiseAJour, ESousTypeMiseAJour, SousTypeMiseAJour } from "./SousTypeMiseAJour";
import { ETypeRequete, TypeRequete } from "./TypeRequete";

export type TSousTypeRequete<TTypeRequete extends keyof typeof ETypeRequete> = TTypeRequete extends "DELIVRANCE"
  ? keyof typeof ESousTypeDelivrance
  : TTypeRequete extends "CREATION"
    ? keyof typeof ESousTypeCreation
    : TTypeRequete extends "MISE_A_JOUR"
      ? keyof typeof ESousTypeMiseAJour
      : TTypeRequete extends "INFORMATION"
        ? keyof typeof ESousTypeInformation
        : never;

export const ELibelleSousTypeRequete = {
  ...ELibelleSousTypeCreation,
  ...ELibelleSousTypeDelivrance,
  ...ELibelleSousTypeMiseAJour,
  ...ELibelleSousTypeInformation
};

export type SousTypeRequete = SousTypeCreation | SousTypeDelivrance | SousTypeInformation | SousTypeMiseAJour;

export const SousTypeRequeteUtil = {
  getOptionsAPartirTypeRequete: (type: TypeRequete): Option[] => {
    let options: Option[] = [];

    switch (type) {
      case TypeRequete.DELIVRANCE:
        options = SousTypeDelivrance.getAllEnumsAsOptions();
        break;
      case TypeRequete.CREATION:
        options = SousTypeCreation.getAllEnumsAsOptions();
        break;
      case TypeRequete.MISE_A_JOUR:
        options = SousTypeMiseAJour.getAllEnumsAsOptions();
        break;
      case TypeRequete.INFORMATION:
        options = SousTypeInformation.getAllEnumsAsOptions();
        break;

      default:
        break;
    }

    return options;
  }
};
