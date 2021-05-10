import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import { SaisirRDCSCPage } from "../../../views/pages/saisirRequete/SaisirRDCSCPage";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <SaisirRDCSCPage />)
      </MemoryRouter>
    );
  });
  const titre = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});
