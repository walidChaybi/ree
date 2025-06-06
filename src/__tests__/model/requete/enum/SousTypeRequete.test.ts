import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { describe, expect, test } from "vitest";

describe("test du modèle SousTypeRequete", () => {
  const gererFlag = (flags: { flag: FeatureFlag; actif: boolean }[]) =>
    gestionnaireFeatureFlag.positionneFlagsAPartirDuHeader(
      {
        ...flags.reduce((headers, flagData) => ({ ...headers, [flagData.flag]: flagData.actif ? "true" : "" }), {})
      },
      "xxx"
    );

  test("Un sous type peut être pris en charge", () => {
    gererFlag([
      { flag: FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES, actif: false },
      { flag: FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS, actif: false }
    ]);
    expect(SousTypeDelivrance.estPossibleAPrendreEnCharge(SousTypeDelivrance.RDD)).toBeFalsy();
    expect(SousTypeDelivrance.estPossibleAPrendreEnCharge(SousTypeDelivrance.RDCSC)).toBeFalsy();

    gererFlag([
      { flag: FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES, actif: true },
      { flag: FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS, actif: false }
    ]);
    expect(SousTypeDelivrance.estPossibleAPrendreEnCharge(SousTypeDelivrance.RDD)).toBeTruthy();
    expect(SousTypeDelivrance.estPossibleAPrendreEnCharge(SousTypeDelivrance.RDCSC)).toBeFalsy();

    gererFlag([
      { flag: FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES, actif: true },
      { flag: FeatureFlag.FF_DELIVRANCE_CERTIFS_SITUATIONS, actif: true }
    ]);
    expect(SousTypeDelivrance.estPossibleAPrendreEnCharge(SousTypeDelivrance.RDD)).toBeTruthy();
    expect(SousTypeDelivrance.estPossibleAPrendreEnCharge(SousTypeDelivrance.RDCSC)).toBeTruthy();
  });
});
