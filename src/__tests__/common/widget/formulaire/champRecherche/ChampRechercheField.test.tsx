import { act, fireEvent, render, screen } from "@testing-library/react";
import { ChampRecherche } from "@widget/formulaire/champRecherche/ChampRechercheField";
import React from "react";

// Pour un test du composant dans un formulaire voir RegistreActeFiltre.test.tsx
test("Attendu: composant ChampRecherche fonctionne correctement", async () => {
  const onChange = jest.fn();
  const onInput = jest.fn();
  const onClickClear = jest.fn();
  const options = [
    { value: "k1", str: "str1" },
    { value: "k2", str: "str2" }
  ];
  render(
    <ChampRecherche
      componentName="testChampRecherche"
      options={options}
      onChange={onChange}
      onInput={onInput}
      onClickClear={onClickClear}
    />
  );

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "testChampRecherche"
  ) as HTMLInputElement;
  const iconeCroix = screen.getByTitle("Vider le champ");

  expect(autocomplete).toBeDefined();
  expect(inputChampRecherche).toBeDefined();
  expect(iconeCroix).toBeDefined();

  autocomplete.focus();
  act(() => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
  });
  expect(screen.getByText("str1")).toBeInTheDocument();
  expect(screen.getByText("str2")).toBeInTheDocument();

  expect(onInput).toBeCalled();

  expect(onChange).not.toBeCalled();
  act(() => {
    fireEvent.keyDown(inputChampRecherche, { key: "ArrowDown" });
    fireEvent.keyDown(inputChampRecherche, { key: "Enter" });
  });
  expect(onChange).toBeCalled();

  expect(onClickClear).not.toBeCalled();
  act(() => {
    fireEvent.click(iconeCroix);
  });
  expect(onClickClear).toBeCalled();
});
