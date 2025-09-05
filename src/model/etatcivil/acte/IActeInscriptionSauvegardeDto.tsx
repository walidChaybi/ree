import { IPieceJustificativeCreation, PieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { IPersonneSauvegardeeDto } from "../personne/IPersonneSauvegardeeDto";

export interface IActeInscriptionSauvegardeDto {
  idActeOuInscription: string;
  type: string;
  personne: IPersonneSauvegardeeDto;
  nature?: string;
  reference?: string;
}

export const ActeInscriptionSauvegardeDto = {
  mapResultatGetActesInscriptionsSauvegardes(data: any): IActeInscriptionSauvegardeDto {
    return {
      idActeOuInscription: data.idActeOuInscription,
      type: data.type,
      personne: data.personne,
      nature: data.nature,
      reference: data.reference
    };
  },

  mapParamsGetActesInscriptionsSauvegardes(pieceJustificatives: IPieceJustificativeCreation[]): IActeInscriptionSauvegardeDto[] {
    const actesInscriptionsSauvegardes: IActeInscriptionSauvegardeDto[] = [];

    pieceJustificatives.forEach(pieceJustificative => {
      const type = PieceJustificativeCreation.getTypeActeInscription(pieceJustificative);
      const idPersonne = pieceJustificative.idPersonne;

      if (idPersonne && type) {
        actesInscriptionsSauvegardes.push({
          idActeOuInscription: PieceJustificativeCreation.getIdActeInscription(pieceJustificative),
          personne: {
            idPersonne
          },
          type
        });
      }
    });
    return actesInscriptionsSauvegardes;
  }
};
