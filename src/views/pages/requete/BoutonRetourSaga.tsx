import React from "react";
import { Text, MessageId } from "../../common/widget/Text";
import { Button } from "reakit/Button";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { RetourContext } from "../../core/body/Body";
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
    console.log("clic", updateStatutRequeteQueryParamState);
    setUpdateStatutRequeteQueryParamState({
      statut: StatutRequete.ARetraiterSaga
    });
  };

  useUpdateStatutRequeteApi(updateStatutRequeteQueryParamState, goToListe);

  function goToListe() {
    history.push(`${pageUrl}`);
  }

  return (
    <Button onClick={handleClickRetourSaga}>
      <Text messageId={messageId} />
    </Button>
  );
};
