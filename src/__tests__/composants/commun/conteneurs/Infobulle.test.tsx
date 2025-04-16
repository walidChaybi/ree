import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Infobulle from "../../../../composants/commun/conteneurs/Infobulle";

describe("Composant Infobulle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  test("doit rendre le contenu enfant correctement", () => {
    const { getByText } = render(
      <Infobulle contenu="Texte d'infobulle">
        <button>Survolez-moi</button>
      </Infobulle>
    );

    expect(getByText("Survolez-moi")).toBeDefined();
  });

  test("ne doit pas afficher l'infobulle par défaut", () => {
    const { container } = render(
      <Infobulle contenu="Texte d'infobulle">
        <button>Survolez-moi</button>
      </Infobulle>
    );

    expect(container.firstChild).matchSnapshot();
  });

  test("doit afficher l'infobulle après le délai quand on survole", async () => {
    const { container } = render(
      <Infobulle
        contenu="Texte d'infobulle"
        delai={300}
      >
        <button>Survolez-moi</button>
      </Infobulle>
    );

    fireEvent.mouseEnter(screen.getByText("Survolez-moi"));

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByText("Texte d'infobulle")).toBeDefined();

    expect(container.firstChild).toMatchSnapshot();
  });

  test("doit masquer l'infobulle quand la souris quitte l'élément", async () => {
    const { container } = render(
      <Infobulle
        contenu="Texte d'infobulle"
        delai={300}
      >
        <button>Survolez-moi</button>
      </Infobulle>
    );

    fireEvent.mouseEnter(screen.getByText("Survolez-moi"));

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByText("Texte d'infobulle")).toBeDefined();

    fireEvent.mouseLeave(screen.getByText("Survolez-moi"));

    expect(screen.queryByText("Texte d'infobulle")).toBeNull();

    expect(container.firstChild).toMatchSnapshot();
  });
});
