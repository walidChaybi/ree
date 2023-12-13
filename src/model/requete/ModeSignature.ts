export enum ModeSignature {
  DRY_RUN = "DRY_RUN",
  SELF_SIGNED = "SELF_SIGNED",
  CERTIGNA_SIGNED = "CERTIGNA_SIGNED"
}

export class ModeSignatureUtil {
  private static readonly modesSignature = {
    [ModeSignature.DRY_RUN]: "DRY_RUN",
    [ModeSignature.SELF_SIGNED]: "DRY_RUN",
    [ModeSignature.CERTIGNA_SIGNED]: "DRY_RUN"
  };

  public static estValide(mode: ModeSignature): boolean {
    return this.modesSignature[mode] != null;
  }
}
