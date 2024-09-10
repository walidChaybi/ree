import { useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook } from "@hook/requete/creation/EnvoyerMessageSdanfEtMiseAJourStatutApiHook";
import { userDroitCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import {
  reponseRequeteCreationMessageSdanf,
  requeteCreationAvecMessagesRetourSDANFAvecMessages
} from "@mock/data/requeteCreation";
import { IEchange } from "@model/requete/IEchange";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import React from "react";
import { beforeAll, beforeEach, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

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

beforeEach(() => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;
});

test("Attendu: useEnvoyerMessageRetourSDANFEtMiseAJourStatutApiHook fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    expect(
      screen.getByText(reponseRequeteCreationMessageSdanf.message)
    ).toBeDefined();
  });
});
