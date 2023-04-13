import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor
} from "@testing-library/react";
import { AccordionVisionneuse } from "@widget/accordion/AccordionVisionneuse";
import React from "react";

const globalAny: any = global;
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
};
globalAny.close = jest.fn();

test("render composant AccordionVisionneuse", async () => {
  act(() => {
    render(
      <AccordionVisionneuse
        idDocumentAAfficher={"bbac2335-562c-4b14-96aa-4386814c02a2"}
        titreOrigine={"Pièce Justificative"}
        typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
        numRequete={"1234"}
        setTitreActuel={function (nouveauTitre: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  await waitFor(() => {
    const accordion = screen.getByRole("button").parentElement;
    expect(accordion).toBeDefined();
    expect(accordion?.classList.contains("AccordionVisionneuse")).toBeTruthy();
  });
});

test("N'autorise pas l'ouvertue de fenêtre externe.", async () => {
  act(() => {
    render(
      <AccordionVisionneuse
        idDocumentAAfficher={"bbac2335-562c-4b14-96aa-4386814c02a2"}
        titreOrigine={"Pièce Justificative"}
        typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
        numRequete={"1234"}
        setTitreActuel={function (nouveauTitre: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  await waitFor(() => {
    const accordion = screen.getByRole("button").parentElement as HTMLElement;
    expect(
      accordion.textContent?.includes("Ouvrir PJ dans une fenêtre externe")
    ).toBeFalsy();
  });
});

test("Autorise l'ouvertue de fenêtre externe.", async () => {
  act(() => {
    render(
      <AccordionVisionneuse
        idDocumentAAfficher={"bbac2335-562c-4b14-96aa-4386814c02a2"}
        titreOrigine={"Pièce Justificative"}
        typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
        numRequete={"1234"}
        setTitreActuel={function (nouveauTitre: string): void {
          throw new Error("Function not implemented.");
        }}
        autoriseOuvertureFenetreExt={true}
      />
    );
  });

  await waitFor(() => {
    const accordion = screen.getByRole("button").parentElement as HTMLElement;
    expect(
      accordion.textContent?.includes("Ouvrir PJ dans une fenêtre externe")
    ).toBeTruthy();
  });
});

test("Ouvre puis ferme une fenêtre externe.", async () => {
  act(() => {
    render(
      <AccordionVisionneuse
        idDocumentAAfficher={"bbac2335-562c-4b14-96aa-4386814c02a2"}
        titreOrigine={"Pièce Justificative"}
        typePiece={TypePieceJointe.PIECE_JUSTIFICATIVE}
        numRequete={"1234"}
        setTitreActuel={function (nouveauTitre: string): void {
          throw new Error("Function not implemented.");
        }}
        autoriseOuvertureFenetreExt={true}
      />
    );
  });

  const accordion: HTMLElement = screen.getByRole("button")
    .parentElement as HTMLElement;
  const togglePjFenetreExt: HTMLElement = screen.getAllByRole("img")[1];

  await waitFor(() => {
    expect(togglePjFenetreExt).toBeDefined();

    expect(
      accordion.textContent?.includes("Ouvrir PJ dans une fenêtre externe")
    ).toBeTruthy();
    expect(
      accordion.textContent?.includes("Fermer la fenetre externe")
    ).toBeFalsy();

    expect(
      togglePjFenetreExt.classList.contains("BoutonOuvertureFenetreExt")
    ).toBeTruthy();
    expect(
      togglePjFenetreExt.classList.contains("BoutonFermetureFenetreExt")
    ).toBeFalsy();
  });

  act(() => {
    fireEvent.click(togglePjFenetreExt);
  });

  await waitFor(() => {
    expect(
      accordion.textContent?.includes("Ouvrir PJ dans une fenêtre externe")
    ).toBeFalsy();
    expect(
      accordion.textContent?.includes("Fermer la fenetre externe")
    ).toBeTruthy();

    expect(
      togglePjFenetreExt.classList.contains("BoutonOuvertureFenetreExt")
    ).toBeFalsy();
    expect(
      togglePjFenetreExt.classList.contains("BoutonFermetureFenetreExt")
    ).toBeTruthy();
  });

  act(() => {
    fireEvent.click(togglePjFenetreExt);
  });

  await waitFor(() => {
    expect(
      accordion.textContent?.includes("Ouvrir PJ dans une fenêtre externe")
    ).toBeTruthy();
    expect(
      accordion.textContent?.includes("Fermer la fenetre externe")
    ).toBeFalsy();

    expect(
      togglePjFenetreExt.classList.contains("BoutonOuvertureFenetreExt")
    ).toBeTruthy();
    expect(
      togglePjFenetreExt.classList.contains("BoutonFermetureFenetreExt")
    ).toBeFalsy();
  });
});


