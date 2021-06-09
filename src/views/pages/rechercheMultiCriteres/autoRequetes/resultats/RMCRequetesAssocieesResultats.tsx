import React from "react";
import { IRequeteTableau } from "../../../../../model/requete/v2/IRequeteTableau";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import { RMCTableauRequetesAssociees } from "./RMCTableauRequetesAssociees";

export interface RMCRequetesAssocieesResultatsProps {
  dataRMCAutoRequete: IRequeteTableau[];
  dataTableauRMCAutoRequete: IParamsTableau;
  setRangeRequete?: (range: string) => void;
}

export const RMCRequetesAssocieesResultats: React.FC<RMCRequetesAssocieesResultatsProps> = props => {
  return (
    <div className="RequetesAssocieesTitulaires">
      <Fieldset titre={getLibelle("Requêtes associées aux titulaires")}>
        <RMCTableauRequetesAssociees
          dataRMCAutoRequete={props.dataRMCAutoRequete}
          dataTableauRMCAutoRequete={props.dataTableauRMCAutoRequete}
          setRangeRequete={props.setRangeRequete}
        />
      </Fieldset>
    </div>
  );
};
