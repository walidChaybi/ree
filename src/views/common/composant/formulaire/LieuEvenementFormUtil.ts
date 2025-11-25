import { estNonRenseigne } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export const estModeSaisieFrance = (ville?: string, pays?: string, etrangerParDefaut = true): boolean => {
  if (LieuxUtils.estVilleJerusalem(ville)) {
    return false;
  }

  if (etrangerParDefaut) {
    return LieuxUtils.estPaysFrance(pays);
  } else {
    return estNonRenseigne(pays) || LieuxUtils.estPaysFrance(pays);
  }
};

export const getLabelOuDepartement = (modeSaisieFrance: boolean) => {
  let label = "Région";
  if (modeSaisieFrance) {
    label = "Département";
  }
  return label;
};
