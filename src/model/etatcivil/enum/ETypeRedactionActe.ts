import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";

export enum ETypeRedactionActe {
  ETABLI = "ETABLI",
  DRESSE = "DRESSE",
  TRANSCRIT = "TRANSCRIT",
  INCONNU = "INCONNU"
}

export const getTypeRedactionActeParSousTypeCreation = (sousTypeCreation?: SousTypeCreation): ETypeRedactionActe => {
  switch (true) {
    case SousTypeCreation.estSousTypeTranscription(sousTypeCreation):
      return ETypeRedactionActe.TRANSCRIT;
    case SousTypeCreation.estSousTypeEtablissement(sousTypeCreation):
      return ETypeRedactionActe.ETABLI;
    default:
      return ETypeRedactionActe.INCONNU;
  }
};
