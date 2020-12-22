/* istanbul ignore file */
/*
 * fichier non testé car composant à supprimer dans étape 2
 */
import React, { useCallback } from "react";
import { Text, MessageId } from "../../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";

import { StatutRequete } from "../../../../model/requete/StatutRequete";
import {
  IQueryParameterUpdateStatutRequete,
  useUpdateStatutRequeteApi
} from "../../../common/hook/UpdateStatutRequeteHook";
import {
  URL_MES_REQUETES,
  URL_REQUETES_SERVICE
} from "../../../router/ReceUrls";

interface BoutonARetraiterSagaProps {
  messageId?: MessageId;
  idRequete: string;
}

export const BoutonARetraiterSaga: React.FC<BoutonARetraiterSagaProps> = ({
  messageId = "pages.delivrance.action.aRetraiterSaga",
  idRequete
}) => {
  const history = useHistory();
  const [
    updateStatutRequeteQueryParamState,
    setUpdateStatutRequeteQueryParamState
  ] = React.useState<IQueryParameterUpdateStatutRequete>();

  const handleClickARetraiterSaga = () => {
    setUpdateStatutRequeteQueryParamState({
      statut: StatutRequete.ARetraiter,
      idRequete
    });
  };

  const goToListe = useCallback(() => {
    const pathname = history.location.pathname;
    if (pathname.startsWith(URL_MES_REQUETES)) {
      history.push(URL_MES_REQUETES);
    }
    if (pathname.startsWith(URL_REQUETES_SERVICE)) {
      history.push(URL_REQUETES_SERVICE);
    }
  }, [history]);

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState, goToListe);

  return (
    <Button onClick={handleClickARetraiterSaga}>
      <Text messageId={messageId} />
    </Button>
  );
};
