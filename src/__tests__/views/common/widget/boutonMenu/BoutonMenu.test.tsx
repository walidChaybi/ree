import { fireEvent, render, screen } from "@testing-library/react";
import { BoutonMenu } from "@widget/boutonMenu/BoutonMenu";
import React, { useState } from "react";
import { describe, expect, test } from "vitest";

const StateConsumerBoutonMenu: React.FC<{
  openOnMouseClick?: boolean;
}> = props => {
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <p>Nombre de clics: {value}</p>
      <BoutonMenu
        boutonLibelle={"Click me"}
        options={[
          { cle: "1", libelle: "Un" },
          { cle: "2", libelle: "Deux" },
          { cle: "3", libelle: "Trois" }
        ]}
        onClickOption={() => setValue(value + 1)}
        openOnMouseClick={props.openOnMouseClick}
      />
    </>
  );
};

describe("Test le fonctionnement du composant BoutonMenu", () => {
  test("DOIT afficher / cacher la liste des items QUAND l'utilisateur survole ou non le bouton.", async () => {
    render(<StateConsumerBoutonMenu />);

    const bouton: HTMLElement = screen.getByText("Click me");
    const menu: HTMLElement = await screen.findByRole("presentation", {
      hidden: true
    });
    const choixUn: HTMLElement = screen.getByText("Un");

    expect(bouton).toBeDefined();
    expect(menu).toBeDefined();
    expect(choixUn).toBeDefined();
    expect(menu.className.includes("-hidden")).toBeTruthy();

    fireEvent.mouseOver(bouton);

    expect(menu.className.includes("-hidden")).toBeFalsy();
  });

  test("DOIT afficher / cacher la liste des items QUAND l'utilisateur clique sur le bouton (et non le survole).", () => {
    render(<StateConsumerBoutonMenu openOnMouseClick={true} />);

    const bouton: HTMLElement = screen.getByText("Click me");
    const menu: HTMLElement = screen.getByRole("presentation", {
      hidden: true
    });
    const choixUn: HTMLElement = screen.getByText("Un");

    expect(bouton).toBeDefined();
    expect(menu).toBeDefined();
    expect(choixUn).toBeDefined();
    expect(menu.className.includes("-hidden")).toBeTruthy();

    fireEvent.mouseOver(bouton);

    expect(menu.className.includes("-hidden")).toBeTruthy();

    fireEvent.click(bouton);

    expect(menu.className.includes("-hidden")).toBeFalsy();
  });

  test("DOIT fermer le menu QUAND on clique sur un item du menu.", () => {
    render(<StateConsumerBoutonMenu />);

    const bouton: HTMLElement = screen.getByText("Click me");
    const menu: HTMLElement = screen.getByRole("presentation", {
      hidden: true
    });
    const choixUn: HTMLElement = screen.getByText("Un");

    expect(bouton).toBeDefined();
    expect(menu).toBeDefined();
    expect(choixUn).toBeDefined();
    expect(menu.className.includes("-hidden")).toBeTruthy();

    fireEvent.mouseOver(bouton);

    expect(menu).toBeDefined();
    expect(menu.className.includes("-hidden")).toBeFalsy();

    fireEvent.click(choixUn);

    expect(screen.queryByText("Nombre de clics: 1")).toBeDefined();
  });

  test("DOIT déclencher la fonction QUAND on clique sur un item du menu.", () => {
    render(<StateConsumerBoutonMenu />);

    const zeroClics = "Nombre de clics: 0";
    const unClic = "Nombre de clics: 1";
    const deuxClics = "Nombre de clics: 2";

    expect(screen.queryByText(zeroClics)).toBeDefined();
    expect(screen.queryByText(unClic)).toBeNull();
    expect(screen.queryByText(deuxClics)).toBeNull();

    fireEvent.mouseOver(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Deux"));

    expect(screen.queryByText(zeroClics)).toBeNull();
    expect(screen.queryByText(unClic)).toBeDefined();
    expect(screen.queryByText(deuxClics)).toBeNull();

    fireEvent.click(screen.getByText("Un"));

    expect(screen.queryByText(zeroClics)).toBeNull();
    expect(screen.queryByText(unClic)).toBeNull();
    expect(screen.queryByText(deuxClics)).toBeDefined();
  });
});
