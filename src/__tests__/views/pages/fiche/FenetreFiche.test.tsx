import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FenetreFiche } from "@pages/fiche/FenetreFiche";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, test, vi } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../__tests__utils__/testsUtil";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

test.skip("renders Lien fiche fonctionne correctement", () => {
  const onClose = vi.fn();

  render(
    <MemoryRouter>
      <FenetreFiche
        identifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
        categorie={TypeFiche.RC}
        onClose={onClose}
        datasFiches={[
          {
            identifiant: "7566e16c-2b0e-11eb-adc1-0242ac120002",
            categorie: TypeFiche.RC
          }
        ]}
        index={{ value: 0 }}
        nbLignesTotales={1}
        nbLignesParAppel={1}
      />
    </MemoryRouter>
  );
  waitFor(() => {
    const numeroRc = screen.getByText("RC N° 2018 - 56533");
    expect(numeroRc).toBeDefined();

    const vueRc = screen.getByText("Visualisation du RC");
    expect(vueRc).toBeDefined();
  });
});
