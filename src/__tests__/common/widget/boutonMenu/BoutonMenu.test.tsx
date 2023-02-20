import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { BoutonMenu } from "@widget/boutonMenu/BoutonMenu";
import React, { useState } from "react";

const StateConsumerBoutonMenu: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <p>Nombre de clics: {value}</p>
      <BoutonMenu
        boutonLibelle={"Click me"}
        listeItems={[
          { key: "1", libelle: "Un" },
          { key: "2", libelle: "Deux" },
          { key: "3", libelle: "Trois" }
        ]}
        onClickMenuItem={() => setValue(value + 1)}
      />
    </>
  );
};

describe("Test le fonctionnement du composant BoutonMenu", () => {
  test("DOIT afficher / cacher la liste des items QUAND l'utilisateur survole ou non le bouton.", async () => {
    await act(async () => {
      render(<StateConsumerBoutonMenu />);
    });

    const bouton: HTMLElement = screen.getByText("Click me");
    const menu: HTMLElement = screen.getByRole("presentation", {
      hidden: true
    });
    const choixUn: HTMLElement = screen.getByText("Un");

    await waitFor(() => {
      expect(bouton).toBeDefined();
      expect(menu).toBeDefined();
      expect(menu).not.toBeVisible();
      expect(choixUn).toBeDefined();
      expect(choixUn).not.toBeVisible();
    });

    await act(async () => {
      fireEvent.mouseOver(bouton);
    });

    await waitFor(() => {
      expect(menu).toBeVisible();
      expect(choixUn).toBeVisible();
    });

    await act(async () => {
      fireEvent.mouseOver(choixUn);
    });

    await waitFor(() => {
      expect(menu).toBeVisible();
      expect(choixUn).toBeVisible();
    });

    await act(async () => {
      fireEvent.mouseLeave(choixUn);
    });

    await waitFor(() => {
      expect(menu).not.toBeVisible();
      expect(choixUn).not.toBeVisible();
    });
  });

  test("DOIT déclencher la fonction QUAND on click sur un item du menu.", async () => {
    await act(async () => {
      render(<StateConsumerBoutonMenu />);
    });

    const zeroClics = "Nombre de clics: 0";
    const unClic = "Nombre de clics: 1";
    const deuxClics = "Nombre de clics: 2";

    await waitFor(() => {
      expect(screen.queryByText(zeroClics)).toBeInTheDocument();
      expect(screen.queryByText(unClic)).not.toBeInTheDocument();
      expect(screen.queryByText(deuxClics)).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.mouseOver(screen.getByText("Click me"));
      fireEvent.click(screen.getByText("Deux"));
    });

    await waitFor(() => {
      expect(screen.queryByText(zeroClics)).not.toBeInTheDocument();
      expect(screen.queryByText(unClic)).toBeInTheDocument();
      expect(screen.queryByText(deuxClics)).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Un"));
    });

    await waitFor(() => {
      expect(screen.queryByText(zeroClics)).not.toBeInTheDocument();
      expect(screen.queryByText(unClic)).not.toBeInTheDocument();
      expect(screen.queryByText(deuxClics)).toBeInTheDocument();
    });
  });
});
