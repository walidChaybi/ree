import React from "react";
import { useParams } from "react-router-dom";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
export interface IdRequeteParams {
  idRequete: string;
}

export const ApercuRequetePageV2: React.FC = () => {
  const { idRequete } = useParams<IdRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  return (
    <>
      <title>{getLibelle("Aperçu de la requête")}</title>
      {detailRequeteState && (
        <>
          <BandeauRequete detailRequete={detailRequeteState} />
          <div className="contenu-requete">
            <div className="side left">
              <SuiviActionsRequete
                actions={detailRequeteState.actions}
              ></SuiviActionsRequete>
              <SuiviObservationsRequete
                observations={detailRequeteState?.observations}
              ></SuiviObservationsRequete>
            </div>
            <div className="side right">
              {JSON.stringify(detailRequeteState)}
            </div>
          </div>
        </>
      )}
    </>
  );
};
