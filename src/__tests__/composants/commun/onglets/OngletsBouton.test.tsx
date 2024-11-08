import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import OngletsBouton, {
  IOngletBouton,
} from "../../../../composants/commun/onglets/OngletsBouton";

describe("OngletsBouton Component", () => {
  const mockChangerOnglet = vi.fn();

  const onglets: IOngletBouton[] = [
    { cle: "onglet1", libelle: "Onglet 1" },
    { cle: "onglet2", libelle: "Onglet 2" },
    { cle: "onglet3", libelle: "Onglet 3", inactif: true },
  ];

  const renderComponent = (cleOngletActif = "onglet1") => {
    render(
      <OngletsBouton
        onglets={onglets}
        cleOngletActif={cleOngletActif}
        changerOnglet={mockChangerOnglet}
        renderBoutonAjout={(style) => <button className={style}>Add</button>}
      />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Render correctement tout les onglets", () => {
    renderComponent();

    onglets.forEach((onglet) => {
      expect(screen.getByText(onglet.libelle)).toBeDefined();
    });
  });

  test("Disable l'onglet actif actuel ainsi que tout les onglets inactifs", () => {
    renderComponent("onglet1");

    expect(
      (screen.getByText("Onglet 1") as HTMLButtonElement).disabled,
    ).toBeTruthy();

    expect(
      (screen.getByText("Onglet 2") as HTMLButtonElement).disabled,
    ).toBeFalsy();
    expect(
      (screen.getByText("Onglet 3") as HTMLButtonElement).disabled,
    ).toBeTruthy();
  });

  test("Change d'onglet lorsque celui-ci est cliqué", () => {
    renderComponent("onglet1");

    fireEvent.click(screen.getByText("Onglet 2"));

    expect(mockChangerOnglet).toHaveBeenCalledWith("onglet2");
  });

  test("Ne change pas d'onglet lorsque celui-ci est inactif", () => {
    renderComponent("onglet1");

    fireEvent.click(screen.getByText("Onglet 1"));
    expect(mockChangerOnglet).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("Onglet 3"));
    expect(mockChangerOnglet).not.toHaveBeenCalled();
  });

  test("Le bouton supplémentairte est ajouté, et avec du style", () => {
    renderComponent();

    const addButton = screen.getByText("Add");
    expect(addButton).toBeDefined();
    expect(addButton.classList.contains("rounded-b-none")).toBeTruthy();
  });

  test("N'affiche pas le bouton supplémentaire lorsque celui-ci n'est pas fourni", () => {
    render(
      <OngletsBouton
        onglets={onglets}
        cleOngletActif="onglet1"
        changerOnglet={mockChangerOnglet}
      />,
    );

    expect(screen.queryByText("Add")).toBeNull();
  });
});
