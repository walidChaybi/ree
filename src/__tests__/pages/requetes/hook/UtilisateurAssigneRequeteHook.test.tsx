import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import config from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import { useUtilisateurRequeteApi } from "../../../../views/pages/requetes/hook/UtilisateurAssigneRequeteHook";
import DONNEE_REQUETE from "../../../../api/mock/data/requete";
import { IDataTable } from "../../../../views/pages/requetes/MesRequetesDelivrancePage";
const superagentMock = require("superagent-mock")(request, config);

let container: Element | null;

const HookConsummer: React.FC = () => {
  const { data } = useRequete();

  useUtilisateurRequeteApi(
    {
      idReponse: "1d189cd9-0df0-45dc-a4cf-0174eb62cbbc",
      nomOec: "nouveauNom",
      prenomOec: "nouveauPrenom"
    },
    data
  );

  return (
    <>
      {data.map((element) => {
        return <div data-testid={element.idRequete}>{element.nomOec}</div>;
      })}
    </>
  );
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(<HookConsummer />, container);
  });
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }

  container = null;
});

test("l'appel au WS de mofiifcation d'une requete", async () => {
  await act(() => {
    expect(container).toBeInstanceOf(Element);
    if (container instanceof Element) {
      expect(container.querySelector).toBeTruthy();
    }
  });
  expect(container).not.toBeNull();
  if (container instanceof Element) {
    expect(container.childNodes.length).toBe(1);
    expect(container.childNodes[0].textContent).toBe(
      "nouveauPrenom nouveauNom"
    );
  }
});

afterAll(() => {
  superagentMock.unset();
});

function useRequete() {
  const [data, setData] = useState<IDataTable[]>([
    DONNEE_REQUETE as IDataTable
  ]);

  return { data, setData };
}
