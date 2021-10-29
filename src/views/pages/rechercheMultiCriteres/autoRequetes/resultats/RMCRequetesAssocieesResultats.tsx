import React from "react";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { getLibelle } from "../../../../common/widget/Text";
import "../scss/RMCRequetesAssocieesResultats.scss";
import { RMCTableauRequetesAssociees } from "./RMCTableauRequetesAssociees";

export interface RMCRequetesAssocieesResultatsProps {
  dataRMCRequete: IRequeteTableauDelivrance[];
  dataTableauRMCRequete: IParamsTableau;
  setRangeRequete: (range: string) => void;
  setNouvelleRMCRequete: React.Dispatch<React.SetStateAction<boolean>>;
  setValuesRMCRequete: React.Dispatch<React.SetStateAction<IRMCRequete>>;
  setCriteresRechercheRequete: React.Dispatch<
    React.SetStateAction<ICriteresRMCRequete | undefined>
  >;
  resetRMC: boolean;
}

export const RMCRequetesAssocieesResultats: React.FC<RMCRequetesAssocieesResultatsProps> =
  ({
    dataRMCRequete,
    dataTableauRMCRequete,
    setRangeRequete,
    setNouvelleRMCRequete,
    setValuesRMCRequete,
    setCriteresRechercheRequete,
    resetRMC
  }) => {
    return (
      <Fieldset titre={getLibelle("Requêtes associées aux titulaires")}>
        <div className="RMCRequetesAssocieesResultats">
          <RMCTableauRequetesAssociees
            dataRMCRequete={dataRMCRequete}
            dataTableauRMCRequete={dataTableauRMCRequete}
            setRangeRequete={setRangeRequete}
            setNouvelleRMCRequete={setNouvelleRMCRequete}
            setValuesRMCRequete={setValuesRMCRequete}
            setCriteresRechercheRequete={setCriteresRechercheRequete}
            resetTableauRequete={resetRMC}
          />
        </div>
      </Fieldset>
    );
  };
