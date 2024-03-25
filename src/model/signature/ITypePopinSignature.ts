import { peuplePopinSignature } from "@api/nomenclature/NomenclatureEtatcivil";

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
  private static typePopinsSignature: ITypePopinSignature[] = [];

  public static contientEnums() {
    return this.typePopinsSignature.length > 0;
  }

  public static async init() {
    await peuplePopinSignature();
  }

  public static ajouteTypePopinSignature(
    typePopinSignature: ITypePopinSignature
  ) {
    this.typePopinsSignature.push(typePopinSignature);
  }

  public static clean() {
    this.typePopinsSignature = [];
  }

  public static getTextePopinSignatureActe(): string | undefined {
    return this.typePopinsSignature.find(
      el => el.sousType === POPIN_SIGNATURE_ACTE
    )?.description;
  }

  public static getTextePopinSignatureMentions(): string | undefined {
    return this.typePopinsSignature.find(
      el => el.sousType === POPIN_SIGNATURE_MENTION
    )?.description;
  }
}
