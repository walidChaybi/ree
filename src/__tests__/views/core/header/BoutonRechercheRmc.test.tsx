import { OfficierContext } from "@core/contexts/OfficierContext";
import { BoutonRechercheRmc } from "@core/header/BoutonRechercheRmc";
import officier from "@mock/data/connectedUser.json";
import { configFakeUrl } from "@mock/superagent-config/superagent-mock-fake-url";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { mockFenetreFicheTestFunctions } from "../../../__tests__utils__/testsUtil";

let boutonElement: HTMLElement;

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

beforeEach(async () => {
  render(
    <MemoryRouter>
      <OfficierContext.Provider
        value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
      >
        <BoutonRechercheRmc></BoutonRechercheRmc>
      </OfficierContext.Provider>
    </MemoryRouter>
  );
  boutonElement = screen.getByTitle("Recherche acte/inscription");
  await waitFor(() => {
    expect(boutonElement).toBeDefined();
  });
});

test("renders click bouton rmc", async () => {
  configFakeUrl[0].nbRequetes = 0;
  fireEvent.click(boutonElement);
  await waitFor(() => {
    expect(screen.getByText("Filtre titulaire")).toBeDefined();
  });
});
