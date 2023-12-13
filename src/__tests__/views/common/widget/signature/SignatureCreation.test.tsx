import * as EtatCivilApi from "@api/appels/etatcivilApi";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { SignatureCreation } from "@widget/signature/SignatureCreation";

describe("Doit afficher la popin de signature lors de la création d'un acte", () => {
  test("DOIT afficher la popin de signature basique", async () => {
    render(<SignatureCreation estOuvert={true} setEstOuvert={() => {}} />);

    await waitFor(() => {
      expect(
        screen.getAllByRole("presentation")[0].getAttribute("class")
      ).toContain("popin-signature");
    });
  });

  test("DOIT afficher le titre de la popin de signature de création", async () => {
    render(<SignatureCreation estOuvert={true} setEstOuvert={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText("Signature du document")).toBeInTheDocument();
    });
  });

  test("DOIT afficher le texte indicatif de la popin de signature de création", async () => {
    render(<SignatureCreation estOuvert={true} setEstOuvert={() => {}} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "En cliquant sur VALIDER, vous acceptez de signer électroniquement un document qui comportera les données suivantes insérées automatiquement : un numéro d’ordre, constitutif " +
            "de la référence de l’acte dans le RECE, informatiquement attribué selon une numérotation chronologique annuelle ; la formule de désignation de l’officier de l’état civil, " +
            "comprenant ses nom et prénom usuel contenus dans le dispositif de création de signature qualifiée, ses fonctions, et le nom de la ville où il exerce ; la date de signature."
        )
      ).toBeInTheDocument();
    });
  });
});

describe("Doit signer le document QUAND on valide le code pin.", () => {
  test("DOIT composer le document final en lui envoyant les informations 'issuerCertificat' et 'nomDansCertificat' de la carte", async () => {
    const composerDocumentFinalSpy = jest.spyOn(
      EtatCivilApi,
      "composerDocumentFinal"
    );
    render(
      <SignatureCreation
        idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
        estOuvert={true}
        setEstOuvert={() => {}}
      />
    );

    // Simulation d'une signature réussie.
    fireEvent(
      window,
      // @ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            document: "",
            erreur: null,
            infosSignature: {
              issuerCertificat: "issuerCertificat",
              nomDansCertificat: "nomDansCertificat",
              autresInformation: "autresInformation"
            }
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    await waitFor(() => {
      expect(composerDocumentFinalSpy).toHaveBeenCalledWith(
        "d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca",
        "issuerCertificat",
        "nomDansCertificat"
      );
    });

    composerDocumentFinalSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'nomDansCertificat' de la carte est manquant", async () => {
    const composerDocumentFinalSpy = jest.spyOn(
      EtatCivilApi,
      "composerDocumentFinal"
    );
    render(
      <SignatureCreation
        idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
        estOuvert={true}
        setEstOuvert={() => {}}
      />
    );

    // Simulation d'une signature réussie.
    fireEvent(
      window,
      // @ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            document: "",
            erreur: null,
            infosSignature: {
              issuerCertificat: "issuerCertificat",
              autresInformation: "autresInformation"
            }
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    await waitFor(() => {
      expect(composerDocumentFinalSpy).not.toHaveBeenCalled();
    });
    composerDocumentFinalSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'issuerCertificat' de la carte est manquant", async () => {
    const composerDocumentFinalSpy = jest.spyOn(
      EtatCivilApi,
      "composerDocumentFinal"
    );
    render(
      <SignatureCreation
        idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
        estOuvert={true}
        setEstOuvert={() => {}}
      />
    );

    // Simulation d'une signature réussie.
    fireEvent(
      window,
      // @ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            document: "",
            erreur: null,
            infosSignature: {
              nomDansCertificat: "nomDansCertificat",
              autresInformation: "autresInformation"
            }
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    await waitFor(() => {
      expect(composerDocumentFinalSpy).not.toHaveBeenCalled();
    });
    composerDocumentFinalSpy.mockClear();
  });
});
