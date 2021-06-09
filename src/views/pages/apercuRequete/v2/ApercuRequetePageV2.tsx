/* istanbul ignore file */
// TODO à supprimer lors de l'implémentation de la page

import React from "react";
import { useParams } from "react-router-dom";
import { getLibelle } from "../../../common/widget/Text";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
export interface IdRequeteParams {
  idRequete: string;
}

export const ApercuRequetePageV2: React.FC = () => {
  const { idRequete } = useParams<IdRequeteParams>();
  // const history = useHistory();
  // const [dataHistory] = useState<any>(history.location.state);

  // const dataRequetes = dataHistory.dataRequetes;
  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  return (
    <>
      <title>{getLibelle("Aperçu de la requête")}</title>
      <h1>{getLibelle(`Aperçu de la requête ${idRequete}`)}</h1>
      <div className="contenu-requete">
        <div className="side left">
          <SuiviActionsRequete
            actions={detailRequeteState?.actions}
          ></SuiviActionsRequete>
        </div>
        <div className="side right">{JSON.stringify(detailRequeteState)}</div>
      </div>
    </>
  );
};
