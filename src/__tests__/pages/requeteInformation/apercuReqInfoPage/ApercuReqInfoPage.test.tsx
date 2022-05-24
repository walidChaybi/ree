import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { userDroitConsulterPerimetreMEAE } from "../../../../mock/data/connectedUserAvecDroit";
import { ReponseAppelDetailRequeteInformationSansCorbeilleAgent } from "../../../../mock/data/DetailRequeteInformation";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
import { NOMENCLATURE_REPONSE } from "../../../../mock/data/NomenclatureReponse";
import {
  configEtatcivil,
  NORESULT
} from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configMail } from "../../../../mock/superagent-config/superagent-mock-mail";
import { configRequetesInformation } from "../../../../mock/superagent-config/superagent-mock-requetes-information";
import { IOfficier } from "../../../../model/agent/IOfficier";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import { ApercuReqInfoPage } from "../../../../views/pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_INFORMATION
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configRequetesInformation[0],
  configEtatcivil[0],
  configMail[0]
]);

let history: any;
const globalAny: any = global;
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
};
globalAny.close = jest.fn();
URL.createObjectURL = jest.fn();

beforeEach(() => {
  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_INFORMATION);
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
  storeRece.utilisateurCourant = {
    idUtilisateur: LISTE_UTILISATEURS[3].idUtilisateur
  } as IOfficier;
  configRequetesInformation[0].compteurRequeteInformation = 0;
});

afterAll(() => {
  superagentMock.unset();
});

afterEach(() => {
  storeRece.utilisateurCourant = undefined;
});

////////////////////// DEBUT DES TESTS //////////////////////////////////////////

test("renders ApercuReqInfoPage", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Aperçu requête d'information/i);
  const bandeau = screen.getByText(
    /Requête transférée à Benoît TANGUY - Le : 20\/10\/2021/i
  );

  const resume = screen.getByText(/Résumé de la requête d'information/i);
  const choixReponse = screen.getByText(/Choix de la réponse/i);
  const formReponse = screen.getByText(/Votre réponse/i);
  const libelleReponse = screen.getByText(/Libellé de la réponse/i);
  const mailReponse = screen.getByText(/Mail de la réponse/i);

  const boutonRetour = screen.getByText(/Retour espace information/i);
  const boutonEnvoyer = screen.getByText(/Envoyer la réponse/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(bandeau).toBeDefined();
    expect(resume).toBeDefined();
    expect(choixReponse).toBeDefined();
    expect(formReponse).toBeDefined();
    expect(formReponse).toBeDefined();
    expect(libelleReponse).toBeDefined();
    expect(mailReponse).toBeDefined();
    expect(boutonRetour).toBeDefined();
    expect(boutonEnvoyer).toBeDefined();
  });

  // Alimentation Résumé de la requête d'information
  const sousType = screen.getAllByText(/Sous-type/i);
  const valeurSousType = screen.getByText("Information");
  const objet = screen.getByText("Objet");
  const valeurObjet = screen.getAllByText(
    /Divorce et\/ou séparation de corps/i
  );
  const complementObjet = screen.getByText(/Complément d'objet/i);
  const valeurComplementObjet = screen.getByText(
    /Je souhaite mettre à jour mes actes de l'état civil/i
  );
  const dateCreation = screen.getByText(/Date de création/i);
  const valeurDateCreation = screen.getByText("20/10/2021");
  const numeroReq = screen.getByText(/N° de la requête liée/i);
  const valeurNumeroReq = screen.getByText(/LRU1A5/i);
  const typeRequerant = screen.getByText(/Type requérant/i);
  const valeurTypeRequerant = screen.getByText(/Mandataire habilité/i);
  const identiteRequerant = screen.getByText(/Identité du requérant/i);
  const valeurIdentiteRequerant = screen.getByText(/TINE Clément/i);
  const titulaire = screen.getByText(/Identité du titulaire/i);
  const valeurTitulaire = screen.getByText(/BLANCHARD Mehdi/i);
  const dateNaissance = screen.getByText(/Date de naissance du titulaire/i);
  const valeurDateNaissance = screen.getByText(/11\/03\/2000/i);
  const lieuNaissance = screen.getByText(/Lieu de naissance du titulaire/i);
  const valeurLieuNaissance = screen.getByText(/Londres/i);
  const commentaire = screen.getByText(/Commentaire libre de l'usager/i);
  const valeurCommentaire = screen.getByText(
    "Je pense avoir oublier de mettre mon pays de naissance qui est l'espagne. Est-ce trop tard ? Monsieur XXX"
  );

  await waitFor(() => {
    expect(sousType.length).toEqual(2);
    expect(valeurSousType).toBeDefined();
    expect(objet).toBeDefined();
    expect(valeurObjet.length).toEqual(2);
    expect(complementObjet).toBeDefined();
    expect(valeurComplementObjet).toBeDefined();
    expect(dateCreation).toBeDefined();
    expect(valeurDateCreation).toBeDefined();
    expect(numeroReq).toBeDefined();
    expect(valeurNumeroReq).toBeDefined();
    expect(typeRequerant).toBeDefined();
    expect(valeurTypeRequerant).toBeDefined();
    expect(identiteRequerant).toBeDefined();
    expect(valeurIdentiteRequerant).toBeDefined();
    expect(titulaire).toBeDefined();
    expect(valeurTitulaire).toBeDefined();
    expect(dateNaissance).toBeDefined();
    expect(valeurDateNaissance).toBeDefined();
    expect(lieuNaissance).toBeDefined();
    expect(valeurLieuNaissance).toBeDefined();
    expect(commentaire).toBeDefined();
    expect(valeurCommentaire).toBeDefined();
  });

  const boutonReponsesFiltrees = screen.getByText(/Réponses proposées/i);

  await waitFor(() => {
    expect(boutonReponsesFiltrees).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponsesFiltrees);
  });

  const boutonReponse1 = screen.getByText(NOMENCLATURE_REPONSE[0].libelle);
  const boutonReponse2 = screen.getByText(NOMENCLATURE_REPONSE[1].libelle);

  await waitFor(() => {
    expect(boutonReponse1).toBeDefined();
    expect(boutonReponse2).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponse1);
  });

  const libelleReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[0].libelle
  );
  const mailReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[0].corpsMail
  );

  await waitFor(() => {
    expect(libelleReponseChoisie).toBeDefined();
    expect(mailReponseChoisie).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonEnvoyer);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
  });
});

