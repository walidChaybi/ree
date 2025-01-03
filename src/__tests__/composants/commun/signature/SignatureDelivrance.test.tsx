import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { DOCUMENT_DELIVRANCE } from "@mock/data/NomenclatureDocumentDelivrance";
import { IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRegistre } from "@model/etatcivil/acte/IRegistre";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention } from "@model/etatcivil/enum/NatureMention";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import request from "superagent";
import { afterAll, describe, expect, test } from "vitest";
import SignatureDelivrance from "../../../../composants/commun/signature/SignatureDelivrance";
import { CODES_ERREUR_BLOQUANTS, CODE_PIN_INVALIDE, IDocumentASigner } from "../../../../utils/Signature";

describe("Test du composant Signature délivrance", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

  const listenerSignature = (valeurRetour: any) => {
    const retourSignature = (() => {
      dispatchEvent(new CustomEvent("signWebextResponse", { detail: valeurRetour }));
    }) as EventListener;

    window.top?.addEventListener("signWebextCall", retourSignature);

    return () => window.top?.removeEventListener("signWebextCall", retourSignature);
  };

  const TITRE_BOUTON = "Titre bouton";
  const TITRE_MODALE = "Titre modale";

  const APPEL_RECUPERER = "rece-requete-api/v2/documentsreponses/a-signer";
  const APPEL_ENREGISTRER_REQUETE = "rece-requete-api/v2/documentsreponses/signature-par-lot";
  const APPEL_ENREGISTRER_TELEVERIFICATION = "rece-televerification-api/v1/televerifications/generer";
  const NUM_SANS_DOC = "numeroSansDoc";
  const NUM_AVEC_DOC = "numeroAvecDoc";
  const DOC_A_SIGNER: IDocumentASigner = {
    id: "idDocument",
    idRequete: "idRequete",
    numeroFonctionnel: "numFonc",
    contenu: "contenu"
  };
  const DOC_A_SIGNER_BIS: IDocumentASigner = {
    id: "idDocument2",
    idRequete: "idRequete",
    numeroFonctionnel: "numFonc",
    contenu: "contenu2"
  };
  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: `http://localhost/rece/(${APPEL_RECUPERER}|${APPEL_ENREGISTRER_REQUETE}|${APPEL_ENREGISTRER_TELEVERIFICATION})`,
      fixtures: function (match: any, data: any) {
        if (match[1] === APPEL_RECUPERER) {
          return data[0] === NUM_SANS_DOC ? { data: [] } : { data: [DOC_A_SIGNER, ...(data.length === 2 ? [DOC_A_SIGNER_BIS] : [])] };
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

  const renderComposant = (
    numerosFonctionnel: string[] = [],
    avecDroit: boolean = true,
    paramsMention?: { acte?: IFicheActe; documents: IDocumentReponse[] }
  ) =>
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
          {...(paramsMention ? { donneesAvertissementsMentions: paramsMention } : {})}
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

    await waitFor(() => expect(screen.getByText(TITRE_MODALE)).toBeDefined());

    fireEvent.click(screen.getByTitle("Annuler"));

    expect(screen.queryByText(TITRE_MODALE)).toBeNull();
  });

  test("Le pin est invalide", async () => {
    renderComposant([NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    await act(() => fireEvent.click(boutonSigner));

    const demonterListener = listenerSignature({ erreur: { code: CODE_PIN_INVALIDE } });

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
    await act(() => fireEvent.click(boutonSigner));

    const LIBELLE_BLOQUANT = "Libelle bloquant";
    const demonterListener = listenerSignature({ erreur: { code: CODES_ERREUR_BLOQUANTS[0], libelle: LIBELLE_BLOQUANT } });

    const champPin = screen.getByLabelText("Code pin");
    const boutonValider = screen.getByTitle("Valider");
    expect(champPin).toBeDefined();
    expect(boutonValider).toBeDefined();
    await act(async () => {
      await userEvent.type(champPin, "1234");
      fireEvent.click(boutonValider);
    });

    await waitFor(() => expect(screen.getByText("⚠ Impossible d'effectuer la signature :")).toBeDefined());
    expect(screen.getByText(LIBELLE_BLOQUANT)).toBeDefined();
    demonterListener();
  });

  test("Une erreur non bloquante sur tout les documents met en echec la signature", async () => {
    renderComposant([NUM_AVEC_DOC, NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    await act(() => fireEvent.click(boutonSigner));

    const LIBELLE_NON_BLOQUANT = "Libelle non bloquant";
    const demonterListener = listenerSignature({
      erreur: { code: "codeNonBloquant", libelle: LIBELLE_NON_BLOQUANT }
    });

    const champPin = screen.getByLabelText("Code pin");
    const boutonValider = screen.getByTitle("Valider");
    expect(champPin).toBeDefined();
    expect(boutonValider).toBeDefined();
    await act(() => userEvent.type(champPin, "1234"));
    await act(() => fireEvent.click(boutonValider));

    await waitFor(() => expect(() => screen.queryByText("Aucun document n'a pu être signé")).toBeDefined());
    demonterListener();
  });

  test("Une erreur non bloquante ne met pas en echec la signature", async () => {
    renderComposant([NUM_AVEC_DOC, NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    await act(() => fireEvent.click(boutonSigner));

    const LIBELLE_NON_BLOQUANT = "Libelle non bloquant";
    const demonterListener = listenerSignature({
      document: "contenuSigne",
      erreur: { code: "codeNonBloquant", libelle: LIBELLE_NON_BLOQUANT }
    });

    const champPin = screen.getByLabelText("Code pin");
    const boutonValider = screen.getByTitle("Valider");
    expect(champPin).toBeDefined();
    expect(boutonValider).toBeDefined();
    await act(() => userEvent.type(champPin, "1234"));
    await waitFor(() => fireEvent.click(boutonValider));

    await waitFor(() => expect(() => screen.queryByText("Signature des documents effectuée.")).toBeDefined());
    expect(screen.queryAllByText(LIBELLE_NON_BLOQUANT).length).toBe(2);
    demonterListener();

    await waitFor(() => expect(screen.getByTitle("Fermer")).toBeDefined());
    fireEvent.click(screen.getByTitle("Fermer"));
    await waitFor(() => expect(screen.queryByText(TITRE_MODALE)).toBeNull());
  });

  test("Un avertissement consernant les mentions s'affiche", async () => {
    const acte: IFicheActe = {
      id: "idActe",
      registre: { famille: "ACQ" } as IRegistre,
      nature: NatureActe.NAISSANCE,
      mentions: [
        {
          typeMention: { natureMention: { code: "4" } as INatureMention } as ITypeMention
        } as IMention
      ]
    } as IFicheActe;

    const NOM_DOC = "nom doc";
    const documentsReponse = [{ nom: NOM_DOC, typeDocument: "28580709-06dd-4df2-bf6e-70a9482940a1" } as IDocumentReponse];

    renderComposant([NUM_AVEC_DOC], true, { acte: acte, documents: documentsReponse });

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    await act(() => fireEvent.click(boutonSigner));

    const messageNationalite = `Aucune mention de nationalité n'a été cochée pour le document ${NOM_DOC}`;
    const messageInterdit = `Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter pour le document ${NOM_DOC}`;
    expect(screen.getByText(messageNationalite)).toBeDefined();
    expect(screen.getByText(messageInterdit)).toBeDefined();

    await act(() => fireEvent.click(screen.getByTitle("Non")));

    expect(screen.queryByText(TITRE_MODALE)).toBeNull();
  });
});
