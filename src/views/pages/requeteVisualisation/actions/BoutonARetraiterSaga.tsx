import React, { useCallback } from "react";
import { Text, MessageId } from "../../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";

import { StatutRequete } from "../../../../model/requete/StatutRequete";
import {
  IQueryParameterUpdateStatutRequete,
  useUpdateStatutRequeteApi
} from "../../../common/hook/UpdateStatutRequeteHook";

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
    history.goBack();
  }, [history]);

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState, goToListe);

  return (
    <Button onClick={handleClickARetraiterSaga}>
      <Text messageId={messageId} />
    </Button>
  );
};