test("bouton annuler", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const boutonAnnuler = screen.getByText(/Retour espace information/i);

  await waitFor(() => {
    expect(boutonAnnuler).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonAnnuler);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
  });
});

test("clique requete liée", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const valeurRequeteLiee = screen.getByText(/LRU1A5/i);

  await waitFor(() => {
    expect(valeurRequeteLiee).toBeDefined();
  });

  act(() => {
    fireEvent.click(valeurRequeteLiee);
  });

  await waitFor(() => {
    expect(screen.getByText("Aperçu requête : N°LRU1A5")).toBeDefined();
  });
});

test("bouton saisie libre", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  act(() => {
    fireEvent.change(screen.getByPlaceholderText("Mail de la réponse"), {
      target: { text: "Salut les amies" }
    });
  });

  const boutonSaisieLibre = screen.getByText(/Réponse libre/i);

  await waitFor(() => {
    expect(boutonSaisieLibre).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonSaisieLibre);
  });

  await waitFor(() => {
    expect(screen.getByPlaceholderText("Mail de la réponse").textContent).toBe(
      ""
    );
  });
});

test("complétion en cours", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10557"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByDisplayValue("Réponse libre agent")).toBeDefined();
  });
});

test("renders ApercuReqInfoPage Double Menu", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const boutonReponses = screen.getByText(/Toutes les réponses disponibles/i);

  await waitFor(() => {
    expect(boutonReponses).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponses);
  });

  const boutonSousMenu = screen.getByText(/Problème technique/i);

  await waitFor(() => {
    expect(boutonSousMenu).toBeDefined();
  });

  act(() => {
    fireEvent.mouseOver(boutonSousMenu);
  });

  const boutonReponse1 = screen.getByText(NOMENCLATURE_REPONSE[2].libelle);
  const boutonReponse2 = screen.getByText(NOMENCLATURE_REPONSE[3].libelle);

  await waitFor(() => {
    expect(boutonReponse1).toBeDefined();
    expect(boutonReponse2).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponse1);
  });

  const libelleReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[2].libelle
  );
  const mailReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[2].corpsMail
  );

  await waitFor(() => {
    expect(libelleReponseChoisie).toBeDefined();
    expect(mailReponseChoisie).toBeDefined();
  });
});

