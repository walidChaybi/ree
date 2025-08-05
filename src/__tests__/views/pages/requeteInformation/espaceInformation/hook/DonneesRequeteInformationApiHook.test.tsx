import { IQueryParametersPourRequetes, TypeAppelRequete } from "@api/appels/requeteApi";
import { IRequeteTableauInformation } from "@model/requete/IRequeteTableauInformation";
import { StatutsRequetesInformation } from "@pages/requeteInformation/espaceInformation/EspaceReqInfoParams";
import { useRequeteInformationApi } from "@pages/requeteInformation/espaceInformation/hook/DonneesRequeteInformationApiHook";
import { act } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import ReactDOM from "react-dom";
import { afterEach, beforeEach, expect, test } from "vitest";

const queryParam: IQueryParametersPourRequetes = {
  statuts: StatutsRequetesInformation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
};
let container: Element | null;

const HookConsummer: React.FC = () => {
  const { dataState } = useRequeteInformationApi(queryParam, TypeAppelRequete.MES_REQUETES_INFO);
  return (
    <>
      {dataState.map((element: IRequeteTableauInformation) => {
        return (
          <div
            key={element.idRequete}
            data-testid={element.idRequete}
          >
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
