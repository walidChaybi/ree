import React from "react";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import { RMCActeInscriptionResultats } from "../acteInscription/resultats/RMCActeInscriptionResultats";

export interface RMCAutoResultatsProps {
  dataAlertes: IAlerte[];
  ajoutAlertePossible: boolean;
  dataRequete: TRequete;
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
  onClickCheckboxTableauActes: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ) => void;
  onClickCheckboxTableauInscriptions: (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ) => void;
  resetRMC?: boolean;
  setRangeActe?: (range: string) => void;
  setRangeInscription?: (range: string) => void;
}

export const RMCAutoResultats: React.FC<RMCAutoResultatsProps> = ({
  dataAlertes,
  ajoutAlertePossible,
  dataRequete,
  dataRMCAutoActe,
  dataTableauRMCAutoActe,
  dataRMCAutoInscription,
  dataTableauRMCAutoInscription,
  onClickCheckboxTableauActes,
  onClickCheckboxTableauInscriptions,
  resetRMC,
  setRangeInscription,
  setRangeActe
}) => {
  return (
    <>
      {dataRMCAutoActe &&
        dataTableauRMCAutoActe &&
        dataRMCAutoInscription &&
        dataTableauRMCAutoInscription && (
          <RMCActeInscriptionResultats
            typeRMC="Auto"
            dataAlertes={dataAlertes}
            ajoutAlertePossible={ajoutAlertePossible}
            dataRequete={dataRequete}
            dataRMCActe={dataRMCAutoActe}
            dataTableauRMCActe={dataTableauRMCAutoActe}
            dataRMCInscription={dataRMCAutoInscription}
            dataTableauRMCInscription={dataTableauRMCAutoInscription}
            onClickCheckboxTableauActes={onClickCheckboxTableauActes}
            onClickCheckboxTableauInscriptions={
              onClickCheckboxTableauInscriptions
            }
            resetRMC={resetRMC}
            setRangeInscription={setRangeInscription}
            setRangeActe={setRangeActe}
          />
        )}
    </>
  );
};
