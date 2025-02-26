import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { IProvenanceRece } from "@model/requete/IProvenanceRece";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { describe, expect, test } from "vitest";
import VoletDocumentDelivre from "../../../../../../composants/pages/requetesDelivrance/editionRequete/partieDocument/voletDocuments/VoletDocumentDelivre";
import { elementAvecContexte, elementAvecEditionDelivranceContexte } from "../../../../../__tests__utils__/testsUtil";
import { DOCUMENT_DELIVRANCE } from "../../../../../mock/data/NomenclatureDocumentDelivrance";
import { NATURE_MENTION } from "../../../../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../../../../mock/data/NomenclatureTypeMention";
import { acte, acteNaissance } from "../../../../../mock/data/ficheEtBandeau/ficheActe";
import { userDroitDelivrer } from "../../../../../mock/data/mockConnectedUserAvecDroit";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";

describe("VoletDocumentDelivre", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  const documentReponse = {
    id: "f63223ce-f425-441e-846c-114b0f36936d",
    nom: "test",
    typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE),
    idActe: acteNaissance.id
  } as IDocumentReponse;

  const mockRequete = {
    ...requeteDelivrance,
    id: "9bfa282d-1e66-4538-b242-b9de4f683f0f",
    choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE,
    statutCourant: { statut: StatutRequete.A_TRAITER },
    sousType: SousTypeDelivrance.RDC,
    documentReponse: ["doc1, doc2"],
    provenanceRequete: {
      provenance: Provenance.SERVICE_PUBLIC,
      provenancePlanete: null,
      provenanceRece: {} as IProvenanceRece,
      provenanceServicePublic: {
        referenceDila: "MEL-8701"
      }
    }
  } as unknown as IRequeteDelivrance;

  test("Render correctement avec l'onglet actif de base à 'Document édité'", async () => {
    render(
      elementAvecContexte(
        elementAvecEditionDelivranceContexte(
          <VoletDocumentDelivre
            documentDelivre={{
              ...documentReponse,
              typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION),
              contenu: "Coucou"
            }}
            resetOngletActif={false}
          />,
          mockRequete,
          {
            ...acte,
            id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
            nature: NatureActe.NAISSANCE,
            mentions: []
          }
        )
      )
    );
    await waitFor(() => {
      expect(screen.getByText("Saisir l'extrait")).toBeDefined();
      expect(screen.getByText("Gérer les mentions")).toBeDefined();
      expect(screen.getByText("Modifier le corps de l'extrait")).toBeDefined();
      expect(screen.getByText("Document édité")).toBeDefined();
      expect(screen.queryByText("Document édité")?.classList.contains("disabled")).toBe(false);
    });
  });

  test("Reset l'onglet actif à 'Document édité' quand resetOngletActif est true", async () => {
    const { rerender } = render(
      elementAvecContexte(
        elementAvecEditionDelivranceContexte(
          <VoletDocumentDelivre
            documentDelivre={{
              ...documentReponse,
              typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE)
            }}
            resetOngletActif={false}
          />,
          mockRequete,
          {
            ...acte,
            id: "19c0d767-64e5-4376-aa1f-6d781a2a235a"
          }
        )
      )
    );

    rerender(
      elementAvecContexte(
        elementAvecEditionDelivranceContexte(
          <VoletDocumentDelivre
            documentDelivre={{
              ...documentReponse,
              typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_COPIE_INTEGRALE)
            }}
            resetOngletActif={true}
          />,
          mockRequete,
          {
            ...acte,
            id: "19c0d767-64e5-4376-aa1f-6d781a2a235a"
          }
        )
      )
    );

    await waitFor(() => {
      expect(screen.queryByText("Document édité")?.classList.contains("disabled")).toBe(false);
    });
  });

  // TOREFACTOR : Test de composants legacy, à supprimer in fine
  test("Reset l'onglet actif à 'Document édité' quand modification de mention validée", async () => {
    render(
      elementAvecContexte(
        elementAvecEditionDelivranceContexte(
          <VoletDocumentDelivre
            documentDelivre={documentReponse}
            resetOngletActif={false}
          />,
          mockRequete,
          {
            ...acte,
            id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
            nature: NatureActe.NAISSANCE
          }
        ),
        userDroitDelivrer
      )
    );

    await waitFor(() => {
      expect(screen.getByText("Gérer les mentions")).toBeDefined();
    });
    fireEvent.click(screen.getByText("Gérer les mentions"));

    await waitFor(() => {
      expect(screen.getByLabelText("Nature ajoutée")).toBeDefined();
    });

    const ID_MENTION_NATIONALITE = "b03c848a-af74-483b-ace9-aec7f7ea3c1b";
    fireEvent.change(screen.getByDisplayValue("Nature ajoutée"), { target: { value: ID_MENTION_NATIONALITE } });
    await userEvent.type(screen.getByPlaceholderText("Texte mention à ajouter"), "Texte test");

    fireEvent.click(screen.getByTitle("Ajouter la mention"));
    await act(async () => fireEvent.click(screen.getByTitle("Valider mentions modifiées")));

    await waitFor(() => {
      expect(screen.queryByText("Document édité")?.classList.contains("disabled")).toBe(false);
    });
  });
});
