import { Orientation } from "@model/composition/enum/Orientation";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { validerMentionsPlusieursDocuments } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { createEvent, fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { BoutonSignature } from "../../../../../composants/commun/bouton/boutonsAvecAction/BoutonSignature";
import { DOCUMENT_DELIVRANCE } from "../../../../mock/data/NomenclatureDocumentDelivrance";
import { acte } from "../../../../mock/data/ficheEtBandeau/ficheActe";

describe("Test BoutonSignature", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

  const requete: IRequeteTableauDelivrance = {
    idRequete: "id1",
    statut: StatutRequete.A_SIGNER.libelle,
    documentsReponses: [
      {},
      {
        id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
        nom: "aaa",
        typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
        taille: 100,
        avecCtv: true,
        conteneurSwift: "chemin",
        mimeType: "application/pdf",
        nbPages: 1,
        orientation: Orientation.PORTRAIT,
        idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
        contenu: ""
      }
    ],
    sousType: "Délivrance E/C (d)"
  } as IRequeteTableauDelivrance;

  const requete2: IRequeteTableauDelivrance = {
    idRequete: "id1",
    statut: StatutRequete.A_SIGNER.libelle,
    documentsReponses: [
      {},
      {
        id: "f9279c00-5d2b-11ea-bc55-0242ac130004",
        nom: "aaa",
        typeDocument: "0e1e909f-f74c-4b16-9c03-b3733354c6ce",
        taille: 100,
        avecCtv: true,
        conteneurSwift: "chemin",
        mimeType: "application/pdf",
        nbPages: 1,
        orientation: Orientation.PORTRAIT,
        idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f",
        contenu: ""
      }
    ],
    sousType: "Délivrance E/C (d)"
  } as IRequeteTableauDelivrance;

  test("renders titre bouton signature par lot", () => {
    render(
      <BoutonSignature
        libelle={"Signer le lot"}
        requeteASignerProp={[{ requete: requete }, { requete: requete2 }]}
        reloadData={() => {
          return null;
        }}
        checkDirtyActive={false}
        validerMentionsPlusieursDocuments={validerMentionsPlusieursDocuments}
      />
    );

    const linkElement = screen.getByText(/Signer le lot/i);
    waitFor(() => {
      expect(linkElement).toBeDefined();
    });

    fireEvent.click(linkElement);

    waitFor(() => {
      expect(screen.getByText(/Signature des documents/i)).toBeDefined();
    });
  });

  test("appelle handleClickSignature lors du clic si la signature est possible", async () => {
    const mockValiderMentions = vi.fn();
    render(
      <BoutonSignature
        libelle={"Signer"}
        requeteASignerProp={[{ requete: requete, acte: acte }]}
        reloadData={() => {
          return null;
        }}
        checkDirtyActive={false}
        validerMentionsPlusieursDocuments={mockValiderMentions}
      />
    );
    const linkElement = screen.getByText(/Signer/i);
    expect(linkElement).toBeDefined();

    fireEvent.click(linkElement);
    await waitFor(() => {
      expect(mockValiderMentions).toHaveBeenCalled();
    });
  });

  test("renders titre bouton signature", () => {
    render(
      <BoutonSignature
        libelle={"Signer"}
        requeteASignerProp={[{ requete: requete, acte: acte }]}
        reloadData={() => {
          return null;
        }}
        checkDirtyActive={false}
        validerMentionsPlusieursDocuments={validerMentionsPlusieursDocuments}
      />
    );
    const linkElement = screen.getByText(/Signer/i);
    expect(linkElement).toBeDefined();

    fireEvent.click(linkElement);

    expect(screen.getByText(/Signature des documents/i)).toBeDefined();

    const pinCodeInput = document.getElementById("codePin");
    fireEvent.change(pinCodeInput!, {
      target: { value: "1234" }
    });

    expect(screen.getByText(/Valider/i)).toBeDefined();
    fireEvent.click(screen.getByText(/Valider/i));

    fireEvent(
      window,
      ////@ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            erreurs: []
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    waitFor(() => {
      expect(screen.getByText(/Valider/i)).toBeDefined();
    });
  });

  test("renders titre bouton signature par lot", async () => {
    render(
      <BoutonSignature
        libelle={"Signer le lot"}
        requeteASignerProp={[{ requete: requete }, { requete: requete2 }]}
        reloadData={() => {
          return null;
        }}
        checkDirtyActive={false}
        validerMentionsPlusieursDocuments={validerMentionsPlusieursDocuments}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Signer le lot")).toBeDefined();
    });
  });

  test("le bouton est désactivé si la signature n'est pas possible", async () => {
    render(
      <BoutonSignature
        libelle="Signer"
        requeteASignerProp={[{ requete: { ...requete, statut: "AUTRE_STATUT" } }]}
        reloadData={() => null}
        checkDirtyActive={false}
        validerMentionsPlusieursDocuments={validerMentionsPlusieursDocuments}
      />
    );

    await waitFor(() => {
      const button: HTMLButtonElement = screen.getByText(/Signer/i);
      expect(button.disabled).toBeTruthy();
    });
  });
});
