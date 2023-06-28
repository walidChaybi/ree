import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic,
  userDroitCreerActeTranscritPerimetreMEAE
} from "@mock/data/connectedUserAvecDroit";
import { entiteRatachementEtablissement } from "@mock/data/entiteRatachementEtablissement";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { SaisirRCTCPage } from "@pages/requeteCreation/saisirRequete/SaisirRCTCPage";
import { PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router";
import {
  expectEstBoutonDisabled,
  expectEstBoutonEnabled
} from "../../../../__tests__utils__/expectUtils";
import { renseigneChampsRecherche } from "../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );
});

const HookSaisirRCTCForm: React.FC = () => {
  return <SaisirRCTCPage />;
};

const history = createMemoryHistory();

const getInput = (label: string): HTMLInputElement =>
  screen.getByLabelText(label) as HTMLInputElement;

test("DOIT ajouter un parent QUAND on clique sur le bouton 'Ajouter un parent'", async () => {
  render(
    <Router history={history}>
      <HookSaisirRCTCForm />
    </Router>
  );

  await waitFor(() => {
    expect(screen.queryByText("Parent 2")).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Ajouter un parent"));

  await waitFor(() => {
    expect(screen.getByText("Retirer un parent")).toBeInTheDocument();
    expect(screen.getByText("Parent 2")).toBeInTheDocument();
  });
});

test("DOIT retirer un parent QUAND on clique sur le bouton 'Retirer un parent'", async () => {
  render(
    <Router history={history}>
      <HookSaisirRCTCForm />
    </Router>
  );

  fireEvent.click(screen.getByText("Ajouter un parent"));
  fireEvent.click(screen.getByText("Retirer un parent"));

  await waitFor(() => {
    expect(screen.queryByText("Parent 2")).not.toBeInTheDocument();
  });
});

test("DOIT afficher la popin de transfert vers les entités fille (triées) du département Etablissement QUAND l'utilisateur clique sur le bouton de transmission", async () => {
  storeRece.utilisateurCourant = userDroitCreerActeTranscritPerimetreMEAE;
  const history = createMemoryHistory();
  history.push("/page1");
  history.push("/page2");
  await act(async () => {
    render(
      <Router history={history}>
        <SaisirRCTCPage />
      </Router>
    );
  });

  /////////////////////////Saisie des données///////////////////////////////
  await act(async () => {
    // Nature acte et lien requérant
    fireEvent.change(screen.getByTestId("requete.natureActe"), {
      target: { value: "NAISSANCE_MINEUR" }
    });
    fireEvent.change(screen.getByTestId("requete.lienRequerant"), {
      target: { value: "PERE_MERE" }
    });

    // Saisie de "TUNIS" pour le registre (pocopa)
    await renseigneChampsRecherche(screen, "requete.registre", "TUNIS");

    // Titulaire
    fireEvent.change(getInput("titulaire.noms.nomActeEtranger"), {
      target: { value: "Nom acte etranger" }
    });
    fireEvent.change(getInput("titulaire.noms.nomSouhaiteActeFR"), {
      target: { value: "Nom souhaite acte FR" }
    });
    fireEvent.change(getInput("titulaire.prenoms.prenom1"), {
      target: { value: "Prenom Un" }
    });

    // Parent 1
    fireEvent.click(getInput("parents.parent1.pasdenomconnu.pasdenomconnu"));
    fireEvent.click(
      getInput("parents.parent1.pasdeprenomconnu.pasdeprenomconnu")
    );
  });

  /////////////////////////////////////////////////////////////////////////

  const boutonTransmettre = screen.queryByText(
    "Transmettre au service compétent"
  );

  await waitFor(() => {
    expect(boutonTransmettre).toBeInTheDocument();
    expect(screen.queryByText("Choisissez une entité")).not.toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(boutonTransmettre!);
  });

  await waitFor(() => {
    expect(screen.queryByText("Choisissez une entité")).toBeInTheDocument();
  });

  const selectElement = screen.getByLabelText(
    "Choix des entités"
  ) as HTMLSelectElement;

  await waitFor(() => {
    expect(screen.queryByText("BTE Genève")).toBeInTheDocument();
  });

  const options: HTMLOptionsCollection = selectElement.options;
  const entiteRatachementEtablissementTriees =
    entiteRatachementEtablissement.data.sort((entite1: any, entite2: any) =>
      entite1.libelleEntite.localeCompare(entite2.libelleEntite)
    );

  // Vérification de la liste des entités
  for (let i = 0; i < options.length; i++) {
    const libelleOtion = options.item(i)?.text;
    if (i === 0) {
      // Première option vide (Placeholder)
      expect(libelleOtion).toEqual("Entités");
    } else {
      expect(libelleOtion).toEqual(
        entiteRatachementEtablissementTriees[i - 1].libelleEntite
      );
    }
  }

  await waitFor(() => {
    expectEstBoutonDisabled("Valider");
  });

  // Choix d'une entité
  await waitFor(() => {
    act(() => {
      fireEvent.change(selectElement, {
        target: {
          value: "6737c8a6-9d23-4fd0-97ec-1ebe3d079373"
        }
      });
    });
  });

  let boutonValider: HTMLButtonElement;
  await waitFor(() => {
    boutonValider = expectEstBoutonEnabled("Valider");
  });

  act(() => {
    fireEvent.click(boutonValider);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe("/page1");
  });
});

test("DOIT activer le bouton 'Prendre en charge' QUAND je modifie au moins un champ du formulaire", async () => {
  await act(async () => {
    render(
      <Router history={history}>
        <HookSaisirRCTCForm />
      </Router>
    );
  });

  const boutonPrendreEnCharge = screen.getByText(/Prendre en charge/i);

  await waitFor(() => {
    expect(boutonPrendreEnCharge).toBeDisabled();
  });

  await act(async () => {
    fireEvent.change(getInput("titulaire.noms.nomActeEtranger"), {
      target: { value: "Nom acte etranger" }
    });
  });

  await waitFor(() => {
    expect(boutonPrendreEnCharge).not.toBeDisabled();
  });
});

test("DOIT rediriger vers l'apercu requête en prise en charge QUAND je clique sur le bouton 'Prendre en charge'", async () => {
  await act(async () => {
    render(
      <Router history={history}>
        <SaisirRCTCPage />
      </Router>
    );
  });

  const boutonPrendreEnCharge = screen.getByText(/Prendre en charge/i);

  // Nature acte et lien requérant
  fireEvent.change(screen.getByTestId("requete.natureActe"), {
    target: { value: "NAISSANCE_MINEUR" }
  });
  fireEvent.change(screen.getByTestId("requete.lienRequerant"), {
    target: { value: "PERE_MERE" }
  });
  fireEvent.change(screen.getByLabelText("requete.registre"), {
    target: { value: "RABAT" }
  });

  await renseigneChampsRecherche(screen, "requete.registre", "TUNIS");

  // Titulaire
  fireEvent.change(getInput("titulaire.noms.nomActeEtranger"), {
    target: { value: "Nom acte etranger" }
  });
  fireEvent.change(getInput("titulaire.noms.nomSouhaiteActeFR"), {
    target: { value: "Nom souhaite acte FR" }
  });
  fireEvent.change(getInput("titulaire.prenoms.prenom1"), {
    target: { value: "Prenom Un" }
  });

  // Parent 1
  fireEvent.click(getInput("parents.parent1.pasdenomconnu.pasdenomconnu"));
  fireEvent.click(
    getInput("parents.parent1.pasdeprenomconnu.pasdeprenomconnu")
  );

  fireEvent.click(boutonPrendreEnCharge);

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        `/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/:idRequeteParam`,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    );
  });
});
