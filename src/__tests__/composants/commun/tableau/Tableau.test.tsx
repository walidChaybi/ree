import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Tableau, { IEnTeteTableau } from "../../../../composants/commun/tableau/Tableau";

describe("Test du composant Tableau", () => {
  const mockEnTetes: IEnTeteTableau[] = [
    {
      cle: "n",
      libelle: "N dossier",
      triable: true
    },
    {
      cle: "natureActe",
      libelle: "Nature acte",
      triable: true
    }
  ];

  const mockLignes = [
    {
      cle: "1",
      n: "001",
      natureActe: "Naissance mineur"
    },
    {
      cle: "2",
      n: "002",
      natureActe: "Naissance mineur"
    }
  ];

  test("DOIT afficher correctement les en-têtes et les lignes", () => {
    const { container } = render(
      <Tableau
        enTetes={mockEnTetes}
        lignes={mockLignes}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT afficher un message lorsqu'il n'y a pas de lignes", () => {
    const message = "Aucune donnée disponible";
    const { container } = render(
      <Tableau
        enTetes={mockEnTetes}
        lignes={[]}
        messageAucuneLigne={message}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT appeler le handler lors du clic sur une ligne", () => {
    const onClickMock = vi.fn();
    const lignesAvecClick = [
      {
        ...mockLignes[0],
        onClick: onClickMock as unknown as () => void
      },
      mockLignes[1]
    ];

    render(
      <Tableau
        enTetes={mockEnTetes}
        lignes={lignesAvecClick as any}
      />
    );

    fireEvent.click(screen.getByText("001"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("DOIT gérer correctement le tri des colonnes", () => {
    const onChangeTriMock = vi.fn();

    render(
      <Tableau
        enTetes={mockEnTetes}
        lignes={mockLignes}
        parametresTri={{
          cle: "id",
          sens: "DESC",
          onChangeTri: onChangeTriMock
        }}
      />
    );

    fireEvent.click(screen.getByTitle(/Trier par n dossier/i));
    expect(onChangeTriMock).toHaveBeenCalledWith("n", "ASC");

    fireEvent.click(screen.getByTitle(/Trier par nature acte/i));
    expect(onChangeTriMock).toHaveBeenCalledWith("natureActe", "ASC");
  });

  test("DOIT gérer correctement la pagination", () => {
    const onChangePageMock = vi.fn();

    render(
      <Tableau
        enTetes={mockEnTetes}
        lignes={mockLignes}
        parametresPagination={{
          pageActuelle: 1,
          lignesParPage: 10,
          totalLignes: 25,
          onChangePage: onChangePageMock
        }}
      />
    );

    expect(screen.getByText("11-20 sur 25")).toBeDefined();

    fireEvent.click(screen.getByTitle("Page précédente"));
    expect(onChangePageMock).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByTitle("Page suivante"));
    expect(onChangePageMock).toHaveBeenCalledWith(true);
  });
});
