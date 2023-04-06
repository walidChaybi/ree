import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import {
    IRMCAutoPersonneParams,
    useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/OngletRMCPersonne";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor
} from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { requeteCreationTranscription } from "../../../../../mock/data/requeteCreation";



interface HookConsumerTableauRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerOngletRMCPersonne: React.FC<
  HookConsumerTableauRMCAutoPersonneProps
> = props => {
  const [rmcAutoPersonneParams, setRmcAutoPersonneParams] =
    useState<IRMCAutoPersonneParams>();
  const resultatRMCAutoPersonne = useRMCAutoPersonneApiAvecCacheHook(
    rmcAutoPersonneParams
  );

  useEffect(() => {
    if (props.requete) {
      const titulaire = getPostulantNationaliteOuTitulaireActeTranscritDresse(
        props.requete
      );
      if (titulaire) {
        setRmcAutoPersonneParams(
          mapTitulaireVersRMCAutoPersonneParams(titulaire)
        );
      }
    }
  }, [props.requete]);

  function handleClickSelectionTitulaireRmcPersonne(idTitulaire: string) {
    const titulaire = props.requete.titulaires
      ?.filter(titulaireCourant => titulaireCourant.id === idTitulaire)
      .pop();
    if (titulaire) {
      setRmcAutoPersonneParams(
        mapTitulaireVersRMCAutoPersonneParams(titulaire)
      );
    }
  }

  return (
    <OngletRMCPersonne
      rmcAutoPersonneResultat={resultatRMCAutoPersonne ?? []}
      sousTypeRequete={props.requete.sousType}
      listeTitulaires={props.requete.titulaires}
      handleClickMenuItem={handleClickSelectionTitulaireRmcPersonne}
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

describe("Test le fonctionnement de l'onglet RMC Personne", () => {
  test("DOIT rafraichir les données du tableau QUAND on sélectionne une nouvelle personne depuis le bouton 'RMC Auto sur autre personne'", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(screen.getAllByText("Philips")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Yann")[0]).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.mouseOver(
        screen.getByText("Lancer RMC sur une nouvelle personne")
      );
      fireEvent.click(
        screen.getByText("Parent 1 - DUPONT Michel (M), 01/01/1990")
      );
    });

    await waitFor(() => {
      expect(screen.getByText("DUPONT")).toBeInTheDocument();
    });
  });
});
