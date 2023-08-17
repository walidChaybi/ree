import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { requeteCreationEtablissement } from "@mock/data/requeteCreationEtablissement";
import { IEchange } from "@model/requete/IEchange";
import { IRequeteCreationEtablissement } from "@model/requete/IRequeteCreationEtablissement";
import { SuiviDossier } from "@pages/requeteCreation/apercuRequete/etablissement/composants/suiviDossier/SuiviDossier";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

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

test("DOIT afficher le tableau de SuiviDossier QUAND on ouvre l'onglet.", async () => {
  render(<HookConsumerSuiviDossier requete={requete} />);

  await waitFor(() => {
    expect(screen.getAllByText("Nom")).toBeDefined();
    expect(screen.getAllByText("Prénoms")).toBeDefined();
    expect(screen.getAllByText("Décret")).toBeDefined();
    expect(screen.getAllByText("Evénement")).toBeDefined();
    expect(screen.getAllByText("Date évenement")).toBeDefined();
    expect(screen.getAllByText("Avancement")).toBeDefined();
  });
});

test("DOIT afficher les différentes ligne du tableau.", async () => {
  render(<HookConsumerSuiviDossier requete={requete} />);

  await waitFor(() => {
    expect(screen.getAllByText("Naissance")).toHaveLength(3);
    expect(screen.getAllByText("Mariage")).toHaveLength(1);
    expect(screen.getByText("Postulant")).toBeDefined();
    expect(screen.getAllByText("A saisir")).toHaveLength(4);
  });
});

test("DOIT afficher le Bulletin d'idenfication lors du clique sur une ligne.", async () => {
  render(<HookConsumerSuiviDossier requete={requete} />);

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
  render(<HookConsumerSuiviDossier requete={requete} />);

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