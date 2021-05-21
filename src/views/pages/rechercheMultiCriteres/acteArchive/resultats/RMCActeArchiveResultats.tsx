import React from "react";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { RMCTableauActes } from "../../acteInscription/resultats/RMCTableauActes";
import "../scss/RMCActeArchiveResultats.scss";

export interface RMCActeArchiveResultatsProps {
  dataRMCActeArchive: IResultatRMCActe[];
  dataTableauRMCActeArchive: IParamsTableau;
  setRangeActeArchive?: (range: string) => void;
  resetRMC?: boolean;
}

export const RMCActeArchiveResultats: React.FC<RMCActeArchiveResultatsProps> = props => {
  return (
    <div className="ResultatsRMC">
      <Fieldset titre="Résultats de la recherche multi-critères">
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>{getLibelle("Recherche dans les registres")}</span>
          </div>
          {props.dataRMCActeArchive.length > 0 ? (
            <RMCTableauActes
              typeRMC="Classique"
              dataRMCActe={props.dataRMCActeArchive}
              dataTableauRMCActe={props.dataTableauRMCActeArchive}
              setRangeActe={props.setRangeActeArchive}
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
