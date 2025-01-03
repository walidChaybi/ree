import { TYPE_PIECE_JUSTIFICATIVE } from "@mock/data/NomenclatureTypePieceJustificative";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { NORESULT } from "@mock/superagent-config/superagent-mock-requetes";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { ApercuRequetePartieGauche } from "@pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/ApercuRequetePartieGauche";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
  TypePieceJustificative.init(TYPE_PIECE_JUSTIFICATIVE);
});

test.skip("render ApercuRequetePartieGauche", () => {
  render(
    <MemoryRouter>
      <ApercuRequetePartieGauche requete={requeteDelivrance} />
    </MemoryRouter>
  );

  const boutonNouvelleRMC: HTMLButtonElement = screen.getByLabelText("NouvelleRMCRequete");
  expect(boutonNouvelleRMC).toBeDefined();

  fireEvent.click(boutonNouvelleRMC);

  const popinNouvelleRMC = screen.getByRole("dialog", {
    hidden: true
  });
  const nomTitulaire: HTMLInputElement = screen.getByLabelText("titulaire.nom");

  const anneeNaissanceTitulaire: HTMLInputElement = screen.getByLabelText("titulaire.dateNaissance.annee");

  const boutonRechercher: HTMLButtonElement = screen.getByText("Rechercher");

  waitFor(() => {
    expect(popinNouvelleRMC).toBeDefined();
    expect(nomTitulaire).toBeDefined();
    expect(anneeNaissanceTitulaire).toBeDefined();
    expect(boutonRechercher).toBeDefined();
    expect(boutonRechercher.disabled).toBeTruthy();
  });

  fireEvent.change(nomTitulaire, {
    target: { value: NORESULT }
  });

  fireEvent.change(anneeNaissanceTitulaire, {
    target: { value: "2000" }
  });

  waitFor(() => {
    expect(nomTitulaire.value).toEqual(NORESULT);
    expect(anneeNaissanceTitulaire.value).toEqual("2000");
    expect(boutonRechercher.disabled).toBeFalsy();
  });

  fireEvent.click(boutonRechercher);

  waitFor(() => {
    expect(popinNouvelleRMC).not.toBeDefined();
    expect(screen.getByText("Aucune requête n'a été trouvée.")).toBeDefined();
  });
});
