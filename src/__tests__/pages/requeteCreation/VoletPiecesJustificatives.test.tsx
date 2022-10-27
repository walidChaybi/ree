import { OngletPiecesJustificatives } from "@pages/requeteCreation/EspaceCreation/apercuReqCreation/components/OngletPiecesJustificatives";
import { mappingRequeteCreation } from "@pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { requeteCreation } from "../../../mock/data/requeteCreation";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders VoletPiecesJustificatives", async () => {
  await act(async () => {
    render(
      <OngletPiecesJustificatives
        requete={mappingRequeteCreation(requeteCreation)}
      />
    );
  });

  await waitFor(() => {
    expect(screen.getAllByText("AN parent 1")[0]).toBeDefined();
    expect(screen.getAllByText("Pièce d'identité postulant")[0]).toBeDefined();
    expect(screen.getAllByText("Divorce libelle pourri 10")[0]).toBeDefined();
    expect(screen.getAllByText("fichierPJ")[2]).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("fichierPJ")[2]);
  });

  await waitFor(() => {
    expect(
      screen.getAllByTitle("fichierPJ")[2].classList.contains("Mui-expanded")
    ).toBe(true);
  });
});

test("Modifier le titre d'un fichier d'une pièce jointe", async () => {
  await act(async () => {
    render(
      <OngletPiecesJustificatives
        requete={mappingRequeteCreation(requeteCreation)}
      />
    );
  });

  const boutonModifierLibelle = screen.getAllByTitle(
    "Modifier le libellé"
  )[1] as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonModifierLibelle).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonModifierLibelle);
  });

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputModificationLibelle, {
      target: {
        value: "nouveauLibelle"
      }
    });
    inputModificationLibelle.blur();
  });

  await waitFor(() => {
    expect(screen.getByText("nouveauLibelle")).toBeDefined();
  });
});

test("Modifier le titre d'un fichier d'une pièce jointe et revenir en arrière", async () => {
  await act(async () => {
    render(
      <OngletPiecesJustificatives
        requete={mappingRequeteCreation(requeteCreation)}
      />
    );
  });

  const boutonModifierLibelle = screen.getAllByTitle(
    "Modifier le libellé"
  )[1] as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonModifierLibelle).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonModifierLibelle);
  });

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputModificationLibelle, {
      target: {
        value: "test libelle"
      }
    });
    fireEvent.keyDown(inputModificationLibelle, {
      key: "Enter",
      code: "Enter",
      charCode: 13
    });
  });

  await waitFor(() => {
    expect(screen.getByText("test libelle")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByTitle("Annuler la modification du libellé"));
  });

  await waitFor(() => {
    expect(screen.getByText("Titre de séjour postulant")).toBeDefined();
  });
});

test("Modifier le titre", async () => {
  await act(async () => {
    render(
      <OngletPiecesJustificatives
        requete={mappingRequeteCreation(requeteCreation)}
      />
    );
  });

  const boutonModifierLibelle = screen.getAllByTitle(
    "Modifier le libellé"
  )[1] as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonModifierLibelle).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonModifierLibelle);
  });

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputModificationLibelle, {
      target: {
        value: "test libelle"
      }
    });
    fireEvent.keyDown(inputModificationLibelle, {
      key: "Escape",
      code: "Escape",
      charCode: 27
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Titre de séjour postulant")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
