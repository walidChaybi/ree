import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import * as renderer from "react-test-renderer";
import { BoutonAccueil } from "../BoutonAccueil";
import { BrowserRouter as Router } from "react-router-dom";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

test("renders bouton d'accueil", () => {
  const component = renderer.create(
    <>
      <Router>
        <BoutonAccueil
          messageId="Bouton Menu"
          pageUrl="pagesuivante"
          titleId="Title Bouton Menu"
          badge={3}
        ></BoutonAccueil>
      </Router>
    </>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders texte du bouton d'accueil", () => {
  render(
    <>
      <Router>
        <BoutonAccueil
          messageId="Bouton Menu"
          pageUrl="pagesuivante"
          titleId="Title Bouton Menu"
        ></BoutonAccueil>
      </Router>
    </>
  );

  const boutonElement = screen.getByText(/Bouton Menu/i);
  expect(boutonElement).toBeInTheDocument();
});

test("renders présence de l'icône du bouton d'accueil", () => {
  render(
    <>
      <Router>
        <BoutonAccueil
          messageId="Bouton Menu"
          pageUrl="pagesuivante"
          titleId="Title Bouton Menu"
          iconFA={faCoffee}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const iconElement = screen.getByTestId("IconAccueil");
  expect(iconElement).toBeInTheDocument();
});

test("renders click sur le bouton d'accueil Activé/Désactivé", () => {
  const handleClickButton = jest.fn();
  render(
    <>
      <Router>
        <BoutonAccueil
          messageId="Bouton Menu"
          pageUrl="pagesuivante"
          titleId="Title Bouton Menu"
          onClickHandler={handleClickButton}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const boutonElement = screen.getByTestId("BtnAccueil");
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});
