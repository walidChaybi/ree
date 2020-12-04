import { FeatureFlag } from "./FeatureFlag";

const NOM_CLE_FEATURE_FLAG = "featureFlag";

class GestionnaireFeatureFlag {
  estActif(featureFlag: FeatureFlag): boolean {
    const featureFlags = localStorage.getItem(NOM_CLE_FEATURE_FLAG);
    return (
      process.env.NODE_ENV === "test" ||
      (featureFlags != null &&
        featureFlags.split(";").indexOf(featureFlag) !== -1)
    );
  }
}

export const gestionnaireFeatureFlag = new GestionnaireFeatureFlag();
