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
  const { getByText } = render(
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
  setTimeout(() => {
    const boutonElement = getByText(/Bouton Menu/i);
    expect(boutonElement).toBeInTheDocument();
  }, 75);
});

test("renders présence de l'icône du bouton d'accueil", () => {
  const { getByTestId } = render(
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
  const iconElement = getByTestId("IconAccueil");
  expect(iconElement).toBeInTheDocument();
});

test("renders des 2 titles du bouton d'accueil", () => {
  const { getAllByText, getByTestId } = render(
    <>
      <Router>
        <BoutonAccueil
          messageId="Bouton Menu"
          pageUrl="pagesuivante"
          titleId="Title Bouton Menu"
          iconFA={faCoffee}
          disabled={true}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const boutonElement = getAllByText(/Bouton Menu/i);
  const iconElement = getByTestId("IconAccueil");
  expect(boutonElement[0].textContent).toBe("⚠ Title Bouton Menu");
  expect(iconElement.textContent).toBe("⚠ Title Bouton Menu");
});

test("renders click sur le bouton d'accueil Activé/Désactivé", () => {
  const handleClickButton = jest.fn();
  const { getByTestId } = render(
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
  const boutonElement = getByTestId("BtnAccueil");
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});

afterEach(cleanup);
