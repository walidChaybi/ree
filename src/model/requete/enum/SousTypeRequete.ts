/* istanbul ignore file */
import { Option } from "@util/Type";
import { SousTypeCreation } from "./SousTypeCreation";
import { SousTypeDelivrance } from "./SousTypeDelivrance";
import { SousTypeInformation } from "./SousTypeInformation";
import { SousTypeMiseAJour } from "./SousTypeMiseAJour";
import { TypeRequete } from "./TypeRequete";

export type SousTypeRequete =
  | SousTypeCreation
  | SousTypeDelivrance
  | SousTypeInformation
  | SousTypeMiseAJour;

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

