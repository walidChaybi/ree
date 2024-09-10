import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Options } from "@util/Type";
import { ChampRecherche } from "@widget/formulaire/champRecherche/ChampRechercheField";
import { expect, test, vi } from "vitest";

// Pour un test du composant dans un formulaire voir RegistreActeFiltre.test.tsx
test("Attendu: composant ChampRecherche fonctionne correctement", () => {
  const onChange = vi.fn();
  const onInput = vi.fn();
  const onClickClear = vi.fn();
  const options: Options = [
    { cle: "k1", libelle: "str1" },
    { cle: "k2", libelle: "str2" }
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

  waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
    expect(iconeCroix).toBeDefined();
  });

  autocomplete.focus();

  fireEvent.change(inputChampRecherche, {
    target: {
      value: "s"
    }
  });

  waitFor(() => {
    expect(screen.getByText("str1")).toBeDefined();
    expect(screen.getByText("str2")).toBeDefined();
    expect(onInput).toBeCalled();
    expect(onChange).not.toBeCalled();
  });

  fireEvent.keyDown(inputChampRecherche, { key: "ArrowDown" });
  fireEvent.keyDown(inputChampRecherche, { key: "Enter" });

  waitFor(() => {
    expect(onChange).toBeCalled();

    expect(onClickClear).not.toBeCalled();
  });

  fireEvent.click(iconeCroix);
  waitFor(() => {
    expect(onClickClear).toBeCalled();
  });
});
