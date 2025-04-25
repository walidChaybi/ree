import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { IOfficier } from "@model/agent/IOfficier";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { OngletsApercuCreationEtablissementPriseEnCharge } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/contenu/OngletsApercuCreationEtablissementPriseEnCharge";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
import { userDroitnonCOMEDEC } from "../../../../mock/data/mockConnectedUserAvecDroit";
import {
  requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut,
  requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut,
  requeteCreationAvecMessagesRetourSDANFAvecMauvaisStatus,
  requeteCreationAvecMessagesRetourSDANFAvecMessages,
  requeteCreationAvecMessagesRetourSDANFSansLesDroits,
  requeteCreationEtablissement
} from "../../../../mock/data/requeteCreation";

const utilisateurConnecte = {
  ...userDroitnonCOMEDEC,
  idUtilisateur: "90c6aee1-21be-4ba6-9e55-fc8831252646"
};

function afficheComposant(idRequete: string, requete: IRequeteCreationEtablissement, utilisateurConnecte: IOfficier): void {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: (
          <OngletsApercuCreationEtablissementPriseEnCharge
            requete={mappingRequeteCreation(requete)}
            onRenommePieceJustificative={(idPieceJustificative: string, nouveauLibelle: string, idDocumentPJ?: string | undefined) => {}}
            resultatRMCPersonne={[]}
            tableauRMCPersonneEnChargement={false}
            setDataActesInscriptionsSelectionnes={() => {}}
            setRmcAutoPersonneParams={() => {}}
            rechargerRequete={() => {}}
          />
        )
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID, idRequete)]
  );

  render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte, LISTE_UTILISATEURS));
}

test("DOIT afficher l'encart 'Retour SDANF' QUAND on rend le composant d'aperçu creation etablissement en prise en charge.", () => {
  afficheComposant("a4cefb71-8457-4f6b-937e-34b49335d404", mappingRequeteCreation(requeteCreationEtablissement), utilisateurConnecte);

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });

  fireEvent.click(boutonVoletSuiviDossier);

  waitFor(() => {
    expect(screen.getByText("Retour SDANF")).toBeDefined();
  });
});

test("DOIT afficher le message avec le bon format titre - message - prenomNom QUAND un message est présent.", () => {
  afficheComposant(
    "3ed9aa4e-921b-429f-b8fe-531dd103c68s",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFAvecMessages),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  waitFor(() => {
    expect(screen.getByText("Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann Le Biannic")).toBeDefined();
  });
});

test("DOIT afficher la liste des messages avec le bon nombre de messages QUAND plusieurs messages sont présent.", () => {
  afficheComposant(
    "a4cefb71-8457-4f6b-937e-34b49335d404",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFSansLesDroits),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });

  fireEvent.click(boutonVoletSuiviDossier);

  waitFor(() => {
    expect(document.querySelectorAll("li.container").length).toEqual(2);

    expect(screen.getByText("Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann")).toBeDefined();
  });
});

test("DOIT desactiver les boutons QUAND la requete n'est pas en statut PRISE_EN_CHARGE.", () => {
  afficheComposant(
    "3ed97a35-c9b0-4ae4-b2dc-75eb84e4085c",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFAvecMauvaisStatus),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const button = screen.getByText("Acte irrecevable").closest("button") as HTMLInputElement;
  waitFor(() => {
    expect(button.disabled).toBeTruthy();
  });
});

test.skip("DOIT desactiver les boutons QUAND l'idRequeteCorbeilleAgent de la requete n'est pas la meme que l'agent", () => {
  afficheComposant(
    "3ed9aa4e-921b-489f-b8fe-531dd703c68f",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const button = screen.getByText("Acte irrecevable").closest("button") as HTMLInputElement;
  waitFor(() => {
    expect(button.disabled).toBeTruthy();
  });
});

test("DOIT ne pas desactiver les boutons QUAND l'idRequeteCorbeilleAgent de la requete et status est bon", () => {
  afficheComposant(
    "3ed9aa4e-921b-429f-b8fe-531dd103c68f",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });

  fireEvent.click(boutonVoletSuiviDossier);

  const button = screen.getByText("Acte irrecevable").closest("button");

  waitFor(() => {
    expect(button?.getAttribute("disabled")).toBe(null);
  });
});

test("DOIT ouvrir et changer le titre de la popin QUAND on clique sur une action", () => {
  afficheComposant(
    "3ed9aa4e-921b-429f-b8fe-531dd103c68f",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });

  fireEvent.click(boutonVoletSuiviDossier);

  const boutonActeIrrecevable = screen.getByText("Acte irrecevable").closest("button");
  const boutonElementManquant = screen.getByText("Acte irrecevable").closest("button");
  const boutonSuspicionFraudeNouvelElement = screen.getByText("Acte irrecevable").closest("button");

  waitFor(() => {
    expect(boutonActeIrrecevable).toBeDefined();
    expect(boutonElementManquant).toBeDefined();
    expect(boutonSuspicionFraudeNouvelElement).toBeDefined();
  });
});

test("DOIT ouvrir la popin QUAND on clique sur une action", () => {
  afficheComposant(
    "3ed9aa4e-921b-429f-b8fe-531dd103c68f",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const bouton = screen.getByText("Acte irrecevable").closest("button") as HTMLElement;
  waitFor(() => {
    expect(bouton).toBeDefined();
  });

  fireEvent.click(bouton);

  waitFor(() => {
    expect(bouton.getAttribute("disabled")).toBe(null);
  });
});

test.skip("DOIT afficher un message d'erreur QUAND la taille maximale est dépassée", () => {
  afficheComposant(
    "3ed9aa4e-921b-429f-b8fe-531dd103c68f",
    mappingRequeteCreation(requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut),
    utilisateurConnecte
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");

  waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });

  fireEvent.click(boutonVoletSuiviDossier);

  const boutonActeIrrecevable = screen.getByText("Acte irrecevable").closest("button") as HTMLElement;

  waitFor(() => {
    expect(boutonActeIrrecevable).toBeDefined();
  });

  fireEvent.click(boutonActeIrrecevable);

  const popin = screen.queryByTestId("popinConfirmationEtMessage");
  waitFor(() => {
    expect(popin).toBeDefined();
  });

  const message =
    "Lorem Ipsum is simply dummy text of the pridddddnting and typesddetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was populardddd";

  const textArea = screen.getByPlaceholderText("Saisir un message");
  fireEvent.change(textArea, {
    target: { value: message }
  });

  const messageAvertissement = screen.queryByText("500 caractères maximum");
  waitFor(() => {
    expect(messageAvertissement).toBeDefined();
  });

  fireEvent.change(textArea, {
    target: { value: "ddd" }
  });

  waitFor(() => {
    expect(messageAvertissement).not.toBeDefined();
  });
});
