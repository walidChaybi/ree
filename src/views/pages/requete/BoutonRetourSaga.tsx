import React, { useCallback } from "react";
import { Text, MessageId } from "../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";
import {
  IQueryParameterUpdateStatutRequete,
  useUpdateStatutRequeteApi,
} from "./UpdateStatutRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";

interface BoutonRetourSagaProps {
  messageId?: MessageId;
  idRequete: string;
}

export const BoutonRetourSaga: React.FC<BoutonRetourSagaProps> = ({
  messageId = "pages.delivrance.action.retourSaga",
  idRequete,
}) => {
  const history = useHistory();
  const [
    updateStatutRequeteQueryParamState,
    setUpdateStatutRequeteQueryParamState,
  ] = React.useState<IQueryParameterUpdateStatutRequete>();

  const handleClickRetourSaga = () => {
    setUpdateStatutRequeteQueryParamState({
      statut: StatutRequete.ARetraiterSaga,
      idRequete: idRequete,
    });
  };

  const goToListe = useCallback(() => {
    history.goBack();
  }, [history]);

  useUpdateStatutRequeteApi(goToListe, updateStatutRequeteQueryParamState);

  return (
    <Button onClick={handleClickRetourSaga}>
      <Text messageId={messageId} />
    </Button>
  );
};
