import React from "react";
import { RMCResultatsActe } from "../../acteInscription/resultats/RMCResultatsActe";

import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";

import "../scss/RMCActeArchiveResultats.scss";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { IDataTableau } from "../../../../common/util/GestionDesLiensApi";
import { getLibelle } from "../../../../common/widget/Text";

export interface RMCActeArchiveResultatsProps {
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IDataTableau;
  setRangeActe?: (range: string) => void;
  resetRMC?: boolean;
}

export const RMCActeArchiveResultats: React.FC<RMCActeArchiveResultatsProps> = props => {
  return (
    <div className="ResultatsRMC">
      <Fieldset titre="Résultats de la recherche">
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>{getLibelle("Recherche dans les registres")}</span>
          </div>
          {props.dataRMCActe.length > 0 ? (
            <RMCResultatsActe
              dataRMCActe={props.dataRMCActe}
              dataTableauRMCActe={props.dataTableauRMCActe}
              setRangeActe={props.setRangeActe}
              resetTableauActe={props.resetRMC}
            />
          ) : (
            <div className="AucunResultat">
              {getLibelle("Aucun acte trouvé pour ces critères de recherche")}
            </div>
          )}
        </div>
      </Fieldset>
    </div>
  );
};
