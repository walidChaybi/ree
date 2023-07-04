import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";

export enum TypeRedactionActe {
  ETABLI = "ETABLI",
  DRESSE = "DRESSE",
  TRANSCRIT = "TRANSCRIT",
  INCONNU = "INCONNU"
}

export const getTypeRedactionActeParSousTypeCreation = (
  sousTypeCreation: SousTypeCreation
): TypeRedactionActe => {
  let typeRedactionActe: TypeRedactionActe = TypeRedactionActe.INCONNU;
  if (SousTypeCreation.estSousTypeTranscription(sousTypeCreation)) {
    typeRedactionActe = TypeRedactionActe.TRANSCRIT
  } else if (SousTypeCreation.estSousTypeEtablissement(sousTypeCreation)) {
    typeRedactionActe = TypeRedactionActe.ETABLI
  }
  return typeRedactionActe;
} 
