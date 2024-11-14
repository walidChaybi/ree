import { acte } from "@mock/data/ficheEtBandeau/ficheActe";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IProvenanceRece } from "@model/requete/IProvenanceRece";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_EXTRAIT_PLURILINGUE } from "@model/requete/enum/DocumentDelivranceConstante";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import VoletDocumentDelivre from "../../../../../../composants/pages/requetesDelivrance/editionRequete/partieDocument/voletDocuments/VoletDocumentDelivre";
import {
  elementAvecContexte,
  elementAvecEditionDelivranceContexte,
} from "../../../../../__tests__utils__/testsUtil";

const documentsReponses = {
  id: "f63223ce-f425-441e-846c-114b0f36936d",
  nom: "test",
  typeDocument: DocumentDelivrance.getUuidFromCode(CODE_EXTRAIT_PLURILINGUE),
} as IDocumentReponse;

const mockRequete = {
  ...requeteDelivrance,
  id: "9bfa282d-1e66-4538-b242-b9de4f683f0f",
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE,
  statutCourant: { statut: StatutRequete.A_TRAITER },
  sousType: SousTypeDelivrance.RDC,
  documentsReponses: ["doc1, doc2"],
  provenanceRequete: {
    provenance: Provenance.SERVICE_PUBLIC,
    provenancePlanete: null,
    provenanceRece: {} as IProvenanceRece,
    provenanceServicePublic: {
      referenceDila: "MEL-8701",
    },
  },
} as unknown as IRequeteDelivrance;

describe("VoletDocumentDelivre", () => {
  test("Render correctement avec l'onglet actif de base à 'Document édité'", () => {
    render(
      elementAvecContexte(
        elementAvecEditionDelivranceContexte(
          <VoletDocumentDelivre
            documentDelivre={documentsReponses}
            resetOngletActif={false}
          />,
          mockRequete,
          {
            ...acte,
            id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
          },
        ),
      ),
    );
    expect(screen.getByText("Saisir l'extrait")).toBeDefined();
    expect(screen.getByText("Gérer les mentions")).toBeDefined();
    expect(screen.getByText("Document édité")).toBeDefined();
    expect(
      screen.queryByText("Document édité")?.classList.contains("disabled"),
    ).toBeDefined();
  });

  test("Reset l'onglet actif à 'Document édité' quand resetOngletActif est true", async () => {
    const { rerender } = render(
      elementAvecContexte(
        elementAvecEditionDelivranceContexte(
          <VoletDocumentDelivre
            documentDelivre={documentsReponses}
            resetOngletActif={false}
          />,
          mockRequete,
          {
            ...acte,
            id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
          },
        ),
      ),
    );

    rerender(
      elementAvecContexte(
        elementAvecEditionDelivranceContexte(
          <VoletDocumentDelivre
            documentDelivre={documentsReponses}
            resetOngletActif={true}
          />,
          mockRequete,
          {
            ...acte,
            id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
          },
        ),
      ),
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Document édité")?.classList.contains("disabled"),
      ).toBeDefined();
    });
  });
});
