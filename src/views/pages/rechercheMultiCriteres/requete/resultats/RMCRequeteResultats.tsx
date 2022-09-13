import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { getLibelle } from "@util/Utils";
import { Fieldset } from "@widget/fieldset/Fieldset";
import React from "react";
import "../scss/RMCRequeteResultats.scss";
import { RMCTableauRequetes } from "./RMCTableauRequetes";

export interface RMCRequeteResultatsProps {
  dataRMCRequete: IRequeteTableauDelivrance[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete: (range: string) => void;
  resetRMC: boolean;
}

export const RMCRequeteResultats: React.FC<
  RMCRequeteResultatsProps
> = props => {
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
