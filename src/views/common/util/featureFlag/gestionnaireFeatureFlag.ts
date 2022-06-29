import { FeatureFlag } from "./FeatureFlag";

class GestionnaireFeatureFlag {
  estActif(featureFlag: FeatureFlag): boolean {
    const valeurFlag = window.localStorage.getItem(featureFlag);
    return this.estValeurFlagValide(valeurFlag);
  }

  auMoinUnEstActif(...featureFlags: FeatureFlag[]): boolean {
    return featureFlags.some(ff => this.estActif(ff));
  }

  positionneFlagsAPartirDuHeader(header: any) {
    this.supprimeTousLesFlags();
    const props = Object.getOwnPropertyNames(FeatureFlag);
    props.forEach((prop: string) => {
      const valeurFlag = this.getValeurFlagHeader(header, prop);
      if (this.estValeurFlagValide(valeurFlag)) {
        window.localStorage.setItem(prop, valeurFlag);
      }
    });
  }

  private getValeurFlagHeader(header: any, prop: string) {
    return header[prop.toLocaleLowerCase()] || header[prop];
  }

  private supprimeTousLesFlags(): void {
    const props = Object.getOwnPropertyNames(FeatureFlag);
    props.forEach((prop: string) => {
      window.localStorage.removeItem(prop);
    });
  }

  private estValeurFlagValide(valeurFlag: string | null): boolean {
    return (
      valeurFlag != null &&
      (valeurFlag.toLocaleLowerCase() === "true" ||
        valeurFlag.toLocaleLowerCase() === "1")
    );
  }
}

export const gestionnaireFeatureFlag = new GestionnaireFeatureFlag();
