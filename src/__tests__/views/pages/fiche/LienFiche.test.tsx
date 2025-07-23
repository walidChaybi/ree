import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { LienFiche } from "@pages/fiche/LienFiche";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeAll, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../__tests__utils__/testsUtil";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

test.skip("renders Lien fiche fonctionne correctement", () => {
  const { getByText } = render(
    <MemoryRouter>
      <LienFiche
        identifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
        categorie={ETypeFiche.RC}
        numero={"56533"}
        title={"titre"}
      />
    </MemoryRouter>
  );

  const link = getByText("56533");
  fireEvent.click(
    link,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

  waitFor(() => {
    const numeroRc = getByText("RC N° 2018 - 56533");
    expect(numeroRc).toBeDefined();
    const vueRc = getByText("Visualisation du RC");
    expect(vueRc).toBeDefined();
  });
});
