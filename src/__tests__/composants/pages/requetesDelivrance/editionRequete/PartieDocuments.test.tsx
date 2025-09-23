import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IProvenanceRece } from "@model/requete/IProvenanceRece";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PartieDocuments from "../../../../../composants/pages/requetesDelivrance/editionRequete/partieDocument/PartieDocuments";
import { elementAvecEditionDelivranceContexte } from "../../../../__tests__utils__/testsUtil";
import { DOCUMENT_DELIVRANCE } from "../../../../mock/data/NomenclatureDocumentDelivrance";
import requeteDelivrance from "../../../../mock/data/requeteDelivrance";

describe("Partie Documents", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

  const idRequete = "9d00fe88-9d21-482e-bb02-223636f78386";

  const mockedUseNavigate = vi.fn();
  vi.mock("react-router", async () => {
    const mod = await vi.importActual<typeof import("react-router")>("react-router");
    return {
      ...mod,
      useNavigate: () => mockedUseNavigate
    };
  });

  const documentsReponses1 = {
    id: "f63223ce-f425-441e-846c-114b0f36936d",
    nom: "documentReponse1",
    typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE)
  } as IDocumentReponse;

  const documentsReponses2 = {
    id: "f63223ce-f425-441e-846c-114b0f36936d",
    nom: "documentReponse2",
    typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE)
  } as IDocumentReponse;

  const mockRequete = {
    ...requeteDelivrance,
    id: idRequete,
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE,
    statutCourant: { statut: StatutRequete.A_TRAITER },
    sousType: SousTypeDelivrance.RDC,
    documentsReponses: [documentsReponses1, documentsReponses2],
    provenanceRequete: {
      provenance: Provenance.SERVICE_PUBLIC,
      provenancePlanete: null,
      provenanceRece: {} as IProvenanceRece,
      provenanceServicePublic: {
        referenceDila: "MEL-8701"
      }
    }
  } as unknown as IRequeteDelivrance;

  test("La page s'affiche correctement avec l'onglet 'Courrier'", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
        {elementAvecEditionDelivranceContexte(
          <PartieDocuments
            ongletActif={""}
            setOngletActif={() => {}}
          />
        )}
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Réinitialiser")).toBeDefined();
      expect(screen.getByText("Valider")).toBeDefined();
      expect(screen.getAllByText("Courrier")).toBeDefined();
    });
  });

  test("La page affiche les onglets principaux et secondaires correctements'", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().generer()}>
        {elementAvecEditionDelivranceContexte(
          <PartieDocuments
            ongletActif={""}
            setOngletActif={() => {}}
          />,
          mockRequete
        )}
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("documentReponse1")).toBeDefined();
      expect(screen.getByText("documentReponse2")).toBeDefined();
    });
  });
});
