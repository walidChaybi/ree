import React from "react";
import { render } from "@testing-library/react";
import { ChoixAction } from "../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ChoixAction";
import { BrowserRouter as Router } from "react-router-dom";

test("renders du bloc choix des actions", () => {
  const { getByText } = render(
    <Router>
      <ChoixAction requete={undefined} />
    </Router>
  );
  expect(getByText("Délivrer")).not.toBeNull();
  expect(getByText("Réponse négative")).not.toBeNull();
});
