const POPIN_SIGNATURE_MENTION = "POPIN_SIGNATURE_MENTION";
const POPIN_SIGNATURE_ACTE = "POPIN_SIGNATURE_ACTE";

export interface ITypePopinSignature {
  id: string;
  nom: string;
  code: string;
  libelle: string;
  estActif: boolean;
  type: string;
  sousType: string;
  description: string;
}

export class TypePopinSignature {
  private static liste: ITypePopinSignature[] | null = null;

  public static init(popinsSignature: ITypePopinSignature[]) {
    if (TypePopinSignature.liste !== null) {
      return;
    }

    TypePopinSignature.liste = popinsSignature;
  }

  public static getTextePopinSignatureActe(): string | undefined {
    return TypePopinSignature.liste?.find(el => el.sousType === POPIN_SIGNATURE_ACTE)?.description;
  }

  public static getTextePopinSignatureMentions(): string | undefined {
    return TypePopinSignature.liste?.find(el => el.sousType === POPIN_SIGNATURE_MENTION)?.description;
  }
}
