import { estNonRenseigne, getLibelle } from "../../util/Utils";
import { LieuxUtils } from "../../utilMetier/LieuxUtils";

export function estModeSaisieFrance(
  ville?: string,
  pays?: string,
  etrangerParDefaut = true
): boolean {
  if (LieuxUtils.estVilleJerusalem(ville)) {
    return false;
  }

  if (etrangerParDefaut) {
    return LieuxUtils.isPaysFrance(pays);
  } else {
    return estNonRenseigne(pays) || LieuxUtils.isPaysFrance(pays);
  }
}

export function getLabelOuDepartement(modeSaisieFrance: boolean) {
  let label = getLibelle("Région");
  if (modeSaisieFrance) {
    label = getLibelle("Département");
  }
  return label;
}
