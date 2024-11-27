import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import request from "superagent";
import { afterAll, describe, expect, test } from "vitest";
import SignatureDelivrance from "../../../../composants/commun/signature/SignatureDelivrance";
import { CODES_ERREUR_BLOQUANTS, CODE_PIN_INVALIDE, IDocumentASigner } from "../../../../utils/Signature";

describe("Test du composant Signature délivrance", () => {
  const listenerSignature = (valeurRetour: any) => {
    let nombreRetour = 0;
    const retourSignature = (() => {
      dispatchEvent(new CustomEvent("signWebextResponse", { detail: { ...valeurRetour, id: `${valeurRetour.id}${nombreRetour}` } }));
      nombreRetour++;
    }) as EventListener;

    window.top?.addEventListener("signWebextCall", retourSignature);

    return () => window.top?.removeEventListener("signWebextCall", retourSignature);
  };

  const TITRE_BOUTON = "Titre bouton";
  const TITRE_MODALE = "Titre modale";

  const APPEL_RECUPERER = "rece-requete-api/v2/documentsreponses/a-signer";
  const APPEL_ENREGISTRER_REQUETE = "rece-requete-api/v2/documentsreponses/signature-par-lot";
  const APPEL_ENREGISTRER_TELEVERIFICATION = "rece-televerification-api/v1/televerification/generer";
  const NUM_SANS_DOC = "numeroSansDoc";
  const NUM_AVEC_DOC = "numeroAvecDoc";
  const DOC_A_SIGNER: IDocumentASigner = {
    id: "idDocument",
    idRequete: "idRequete",
    numeroFonctionnel: "numFonc",
    contenu: "contenu"
  };
  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: `http://localhost/rece/(${APPEL_RECUPERER}|${APPEL_ENREGISTRER_REQUETE}|${APPEL_ENREGISTRER_TELEVERIFICATION})`,
      fixtures: function (match: any, data: any) {
        if (match[1] === APPEL_RECUPERER) {
          return data[0] === NUM_SANS_DOC ? { data: [] } : { data: Array.from({ length: data.length }).map(() => ({ ...DOC_A_SIGNER })) };
        }
        if (match[1] === APPEL_ENREGISTRER_REQUETE) {
          return true;
        }
        if (match[1] === APPEL_ENREGISTRER_TELEVERIFICATION) {
          return true;
        }
      },
      post: function (_: any, data: any) {
        return {
          body: data
        };
      },
      patch: function (_: any, data: any) {
        return {
          body: data
        };
      }
    }
  ]);

  afterAll(() => superagentMock.unset());

  const renderComposant = (numerosFonctionnel: string[] = [], avecDroit: boolean = true) =>
    render(
      <MockRECEContextProvider
        utilisateurConnecte={
          {
            habilitations: avecDroit
              ? [
                  {
                    ...({} as IHabilitation),
                    profil: { ...({} as IProfil), droits: [{ idDroit: "id", nom: Droit.SIGNER_DELIVRANCE_DEMAT }] }
                  }
                ]
              : []
          } as unknown as IOfficier
        }
      >
        <SignatureDelivrance
          titreBouton={TITRE_BOUTON}
          titreModale={TITRE_MODALE}
          numerosFonctionnel={numerosFonctionnel}
        />
      </MockRECEContextProvider>
    );

  test("Le bouton ne s'active pas si aucun numéro fonctionnel", () => {
    renderComposant([], false);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);

    expect(boutonSigner.disabled).toBeTruthy();
  });

  test("Le bouton ne s'active pas si aucun document réponse à signer", () => {
    renderComposant([NUM_SANS_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);

    expect(boutonSigner.disabled).toBeTruthy();
  });

  test("Le bouton s'actve si un document réponse à signer, puis abandon", async () => {
    renderComposant([NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    fireEvent.click(boutonSigner);

    expect(screen.getByText(TITRE_MODALE)).toBeDefined();

    fireEvent.click(screen.getByTitle("Annuler"));

    expect(screen.queryByText(TITRE_MODALE)).toBeNull();
  });

  test("Le pin est invalide", async () => {
    renderComposant([NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    fireEvent.click(boutonSigner);

    const demonterListener = listenerSignature({ ...DOC_A_SIGNER, erreur: { code: CODE_PIN_INVALIDE } });

    const champPin = screen.getByLabelText("Code pin");
    const boutonValider = screen.getByTitle("Valider");
    expect(champPin).toBeDefined();
    expect(boutonValider).toBeDefined();
    await act(async () => {
      await userEvent.type(champPin, "1234");
      fireEvent.click(boutonValider);
    });

    await waitFor(() => expect(screen.getByText("Le code pin est incorrect")).toBeDefined());
    demonterListener();
  });

  test("Une erreur bloquante met en echec la signature", async () => {
    renderComposant([NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    fireEvent.click(boutonSigner);

    const LIBELLE_BLOQUANT = "Libelle bloquant";
    const demonterListener = listenerSignature({ ...DOC_A_SIGNER, erreur: { code: CODES_ERREUR_BLOQUANTS[0], libelle: LIBELLE_BLOQUANT } });

    const champPin = screen.getByLabelText("Code pin");
    const boutonValider = screen.getByTitle("Valider");
    expect(champPin).toBeDefined();
    expect(boutonValider).toBeDefined();
    await act(async () => {
      await userEvent.type(champPin, "1234");
      fireEvent.click(boutonValider);
    });

    await waitFor(() => expect(screen.getByText("Impossible d'effectuer la signature :")).toBeDefined());
    expect(screen.getByText(LIBELLE_BLOQUANT)).toBeDefined();
    demonterListener();
  });

  test("Une erreur non bloquante ne met pas en echec la signature", async () => {
    renderComposant([NUM_AVEC_DOC, NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    fireEvent.click(boutonSigner);

    const LIBELLE_NON_BLOQUANT = "Libelle non bloquant";
    const demonterListener = listenerSignature({ ...DOC_A_SIGNER, erreur: { code: "codeNonBloquant", libelle: LIBELLE_NON_BLOQUANT } });

    const champPin = screen.getByLabelText("Code pin");
    const boutonValider = screen.getByTitle("Valider");
    expect(champPin).toBeDefined();
    expect(boutonValider).toBeDefined();
    await act(() => userEvent.type(champPin, "1234"));
    await waitFor(() => fireEvent.click(boutonValider));

    await waitFor(() => expect(screen.getByText("Signature des documents effectuée.")).toBeDefined());
    expect(screen.queryAllByText(LIBELLE_NON_BLOQUANT).length).toBe(2);
    demonterListener();

    fireEvent.click(screen.getByTitle("Fermer"));
    await waitFor(() => expect(screen.queryByText(TITRE_MODALE)).toBeNull());
  });
});
