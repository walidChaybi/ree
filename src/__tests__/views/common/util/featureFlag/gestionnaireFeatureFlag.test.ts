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
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.LOG_SERVEUR)
  ).toBeTruthy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_CONSULT_ACTE_RQT)
  ).toBeTruthy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)
  ).toBeTruthy();
});

test("DOIT mettre à jour les features flags dans le localstorage QUAND le header contient la clé CANARY_TESTING", async () => {
  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader({});
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_NATALI)).toBeFalsy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_CONSULT_ACTE_RQT)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)).toBeFalsy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader({
    id_sso: "0123456",
    CANARY_TESTING:
      '[{"0123456": ["FF_DELIV_EC_PAC","FF_NATALI"]}, {"0456255": ["FF_DELIV_CS","FF_RQT_INFORMATION"]}]'
  });
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeTruthy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_NATALI)).toBeTruthy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_CONSULT_ACTE_RQT)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)).toBeFalsy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader({
    id_sso: "0456255",
    CANARY_TESTING:
      '[{"0123456": ["FF_DELIV_EC_PAC","FF_NATALI"]}, {"0456255": ["FF_DELIV_CS","FF_RQT_INFORMATION"]}]'
  });
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_NATALI)).toBeFalsy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_RQT_INFORMATION)
  ).toBeTruthy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)
  ).toBeTruthy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader({
    id_sso: "xxx",
    CANARY_TESTING:
      '[{"0123456": ["FF_DELIV_EC_PAC","FF_NATALI"]}, {"0456255": ["FF_DELIV_CS","FF_RQT_INFORMATION"]}]'
  });
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_NATALI)).toBeFalsy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_CONSULT_ACTE_RQT)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)).toBeFalsy();
});

test("DOIT gérer l'erreur de parsing du JSON QUAND la valeur de la clé CANARY_TESTING du header est incorrecte", async () => {
  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader({
    id_sso: "0123456",
    CANARY_TESTING:
      '[{0123456: "FF_DELIV_EC_PAC","FF_NATALI"]} {"0456255": ["FF_DELIV_CS","FF_RQT_INFORMATION"]]'
  });
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_NATALI)).toBeFalsy();
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_CONSULT_ACTE_RQT)
  ).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_CS)).toBeFalsy();
});

