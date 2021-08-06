import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";
import { getLibelle } from "../../../common/widget/Text";
import { IDataFicheApi } from "../hook/FichePageApiHook";
import { mapDataAlertesActe, toReferenceString } from "./AlerteActeUtils";
import "./scss/AlertesActes.scss";

export interface AlerteActeProps {
  dataFiche: IDataFicheApi;
  ajouterAlerte: boolean;
}

export const AlerteActe: React.FC<AlerteActeProps> = props => {
  const [alertes, setAlertes] = useState<IAlerte[]>([]);

  useEffect(() => {
    setAlertes(mapDataAlertesActe(props.dataFiche));
  }, [props.dataFiche]);

  return (
    <div className="AlertesActes">
      {props.ajouterAlerte === true && (
        <div className="AjouterAlertes">
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="IconeBoutonAjoutAlertes Disabled"
            title={getLibelle("Ajouter une alerte")}
            data-testid="IconeBoutonAjoutAlertes"
            aria-labelledby="Ajouter une alerte"
          />
        </div>
      )}
      <div className="ListeAlertes">
        {alertes?.map((alerte: IAlerte, index: number) => {
          return (
            <div
              key={`alerte-${index}`}
              className={alerte?.codeCouleur}
              title={alerte?.complementDescription}
            >
              {toReferenceString(alerte)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WithHabilitation(AlerteActe, "AlerteActe");
