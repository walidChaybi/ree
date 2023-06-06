import { Sexe } from "@model/etatcivil/enum/Sexe";
import {
  IPieceJustificativeCreation,
  PieceJustificativeCreation
} from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { getValeurOuUndefined } from "@util/Utils";

export interface IActeInscriptionSauvegardeDto {
  idActeOuInscription: string;
  type: string;
  personne: IPersonneDto;
  nature?: string;
  reference?: string;
}

interface IPersonneDto {
  idPersonne: string;
  nom?: string;
  autresNoms?: string;
  prenoms?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  sexe?: Sexe;
}

export const ActeInscriptionSauvegardeDto = {
  mapResultatGetActesInscriptionsSauvegardes(
    data: any
  ): IActeInscriptionSauvegardeDto {
    return {
      idActeOuInscription: data.idActeOuInscription,
      type: getValeurOuUndefined(data.type),
      personne: mapPersonne(data.personne),
      nature: getValeurOuUndefined(data.nature),
      reference: getValeurOuUndefined(data.reference)
    };
  },
  mapParamsGetActesInscriptionsSauvegardes(
    pieceJustificatives: IPieceJustificativeCreation[]
  ): IActeInscriptionSauvegardeDto[] {
    const actesInscriptionsSauvegardes: IActeInscriptionSauvegardeDto[] = [];
    pieceJustificatives.forEach(pieceJustificative => {
      const type =
        PieceJustificativeCreation.getTypeActeInscription(pieceJustificative);
      const idPersonne = pieceJustificative.idPersonne;
      if (idPersonne && type) {
        actesInscriptionsSauvegardes.push({
          idActeOuInscription:
            PieceJustificativeCreation.getIdActeInscription(pieceJustificative),
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

function mapPersonne(data: any): IPersonneDto {
  return {
    idPersonne: data.idPersonne,
    nom: getValeurOuUndefined(data.nom),
    autresNoms: getValeurOuUndefined(data.autresNoms),
    prenoms: getValeurOuUndefined(data.prenoms),
    lieuNaissance: getValeurOuUndefined(data.lieuNaissance),
    dateNaissance: getValeurOuUndefined(data.dateNaissance),
    sexe: Sexe.getEnumFor(data.sexe)
  };
}
