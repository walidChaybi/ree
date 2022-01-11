import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import request from "superagent";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../../api/appels/requeteApi";
import { configRequetesInformation } from "../../../../../mock/superagent-config/superagent-mock-requetes-information";
import { IRequeteTableauInformation } from "../../../../../model/requete/IRequeteTableauInformation";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "../../../../../views/common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { StatutsRequetesInformation } from "../../../../../views/pages/requeteInformation/espaceInformation/EspaceReqInfoParams";
import { useRequeteInformationApi } from "../../../../../views/pages/requeteInformation/espaceInformation/hook/DonneesRequeteInformationHook";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesInformation
);

const queryParam: IQueryParametersPourRequetes = {
  statuts: StatutsRequetesInformation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
};
let container: Element | null;

const HookConsummer: React.FC = () => {
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState } = useRequeteInformationApi(
    queryParam,
    TypeAppelRequete.MES_REQUETES_INFO,
    setEnChargement
  );
  return (
    <>
      {dataState.map((element: IRequeteTableauInformation) => {
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
