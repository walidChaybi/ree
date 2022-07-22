import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { requeteCreation } from "../../../mock/data/requeteCreation";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { VoletPiecesJustificatives } from "../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/components/VoletPiecesJustificatives";
import { mappingRequeteCreation } from "../../../views/pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders VoletPiecesJustificatives", async () => {
  await act(async () => {
    render(
      <VoletPiecesJustificatives
        requete={mappingRequeteCreation(requeteCreation)}
      />
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Mandat")).toBeDefined();
    expect(screen.getByText("Piece d'identité")).toBeDefined();
    expect(screen.getAllByText("nom")[2]).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("nom")[2]);
  });

  await waitFor(() => {
    expect(
      screen.getAllByText("nom")[2].classList.contains("Mui-expanded")
    ).toBeTruthy();
  });
});

afterAll(() => {
  superagentMock.unset();
});
