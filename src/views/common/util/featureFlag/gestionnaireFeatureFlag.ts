import { estRenseigne } from "@util/Utils";
import { FeatureFlag } from "./FeatureFlag";
const CANARY_TESTING = "CANARY_TESTING";

interface IdSSOEtFeaturesFlags {
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

  positionneFlagsAPartirDuHeader(header: any, idSSOUtilisateur: string) {
    // Exemple canary testing '[{"0123456": ["FF_DELIVRANCE_EXTRAITS_COPIES"]}, {"0456255": ["FF_DELIV_CS","FF_RQT_INFORMATION"]}]';
    const idSSOsEtFeaturesFlags: IdSSOEtFeaturesFlags[] | undefined =
      this.getIdSSOsEtFeaturesFlags(header);

    this.supprimeTousLesFlags([
      FeatureFlag.FF_CONSULT_ACTE_RQT,
      FeatureFlag.FF_DELIV_CS,
      FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES,
      FeatureFlag.FF_RQT_INFORMATION
    ]);

    const props = Object.getOwnPropertyNames(FeatureFlag);
    props.forEach((prop: string) => {
      const valeurFlag = this.getValeurFlagHeader(header, prop);
      if (this.estValeurFlagValide(valeurFlag)) {
        window.localStorage.setItem(prop, valeurFlag);
      }
    });

    const featuresFlagsUtilisateurConnecte = this.getFeatureFlagsAPartirIdSSO(
      idSSOsEtFeaturesFlags,
      idSSOUtilisateur
    );

    if (featuresFlagsUtilisateurConnecte) {
      featuresFlagsUtilisateurConnecte.forEach((featureFlag: string) => {
        window.localStorage.setItem(featureFlag, "true");
      });
    }
  }

  private getFeatureFlagsAPartirIdSSO(
    idSSOsEtFeaturesFlags: IdSSOEtFeaturesFlags[] | undefined,
    idSSO: string
  ): string[] {
    const idSSOEtFeaturesFlagsTrouve = idSSOsEtFeaturesFlags?.find(
      idSSOEtFeaturesFlags => idSSOEtFeaturesFlags.hasOwnProperty(idSSO)
    );

    return idSSOEtFeaturesFlagsTrouve ? idSSOEtFeaturesFlagsTrouve[idSSO] : [];
  }

  private getIdSSOsEtFeaturesFlags(
    header: any
  ): IdSSOEtFeaturesFlags[] | undefined {
    const canaryTestingHeader = this.getValeurFlagHeader(
      header,
      CANARY_TESTING
    );
    return estRenseigne(canaryTestingHeader)
      ? this.parseJson(canaryTestingHeader)
      : undefined;
  }

  private parseJson(json: string): IdSSOEtFeaturesFlags[] | undefined {
    let idSSOsEtFeaturesFlags: IdSSOEtFeaturesFlags[] | undefined;

    try {
      idSSOsEtFeaturesFlags = JSON.parse(json);
    } catch (error) {
      window.alert(
        `Erreur lors du parsing du json du Header CANARY_TESTING: ${error}`
      );
    }
    return idSSOsEtFeaturesFlags;
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
