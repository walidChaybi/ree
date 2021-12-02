import { act, render, screen } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { useUtilisateurRequeteApi } from "../../../../../views/pages/requeteDelivrance/espaceDelivrance/v1/hook/UtilisateurAssigneRequeteHook";

const superagentMock = require("superagent-mock")(request, configRequetes);
const params = {
  idReponse: "1",
  nomOec: "SecondNom",
  prenomOec: "SecondPrenom"
};

const requetes = [
  {
    reponse: {
      idReponse: "1"
    },
    nomOec: "PremierPrenom PremierNom"
  }
];

const HookConsummer: React.FC = () => {
  const { dataState } = useUtilisateurRequeteApi(params, requetes);

  return <>{dataState && <div>{"useUtilisateurRequeteApi"}</div>}</>;
};

test("l'appel au WS d'assignation des utilisateurs fonctione", async () => {
  expect(requetes[0].nomOec).toBe("PremierPrenom PremierNom");

  await act(async () => {
    render(<HookConsummer />);
  });

  expect(screen.getByText("useUtilisateurRequeteApi")).toBeDefined();
  expect(requetes[0].nomOec).toBe("SecondPrenom SecondNom");
});

afterAll(() => {
  superagentMock.unset();
});
