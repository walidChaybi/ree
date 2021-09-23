import { ICertificatRCAComposition } from "../ICertificatRCAComposition";
import { ICertificatRCComposition } from "../ICertificatRCComposition";
import { ICertificatPACSComposition } from "../pacs/ICertificatPACSComposition";

export type TypeCertificatComposition =
  | ICertificatPACSComposition
  | ICertificatRCComposition
  | ICertificatRCAComposition;
