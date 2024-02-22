import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useRequeteDelivranceApiHook } from "@pages/requeteDelivrance/espaceDelivrance/hook/DonneesRequeteDelivranceApiHook";
import { act } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import ReactDOM from "react-dom";

const queryParam: IQueryParametersPourRequetes = {
  statuts: StatutRequete.getStatutsMesRequetes(),
  tri: "dateStatut",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
};
let container: Element | null;

const HookConsummer: React.FC = () => {
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState = [] } = useRequeteDelivranceApiHook(
    queryParam,
    TypeAppelRequete.MES_REQUETES_DELIVRANCE,
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


