import React from "react";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import "../scss/RMCRequeteResultats.scss";
import { RMCTableauRequetes } from "./RMCTableauRequetes";

export interface RMCRequeteResultatsProps {
  dataRMCRequete: IRequeteTableau[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete?: (range: string) => void;
  resetRMC?: boolean;
}

export const RMCRequeteResultats: React.FC<RMCRequeteResultatsProps> = props => {
  return (
    <div className="ResultatsRMC">
      <Fieldset titre="Résultats de la recherche multi-critères">
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
