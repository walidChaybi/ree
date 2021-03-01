import React from "react";
import { RMCResultatsActe } from "./RMCResultatsActe";
import { RMCResultatsInscription } from "./RMCResultatsInscription";

import { IResultatRMCActe } from "../../../../model/rmc/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/resultat/IResultatRMCInscription";

import "../scss/RMCActeInscriptionResultats.scss";
import { Fieldset } from "../../../common/widget/fieldset/Fieldset";
import { IDataTableau } from "../../../common/util/GestionDesLiensApi";
import { getLibelle } from "../../../common/widget/Text";

export interface RMCActeInscriptionResultatsProps {
  dataRMCActe: IResultatRMCActe[];
  dataTableauRMCActe: IDataTableau;
  dataRMCInscription: IResultatRMCInscription[];
  dataTableauRMCInscription: IDataTableau;
  setRangeInscription?: (range: string) => void;
  setRangeActe?: (range: string) => void;
  resetRMC?: boolean;
}

export const RMCActeInscriptionResultats: React.FC<RMCActeInscriptionResultatsProps> = props => {
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
        <div className="SubResultatsRMC">
          <div className="SousTitre">
            <span>
              {getLibelle(
                "Recherche dans les repertoires de greffe et registre des PACS étrangers"
              )}
            </span>
          </div>
          {props.dataRMCInscription.length > 0 ? (
            <RMCResultatsInscription
              dataRMCInscription={props.dataRMCInscription}
              dataTableauRMCInscription={props.dataTableauRMCInscription}
              setRangeInscription={props.setRangeInscription}
              resetTableauInscription={props.resetRMC}
            />
          ) : (
            <div className="AucunResultat">
              {getLibelle(
                "Aucune inscription trouvée pour ces critères de recherche"
              )}
            </div>
          )}
        </div>
      </Fieldset>
    </div>
  );
};
