import { BoutonRechercheRmc } from "@core/header/BoutonRechercheRmc";
import { IOfficier } from "@model/agent/IOfficier";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, expect, test } from "vitest";
import { elementAvecContexte, mockFenetreFicheTestFunctions } from "../../../__tests__utils__/testsUtil";
import officier from "../../../mock/data/connectedUser.json";

let boutonElement: HTMLElement;

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

test.skip("renders click bouton rmc", async () => {
  render(
    elementAvecContexte(
      <MemoryRouter>
        <BoutonRechercheRmc></BoutonRechercheRmc>
      </MemoryRouter>,

      { idSSO: officier.id_sso, ...officier } as unknown as IOfficier
    )
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
