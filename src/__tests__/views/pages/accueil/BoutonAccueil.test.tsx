import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { BoutonAccueil } from "@pages/accueil/BoutonAccueil";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { expect, test, vi } from "vitest";

test("renders texte du bouton d'accueil", () => {
  render(
    <>
      <Router>
        <BoutonAccueil
          libelle="Bouton Menu"
          pageUrl="pagesuivante"
          title="Title Bouton Menu"
        ></BoutonAccueil>
      </Router>
    </>
  );

  const boutonElement = screen.getByText(/Bouton Menu/i);
  expect(boutonElement).toBeDefined();
});

test("renders présence de l'icône du bouton d'accueil", () => {
  render(
    <>
      <Router>
        <BoutonAccueil
          libelle="Bouton Menu"
          pageUrl="pagesuivante"
          title="Title Bouton Menu"
          iconFA={faCoffee}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const iconElement = screen.getByTestId("IconAccueil");
  expect(iconElement).toBeDefined();
});

test("renders click sur le bouton d'accueil Activé/Désactivé", () => {
  const handleClickButton = vi.fn();
  render(
    <>
      <Router>
        <BoutonAccueil
          libelle="Bouton Menu"
          pageUrl="pagesuivante"
          title="Title Bouton Menu"
          onClickHandler={handleClickButton}
        ></BoutonAccueil>
      </Router>
    </>
  );
  const boutonElement = screen.getByTestId("BtnAccueil");
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});
