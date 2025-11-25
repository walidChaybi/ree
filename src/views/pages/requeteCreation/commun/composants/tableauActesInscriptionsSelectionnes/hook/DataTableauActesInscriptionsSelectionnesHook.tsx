import { ActeInscriptionSauvegardeDto, IActeInscriptionSauvegardeDto } from "@model/etatcivil/acte/IActeInscriptionSauvegardeDto";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { ZERO } from "@util/Utils";
import React, { useEffect, useState } from "react";
import AfficherMessage from "../../../../../../../utils/AfficherMessage";
import { useActesInscriptionsSauvegardesApiHook } from "../../../../../../common/hook/acte/ActesInscriptionsSauvegardesApiHook";
import { IDataTableauActeInscriptionSelectionne } from "../IDataTableauActeInscriptionSelectionne";

interface IDataTableauActesInscriptionsSelectionnesHook {
  dataActesInscriptionsSelectionnes?: IDataTableauActeInscriptionSelectionne[];
  setDataActesInscriptionsSelectionnes: React.Dispatch<React.SetStateAction<IDataTableauActeInscriptionSelectionne[] | undefined>>;
}

export const useDataTableauActesInscriptionsSelectionnesHook = (
  piecesJustificatives?: IPieceJustificativeCreation[]
): IDataTableauActesInscriptionsSelectionnesHook => {
  const [piecesJustificativesActesInscriptions, setPiecesJustificativesActesInscriptions] = useState<IPieceJustificativeCreation[]>([]);
  const [dataActesInscriptionsSelectionnes, setDataActesInscriptionsSelectionnes] = useState<IDataTableauActeInscriptionSelectionne[]>();
  const [actesInscriptionsSauvegardesParams, setActesInscriptionsSauvegardesParams] = useState<IActeInscriptionSauvegardeDto[]>();
  const resultatActesInscriptionsSauvegardes = useActesInscriptionsSauvegardesApiHook(actesInscriptionsSauvegardesParams);

  useEffect(() => {
    const pieces = piecesJustificatives?.filter(piece => estActeInscriptionSauvegarde(piece));
    if (pieces?.length) {
      setPiecesJustificativesActesInscriptions(pieces);
    }
  }, [piecesJustificatives]);

  useEffect(() => {
    setActesInscriptionsSauvegardesParams(
      ActeInscriptionSauvegardeDto.mapParamsGetActesInscriptionsSauvegardes(piecesJustificativesActesInscriptions)
    );
  }, [piecesJustificativesActesInscriptions]);

  useEffect(() => {
    if (resultatActesInscriptionsSauvegardes) {
      if (actesInscriptionsSauvegardesParams) {
        const data: IDataTableauActeInscriptionSelectionne[] = [
          ...resultatActesInscriptionsSauvegardes.map(resultatCourant =>
            mapDataTableauActeInscriptionSelectionne(resultatCourant, piecesJustificativesActesInscriptions)
          )
        ];
        setDataActesInscriptionsSelectionnes(data);

        if (auMoinsUnParametreActeInscriptionSauvegardeManque(actesInscriptionsSauvegardesParams, resultatActesInscriptionsSauvegardes)) {
          AfficherMessage.avertissement(
            "Au moins une des lignes du tableau des actes et des inscriptions sauvegardés pour le projet n'a pu être retrouvée suite à une modification de l'élément correspondant.",
            { fermetureAuto: true }
          );
        }
      } else {
        setDataActesInscriptionsSelectionnes([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatActesInscriptionsSauvegardes]);

  return {
    dataActesInscriptionsSelectionnes,
    setDataActesInscriptionsSelectionnes
  };
};

const mapDataTableauActeInscriptionSelectionne = (
  data: IActeInscriptionSauvegardeDto,
  piecesActesInscriptionsSauvegardees: IPieceJustificativeCreation[]
): IDataTableauActeInscriptionSelectionne => {
  return {
    idPersonne: data.personne.idPersonne,
    idActeInscription: data.idActeOuInscription,
    nature: NatureActeRequete.getEnumFor(data.nature).libelle,
    reference: data.reference,
    typePJ: piecesActesInscriptionsSauvegardees.find(
      piece => getIdActeInscriptionFromPieceJustificativeCreation(piece) === data.idActeOuInscription
    )?.typePieceJustificative?.libelle,
    nom: data.personne.nom,
    autresNoms: data.personne.autresNoms,
    prenoms: data.personne.prenoms,
    dateNaissance: data.personne.dateNaissance,
    lieuNaissance: data.personne.lieuNaissance,
    sexe: data.personne.sexe?.charAt(0)
  };
};

const estActeInscriptionSauvegarde = (pieceJustificative: IPieceJustificativeCreation): boolean | undefined => {
  return (
    Boolean(pieceJustificative.idPersonne) &&
    Boolean(pieceJustificative.idRc ?? pieceJustificative.idRca ?? pieceJustificative.idPacs ?? pieceJustificative.idActe)
  );
};

const getIdActeInscriptionFromPieceJustificativeCreation = (piece: IPieceJustificativeCreation): string | undefined => {
  return piece.idActe ?? piece.idRc ?? piece.idRca ?? piece.idPacs;
};

const auMoinsUnParametreActeInscriptionSauvegardeManque = (
  params: IActeInscriptionSauvegardeDto[],
  resultats: IActeInscriptionSauvegardeDto[]
): boolean => {
  return (
    params?.length > ZERO &&
    !params?.some(acteInscriptionParam =>
      resultats.some(resultat => resultat.idActeOuInscription === acteInscriptionParam.idActeOuInscription)
    )
  );
};
