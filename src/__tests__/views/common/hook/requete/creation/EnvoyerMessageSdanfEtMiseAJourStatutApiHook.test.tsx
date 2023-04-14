import { useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook } from "@hook/requete/creation/EnvoyerMessageSdanfEtMiseAJourStatutApiHook";
import { userDroitCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import {
  reponseRequeteCreationMessageSdanf,
  requeteCreationAvecMessagesRetourSDANFAvecMessages
} from "@mock/data/requeteCreation";
import { IEchange } from "@model/requete/IEchange";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { MemoryHistory, createMemoryHistory } from "history";
import React from "react";

let history: MemoryHistory;
const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();

const message: IEchange = {
  emetteur: "SCEC",
  destinataire: "SDANF",
  nature: "REPONSE_SCEC",
  message: "Je suis un message test apiHook",
  pieceJustificativeRequeteCreation: []
};

const params = {
  idRequete: requeteCreationAvecMessagesRetourSDANFAvecMessages.id,
  message
};

const HookConsumer: React.FC = () => {
  const res: IEchange =
    useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook(params);

  return <div>{res ? res.message : ""}</div>;
};

beforeEach(async () => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;

  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
});

test("Attendu: useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    expect(
      screen.getByText(reponseRequeteCreationMessageSdanf.message)
    ).toBeDefined();
  });
});
