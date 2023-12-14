export enum ModeSignature {
  DRY_RUN = "DRY_RUN",
  SELF_SIGNED = "SELF_SIGNED",
  PKCS11_SIGNED = "PKCS11_SIGNED"
}

export class ModeSignatureUtil {
  private static readonly modesSignature = {
    [ModeSignature.DRY_RUN]: "DRY_RUN",
    [ModeSignature.SELF_SIGNED]: "SELF_SIGNED",
    [ModeSignature.PKCS11_SIGNED]: "PKCS11_SIGNED"
  };

  public static estValide(mode: ModeSignature): boolean {
    return this.modesSignature[mode] != null;
  }
}
