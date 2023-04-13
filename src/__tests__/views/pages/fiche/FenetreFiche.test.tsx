import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FenetreFiche } from "@pages/fiche/FenetreFiche";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

const globalAny: any = global;
globalAny.open = () => {
  return {
    ...window,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  };
};
globalAny.close = jest.fn();

test("renders Lien fiche fonctionne correctement", async () => {
  const onClose = jest.fn();

  render(
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
  );
  await waitFor(() => {
    const numeroRc = screen.getByText("RC N° 2018 - 56533");
    expect(numeroRc).toBeDefined();

    const vueRc = screen.getByText("Visualisation du RC");
    expect(vueRc).toBeDefined();
  });
});


