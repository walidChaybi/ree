import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import {
  IQueryParametersPourRequetesV2,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE } from "../../../../views/common/widget/tableau/v2/TableauPaginationConstantes";
import { StatutsRequetesEspaceDelivrance } from "../../../../views/pages/espaceDelivrance/v2/EspaceDelivranceParamsV2";
import { useRequeteDelivranceApi } from "../../../../views/pages/espaceDelivrance/v2/hook/DonneesRequeteDelivranceHookV2";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const queryParam: IQueryParametersPourRequetesV2 = {
  statuts: StatutsRequetesEspaceDelivrance,
  tri: "dateStatut",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
};
let container: Element | null;

const HookConsummer: React.FC = () => {
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState = [] } = useRequeteDelivranceApi(
    queryParam,
    TypeAppelRequete.MES_REQUETES,
    setEnChargement
  );
  return (
    <>
      {dataState.map(element => {
        return (
          <div key={element.idRequete} data-testid={element.idRequete}>
            {element.idRequete}
          </div>
        );
      })}
    </>
  );
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container instanceof Element) {
    document.body.removeChild<Element>(container);
  }
  container = null;
});

test("monter un composant de test pour vérifier que tout va bien", async () => {
  await act(async () => {
    ReactDOM.render(<HookConsummer />, container);
  });
  expect(container).toBeInstanceOf(Element);

  if (container instanceof Element) {
    expect(container.querySelector).toBeTruthy();
  }
});

afterAll(() => {
  superagentMock.unset();
});
