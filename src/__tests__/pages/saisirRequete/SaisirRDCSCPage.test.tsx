import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import { SaisirRDCSCPage } from "../../../views/pages/saisirRequete/SaisirRDCSCPage";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  await act(async () => {
    render(<SaisirRDCSCPage />);
  });
  const titre = SousTypeDelivrance.getEnumFor("RDCSC").libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});