test("render ApercuReqInfoPage : RMC état civil manuelle ", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const linkElement = screen.getByText("Nouvelle recherche multi-critères");
  await waitFor(() => {
    expect(linkElement).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(linkElement);
  });

  const dialog = screen.getByRole("dialog");
  const nomTitulaire = screen.getByLabelText(
    "titulaire.nom"
  ) as HTMLInputElement;
  const boutonRechercher = screen.getByText("Rechercher") as HTMLButtonElement;

  await waitFor(() => {
    expect(dialog).toBeDefined();
    expect(nomTitulaire).toBeDefined();
    expect(boutonRechercher).toBeDefined();
    expect(boutonRechercher.disabled).toBeTruthy();
  });

  await act(async () => {
    fireEvent.change(nomTitulaire, {
      target: { value: NORESULT }
    });
  });

  await waitFor(() => {
    expect(nomTitulaire.value).toEqual(NORESULT);
  });

  await act(async () => {
    expect(boutonRechercher.disabled).toBeFalsy();
    fireEvent.click(boutonRechercher);
  });

  await waitFor(() => {
    expect(dialog).not.toBeInTheDocument();
    const resultatRMCActe = screen.getByText("Aucun acte n'a été trouvé");
    const resultatRMCInscription = screen.getByText(
      "Aucune inscription n'a été trouvée"
    );
    expect(resultatRMCActe).toBeDefined();
    expect(resultatRMCInscription).toBeDefined();
  });
});

/////////////////////// Tests concernant la prise en charge //////////////////////////////////////

const Labels = {
  prendreEnCharge: "Prendre en charge",
  autresRequetesAssocieesAuTitulaire: "Autres requêtes associées au titulaire",
  nouvelleRMC: "Nouvelle recherche multi-critères",
  ajouterUnePieceJointe: "Ajouter une pièce jointe"
};
const renduApercuReqInfoPage = async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;

  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
      ReponseAppelDetailRequeteInformationSansCorbeilleAgent.data.id
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });
};

test("Attendu: le bouton 'prendre en charge' est affiché, si la requête n'appartient pas à l'utilisateur, mais se trouve dans sa corbeille Service", async () => {
  await renduApercuReqInfoPage();

  const boutonPrendreEnCharge = screen.queryByLabelText(
    Labels.prendreEnCharge
  ) as HTMLButtonElement;

  await waitFor(() => expect(boutonPrendreEnCharge).toBeInTheDocument());
});

test("Attendu: le bouton 'prendre en charge' disparait une fois qu'on a cliqué dessus", async () => {
  await renduApercuReqInfoPage();

  let boutonPrendreEnCharge = screen.queryByLabelText(
    Labels.prendreEnCharge
  ) as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonPrendreEnCharge);
  });

  await waitFor(() => expect(boutonPrendreEnCharge).not.toBeInTheDocument());
});

test("Attendu: les blocs non présents sur l'aperçu de requête sont bien absents si la requête n'appartient pas à l'utilisateur, mais se trouve dans sa corbeille Service", async () => {
  await renduApercuReqInfoPage();

  const titreAutresRequetesAssocieesAuTitulaire = screen.queryByText(
    Labels.autresRequetesAssocieesAuTitulaire
  ) as HTMLDivElement;

  const BoutonNouvelleRMC = screen.queryByText(
    Labels.nouvelleRMC
  ) as HTMLButtonElement;

  const BoutonAjouterUnePieceJointe = screen.queryByText(
    Labels.ajouterUnePieceJointe
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(titreAutresRequetesAssocieesAuTitulaire).not.toBeInTheDocument();
    expect(BoutonNouvelleRMC).not.toBeInTheDocument();
    expect(BoutonAjouterUnePieceJointe).not.toBeInTheDocument();
  });
});

test("Attendu: le bouton 'prendre en charge' ne s'affiche pas lorsqu'on se trouve sur une fenêtre externe", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route>
            <ApercuReqInfoPage
              idRequeteAAfficher={
                ReponseAppelDetailRequeteInformationSansCorbeilleAgent.data.id
              }
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonPrendreEnCharge = screen.queryByLabelText(
    Labels.prendreEnCharge
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonPrendreEnCharge).not.toBeInTheDocument();
  });
});
