import React from "react";
import { create } from "react-test-renderer";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SelectDialog } from "../../../../views/common/widget/form/SelectDialog";
import { getText } from "../../../../views/common/widget/Text";

test("renders composant SelectDialog", () => {
  const component = create(
    <SelectDialog
      listOfElements={[
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" }
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

test("open dialog, select new element and validate selection of new element", async () => {
  const handleClickButton = jest.fn();

  render(
    <SelectDialog
      listOfElements={[
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" }
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
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });
});
