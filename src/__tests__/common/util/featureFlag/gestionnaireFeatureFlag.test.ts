import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";

test("gestion feature flag works ", async () => {
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeTruthy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.LOG_SERVEUR)
  ).toBeTruthy();
  //@ts-ignore
  expect(gestionnaireFeatureFlag.estActif("ETAPE3")).toBeFalsy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader({
    FF_CONSULT_ACTE_RQT: "true",
    FF_DELIV_CS: "true"
  });
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.LOG_SERVEUR)).toBeFalsy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_CONSULT_ACTE_RQT)
  ).toBeTruthy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)
  ).toBeTruthy();
});
