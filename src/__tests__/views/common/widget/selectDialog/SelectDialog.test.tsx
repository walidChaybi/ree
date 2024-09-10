import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SelectDialog } from "@widget/selectDialog/SelectDialog";
import { expect, test, vi } from "vitest";

test("open dialog, select new element and validate selection of new element", () => {
  const handleClickButton = vi.fn();
  render(
    <SelectDialog
      listOfElements={[
        { key: "k1", value: "v1" },
        { key: "k2", value: "v2" },
        { key: "k3", value: "v3" },
        { key: "k4", value: "v4" }
      ]}
      defaultElementId={"k1"}
      title="Changer la personne attribuée à la requête"
      libelle="Attribuer à : "
      validate={handleClickButton}
    />
  );

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

  const elementToChoose = screen.getByText("v3");
  fireEvent(
    elementToChoose,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

  const inputValue = screen.getByDisplayValue("v3");
  fireEvent(
    inputValue,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

  const validateButton = screen.getByText("Valider");
  fireEvent(
    validateButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

    waitFor(() => {
      expect(handleClickButton).toHaveBeenCalledTimes(1);
    });
});
