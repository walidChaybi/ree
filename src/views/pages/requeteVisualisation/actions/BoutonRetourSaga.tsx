import React, { useCallback } from "react";
import { Text, MessageId } from "../../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";

import { StatutRequete } from "../../../../model/requete/StatutRequete";
import {
  IQueryParameterUpdateStatutRequete,
  useUpdateStatutRequeteApi
} from "../../../common/hook/UpdateStatutRequeteHook";

interface BoutonRetourSagaProps {
  messageId?: MessageId;
  idRequete: string;
}

export const BoutonRetourSaga: React.FC<BoutonRetourSagaProps> = ({
  messageId = "pages.delivrance.action.retourSaga",
  idRequete
}) => {
  const history = useHistory();
  const [
    updateStatutRequeteQueryParamState,
    setUpdateStatutRequeteQueryParamState
  ] = React.useState<IQueryParameterUpdateStatutRequete>();

  const handleClickRetourSaga = () => {
    setUpdateStatutRequeteQueryParamState({
      statut: StatutRequete.ARetraiter,
      idRequete
    });
  };

  const goToListe = useCallback(() => {
    history.goBack();
  }, [history]);

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState, goToListe);

  return (
    <Button onClick={handleClickRetourSaga}>
      <Text messageId={messageId} />
    </Button>
  );
};
