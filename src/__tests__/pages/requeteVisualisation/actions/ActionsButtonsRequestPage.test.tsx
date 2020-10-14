import React from "react";
import { render } from "@testing-library/react";
import { ActionsButtonsRequestPage } from "../../../../views/pages/requeteVisualisation/actions/ActionsButtonsRequestPage";
import { BrowserRouter as Router } from "react-router-dom";
import requete from "../../../../api/mock/data/requete.js";

test("renders boutons d'actions d'une requête", () => {
  const { getAllByRole, getByText } = render(
    <Router>
      <ActionsButtonsRequestPage
        indexRequete={0}
        maxRequetes={1}
        setIndexRequete={() => {
          return;
        }}
        requetes={[requete]}
        idRequete={"idRequeteTest"}
        reloadData={() => {}}
        connectedUser={{
          idSSO: "",
          nom: "nomOec",
          prenom: "",
          trigramme: "",
          mail: "",
          telephone: "",
          section: "",
          bureau: "",
          departement: "",
          service: ""
        }}
      />
    </Router>
  );
  expect(getAllByRole("button").length).toBe(5);
  expect(getByText("Retour à mes requêtes")).not.toBeNull();
  expect(getByText("Signer et terminer")).not.toBeNull();
});

test("renders boutons d'actions d'une requête avec le bouton de signature disabled", () => {
  const { getAllByRole, getByText } = render(
    <Router>
      <ActionsButtonsRequestPage
        indexRequete={0}
        maxRequetes={1}
        setIndexRequete={() => {
          return;
        }}
        requetes={[requete]}
        idRequete={"idRequeteTest"}
        reloadData={() => {}}
        connectedUser={{
          idSSO: "",
          nom: "nomOec",
          prenom: "connecté",
          trigramme: "",
          mail: "",
          telephone: "",
          section: "",
          bureau: "",
          departement: "",
          service: ""
        }}
      />
    </Router>
  );
  expect(getAllByRole("button").length).toBe(5);
  expect(getByText(/Signer et terminer/).closest("button")).toHaveAttribute(
    "disabled"
  );
});

test("renders boutons d'actions d'une requête sauf le bouton de signature", () => {
  const { getAllByRole, queryByText } = render(
    <Router>
      <ActionsButtonsRequestPage
        indexRequete={0}
        maxRequetes={1}
        setIndexRequete={() => {
          return;
        }}
        requetes={[{ ...requete, statut: "DOUBLON" }]}
        idRequete={"idRequeteTest"}
        reloadData={() => {}}
        connectedUser={{
          idSSO: "",
          nom: "nomOec",
          prenom: "connecté",
          trigramme: "",
          mail: "",
          telephone: "",
          section: "",
          bureau: "",
          departement: "",
          service: ""
        }}
      />
    </Router>
  );
  expect(getAllByRole("button").length).toBe(4);
  expect(queryByText("Signer et terminer")).toBeNull();
});
