import React, { useCallback } from "react";
import { Text, MessageId } from "../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";
import {
  IQueryParameterUpdateStatutRequete,
  useUpdateStatutRequeteApi
} from "./UpdateStatutRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";

interface BoutonRetourSagaProps {
  pageUrl: string;
  messageId?: MessageId;
}

export const BoutonRetourSaga: React.FC<BoutonRetourSagaProps> = ({
  messageId = "pages.delivrance.action.retourSaga",
  pageUrl = ""
}) => {
  const history = useHistory();
  const [
    updateStatutRequeteQueryParamState,
    setUpdateStatutRequeteQueryParamState
  ] = React.useState<IQueryParameterUpdateStatutRequete>({
    statut: StatutRequete.ASigner
  });

  const handleClickRetourSaga = () => {
    setUpdateStatutRequeteQueryParamState({
      statut: StatutRequete.ARetraiterSaga
    });
  };

  const goToListe = useCallback(() => {
    history.push(`${pageUrl}`);
  }, [history, pageUrl]);

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState, goToListe);

  return (
    <Button onClick={handleClickRetourSaga}>
      <Text messageId={messageId} />
    </Button>
  );
};
