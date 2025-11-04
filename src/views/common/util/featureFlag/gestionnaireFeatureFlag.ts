import { estRenseigne } from "@util/Utils";
import { FeatureFlag } from "./FeatureFlag";
const CANARY_TESTING = "CANARY_TESTING";

interface idArobasEtFeaturesFlags {
  [key: string]: string[];
}

class GestionnaireFeatureFlag {
  estActif(featureFlag: FeatureFlag): boolean {
    const valeurFlag = window.localStorage.getItem(featureFlag);
    return this.estValeurFlagValide(valeurFlag);
  }

  auMoinUnEstActif(...featureFlags: FeatureFlag[]): boolean {
    return featureFlags.some(ff => this.estActif(ff));
  }

  positionneFlagsAPartirDuHeader(header: any, idArobasUtilisateur: string) {
    // Exemple canary testing '[{"0123456": ["FF_DELIVRANCE_CIBLE_EXTRAITS_COPIES"]}, {"0456255": ["FF_DELIVRANCE_CERTIFS_SITUATION"]}]';
    const idArobassEtFeaturesFlags: idArobasEtFeaturesFlags[] | undefined = this.getIdArobasEtFeaturesFlags(header);

    this.supprimeTousLesFlags([FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATION, FeatureFlag.FF_DELIVRANCE_CIBLE_EXTRAITS_COPIES]);

    const props = Object.getOwnPropertyNames(FeatureFlag);
    props.forEach((prop: string) => {
      const valeurFlag = this.getValeurFlagHeader(header, prop);
      if (this.estValeurFlagValide(valeurFlag)) {
        window.localStorage.setItem(prop, valeurFlag);
      }
    });

    const featuresFlagsUtilisateurConnecte = this.getFeatureFlagsAPartirIdArobas(idArobassEtFeaturesFlags, idArobasUtilisateur);

    if (featuresFlagsUtilisateurConnecte) {
      featuresFlagsUtilisateurConnecte.forEach((featureFlag: string) => {
        window.localStorage.setItem(featureFlag, "true");
      });
    }
  }

  private getFeatureFlagsAPartirIdArobas(idArobasEtFeaturesFlags: idArobasEtFeaturesFlags[] | undefined, idArobas: string): string[] {
    const idArobasEtFeaturesFlagsTrouve = idArobasEtFeaturesFlags?.find(idOuFeatureFlag => idOuFeatureFlag.hasOwnProperty(idArobas));

    return idArobasEtFeaturesFlagsTrouve ? idArobasEtFeaturesFlagsTrouve[idArobas] : [];
  }

  private getIdArobasEtFeaturesFlags(header: any): idArobasEtFeaturesFlags[] | undefined {
    const canaryTestingHeader = this.getValeurFlagHeader(header, CANARY_TESTING);
    return estRenseigne(canaryTestingHeader) ? this.parseJson(canaryTestingHeader) : undefined;
  }

  private parseJson(json: string): idArobasEtFeaturesFlags[] | undefined {
    let idArobasEtFeaturesFlags: idArobasEtFeaturesFlags[] | undefined;

    try {
      idArobasEtFeaturesFlags = JSON.parse(json);
    } catch (error) {
      window.alert(`Erreur lors du parsing du json du Header CANARY_TESTING: ${error}`);
    }
    return idArobasEtFeaturesFlags;
  }

  private getValeurFlagHeader(header: any, prop: string) {
    let valeurFlag = "";
    const headerProps = Object.getOwnPropertyNames(header);
    headerProps.forEach((headerProp: string) => {
      if (headerProp.toLocaleLowerCase() === prop.toLocaleLowerCase()) {
        valeurFlag = header[headerProp];
      }
    });
    return valeurFlag;
  }

  private supprimeTousLesFlags(nomFlags: string[]): void {
    const props = Object.getOwnPropertyNames(FeatureFlag);
    props.forEach((prop: string) => {
      if (nomFlags.includes(prop)) {
        window.localStorage.removeItem(prop);
      }
    });
  }

  private estValeurFlagValide(valeurFlag: string | null): boolean {
    return valeurFlag != null && valeurFlag.toLocaleLowerCase() === "true";
  }
}

export const gestionnaireFeatureFlag = new GestionnaireFeatureFlag();
