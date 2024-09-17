import { IRECEContext, RECEContext } from "@core/contexts/RECEContext";
import { BoutonRechercheRmc } from "@core/header/BoutonRechercheRmc";
import officier from "@mock/data/connectedUser.json";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, beforeEach, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../__tests__utils__/testsUtil";

let boutonElement: HTMLElement;

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

beforeEach(async () => {
  render(
    <MemoryRouter>
      <RECEContext.Provider
        value={
          {
            officierDataState: { idSSO: officier.id_sso, ...officier }
          } as unknown as IRECEContext
        }
      >
        <BoutonRechercheRmc></BoutonRechercheRmc>
      </RECEContext.Provider>
    </MemoryRouter>
  );
  boutonElement = screen.getByTitle("Recherche acte/inscription");
  await waitFor(() => {
    expect(boutonElement).toBeDefined();
  });
});

test.skip("renders click bouton rmc", async () => {
  // configFakeUrl[0].nbRequetes = 0;
  fireEvent.click(boutonElement);
  await waitFor(() => {
    expect(screen.getByText("Filtre titulaire")).toBeDefined();
  });
});
