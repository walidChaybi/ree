import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import { BoutonTransmettreAValideur } from "../../../../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonTransmettreAValideur";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("est à A_VALIDER", () => {
  const router = createTestingRouter(
    [
      {
        path: "",
        element: <BoutonTransmettreAValideur idRequete={""}></BoutonTransmettreAValideur>
      },
      {
        path: "*",
        element: <></>
      }
    ],
    [""]
  );

  const { getByText } = render(
    <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );

  const bouttonModifierTraitement = getByText("Transmettre à valideur") as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonModifierTraitement.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonModifierTraitement);
});
