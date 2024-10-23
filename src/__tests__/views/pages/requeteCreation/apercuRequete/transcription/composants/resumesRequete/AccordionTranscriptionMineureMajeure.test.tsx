import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IStatutCourant } from "@model/requete/IStatutCourant";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { ResumeRequeteCreationTranscriptionNaissanceMineureMajeure } from "@pages/requeteCreation/apercuRequete/transcription/composants/ResumeReqCreationTranscriptionNaissanceMineureMajeure";
import { AccordionTranscriptionMineureMajeure } from "@pages/requeteCreation/apercuRequete/transcription/composants/resumesRequete/AccordionTranscriptionMineureMajeure";
import { act, render, screen } from "@testing-library/react";
import DateUtils from "@util/DateUtils";
import { describe, expect, test } from "vitest";

const dateCreation = DateUtils.formatDateStringIso("1999-02-21");
const numeroTeledossier = "B-2-8GRZFCS3P";
const sousType = SousTypeCreation.getEnumFor("RCTC");
const natureActe = NatureActeTranscription.getEnumFor("NAISSANCE_MAJEURE");
const statutCourant = {
  statut: StatutRequete.getEnumFor("PRISE_EN_CHARGE"),
  dateEffet: 444444
} as IStatutCourant;
const provenanceRequete = Provenance.getEnumFor("SERVICE_PUBLIC");
const numeroFonctionnel = "numeroFonctionnel";

describe.skip("Test du composant accordion mineure majeure", () => {
  test("DOIT rendre le composant ResumeRequeteCreationTranscriptionNaissanceMineureMajeure", async () => {
    await act(async () => {
      render(
        <ResumeRequeteCreationTranscriptionNaissanceMineureMajeure
          requete={{} as IRequeteCreation}
        />
      );
    });
  });
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
    // TO FIX
    // expect(accordion).toHaveAttribute("aria-expanded", "false");
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
