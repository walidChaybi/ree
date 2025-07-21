import { CONFIG_POST_LOGS } from "@api/configurations/outilTech/PostLogsConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
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
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { ConteneurParentModales } from "../../../../composants/commun/conteneurs/modale/ConteneurModale";
import SignatureDelivrance from "../../../../composants/commun/signature/SignatureDelivrance";
import { CODES_ERREUR_BLOQUANTS, CODE_PIN_INVALIDE, IDocumentASigner } from "../../../../utils/Signature";
import MockRECEContextProvider from "../../../mock/context/MockRECEContextProvider";
import { DOCUMENT_DELIVRANCE } from "../../../mock/data/NomenclatureDocumentDelivrance";

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
  const APPEL_DONNEES_TELEVERIFICATION = "rece-etatcivil-api/v1/acte/donnees-pour-televerification";
  const NUM_SANS_DOC = "numeroSansDoc";
  const NUM_AVEC_DOC = "numeroAvecDoc";
  const DOC_A_SIGNER: IDocumentASigner = {
    id: "idDocument",
    idRequete: "idRequete",
    idActe: "idActe1",
    numeroFonctionnel: "numFonc",
    contenu: "contenu"
  };
  const DOC_A_SIGNER_BIS: IDocumentASigner = {
    id: "idDocument2",
    idRequete: "idRequete",
    idActe: "idActe2",
    numeroFonctionnel: "numFonc",
    contenu: "contenu2"
  };
  const superagentMock = require("superagent-mock")(request, [
    {
      pattern: `http://localhost/rece/(${APPEL_RECUPERER}|${APPEL_ENREGISTRER_REQUETE}|${APPEL_ENREGISTRER_TELEVERIFICATION}|${APPEL_DONNEES_TELEVERIFICATION})`,
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
        if (match[1] === APPEL_DONNEES_TELEVERIFICATION) {
          return [
            { idActe: "idActe1", nomTitulaire1: "nom", natureActe: "natureActe", anneeEvenement: 2020 },
            { idActe: "idActe2", nomTitulaire1: "nom2", natureActe: "natureActe2", anneeEvenement: 2020 }
          ];
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

  beforeAll(() => {
    MockApi.deployer(CONFIG_POST_LOGS);
  });

  afterEach(() => MockApi.getMock().resetHistory());

  afterAll(() => {
    superagentMock.unset();
    MockApi.stopMock();
  });

  const renderComposant = (
    numerosFonctionnel: string[] = [],
    avecDroit: boolean = true,
    paramsMention?: { acte?: IFicheActe; documents: IDocumentReponse[] }
  ) =>
    render(
      <MockRECEContextProvider
        utilisateurConnecte={
          avecDroit
            ? MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_DELIVRANCE_DEMAT).generer()
            : MockUtilisateurBuilder.utilisateurConnecte().generer()
        }
      >
        <SignatureDelivrance
          titreBouton={TITRE_BOUTON}
          titreModale={TITRE_MODALE}
          numerosFonctionnel={numerosFonctionnel}
          {...(paramsMention ? { donneesAvertissementsMentions: paramsMention } : {})}
        />
        <ConteneurParentModales />
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

    await waitFor(() => expect(screen.queryByText(TITRE_MODALE)).toBeNull());
  });

  test("Le pin est invalide", async () => {
    renderComposant([NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    await act(async () => fireEvent.click(boutonSigner));

    const demonterListener = listenerSignature({ erreur: { code: CODE_PIN_INVALIDE } });

    const boutonValider = screen.getByTitle("Valider");
    expect(boutonValider).toBeDefined();
    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    fireEvent.click(boutonValider);

    await waitFor(() => expect(screen.getByText("Le code pin est incorrect")).toBeDefined());

    // Teste l'appel au serveur de log outiltech-api
    expect(MockApi.getMock().history.post.length).toStrictEqual(1);

    demonterListener();
  });

  test("Une erreur bloquante met en echec la signature", async () => {
    renderComposant([NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    await act(async () => fireEvent.click(boutonSigner));

    const LIBELLE_BLOQUANT = "Libelle bloquant";
    const demonterListener = listenerSignature({ erreur: { code: CODES_ERREUR_BLOQUANTS[0], libelle: LIBELLE_BLOQUANT } });

    const boutonValider = screen.getByTitle("Valider");
    expect(boutonValider).toBeDefined();
    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    fireEvent.click(boutonValider);

    await waitFor(() => {
      expect(screen.getByText("⚠ Impossible d'effectuer la signature :")).toBeDefined();
      expect(screen.getByText(LIBELLE_BLOQUANT)).toBeDefined();
    });

    // Teste l'appel au serveur de log outiltech-api
    expect(MockApi.getMock().history.post.length).toStrictEqual(1);

    demonterListener();
  });

  test("Une erreur non bloquante sur tous les documents met en echec la signature", async () => {
    renderComposant([NUM_AVEC_DOC, NUM_AVEC_DOC]);

    const boutonSigner: HTMLButtonElement = screen.getByTitle(TITRE_BOUTON);
    await waitFor(() => expect(boutonSigner.disabled).toBeFalsy());
    await act(async () => fireEvent.click(boutonSigner));

    const LIBELLE_NON_BLOQUANT = "Libelle non bloquant";
    const demonterListener = listenerSignature({
      erreur: { code: "codeNonBloquant", libelle: LIBELLE_NON_BLOQUANT }
    });

    const boutonValider = screen.getByTitle("Valider");
    expect(boutonValider).toBeDefined();
    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    fireEvent.click(boutonValider);

    await waitFor(() => expect(() => screen.queryByText("Aucun document n'a pu être signé")).toBeDefined());

    // Teste l'appel au serveur de log outiltech-api
    expect(MockApi.getMock().history.post.length).toStrictEqual(2);

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

    const boutonValider = screen.getByTitle("Valider");
    expect(boutonValider).toBeDefined();
    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    fireEvent.click(boutonValider);

    await waitFor(() => expect(() => screen.queryByText("Signature des documents effectuée.")).toBeDefined());
    expect(screen.queryAllByText(LIBELLE_NON_BLOQUANT).length).toBe(2);
    demonterListener();

    await waitFor(() => expect(screen.getByTitle("Fermer")).toBeDefined());
    fireEvent.click(screen.getByTitle("Fermer"));
    await waitFor(() => expect(screen.queryByText(TITRE_MODALE)).toBeNull());

    // Teste un appel au serveur de log outiltech-api
    expect(MockApi.getMock().history.post.length).toStrictEqual(2);
  });

  test("Un avertissement concernant les mentions s'affiche", async () => {
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
    fireEvent.click(boutonSigner);

    const messageNationalite = `Aucune mention de nationalité n'a été cochée pour le document ${NOM_DOC}`;
    const messageInterdit = `Vous allez délivrer un extrait avec une mention à intégrer ou à ne pas reporter pour le document ${NOM_DOC}`;
    await waitFor(() => {
      expect(screen.getByText(messageNationalite)).toBeDefined();
      expect(screen.getByText(messageInterdit)).toBeDefined();
    });

    fireEvent.click(screen.getByTitle("Non"));
    await waitFor(() => expect(screen.queryByText(TITRE_MODALE)).toBeNull());
  });
});
