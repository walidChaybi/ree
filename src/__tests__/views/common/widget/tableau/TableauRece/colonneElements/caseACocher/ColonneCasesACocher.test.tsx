import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getColonneCasesACocher } from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useState } from "react";
import { describe, expect, test } from "vitest";

const TableauReceWrapper: React.FC<{ contientHeader: boolean }> = props => {
  const [idSelectionnes, setIdSelectionnes] = useState<string[]>([]);
  const data: any[] = [{ id: 1 }, { id: 2 }];

  return (
    <TableauRece
      idKey="id"
      columnHeaders={[
        getColonneCasesACocher({
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
  test("NE DOIT PAS afficher une case à cocher en tête de colonne QUAND la variable contientHeader={false}.", () => {
    render(<TableauReceWrapper contientHeader={false} />);

    const checkboxs = screen.getAllByRole("checkbox");
    let classList: DOMTokenList;

    waitFor(() => {
      for (const checkbox of checkboxs) {
        classList = checkbox.parentElement?.classList as DOMTokenList;
        expect(classList.contains("case-a-cocher")).toBeTruthy();
        expect(classList.contains("entete-case-a-cocher")).toBeFalsy();
      }
    });
  });

  test("DOIT afficher une case à cocher en tête de colonne QUAND la variable contientHeader={true}.", () => {
    render(<TableauReceWrapper contientHeader={true} />);

    const checkboxs = screen.getAllByRole("checkbox");
    let classList: DOMTokenList;

    waitFor(() => {
      classList = checkboxs[0].parentElement?.classList as DOMTokenList;
      expect(classList.contains("case-a-cocher")).toBeFalsy();
      expect(classList.contains("entete-case-a-cocher")).toBeTruthy();
      for (const checkbox of checkboxs.slice(1)) {
        classList = checkbox.parentElement?.classList as DOMTokenList;
        expect(classList.contains("case-a-cocher")).toBeTruthy();
        expect(classList.contains("entete-case-a-cocher")).toBeFalsy();
      }
    });
  });
});

describe("Test du fonctionnement d'une colonne de case à cocher avec header.", () => {
  test("DOIT cocher / decocher une case QUAND on clique dessus.", () => {
    render(<TableauReceWrapper contientHeader={false} />);

    const checkbox = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
    waitFor(() => {
      expect(checkbox.checked).not.toBeTruthy();
    });

    fireEvent.click(checkbox);

    waitFor(() => {
      expect(checkbox.checked).toBeTruthy();
    });

    fireEvent.click(checkbox);

    waitFor(() => {
      expect(checkbox.checked).not.toBeTruthy();
    });
  });

  test("DOIT cocher / decocher toutes les cases QUAND on clique sur le header.", () => {
    render(<TableauReceWrapper contientHeader={true} />);

    const checkboxs = screen.getAllByRole("checkbox") as HTMLInputElement[];
    const checkboxHeader = checkboxs.shift() as HTMLInputElement;
    waitFor(() => {
      expect(checkboxHeader.checked).not.toBeTruthy();
      for (const checkbox of checkboxs) {
        expect(checkbox.checked).not.toBeTruthy();
      }
    });

    fireEvent.click(checkboxHeader);

    waitFor(() => {
      expect(checkboxHeader.checked).toBeTruthy();
      for (const checkbox of checkboxs) {
        expect(checkbox.checked).toBeTruthy();
      }
    });

    fireEvent.click(checkboxHeader);

    waitFor(() => {
      expect(checkboxHeader.checked).not.toBeTruthy();
      for (const checkbox of checkboxs) {
        expect(checkbox.checked).not.toBeTruthy();
      }
    });
  });

  test("DOIT modifier le statut coche / indetermine de la case du header QUAND on clique sur les cases du body.", () => {
    render(<TableauReceWrapper contientHeader={true} />);

    const checkboxs = screen.getAllByRole("checkbox") as HTMLInputElement[];
    const checkboxHeader = checkboxs.shift() as HTMLInputElement;
    waitFor(() => {
      expect(checkboxHeader.checked).not.toBeTruthy();
      expect(checkboxHeader).not.toHaveProperty("data-indeterminate", false);
      expect(checkboxs[0].checked).not.toBeTruthy();
      expect(checkboxs[1].checked).not.toBeTruthy();
    });

    fireEvent.click(checkboxs[0]);

    waitFor(() => {
      expect(checkboxHeader.checked).not.toBeTruthy();
      expect(checkboxHeader).not.toHaveProperty("data-indeterminate", true);
      expect(checkboxs[0].checked).toBeTruthy();
      expect(checkboxs[1].checked).not.toBeTruthy();
    });

  fireEvent.click(checkboxs[1]);

    waitFor(() => {
      expect(checkboxHeader.checked).toBeTruthy();
      expect(checkboxHeader).not.toHaveProperty("data-indeterminate", false);
      expect(checkboxs[0].checked).toBeTruthy();
      expect(checkboxs[1].checked).toBeTruthy();
    });
  });
});
