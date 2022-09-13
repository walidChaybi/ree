import { ModeSignature, ModeSignatureUtil } from "@model/requete/ModeSignature";

test("ModeSignature model", () => {
  expect(ModeSignatureUtil.isValid(ModeSignature.DRY_RUN)).toBe(true);
  expect(ModeSignatureUtil.isValid(ModeSignature.SELF_SIGNED)).toBe(true);
  expect(ModeSignatureUtil.isValid(ModeSignature.CERTIGNA_SIGNED)).toBe(true);
  expect(ModeSignatureUtil.isValid(undefined)).toBe(false);
});
