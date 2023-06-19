import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { LienFiche } from "@pages/fiche/LienFiche";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { mockFenetreFicheTestFunctions } from "../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

test("renders Lien fiche fonctionne correctement", async () => {
  const { getByText } = render(
    <LienFiche
      identifiant={"7566e16c-2b0e-11eb-adc1-0242ac120002"}
      categorie={TypeFiche.RC}
      numero={"56533"}
      title={"titre"}
    />
  );

  const link = getByText("56533");
  fireEvent.click(
    link,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

  await waitFor(() => {
    const numeroRc = getByText("RC N° 2018 - 56533");
    expect(numeroRc).toBeDefined();
    const vueRc = getByText("Visualisation du RC");
    expect(vueRc).toBeDefined();
  });
});


