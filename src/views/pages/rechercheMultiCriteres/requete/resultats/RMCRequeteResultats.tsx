import React from "react";
import "../scss/RMCRequeteResultats.scss";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { IDataTableau } from "../../../../common/util/GestionDesLiensApi";
import { getLibelle } from "../../../../common/widget/Text";
import { RMCTableauRequetes } from "./RMCTableauRequetes";
import { IResultatRMCRequete } from "../../../../../model/rmc/requete/IResultatRMCRequete";

export interface RMCRequeteResultatsProps {
  dataRMCRequete: IResultatRMCRequete[];
  dataTableauRMCRequete: IDataTableau;
  setRangeRequete?: (range: string) => void;
  resetRMC?: boolean;
}

export const RMCRequeteResultats: React.FC<RMCRequeteResultatsProps> = props => {
  return (
    <div className="ResultatsRMC">
      <Fieldset titre="Résultats de la recherche">
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>{getLibelle("Liste des requêtes")}</span>
          </div>
          {props.dataRMCRequete.length > 0 ? (
            <RMCTableauRequetes
              dataRMCRequete={props.dataRMCRequete}
              dataTableauRMCRequete={props.dataTableauRMCRequete}
              setRangeRequete={props.setRangeRequete}
              resetTableauRequete={props.resetRMC}
            />
          ) : (
            <div className="AucunResultat">
              {getLibelle(
                "Aucune requête trouvée pour ces critères de recherche"
              )}
            </div>
          )}
        </div>
      </Fieldset>
    </div>
  );
};
