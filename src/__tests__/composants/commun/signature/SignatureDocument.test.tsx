import { CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES } from "@api/configurations/etatCivil/acte/PatchComposerDocumentMentionsUlterieuresConfigApi";
import { CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER } from "@api/configurations/etatCivil/acte/PatchIntegrerDocumentMentionSigneConfigApi";
import { CONFIG_POST_LOGS } from "@api/configurations/outilTech/PostLogsConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR } from "@api/configurations/requete/miseAJour/PatchStatutRequeteMiseAjourConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import SignatureDocument from "../../../../composants/commun/signature/SignatureDocument";
import { IInformationsCarte } from "../../../../utils/Signature";

describe("Test du composant SignatureDocument", () => {
  const apreSignature = vi.fn();

  const listenerSignature = (valeurRetour: object[]) => {
    const retourSignature = (() => {
      dispatchEvent(new CustomEvent("signWebextResponse", { detail: valeurRetour.shift() }));
    }) as EventListener;

    window.top?.addEventListener("signWebextCall", retourSignature);

    return () => window.top?.removeEventListener("signWebextCall", retourSignature);
  };

  const renderSnapshot = (avecUtilisateur: boolean = true): ChildNode | null => {
    const { container } = render(
      <MockRECEContextProvider
        {...(avecUtilisateur
          ? {
              utilisateurConnecte: MockUtilisateurBuilder.utilisateurConnecte()
                .avecDroit(Droit.SIGNER_DELIVRANCE_DEMAT, { perimetres: [Perimetre.TOUS_REGISTRES] })
                .generer()
            }
          : {})}
      >
        <div>
          <SignatureDocument
            typeSignature="MISE_A_JOUR"
            idActe={"idActe"}
            idRequete={"idRequete"}
            apresSignature={apreSignature}
          />
          <div id="conteneur-modale-signature"></div>
        </div>
      </MockRECEContextProvider>
    );

    return container.firstChild;
  };

  test("La modale de signature affiche correctement une erreur de récupération d'information", async () => {
    MockApi.deployer(CONFIG_POST_LOGS);

    const snapshot = renderSnapshot();
    const demonterListener = listenerSignature([{ erreur: { code: "CODE_ERR", libelle: "Erreur récupération informations" } }]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    expect(snapshot).toMatchSnapshot();

    // Teste l'appel au serveur de log outiltech-api
    expect(MockApi.getMock().history.post.length).toStrictEqual(1);

    demonterListener();
    MockApi.stopMock();
  });

  test("La modale de signature affiche correctement une erreur de composition du document", async () => {
    MockApi.deployer(
      CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES,
      { path: { idActe: "idActe" }, body: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { erreurs: [{ code: "TECH_16021", message: "Erreur composition", type: "TechnicalException" }], codeHttp: 500 }
    ).deployer(CONFIG_POST_LOGS);

    const snapshot = renderSnapshot();
    const demonterListener = listenerSignature([
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { erreur: { code: "CODE_ERR", libelle: "Erreur signature document" } }
    ]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    await waitFor(() => {
      expect(MockApi.getMock().history.patch.length).toBe(1);
    });

    // Teste aucun appel au serveur de log outiltech-api car l'erreur ne vient pas de la webext de signature
    expect(MockApi.getMock().history.post.length).toStrictEqual(0);

    expect(snapshot).toMatchSnapshot();
    demonterListener();
    MockApi.stopMock();
  });

  test("La modale de signature affiche correctement une erreur de signature du document", async () => {
    MockApi.deployer(
      CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES,
      { path: { idActe: "idActe" }, body: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { data: "documentASigner" }
    ).deployer(CONFIG_POST_LOGS);

    const snapshot = renderSnapshot();
    const demonterListener = listenerSignature([
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { erreur: { code: "CODE_ERR", libelle: "Erreur signature document" } }
    ]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    await waitFor(() => {
      // Teste l'appel au serveur de log outiltech-api
      expect(MockApi.getMock().history.post.length).toStrictEqual(1);

      expect(MockApi.getMock().history.patch.length).toBe(1);
    });

    expect(snapshot).toMatchSnapshot();
    demonterListener();
    MockApi.stopMock();
  });

  test("La modale de signature affiche correctement une erreur d'enregistrement du document signé", async () => {
    MockApi.deployer(
      CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES,
      { path: { idActe: "idActe" }, body: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { data: "documentASigner" }
    )
      .deployer(
        CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER,
        {
          path: { idActe: "idActe" },
          body: {
            documentPadesBase64: "documentSigne",
            signature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } as IInformationsCarte,
            modeAuthentification: "AROBAS_MDP"
          }
        },
        { erreurs: [{ code: "TECH_16021", message: "Erreur enregistrement", type: "TechnicalException" }], codeHttp: 500 }
      )
      .deployer(CONFIG_POST_LOGS);

    const snapshot = renderSnapshot();
    const demonterListener = listenerSignature([
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" }, document: "documentSigne" }
    ]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    await waitFor(() => {
      // Teste aucun appel au serveur de log outiltech-api car l'erreur ne vient pas de la webext de signature
      expect(MockApi.getMock().history.post.length).toStrictEqual(0);
      expect(MockApi.getMock().history.patch.length).toBe(2);
    });

    expect(snapshot).toMatchSnapshot();
    demonterListener();
    MockApi.stopMock();
  });

  test("Une erreur de mise à jour du statut n'affecte pas la réussite de la signature", async () => {
    MockApi.deployer(
      CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES,
      { path: { idActe: "idActe" }, body: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { data: "documentASigner" }
    )
      .deployer(CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER, {
        path: { idActe: "idActe" },
        body: {
          documentPadesBase64: "documentSigne",
          signature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } as IInformationsCarte,
          modeAuthentification: "AROBAS_MDP"
        }
      })
      .deployer(
        CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR,
        { path: { idRequete: "idRequete", statut: StatutRequete.TRAITEE_MIS_A_JOUR.nom } },
        { erreurs: [{ code: "TECH_16021", message: "Erreur modification statut", type: "TechnicalException" }], codeHttp: 500 }
      );

    const snapshot = renderSnapshot();
    const demonterListener = listenerSignature([
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" }, document: "documentSigne" }
    ]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    await waitFor(() => {
      expect(MockApi.getMock().history.patch.length).toBe(3);
    });

    expect(snapshot).toMatchSnapshot();
    demonterListener();
    MockApi.stopMock();
  });

  test("La fermeture de la modale de signature après erreur n'appelle pas apresSignature avec erreur", async () => {
    MockApi.deployer(CONFIG_POST_LOGS);
    const snapshot = renderSnapshot();
    const demonterListener = listenerSignature([{ erreur: { code: "CODE_ERR", libelle: "Erreur récupération informations" } }]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    expect(snapshot).toMatchSnapshot();

    await userEvent.click(screen.getByTitle("Fermer"));
    await waitFor(() => {
      expect(apreSignature).toHaveBeenCalledWith(false);
    });

    // Teste l'appel au serveur de log outiltech-api
    expect(MockApi.getMock().history.post.length).toStrictEqual(1);

    demonterListener();
    MockApi.stopMock();
  });

  test("La signature se déroule correctement et appel la fonction apresSignature sans erreur", async () => {
    MockApi.deployer(
      CONFIG_PATCH_COMPOSER_DOCUMENT_MENTIONS_ULTERIEURES,
      { path: { idActe: "idActe" }, body: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { data: "documentASigner" }
    )
      .deployer(CONFIG_PATCH_INTEGRER_DOCUMENT_MENTION_SIGNER, {
        path: { idActe: "idActe" },
        body: {
          documentPadesBase64: "documentSigne",
          signature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } as IInformationsCarte,
          modeAuthentification: "AROBAS_MDP"
        }
      })
      .deployer(CONFIG_PATCH_STATUT_REQUETE_MISE_A_JOUR, {
        path: { idRequete: "idRequete", statut: StatutRequete.TRAITEE_MIS_A_JOUR.nom }
      });

    const snapshot = renderSnapshot();
    const demonterListener = listenerSignature([
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" }, document: "documentSigne" }
    ]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    await waitFor(() => {
      expect(MockApi.getMock().history.patch.length).toBe(3);
    });

    expect(snapshot).toMatchSnapshot();

    await userEvent.click(screen.getByTitle("Fermer"));
    await waitFor(() => {
      expect(apreSignature).toHaveBeenCalledWith(true);
    });
    demonterListener();
    MockApi.stopMock();
  });
});
