import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getColonneCheckbox } from "@widget/tableau/TableauRece/colonneInput/checkbox/ColonneCheckbox";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useState } from "react";

const TableauReceWrapper: React.FC<{ contientHeader: boolean }> = props => {
  const [idSelectionnes, setIdSelectionnes] = useState<string[]>([]);
  const data: any[] = [{ id: 1 }, { id: 2 }];

  return (
    <TableauRece
      idKey="id"
      columnHeaders={[
        getColonneCheckbox({
          identifiantsSelectionnes: idSelectionnes,
          setIdentifiantsSelectionnes: setIdSelectionnes,
          getIdentifiant: (data: any) => data.id,
          contientHeader: props.contientHeader
        })
      ]}
      dataState={data}
      paramsTableau={{}}
      onClickOnLine={function (
        id: string,
        data: any[],
        idxGlobal: number
      ): void {
        throw new Error("Function not implemented.");
      }}
      nbLignesParPage={2}
      nbLignesParAppel={2}
    />
  );
};

describe("Test de la fonction getColonneCheckbox().", () => {
  test("NE DOIT PAS afficher une case à cocher en tête de colonne QUAND la variable contientHeader={false}.", async () => {
    await act(async () => {
      render(<TableauReceWrapper contientHeader={false} />);
    });

    const checkboxs = screen.getAllByRole("checkbox");
    let classList: DOMTokenList;
    await waitFor(() => {
      for (const checkbox of checkboxs) {
        classList = checkbox.parentElement?.classList as DOMTokenList;
        expect(classList.contains("checkbox-body")).toBeTruthy();
        expect(classList.contains("checkbox-header")).toBeFalsy();
      }
    });
  });

  test("DOIT afficher une case à cocher en tête de colonne QUAND la variable contientHeader={true}.", async () => {
    await act(async () => {
      render(<TableauReceWrapper contientHeader={true} />);
    });

    const checkboxs = screen.getAllByRole("checkbox");
    let classList: DOMTokenList;
    await waitFor(() => {
      classList = checkboxs[0].parentElement?.classList as DOMTokenList;
      expect(classList.contains("checkbox-body")).toBeFalsy();
      expect(classList.contains("checkbox-header")).toBeTruthy();
      for (const checkbox of checkboxs.slice(1)) {
        classList = checkbox.parentElement?.classList as DOMTokenList;
        expect(classList.contains("checkbox-body")).toBeTruthy();
        expect(classList.contains("checkbox-header")).toBeFalsy();
      }
    });
  });
});

describe("Test du fonctionnement d'une colonne de case à cocher avec header.", () => {
  test("DOIT cocher / decocher une case QUAND on clique dessus.", async () => {
    await act(async () => {
      render(<TableauReceWrapper contientHeader={false} />);
    });

    const checkbox = screen.getAllByRole("checkbox")[0];
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });

    await act(async () => {
      fireEvent.click(checkbox);
    });

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });

    await act(async () => {
      fireEvent.click(checkbox);
    });

    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test("DOIT cocher / decocher toutes les cases QUAND on clique sur le header.", async () => {
    await act(async () => {
      render(<TableauReceWrapper contientHeader={true} />);
    });

    const checkboxs = screen.getAllByRole("checkbox");
    const checkboxHeader = checkboxs.shift() as HTMLElement;
    await waitFor(() => {
      expect(checkboxHeader).not.toBeChecked();
      for (const checkbox of checkboxs) {
        expect(checkbox).not.toBeChecked();
      }
    });

    await act(async () => {
      fireEvent.click(checkboxHeader);
    });

    await waitFor(() => {
      expect(checkboxHeader).toBeChecked();
      for (const checkbox of checkboxs) {
        expect(checkbox).toBeChecked();
      }
    });

    await act(async () => {
      fireEvent.click(checkboxHeader);
    });

    await waitFor(() => {
      expect(checkboxHeader).not.toBeChecked();
      for (const checkbox of checkboxs) {
        expect(checkbox).not.toBeChecked();
      }
    });
  });

  test("DOIT modifier le statut coche / indetermine de la case du header QUAND on clique sur les cases du body.", async () => {
    await act(async () => {
      render(<TableauReceWrapper contientHeader={true} />);
    });

    const checkboxs = screen.getAllByRole("checkbox");
    const checkboxHeader = checkboxs.shift() as HTMLElement;
    await waitFor(() => {
      expect(checkboxHeader).not.toBeChecked();
      expect(checkboxHeader).not.toHaveProperty("data-indeterminate", false);
      expect(checkboxs[0]).not.toBeChecked();
      expect(checkboxs[1]).not.toBeChecked();
    });

    await act(async () => {
      fireEvent.click(checkboxs[0]);
    });

    await waitFor(() => {
      expect(checkboxHeader).not.toBeChecked();
      expect(checkboxHeader).not.toHaveProperty("data-indeterminate", true);
      expect(checkboxs[0]).toBeChecked();
      expect(checkboxs[1]).not.toBeChecked();
    });

    await act(async () => {
      fireEvent.click(checkboxs[1]);
    });

    await waitFor(() => {
      expect(checkboxHeader).toBeChecked();
      expect(checkboxHeader).not.toHaveProperty("data-indeterminate", false);
      expect(checkboxs[0]).toBeChecked();
      expect(checkboxs[1]).toBeChecked();
    });
  });
});
