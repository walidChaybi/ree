import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import * as renderer from "react-test-renderer";
import { BoutonAccueil } from "../BoutonAccueil";
import { BrowserRouter as Router } from "react-router-dom";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

test("renders bouton d'accueil", () => {
  const component = renderer.create(
    <>
      <Router>
        <BoutonAccueil
          texte="Bouton Menu"
          pageUrl="pagesuivante"
          badge={3}
          iconFA={faCoffee}
        ></BoutonAccueil>
      </Router>
    </>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders texte du bouton d'accueil", () => {
  const { getByText } = render(
    <>
      <Router>
        <BoutonAccueil
          texte="Bouton Menu"
          pageUrl="pagesuivante"
        ></BoutonAccueil>
      </Router>
    </>
  );
  const boutonElement = getByText(/Bouton Menu/i);
  expect(boutonElement).toBeInTheDocument();
});

test("renders présence de l'icône du bouton d'accueil", () => {
  const { getByTestId } = render(
    <>
      <Router>
        <BoutonAccueil
          texte="Bouton Menu"
          pageUrl="pagesuivante"
          iconFA={faCoffee}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const iconElement = getByTestId("IconAccueil");
  expect(iconElement).toBeInTheDocument();
});

test("renders des 2 tooltip Indisponible du bouton d'accueil", () => {
  const { getByText, getByTestId } = render(
    <>
      <Router>
        <BoutonAccueil
          texte="Bouton Menu"
          pageUrl="pagesuivante"
          iconFA={faCoffee}
          disabled={true}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const boutonElement = getByText(/Bouton Menu/i);
  const iconElement = getByTestId("IconAccueil");
  expect(boutonElement.title).toBe("Indisponible");
  expect(iconElement.textContent).toBe("Indisponible");
});

test("renders click sur le bouton d'accueil Activé/Désactivé", () => {
  const handleClickButton = jest.fn();
  const { getByTestId } = render(
    <>
      <Router>
        <BoutonAccueil
          texte="Bouton Menu"
          pageUrl="pagesuivante"
          onClickHandler={handleClickButton}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const boutonElement = getByTestId("BtnAccueil");
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});

afterEach(cleanup);
