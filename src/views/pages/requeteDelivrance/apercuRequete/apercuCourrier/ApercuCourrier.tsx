import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { getUrlWithParam } from "../../../../common/util/route/routeUtil";
import { getLibelle } from "../../../../common/util/Utils";
import {
  receUrl,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID
} from "../../../../router/ReceUrls";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { Courrier } from "./contenu/Courrier";

export const ApercuCourrier: React.FC = () => {
  const history = useHistory();

  const [historyState] = useState<any>(history.location.state);
  const [idActe, setIdActe] = useState<string>();

  useEffect(() => {
    if (historyState) {
      setIdActe(historyState);
    }
  }, [historyState]);

  const [requete, setRequete] = useState<IRequeteDelivrance>();

  const setRequeteCallback = useCallback(
    (req: IRequeteDelivrance) => {
      setRequete(req);
    },
    [setRequete]
  );

  function handleCourrierEnregistre() {
    receUrl.replaceUrl(
      history,
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
        `${requete?.id}`
      ),
      idActe
    );
  }

  return (
    <ApercuRequeteTemplate
      title={getLibelle("Aperçu Courrier")}
      setRequeteCallback={setRequeteCallback}
    >
      {requete && (
        <div className="ApercuCourrierAccompagnement">
          <Courrier
            requete={requete}
            idActe={idActe}
            handleCourrierEnregistre={handleCourrierEnregistre}
          />
        </div>
      )}
    </ApercuRequeteTemplate>
  );
};
