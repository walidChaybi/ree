import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";
import { expect, test } from "vitest";

test("ModeSignature model", () => {
  expect(ModeSignatureUtil.estValide(ModeSignature.DRY_RUN)).toBe(true);
  expect(ModeSignatureUtil.estValide(ModeSignature.SELF_SIGNED)).toBe(true);
  expect(ModeSignatureUtil.estValide(ModeSignature.CERTIGNA_SIGNED)).toBe(true);
  expect(ModeSignatureUtil.estValide("" as ModeSignature)).toBe(false);
});
