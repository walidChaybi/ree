import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { BoutonRetour } from "../../../../views/common/widget/navigation/BoutonRetour";
import { URL_MES_REQUETES_DELIVRANCE } from "../../../../views/router/ReceUrls";

const history = createMemoryHistory();
history.push(URL_MES_REQUETES_DELIVRANCE);

test("renders titre de l'application", () => {
  render(
    <Router history={history}>
      <BoutonRetour />
    </Router>
  );
  const linkElement = screen.getByText(/<< RETOUR ACCUEIL/i);
  expect(linkElement).toBeDefined();
});
