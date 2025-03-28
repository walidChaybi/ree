export enum ModeSignature {
  DRY_RUN = "DRY_RUN",
  PKCS11_SIGNED = "PKCS11_SIGNED"
}

export class ModeSignatureUtil {
  private static readonly modesSignature = {
    [ModeSignature.DRY_RUN]: "DRY_RUN",
    [ModeSignature.PKCS11_SIGNED]: "PKCS11_SIGNED"
  };

  public static estValide(mode: ModeSignature): boolean {
    return this.modesSignature[mode] != null;
  }
}
