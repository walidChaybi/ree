import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteCreationEtablissement } from "@mock/data/requeteCreationEtablissement";
import { IOfficier } from "@model/agent/IOfficier";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IEchange } from "@model/requete/IEchange";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SuiviDossier } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/contenu/SuiviDossier";
import { ApercuRequeteEtablissementSaisieDeProjetPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteEtablissementSaisieDeProjetPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { MemoryRouter, RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../../__tests__utils__/testsUtil";
import { localStorageFeatureFlagMock } from "../../../../../../../setupTests";

interface HookConsumerSuiviDossierProps {
  echanges?: IEchange[];
  requete: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
  idUtilisateurConnecte?: string;
}

const HookConsumerSuiviDossier: React.FC<HookConsumerSuiviDossierProps> = props => {
  return (
    <MockRECEContextProvider
      utilisateurConnecte={props.idUtilisateurConnecte ? ({ idUtilisateur: props.idUtilisateurConnecte } as IOfficier) : undefined}
    >
      <MemoryRouter
        initialEntries={[getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID, props.requete?.id || "")]}
      >
        <SuiviDossier
          requete={props.requete}
          echanges={props.requete?.provenanceNatali?.echanges}
          modeConsultation={true}
        />
      </MemoryRouter>
    </MockRECEContextProvider>
  );
};

const requete = mappingRequeteCreation(requeteCreationEtablissement);

const titulaire = requete?.titulaires?.[0] || ({} as ITitulaireRequeteCreation);
const requeteAvecTitulaires: IRequeteCreation = {
  ...requete,
  titulaires: [
    {
      ...titulaire,
      situationFamiliale: "CELIBATAIRE",
      evenementUnions: []
    }
  ]
};

test("DOIT afficher le tableau de SuiviDossier QUAND les conditions sont remplies.", () => {
  render(
    <HookConsumerSuiviDossier
      idUtilisateurConnecte="7a091a3b-6835-4824-94fb-527d68926d55"
      requete={requeteAvecTitulaires}
    />
  );

  waitFor(() => {
    expect(screen.getByText("Nom")).toBeDefined();
    expect(screen.getByText("Prénoms")).toBeDefined();
    expect(screen.getByText("Décret")).toBeDefined();
    expect(screen.getByText("Evénement")).toBeDefined();
    expect(screen.getByText("Date évenement")).toBeDefined();
    expect(screen.getByText("Avancement")).toBeDefined();
  });
});

test("DOIT afficher les lignes du tableau de SuiviDossier inactive QUAND la requete ne nous appartient pas.", () => {
  render(
    <HookConsumerSuiviDossier
      idUtilisateurConnecte="7a091a3b-6835-4824-94fb-527d68926d59"
      requete={requeteAvecTitulaires}
    />
  );

  waitFor(() => {
    expect(screen.getByText("Nom")).toBeDefined();
    expect(screen.getByText("Prénoms")).toBeDefined();
    expect(screen.getByText("Décret")).toBeDefined();
    expect(screen.getByText("Evénement")).toBeDefined();
    expect(screen.getByText("Date évenement")).toBeDefined();
    expect(screen.getByText("Avancement")).toBeDefined();
  });
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le postulant n'est pas célibataire.", () => {
  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].situationFamiliale = "MARIE";
  }

  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeNull();
    expect(screen.queryByText("Prénoms")).toBeNull();
    expect(screen.queryByText("Décret")).toBeNull();
    expect(screen.queryByText("Evénement")).toBeNull();
    expect(screen.queryByText("Date évenement")).toBeNull();
    expect(screen.queryByText("Avancement")).toBeNull();
  });
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le postulant a des enfants mineurs.", () => {
  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires.push({
      id: "17e17c5e-e689-40a2-99e4-6f8927231794",
      position: 1,
      nomNaissance: "nomNaissance",
      sexe: "MASCULIN",
      nationalite: Nationalite.ETRANGERE,
      valideEffetCollectif: "OUI",
      retenueSdanf: {
        paysNaissance: "CUBA"
      },
      qualite: QualiteFamille.ENFANT_MINEUR
    });
  }

  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeNull();
    expect(screen.queryByText("Prénoms")).toBeNull();
    expect(screen.queryByText("Décret")).toBeNull();
    expect(screen.queryByText("Evénement")).toBeNull();
    expect(screen.queryByText("Date évenement")).toBeNull();
    expect(screen.queryByText("Avancement")).toBeNull();
  });

  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires.pop();
  }
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le postulant a des unions antérieurs.", () => {
  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].evenementUnions = [{ id: "", type: "MARIAGE" }];
  }

  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeNull();
    expect(screen.queryByText("Prénoms")).toBeNull();
    expect(screen.queryByText("Décret")).toBeNull();
    expect(screen.queryByText("Evénement")).toBeNull();
    expect(screen.queryByText("Date évenement")).toBeNull();
    expect(screen.queryByText("Avancement")).toBeNull();
  });

  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].evenementUnions = [];
  }
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le FF est inactif.", () => {
  localStorageFeatureFlagMock.setItem("FF_INTEGRATION_CIBLE_REQUETE_NATURALISATION", "false");
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeNull();
    expect(screen.queryByText("Prénoms")).toBeNull();
    expect(screen.queryByText("Décret")).toBeNull();
    expect(screen.queryByText("Evénement")).toBeNull();
    expect(screen.queryByText("Date évenement")).toBeNull();
    expect(screen.queryByText("Avancement")).toBeNull();
  });
});

