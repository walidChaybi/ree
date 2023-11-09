import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { requeteCreationEtablissement } from "@mock/data/requeteCreationEtablissement";
import { IEchange } from "@model/requete/IEchange";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { SuiviDossier } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/contenu/SuiviDossier";
import { PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET, URL_MES_REQUETES_CREATION, URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { localStorageFeatureFlagMock } from "../../../../../../../../setupTests";

interface HookConsumerSuiviDossierProps {
  echanges?: IEchange[];
  requete: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
}

const history = createMemoryHistory();

const HookConsumerSuiviDossier: React.FC<
  HookConsumerSuiviDossierProps
> = props => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
      props.requete?.id || ""
    )
  );

  return (
    <Router history={history}>
      <SuiviDossier
        requete={props.requete}
        echanges={props.requete?.provenanceNatali?.echanges}
        modeConsultation={true}
      />
    </Router>
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
      nombreEnfantMineur: 0,
      evenementUnions: []
    }
  ]
};

test("DOIT afficher le tableau de SuiviDossier QUAND les conditions sont remplies.", async () => {
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  await waitFor(() => {
    expect(screen.getByText("Nom")).toBeDefined();
    expect(screen.getByText("Prénoms")).toBeDefined();
    expect(screen.getByText("Décret")).toBeDefined();
    expect(screen.getByText("Evénement")).toBeDefined();
    expect(screen.getByText("Date évenement")).toBeDefined();
    expect(screen.getByText("Avancement")).toBeDefined();
  });
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le postulant n'est pas célibataire.", async () => {
  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].situationFamiliale = "MARIE";
  }

  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  await waitFor(() => {
    expect(screen.queryByText("Nom")).not.toBeInTheDocument();
    expect(screen.queryByText("Prénoms")).not.toBeInTheDocument();
    expect(screen.queryByText("Décret")).not.toBeInTheDocument();
    expect(screen.queryByText("Evénement")).not.toBeInTheDocument();
    expect(screen.queryByText("Date évenement")).not.toBeInTheDocument();
    expect(screen.queryByText("Avancement")).not.toBeInTheDocument();
  });

  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].situationFamiliale = "CELIBATAIRE";
  }
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le postulant a des enfants mineurs.", async () => {
  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].nombreEnfantMineur = 1;
  }

  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  await waitFor(() => {
    expect(screen.queryByText("Nom")).not.toBeInTheDocument();
    expect(screen.queryByText("Prénoms")).not.toBeInTheDocument();
    expect(screen.queryByText("Décret")).not.toBeInTheDocument();
    expect(screen.queryByText("Evénement")).not.toBeInTheDocument();
    expect(screen.queryByText("Date évenement")).not.toBeInTheDocument();
    expect(screen.queryByText("Avancement")).not.toBeInTheDocument();
  });

  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].nombreEnfantMineur = 0;
  }
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le postulant a des unions antérieurs.", async () => {
  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].evenementUnions = [
      { id: "", type: "MARIAGE" }
    ];
  }

  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  await waitFor(() => {
    expect(screen.queryByText("Nom")).not.toBeInTheDocument();
    expect(screen.queryByText("Prénoms")).not.toBeInTheDocument();
    expect(screen.queryByText("Décret")).not.toBeInTheDocument();
    expect(screen.queryByText("Evénement")).not.toBeInTheDocument();
    expect(screen.queryByText("Date évenement")).not.toBeInTheDocument();
    expect(screen.queryByText("Avancement")).not.toBeInTheDocument();
  });

  if (requeteAvecTitulaires.titulaires) {
    requeteAvecTitulaires.titulaires[0].evenementUnions = [];
  }
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le FF est inactif.", async () => {
  localStorageFeatureFlagMock.setItem("FF_INTEGRATION_REQUETE_CIBLE", "false");
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  await waitFor(() => {
    expect(screen.queryByText("Nom")).not.toBeInTheDocument();
    expect(screen.queryByText("Prénoms")).not.toBeInTheDocument();
    expect(screen.queryByText("Décret")).not.toBeInTheDocument();
    expect(screen.queryByText("Evénement")).not.toBeInTheDocument();
    expect(screen.queryByText("Date évenement")).not.toBeInTheDocument();
    expect(screen.queryByText("Avancement")).not.toBeInTheDocument();
  });
});

test("NE DOIT PAS afficher les actions 'Retour SDANF' QUAND le FF est activé", async () => {
  localStorageFeatureFlagMock.setItem("FF_RETOUR_SDANF", "false");
  render(<HookConsumerSuiviDossier requete={requete} />);

  await waitFor(() => {
    expect(screen.queryByText("Acte irrecevable")).not.toBeInTheDocument();
    expect(screen.queryByText("Élément manquant")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Suspicion de fraude / nouvel élément")
    ).not.toBeInTheDocument();
  });
  localStorageFeatureFlagMock.setItem("FF_RETOUR_SDANF", "true");
});

test("NE DOIT PAS afficher le tableau de SuiviDossier QUAND le FF est inactif.", async () => {
  localStorageFeatureFlagMock.setItem("FF_INTEGRATION_REQUETE_CIBLE", "false");
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  await waitFor(() => {
    expect(screen.queryByText("Nom")).not.toBeInTheDocument();
    expect(screen.queryByText("Prénoms")).not.toBeInTheDocument();
    expect(screen.queryByText("Décret")).not.toBeInTheDocument();
    expect(screen.queryByText("Evénement")).not.toBeInTheDocument();
    expect(screen.queryByText("Date évenement")).not.toBeInTheDocument();
    expect(screen.queryByText("Avancement")).not.toBeInTheDocument();
  });
  localStorageFeatureFlagMock.setItem("FF_INTEGRATION_REQUETE_CIBLE", "true");
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

test("DOIT afficher le Bulletin d'idenfication lors du clique sur une ligne.", async () => {
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  const boutonLignePostulant = screen.getByText("Postulant");
  await waitFor(() => {
    expect(boutonLignePostulant).toBeDefined();
  });
  fireEvent.click(boutonLignePostulant);

  await waitFor(() => {
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

test("DOIT rediriger vers l'aperçu saisie projet QUAND on clique sur une ligne naissance d'un postulant", async () => {
  render(<HookConsumerSuiviDossier requete={requeteAvecTitulaires} />);

  const boutonLigneNaissance = screen.getAllByText("Naissance")[0];
  await waitFor(() => {
    expect(boutonLigneNaissance).toBeDefined();
  });
  fireEvent.click(boutonLigneNaissance);

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/a2724cc9-450c-4e50-9d05-a44a28717954/a272ec8a-1351-4edd-99b8-03004292a9d2`
    );
  });
});
