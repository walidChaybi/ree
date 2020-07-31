import React from "react";
import * as renderer from "react-test-renderer";
import { SelectDialog } from "../form/SelectDialog";
import { screen, render, fireEvent } from "@testing-library/react";
import { getText } from "../Text";

test("renders composant SelectDialog", () => {
  const component = renderer.create(
    <SelectDialog
      listOfElements={[
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" },
      ]}
      defaultElementId={"k1"}
      title={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.title"
      )}
      libelle={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.libelle"
      )}
      validate={(req: any) => {
        return;
      }}
    />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("open dialog, select new element and validate selection of new element", () => {
  const handleClickButton = jest.fn();

  render(
    <SelectDialog
      listOfElements={[
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" },
      ]}
      defaultElementId={"k1"}
      title={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.title"
      )}
      libelle={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.libelle"
      )}
      validate={handleClickButton}
    />
  );

  const logoElement = screen.getByTestId("icon-dialog");
  fireEvent.click(logoElement);

  const openListButton = screen.getByTitle("Open");
  fireEvent.click(openListButton);

  const elementToChoose = screen.getByText("v3");
  fireEvent.click(elementToChoose);

  const inputValue = screen.getByDisplayValue("v3");
  expect(inputValue).toBeDefined();

  const validateButton = screen.getByText("Valider");
  fireEvent.click(validateButton);
  setTimeout(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  }, 75);
});

test("dialog can close", () => {
  const handleClickButton = jest.fn();

  render(
    <SelectDialog
      listOfElements={[
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" },
      ]}
      defaultElementId={"k1"}
      title={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.title"
      )}
      libelle={getText(
        "pages.delivrance.monService.officierEtatCivilSelect.libelle"
      )}
      validate={handleClickButton}
    />
  );

  const logoElement = screen.getByTestId("icon-dialog");
  fireEvent.click(logoElement);

  const dialogTitleBeforeClose = screen.getByText(
    "Changer la personne attribuée à la requête"
  );
  expect(dialogTitleBeforeClose).toBeDefined();

  const validateButton = screen.getByText("Annuler");
  fireEvent.click(validateButton);

  const dialogTitleAfterClose = screen.getByText(
    "Changer la personne attribuée à la requête"
  );
  setTimeout(() => {
    expect(dialogTitleAfterClose).toBeUndefined();
  }, 75);
});
