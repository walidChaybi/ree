import React from "react";
import { IOfficier } from "../../../../model/agent/IOfficier";
import { IDataTable } from "../../../../model/requete/IDataTable";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { BarreNavigationSuivPrec } from "../../../common/widget/navigation/barreNavigationSuivPrec/BarreNavigationSuivPrec";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { BoutonARetraiterSaga } from "./BoutonARetraiterSaga";

export interface ActionsProps {
  indexRequete: number;
  maxRequetes: number;
  setIndexRequete: (index: number) => void;
  requetes: IDataTable[];
  idRequete: string;
  reloadData: (allsigned: boolean) => void;
  connectedUser?: IOfficier;
}

export const ActionsButtonsRequestPage: React.FC<ActionsProps> = ({
  indexRequete,
  setIndexRequete,
  maxRequetes,
  requetes,
  idRequete,
  reloadData,
  connectedUser
}) => {
  const estRequeteATraiter = estATraiter(requetes, indexRequete);
  return (
    <BarreNavigationSuivPrec
      index={indexRequete}
      max={maxRequetes}
      setIndex={setIndexRequete}
    >
      <div>
        <BoutonRetour messageId={"boutons.retourMesRequetes"} />
      </div>
      {!estRequeteATraiter && <BoutonARetraiterSaga idRequete={idRequete} />}
    </BarreNavigationSuivPrec>
  );
};

const estATraiter = (requetes: IDataTable[], indexRequete: number): boolean => {
  return estRequeteStatut(requetes, indexRequete, StatutRequete.ATraiter);
};

const estRequeteStatut = (
  requetes: IDataTable[],
  indexRequete: number,
  statut: StatutRequete
): boolean => {
  return requetes.length > 0 && requetes[indexRequete].statut === statut;
};
