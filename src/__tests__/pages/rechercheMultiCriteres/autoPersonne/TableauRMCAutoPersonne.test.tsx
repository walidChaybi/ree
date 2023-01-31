import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useRMCAutoPersonneApiHook } from "@pages/rechercheMultiCriteres/autoPersonne/hook/RMCAutoPersonneApiHook";
import { TableauRMCAutoPersonne } from "@pages/rechercheMultiCriteres/autoPersonne/TableauRMCAutoPersonne";
import { mappingRequeteCreation } from "@pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import request from "superagent";
import { requeteCreationTranscription } from "../../../../mock/data/requeteCreation";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

afterAll(() => {
  superagentMock.unset();
});

interface HookConsumerTableauRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerTableauRMCAutoPersonne: React.FC<
  HookConsumerTableauRMCAutoPersonneProps
> = props => {
  const { resultatRMCAutoPersonne } = useRMCAutoPersonneApiHook(props.requete);
  return <TableauRMCAutoPersonne data={resultatRMCAutoPersonne} />;
};

test("Attendu: L'affichage du tableau de la RMC Personne s'affiche correctement.", async () => {
  const requete = mappingRequeteCreation(requeteCreationTranscription);
  await act(async () => {
    render(<HookConsumerTableauRMCAutoPersonne requete={requete} />);
  });

  await waitFor(() => {
    // Colonnes tableau
    expect(screen.getByText("Nom")).toBeInTheDocument();
    expect(screen.getByText("Autres noms")).toBeInTheDocument();
    expect(screen.getByText("Prénoms")).toBeInTheDocument();
    expect(screen.getByText("Sexe")).toBeInTheDocument();
    expect(screen.getByText("Date de naissance")).toBeInTheDocument();
    expect(screen.getByText("Lieu de naissance")).toBeInTheDocument();
    expect(screen.getByText("Nature")).toBeInTheDocument();
    expect(screen.getByText("Référence")).toBeInTheDocument();
    expect(screen.getByText("Statut / Type")).toBeInTheDocument();

    // Données tableau
    expect(screen.getAllByText("Philips")).toBeDefined();
    expect(screen.getByText("PHILIPS")).toBeInTheDocument();
    expect(screen.getAllByText("Yann")).toBeDefined();
    expect(screen.getAllByText("M")).toBeDefined();
    expect(screen.getAllByText("13/04/1980")).toBeDefined();
    expect(screen.getAllByText("Barcelone (Espagne)")).toBeDefined();
    expect(screen.getAllByText("CURATELLE_SIMPLE")).toBeDefined();
    expect(
      screen.getByText("ADOPTION_SIMPLE_ETRANGER_EXEQUATUR")
    ).toBeInTheDocument();
    expect(screen.getAllByText("NAISSANCE")).toBeDefined();
    expect(screen.getByText("PACS - 2011 - 1234580")).toBeInTheDocument();
    expect(screen.getByText("PACS - 2021 - 1234581")).toBeInTheDocument();
    expect(screen.getByText("RC - 2020 - 10")).toBeInTheDocument();
    expect(screen.getByText("RC - 2020 - 11")).toBeInTheDocument();
    expect(screen.getByText("RCA - 2020 - 4010")).toBeInTheDocument();
    expect(screen.getByText("ACQ.X.1951.1.681ABC")).toBeInTheDocument();
    expect(screen.getAllByText("ACTIF")).toBeDefined();
    expect(screen.getAllByText("INACTIF")).toBeDefined();
    expect(screen.getAllByText("ACTIF / INSCRIPTION")).toBeDefined();
    expect(screen.getAllByText("INACTIF / INSCRIPTION")).toBeDefined();
    expect(screen.getAllByText("VALIDE")).toBeDefined();
  });
});
