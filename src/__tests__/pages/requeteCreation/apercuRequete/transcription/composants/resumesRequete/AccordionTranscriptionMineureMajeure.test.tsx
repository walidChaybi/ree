import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IStatutCourant } from "@model/requete/IStatutCourant";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { AccordionTranscriptionMineureMajeure } from "@pages/requeteCreation/apercuRequete/transcription/composants/resumesRequete/AccordionTranscriptionMineureMajeure";
import { act, render, screen } from "@testing-library/react";
import { formatDateStringIso } from "@util/DateUtils";
import React from "react";

const dateCreation = formatDateStringIso("1999-02-21");
const numeroTeledossier = "numeroTeledossier";
const sousType = SousTypeCreation.getEnumFor("RCTC");
const natureActe = NatureActeTranscription.getEnumFor("NAISSANCE_MAJEURE");
const statutCourant = {
  statut: StatutRequete.getEnumFor("PRISE_EN_CHARGE"),
  dateEffet: 444444
} as IStatutCourant;
const provenanceRequete = Provenance.getEnumFor("SERVICE_PUBLIC");
const numeroFonctionnel = "numeroFonctionnel";

describe("Test du composant accordion mineure majeure", () => {
  test("DOIT rendre l'accordion fermé à l'arrivée sur la page", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionMineureMajeure
          sousType={sousType}
          dateCreation={dateCreation}
          natureActe={natureActe}
        />
      );
    });

    const accordion = screen.getByRole("button");
    expect(accordion).toHaveAttribute("aria-expanded", "false");
  });

  test("DOIT afficher les données dans l'accordion", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionMineureMajeure
          numeroTeledossier={numeroTeledossier}
          sousType={sousType}
          dateCreation={dateCreation}
          natureActe={natureActe}
          provenanceRequete={provenanceRequete}
          statutCourant={statutCourant}
          numeroFonctionnel={numeroFonctionnel}
        />
      );
    });

    expect(
      screen.getByText(`Transcription ${natureActe.libelle}`)
    ).toBeDefined();

    expect(screen.getByText(numeroTeledossier)).toBeDefined();
    expect(screen.getByText(sousType.libelle)).toBeDefined();
    expect(screen.getByText(statutCourant.statut.libelle)).toBeDefined();
    expect(screen.getByText(provenanceRequete.libelle)).toBeDefined();
    expect(screen.getByText(dateCreation)).toBeDefined();
    expect(screen.getByText(numeroFonctionnel)).toBeDefined();
  });
});
