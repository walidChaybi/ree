import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Tableau, { IEnTeteTableau, TLigneTableau } from "../../../../composants/commun/tableau/Tableau";

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

  const mockLignes: TLigneTableau[] = [
    {
      cle: "1",
      donnees: {
        n: "001",
        natureActe: "Naissance mineur"
      }
    },
    {
      cle: "2",
      donnees: {
        n: "002",
        natureActe: "Naissance mineur"
      }
    }
  ];

  test("DOIT afficher correctement les en-têtes et les lignes", () => {
    const { container } = render(
      <Tableau
        enTetes={mockEnTetes}
        lignes={mockLignes}
        nombreTotalLignes={mockLignes.length}
        parametresRecherche={{ tri: "n", sens: "ASC" }}
        setParametresRecherche={() => {}}
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
        nombreTotalLignes={0}
        parametresRecherche={{ tri: "n", sens: "ASC" }}
        setParametresRecherche={() => {}}
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
        nombreTotalLignes={lignesAvecClick.length}
        parametresRecherche={{ tri: "n", sens: "ASC" }}
        setParametresRecherche={() => {}}
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
        parametresRecherche={{
          tri: "id",
          sens: "DESC"
        }}
        setParametresRecherche={onChangeTriMock}
        nombreTotalLignes={mockLignes.length}
      />
    );

    fireEvent.click(screen.getByTitle(/Trier par n dossier/i));
    expect(onChangeTriMock).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByTitle(/Trier par nature acte/i));
    expect(onChangeTriMock).toHaveBeenCalledTimes(2);
  });

  test("DOIT gérer correctement la pagination", async () => {
    render(
      <Tableau
        enTetes={mockEnTetes}
        lignes={mockLignes}
        nombreLignesParPage={10}
        nombreTotalLignes={25}
        parametresRecherche={{
          tri: "id",
          sens: "DESC"
        }}
        setParametresRecherche={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("1-10 sur 25")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Page suivante"));
    await waitFor(() => {
      expect(screen.getByText("11-20 sur 25")).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Page précédente"));
    await waitFor(() => {
      expect(screen.getByText("1-10 sur 25")).toBeDefined();
    });
  });
});
