import React from "react";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import "../scss/RMCRequeteResultats.scss";
import { RMCTableauRequetes } from "./RMCTableauRequetes";

export interface RMCRequeteResultatsProps {
  dataRMCRequete: IRequeteTableauDelivrance[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete: (range: string) => void;
  resetRMC: boolean;
}

export const RMCRequeteResultats: React.FC<RMCRequeteResultatsProps> =
  props => {
    return (
      <div className="ResultatsRMC">
        <Fieldset titre="Résultats de la recherche multi-critères">
          <div className="SubResultatsRMC">
            <div className="SousTitre">
              <span>{getLibelle("Liste des requêtes")}</span>
            </div>
            <RMCTableauRequetes
              dataRMCRequete={props.dataRMCRequete}
              dataTableauRMCRequete={props.dataTableauRMCRequete}
              setRangeRequete={props.setRangeRequete}
              resetTableauRequete={props.resetRMC}
            />
          </div>
        </Fieldset>
      </div>
    );
  };
