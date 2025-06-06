import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { expect, test } from "vitest";

test("gestion feature flag works", () => {
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeTruthy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_LOG_SERVEUR)).toBeTruthy();
  //@ts-ignore
  expect(gestionnaireFeatureFlag.estActif("ETAPE3")).toBeFalsy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
    {
      FF_DELIVRANCE_CERTIFS_SITUATIONS: "true"
    },
    "xxx"
  );

  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_LOG_SERVEUR)).toBeTruthy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS)).toBeTruthy();
});

test("DOIT mettre à jour les features flags dans le localstorage QUAND le header contient la clé CANARY_TESTING", async () => {
  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader({}, "0123456");
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS)).toBeFalsy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
    {
      id_sso: "0123456",
      CANARY_TESTING: '[{"0123456": ["FF_DELIVRANCE_EXTRAITS_COPIES"]}, {"0456255": ["FF_DELIVRANCE_CERTIFS_SITUATIONS"]}]'
    },
    "0123456"
  );
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeTruthy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS)).toBeFalsy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
    {
      id_sso: "0456255",
      CANARY_TESTING: '[{"0123456": ["FF_DELIVRANCE_EXTRAITS_COPIES"]}, {"0456255": ["FF_DELIVRANCE_CERTIFS_SITUATIONS"]}]'
    },
    "0456255"
  );
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS)).toBeTruthy();

  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
    {
      id_sso: "xxx",
      CANARY_TESTING: '[{"0123456": ["FF_DELIVRANCE_EXTRAITS_COPIES"]}, {"0456255": ["FF_DELIVRANCE_CERTIFS_SITUATIONS",]}]'
    },
    "xxx"
  );
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS)).toBeFalsy();
});

test("DOIT gérer l'erreur de parsing du JSON QUAND la valeur de la clé CANARY_TESTING du header est incorrecte", () => {
  gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
    {
      id_sso: "0123456",
      CANARY_TESTING: '[{0123456: "FF_DELIVRANCE_EXTRAITS_COPIES"]} {"0456255": ["FF_DELIVRANCE_CERTIFS_SITUATIONS"]]'
    },
    "0123456"
  );

  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeFalsy();
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS)).toBeFalsy();
});
