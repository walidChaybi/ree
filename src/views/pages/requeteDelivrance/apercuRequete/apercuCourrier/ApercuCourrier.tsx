import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { getLibelle } from "../../../../common/util/Utils";
import { ApercuRequeteTemplate } from "../apercuRequeteTemplate/ApercuRequeteTemplate";
import { Courrier } from "./contenu/Courrier";

export const ApercuCourrier: React.FC = () => {
  const history = useHistory();

  const [acte] = useState<IResultatRMCActe | undefined>(
    history.location.state as IResultatRMCActe
  );

  const [requete, setRequete] = useState<IRequeteDelivrance>();

  const setRequeteCallback = useCallback(
    (req: IRequeteDelivrance) => {
      setRequete(req);
    },
    [setRequete]
  );

  return (
    <ApercuRequeteTemplate
      title={getLibelle("Aperçu Courrier")}
      setRequeteCallback={setRequeteCallback}
    >
      {requete && (
        <div className="ApercuCourrierAccompagnement">
          <Courrier requete={requete} acte={acte} />
        </div>
      )}
    </ApercuRequeteTemplate>
  );
};
