/* istanbul ignore file */
/*
 * fichier non testé car composant à supprimer dans étape 2
 */
import {
  ICreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "@hook/requete/ActionHook";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { goBack } from "@util/route/UrlUtil";
import { getLibelle } from "@util/Utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reakit/Button";
import "./scss/BoutonARetraiterSaga.scss";

interface BoutonARetraiterSagaProps {
  idRequete: string;
}

export const BoutonARetraiterSaga: React.FC<BoutonARetraiterSagaProps> = ({
  idRequete
}) => {
  const navigate = useNavigate();
  const [
    creationActionEtMiseAjourStatutParams,
    setCreationActionEtMiseAjourStatutParams
  ] = useState<ICreationActionEtMiseAjourStatutParams>();

  const idActionCreee = usePostCreationActionEtMiseAjourStatutApi(
    creationActionEtMiseAjourStatutParams
  );

  useEffect(() => {
    if (idActionCreee) {
      goBack(navigate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idActionCreee]);

  const handleClickARetraiterSaga = () => {
    setCreationActionEtMiseAjourStatutParams({
      requeteId: idRequete,
      statutRequete: GestionnaireARetraiterDansSaga.getStatutARetraiter(),
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
