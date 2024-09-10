import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  test("DOIT afficher / cacher la liste des items QUAND l'utilisateur survole ou non le bouton.", () => {
    render(<StateConsumerBoutonMenu />);

    const bouton: HTMLElement = screen.getByText("Click me");
    const menu: HTMLElement = screen.getByRole("presentation", {
      hidden: true
    });
    const choixUn: HTMLElement = screen.getByText("Un");

    waitFor(() => {
      expect(bouton).toBeDefined();
      expect(menu).toBeDefined();
      expect(menu).not.toBeDefined();
      expect(choixUn).toBeDefined();
      expect(choixUn).not.toBeDefined();
    });

    fireEvent.mouseOver(bouton);

    waitFor(() => {
      expect(menu).toBeDefined();
      expect(choixUn).toBeDefined();
    });

    fireEvent.mouseOver(choixUn);

    waitFor(() => {
      expect(menu).toBeDefined();
      expect(choixUn).toBeDefined();
    });

    fireEvent.mouseLeave(choixUn);

    waitFor(() => {
      expect(menu).not.toBeDefined();
      expect(choixUn).not.toBeDefined();
    });
  });

  test("DOIT afficher / cacher la liste des items QUAND l'utilisateur clique sur le bouton (et non le survole).", () => {
    render(<StateConsumerBoutonMenu openOnMouseClick={true} />);

    const bouton: HTMLElement = screen.getByText("Click me");
    const menu: HTMLElement = screen.getByRole("presentation", {
      hidden: true
    });
    const choixUn: HTMLElement = screen.getByText("Un");

    waitFor(() => {
      expect(bouton).toBeDefined();
      expect(menu).toBeDefined();
      expect(menu).not.toBeDefined();
      expect(choixUn).toBeDefined();
      expect(choixUn).not.toBeDefined();
    });

    fireEvent.mouseOver(bouton);

    waitFor(() => {
      expect(menu).not.toBeDefined();
      expect(choixUn).not.toBeDefined();
    });

    fireEvent.click(bouton);

    waitFor(() => {
      expect(menu).toBeDefined();
      expect(choixUn).toBeDefined();
    });
  });

  test("DOIT fermer le menu QUAND on clique sur un item du menu.", () => {
    render(<StateConsumerBoutonMenu />);

    const bouton: HTMLElement = screen.getByText("Click me");
    const menu: HTMLElement = screen.getByRole("presentation", {
      hidden: true
    });
    const choixUn: HTMLElement = screen.getByText("Un");

    waitFor(() => {
      expect(bouton).toBeDefined();
      expect(menu).toBeDefined();
      expect(choixUn).toBeDefined();
      expect(menu).not.toBeDefined();
    });

    fireEvent.mouseOver(bouton);

    waitFor(() => {
      expect(menu).toBeDefined();
    });

    fireEvent.click(choixUn);

    waitFor(() => {
      expect(menu).not.toBeDefined();
      expect(screen.queryByText("Nombre de clics: 1")).toBeDefined();
    });
  });

  test("DOIT déclencher la fonction QUAND on clique sur un item du menu.", () => {
    render(<StateConsumerBoutonMenu />);

    const zeroClics = "Nombre de clics: 0";
    const unClic = "Nombre de clics: 1";
    const deuxClics = "Nombre de clics: 2";

    waitFor(() => {
      expect(screen.queryByText(zeroClics)).toBeDefined();
      expect(screen.queryByText(unClic)).not.toBeDefined();
      expect(screen.queryByText(deuxClics)).not.toBeDefined();
    });

    fireEvent.mouseOver(screen.getByText("Click me"));
    fireEvent.click(screen.getByText("Deux"));

    waitFor(() => {
      expect(screen.queryByText(zeroClics)).not.toBeDefined();
      expect(screen.queryByText(unClic)).toBeDefined();
      expect(screen.queryByText(deuxClics)).not.toBeDefined();
    });

    fireEvent.click(screen.getByText("Un"));

    waitFor(() => {
      expect(screen.queryByText(zeroClics)).not.toBeDefined();
      expect(screen.queryByText(unClic)).not.toBeDefined();
      expect(screen.queryByText(deuxClics)).toBeDefined();
    });
  });
});
