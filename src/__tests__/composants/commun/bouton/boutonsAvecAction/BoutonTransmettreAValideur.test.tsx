import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { BoutonTransmettreAValideur } from "../../../../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonTransmettreAValideur";
import {
  createTestingRouter,
  elementAvecContexte,
} from "../../../../__tests__utils__/testsUtil";

test("est à A_VALIDER", () => {
  const router = createTestingRouter(
    [
      {
        path: "",
        element: (
          <BoutonTransmettreAValideur
            idRequete={""}
          ></BoutonTransmettreAValideur>
        ),
      },
      {
        path: "*",
        element: <></>,
      },
    ],
    [""],
  );

  const { getByText } = render(
    elementAvecContexte(
      <RouterProvider router={router} />,
      userDroitnonCOMEDEC,
    ),
  );

  screen.debug();

  const bouttonModifierTraitement = getByText(
    "Transmettre à valideur",
  ) as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonModifierTraitement.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonModifierTraitement);
});
