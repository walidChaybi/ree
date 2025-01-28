import { ITypePopinSignature } from "@model/signature/ITypePopinSignature";

export const TYPE_POPIN_SIGNATURE = [
  {
    id: "058a436b-330d-4c3c-83e0-d49c27690ba1",
    nom: "POPIN_SIGNATURE",
    code: "POPIN_SIGNATURE_ACTE",
    libelle: "Popin signature acte",
    estActif: true,
    type: "Popin signature",
    sousType: "POPIN_SIGNATURE_ACTE",
    description:
      "Après validation, les données suivantes seront générées automatiquement et inscrites sur le document final: référence de l’acte ; formule finale, comprenant le nom et le prénom figurant sur le certificat électronique servant à la signature ; date et lieu de signature."
  },
  {
    id: "058a436b-330d-4c3c-83e0-d49c27390ba0",
    nom: "POPIN_SIGNATURE",
    code: "POPIN_SIGNATURE_MENTION",
    libelle: "Popin signature mention",
    estActif: true,
    type: "Popin signature",
    sousType: "POPIN_SIGNATURE_MENTION",
    description:
      "En cliquant sur VALIDER, vous acceptez de signer électroniquement la ou les mentions apposée(s) qui comporteront les données suivantes insérées automatiquement : lieu et date d’apposition, qualité du signataire, prénom et nom usuels dans le dispositif de création de signature qualifiée."
  }
] as ITypePopinSignature[];
