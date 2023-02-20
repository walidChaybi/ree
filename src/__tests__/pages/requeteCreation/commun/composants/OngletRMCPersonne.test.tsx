import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useRMCAutoPersonneApiHook } from "@pages/rechercheMultiCriteres/autoPersonne/hook/RMCAutoPersonneApiHook";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/OngletRMCPersonne";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { requeteCreationTranscription } from "../../../../../mock/data/requeteCreation";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

afterAll(() => {
  superagentMock.unset();
});

interface HookConsumerTableauRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerOngletRMCPersonne: React.FC<
  HookConsumerTableauRMCAutoPersonneProps
> = props => {
  const { resultatRMCAutoPersonne } = useRMCAutoPersonneApiHook(props.requete);
  return (
    <OngletRMCPersonne
      rmcAutoPersonneResultat={resultatRMCAutoPersonne}
      sousTypeRequete={props.requete.sousType}
      listeTitulaires={props.requete.titulaires}
    />
  );
};

const REQUETE = mappingRequeteCreation(requeteCreationTranscription);

describe("Test l'affichage de l'onglet RMC Personne", () => {
  test("DOIT rendre le tableau de la RMC Personne QUAND on ouvre l'onglet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Nom")).toBeInTheDocument();
      expect(screen.getByText("Autres noms")).toBeInTheDocument();
      expect(screen.getByText("Prénoms")).toBeInTheDocument();
      expect(screen.getByText("Sexe")).toBeInTheDocument();
      expect(screen.getByText("Date de naissance")).toBeInTheDocument();
      expect(screen.getByText("Lieu de naissance")).toBeInTheDocument();
      expect(screen.getByText("Nature")).toBeInTheDocument();
      expect(screen.getByText("Référence")).toBeInTheDocument();
      expect(screen.getByText("Statut / Type")).toBeInTheDocument();
    });
  });

  test("DOIT afficher le bouton-menu pour lancer une nouvelle RMC Auto QUAND on ouvre l'onglet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Lancer RMC sur une nouvelle personne")
      ).toBeInTheDocument();
    });
  });
});
