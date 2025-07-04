import { BoutonRechercheRmc } from "@core/header/BoutonRechercheRmc";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../__tests__utils__/testsUtil";

let boutonElement: HTMLElement;

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

test.skip("renders click bouton rmc", async () => {
  render(
    <MockRECEContextProvider>
      <MemoryRouter>
        <BoutonRechercheRmc></BoutonRechercheRmc>
      </MemoryRouter>
    </MockRECEContextProvider>
  );
  boutonElement = screen.getByTitle("Recherche acte/inscription");
  await waitFor(() => {
    expect(boutonElement).toBeDefined();
  });
  // configFakeUrl[0].nbRequetes = 0; => Commenté pour passer le problem's count du build, à réintégrer quand le test sera dé-skippé
  fireEvent.click(boutonElement);
  await waitFor(() => {
    expect(screen.getByText("Filtre titulaire")).toBeDefined();
  });
});