test("NE DOIT PAS afficher les actions 'Retour SDANF' QUAND le FF est activé", () => {
  localStorageFeatureFlagMock.setItem("FF_RETOUR_SDANF", "false");
  render(<HookConsumerSuiviDossier requete={requete} />);

  waitFor(() => {
    expect(screen.queryByText("Acte irrecevable")).toBeNull();
    expect(screen.queryByText("Élément manquant")).toBeNull();
    expect(screen.queryByText("Suspicion de fraude / nouvel élément")).toBeNull();
  });
  localStorageFeatureFlagMock.setItem("FF_RETOUR_SDANF", "true");
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le FF est inactif.", () => {
  localStorageFeatureFlagMock.setItem("FF_INTEGRATION_CIBLE_REQUETE_NATURALISATION", "false");
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  waitFor(() => {
    expect(screen.queryByText("Nom")).toBeNull();
    expect(screen.queryByText("Prénoms")).toBeNull();
    expect(screen.queryByText("Décret")).toBeNull();
    expect(screen.queryByText("Evénement")).toBeNull();
    expect(screen.queryByText("Date évenement")).toBeNull();
    expect(screen.queryByText("Avancement")).toBeNull();
  });
  localStorageFeatureFlagMock.setItem("FF_INTEGRATION_CIBLE_REQUETE_NATURALISATION", "true");
});

// TODO: Test à restaurer quand les utilisateurs auront besoin de traiter les dossiers d'un postulant avec ses filiations.

/*test("DOIT afficher les différentes ligne du tableau.", async () => {
  render(<HookConsumerSuiviDossier requete={requete} />);

  await waitFor(() => {
    expect(screen.getAllByText("Naissance")).toHaveLength(3);
    expect(screen.getAllByText("Mariage")).toHaveLength(1);
    expect(screen.getByText("Postulant")).toBeDefined();
    expect(screen.getAllByText("A saisir")).toHaveLength(4);
  });
});*/

test.skip("DOIT afficher le Bulletin d'idenfication lors du clique sur une ligne.", () => {
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  waitFor(() => {
    expect(screen.getByText("Nom :")).toBeDefined();
    expect(screen.getByText("Prénoms :")).toBeDefined();
    expect(screen.getByText("Sexe :")).toBeDefined();
    expect(screen.getByText("Date de naissance :")).toBeDefined();
    expect(screen.getByText("Lieu de naissance :")).toBeDefined();

    expect(screen.getAllByText("PLAGNE")).toBeDefined();
    expect(screen.getAllByText("Sylvie")).toBeDefined();
    expect(screen.getByText("Masculin")).toBeDefined();
    expect(screen.getByText("05/01/1991")).toBeDefined();
    expect(screen.getByText("INC (CUBA)")).toBeDefined();
  });
});

test.skip("DOIT rediriger vers l'aperçu saisie projet QUAND on clique sur une ligne naissance d'un postulant", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: (
          <SuiviDossier
            requete={requeteAvecTitulaires}
            echanges={requeteAvecTitulaires?.provenanceNatali?.echanges}
            modeConsultation={true}
          />
        )
      },
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
        element: <ApercuRequeteEtablissementSaisieDeProjetPage />
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID, requeteAvecTitulaires.id)]
  );

  render(<RouterProvider router={router} />);

  waitFor(() => {
    expect(router.state.location.pathname).toBe(
      `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/a2724cc9-450c-4e50-9d05-a44a28717954/a272ec8a-1351-4edd-99b8-03004292a9d2`
    );
  });
});
