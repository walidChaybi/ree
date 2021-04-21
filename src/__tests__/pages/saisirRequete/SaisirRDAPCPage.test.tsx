import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import { SaisirRDAPCPage } from "../../../views/pages/saisirRequete/SaisirRDAPCPage";
import { SousTypeDelivrance } from "../../../model/requete/v2/enum/SousTypeDelivrance";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders formulaire de saisie d'une Requête de Délivrance Attestation PACS", async () => {
  await act(async () => {
    render(<SaisirRDAPCPage />);
  });
  const titre = SousTypeDelivrance.getEnumFor("RDAPC").libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});
