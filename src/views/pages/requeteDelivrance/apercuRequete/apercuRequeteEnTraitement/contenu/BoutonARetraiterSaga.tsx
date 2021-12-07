/* istanbul ignore file */
/*
 * fichier non testé car composant à supprimer dans étape 2
 */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reakit/Button";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../../../common/hook/requete/ActionHook";
import { MigratorV1V2 } from "../../../../../common/util/migration/MigratorV1V2";
import { getLibelle } from "../../../../../common/util/Utils";
import { receUrl } from "../../../../../router/ReceUrls";
import "./scss/BoutonARetraiterSaga.scss";

interface BoutonARetraiterSagaProps {
  idRequete: string;
}

export const BoutonARetraiterSaga: React.FC<BoutonARetraiterSagaProps> = ({
  idRequete
}) => {
  const history = useHistory();
  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<CreationActionEtMiseAjourStatutParams>();

  const idActionCreee = usePostCreationActionEtMiseAjourStatutApi(
    creationActionEtMiseAjourStatutParams
  );

  useEffect(() => {
    if (idActionCreee) {
      receUrl.goBack(history);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idActionCreee]);

  const handleClickARetraiterSaga = () => {
    setCreationActionEtMiseAjourStatutParams({
      requeteId: idRequete,
      statutRequete: MigratorV1V2.getStatutARetraiter(),
      libelleAction: "À retraiter dans Saga"
    });
  };

  return (
    <Button
      className="boutonARetraiterSaga"
      onClick={handleClickARetraiterSaga}
    >
      {getLibelle("À retraiter dans SAGA")}
    </Button>
  );
};
