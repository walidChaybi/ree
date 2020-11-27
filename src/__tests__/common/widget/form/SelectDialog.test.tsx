import React from "react";
import { create } from "react-test-renderer";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { SelectDialog } from "../../../../views/common/widget/form/SelectDialog";
import { getText } from "../../../../views/common/widget/Text";
import { act } from "react-test-renderer";

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
  act(() => {
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
  });

  await waitFor(() => {
    const logoElement = screen.getByTestId("icon-dialog");
    fireEvent(
      logoElement,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    const openListButton = screen.getByTitle("Open");
    fireEvent(
      openListButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
  });
  await waitFor(() => {
    const elementToChoose = screen.getByText("v3");
    fireEvent(
      elementToChoose,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
  });

  await waitFor(() => {
    const inputValue = screen.getByDisplayValue("v3");
    fireEvent(
      inputValue,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
  });

  await waitFor(() => {
    const validateButton = screen.getByText("Valider");
    fireEvent(
      validateButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });
});
