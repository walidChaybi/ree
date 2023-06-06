import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React, { useEffect } from "react";

interface HookConsumerTableauRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerOngletRMCPersonne: React.FC<
  HookConsumerTableauRMCAutoPersonneProps
> = props => {
  const {
    dataPersonnesSelectionnees,
    setDataPersonnesSelectionnees,
    dataActesInscriptionsSelectionnes,
    setDataActesInscriptionsSelectionnes,
    resultatRMCAutoPersonne,
    rmcAutoPersonneEnChargement,
    setRmcAutoPersonneParams
  } = useDataTableauxOngletRMCPersonne(props.requete);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requete]);

  return (
    <OngletRMCPersonne
      resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
      sousTypeRequete={props.requete.sousType}
      listeTitulaires={props.requete.titulaires}
      natureActeRequete={NatureActeRequete.NAISSANCE}
      dataPersonnesSelectionnees={dataPersonnesSelectionnees || []}
      setDataPersonnesSelectionnees={setDataPersonnesSelectionnees}
      dataActesInscriptionsSelectionnes={
        dataActesInscriptionsSelectionnes || []
      }
      setDataActesInscriptionsSelectionnes={
        setDataActesInscriptionsSelectionnes
      }
      setRmcAutoPersonneParams={setRmcAutoPersonneParams}
      tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
      tableauPersonnesSelectionneesEnChargement={!dataPersonnesSelectionnees}
      tableauActesInscriptionsSelectionnesEnChargement={
        !dataActesInscriptionsSelectionnes
      }
    />
  );
};

const REQUETE = mappingRequeteCreation(requeteCreationTranscription);

describe("Test l'affichage de l'onglet RMC Personne", () => {
  test("DOIT rendre le tableau de résultat la RMC Personne QUAND on ouvre l'onglet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(screen.getAllByText("Nom")).toBeDefined();
      expect(screen.getAllByText("Autres noms")).toBeDefined();
      expect(screen.getAllByText("Prénoms")).toBeDefined();
      expect(screen.getAllByText("Sexe")).toBeDefined();
      expect(screen.getAllByText("Date de naissance")).toBeDefined();
      expect(screen.getAllByText("Lieu de naissance")).toBeDefined();
      expect(screen.getAllByText("Nature")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Référence")[0]).toBeInTheDocument();
      expect(screen.getByText("Statut / Type")).toBeInTheDocument();
    });
  });

  test("DOIT rendre le tableau des personnes sélectionnées pour le projet QUAND on ouvre l'onglet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Personnes sélectionnées pour le projet")
      ).toBeDefined();
      expect(screen.getAllByText("Nom")).toBeDefined();
      expect(screen.getAllByText("Autres noms")).toBeDefined();
      expect(screen.getAllByText("Prénoms")).toBeDefined();
      expect(screen.getAllByText("Sexe")).toBeDefined();
      expect(screen.getAllByText("Date de naissance")).toBeDefined();
      expect(screen.getAllByText("Lieu de naissance")).toBeDefined();
      expect(screen.getByText("Rôle")).toBeInTheDocument();
    });
  });

  test("DOIT rendre le tableau des actes/inscriptions sélectionnés pour le projet QUAND on ouvre l'onglet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Actes et inscriptions sélectionnés pour le projet")
      ).toBeDefined();
      expect(screen.getAllByText("Nom")).toBeDefined();
      expect(screen.getAllByText("Autres noms")).toBeDefined();
      expect(screen.getAllByText("Prénoms")).toBeDefined();
      expect(screen.getAllByText("Sexe")).toBeDefined();
      expect(screen.getAllByText("Date de naissance")).toBeDefined();
      expect(screen.getAllByText("Lieu de naissance")).toBeDefined();
      expect(screen.getAllByText("Nature")).toBeDefined();
      expect(screen.getAllByText("Référence")).toBeDefined();
      expect(screen.getByText("Type PJ")).toBeInTheDocument();
    });
  });

  test("DOIT afficher le bouton-menu pour lancer une nouvelle RMC Auto QUAND on ouvre l'onglet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Rechercher sur une personne de la requête")
      ).toBeInTheDocument();
    });
  });

  test("DOIT rafraichir les données du tableau QUAND on sélectionne une nouvelle personne depuis le bouton 'RMC Auto sur autre personne'", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(screen.getByText("DUPONT")).toBeInTheDocument();
      expect(screen.getByText("Paul")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.mouseOver(
        screen.getByText("Rechercher sur une personne de la requête")
      );
      fireEvent.click(
        screen.getByText("Parent 2 - PHILIPS Yann (M), 01/02/2000")
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("DUPONT")).not.toBeInTheDocument();
      expect(screen.queryByText("Paul")).not.toBeInTheDocument();
    });
  });
});

describe("Test le fonctionnement de l'ajout / suppression des personnes au projet.", () => {
  function estDansTableauPersonnesSauvegardees(value: string): boolean {
    const listeElements = screen.queryAllByText(value);
    for (let idx = 0; idx < listeElements.length; idx++) {
      const element = listeElements[idx];
      if (
        element.tagName.toLowerCase() === "span" &&
        element.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.classList.contains(
          "PersonnesSelectionneesProjet"
        )
      ) {
        return true;
      }
    }
    return false;
  }

  test("DOIT ajouter / retirer une personne au tableau des personnes sauvegardées avec le rôle correspondant QUAND on ajoute / retire une personne au projet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    const listeBoutonAjouter = screen.getAllByText("+");
    const boutonAjouterAlpha = listeBoutonAjouter[0];
    const boutonItemTitulaireAlpha = screen.getAllByText("Parent 2")[0];

    await waitFor(() => {
      expect(boutonAjouterAlpha).toBeDefined();
      expect(boutonItemTitulaireAlpha).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(boutonAjouterAlpha);
      fireEvent.click(boutonItemTitulaireAlpha);
    });

    await waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });

    const boutonRetirerAlpha = screen.getAllByTitle(
      "Retirer cette personne du projet"
    )[1];

    await waitFor(() => {
      expect(boutonRetirerAlpha).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(boutonRetirerAlpha);
    });

    await waitFor(() => {
      expect(boutonRetirerAlpha).not.toBeInTheDocument();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });
  });

  test("DOIT verrouiller / déverrouiller le bouton d'ajout d'une personne QUAND on ajoute / retire cette personne du projet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    const boutonAjouter = screen.getAllByText("+")[0];
    const boutonItemParent = screen.getAllByText("Parent 2")[0];

    await waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemParent).toBeDefined();
      expect(boutonAjouter).not.toHaveAttribute("disabled");
    });

    await act(async () => {
      fireEvent.click(boutonAjouter);
      fireEvent.click(boutonItemParent);
    });

    const boutonRetirer = screen.getAllByTitle(
      "Retirer cette personne du projet"
    )[1];
    await waitFor(() => {
      expect(boutonAjouter).toHaveAttribute("disabled");
      expect(boutonRetirer).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });

    await act(async () => {
      fireEvent.click(boutonRetirer);
    });

    await waitFor(() => {
      expect(boutonAjouter).not.toHaveAttribute("disabled");
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });
  });

  test("DOIT conserver les personnes dans le tableau des personnes sauvegardees QUAND on effectue une RMC sur une autre personne.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    // Ajouter personne
    const boutonAjouter = screen.getAllByText("+")[0];
    const boutonItemTitulaire = screen.getAllByText("Parent 2")[0];

    await waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemTitulaire).toBeDefined();

      expect(screen.getByText("DUPONT")).toBeInTheDocument();
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeFalsy();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(boutonAjouter);
      fireEvent.click(boutonItemTitulaire);
    });

    await waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeTruthy();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });

    await act(async () => {
      fireEvent.mouseOver(
        screen.getByText("Rechercher sur une personne de la requête")
      );
      fireEvent.click(
        screen.getByText("Parent 2 - PHILIPS Yann (M), 01/02/2000")
      );
    });

    await waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeTruthy();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });
  });
});

describe("Test le fonctionnement de l'ajout / suppression des actes ou isncriptions au projet.", () => {
  function estDansTableauActesInscriptionsSauvegardes(value: string): boolean {
    const listeElements = screen.queryAllByText(value);
    for (let idx = 0; idx < listeElements.length; idx++) {
      const element = listeElements[idx];
      if (
        element.tagName.toLowerCase() === "span" &&
        element.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.classList.contains(
          "ActesInscriptionsSelectionnesProjet"
        )
      ) {
        return true;
      }
    }
    return false;
  }

  test("DOIT ajouter / retirer un acte ou inscription au tableau des acte ou inscriptions sauvegardés avec le type PJ correspondant QUAND on ajoute / retire un acte ou inscription au projet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    const boutonAjouter = screen.getByTitle(
      "Ajouter cet acte ou inscription au projet"
    );
    const boutonItemTitulaire = screen.getByText(
      "Autres pièces justificatives"
    );

    await waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemTitulaire).toBeDefined();
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(boutonAjouter);
      fireEvent.click(boutonItemTitulaire);
    });

    await waitFor(() => {
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeTruthy();
    });

    const boutonRetirerAlpha = screen.getAllByTitle(
      "Retirer cet acte ou inscription du projet"
    )[2];

    await waitFor(() => {
      expect(boutonRetirerAlpha).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(boutonRetirerAlpha);
    });

    await waitFor(() => {
      expect(boutonRetirerAlpha).not.toBeInTheDocument();
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeFalsy();
    });
  });

  test("DOIT verrouiller / déverrouiller le bouton d'ajout d'un acte ou inscription QUAND on ajoute / retire cet acte ou inscription du projet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    const boutonAjouter = screen.getByTitle(
      "Ajouter cet acte ou inscription au projet"
    );
    const boutonItemActeInscription = screen.getByText(
      "Autres pièces justificatives"
    );

    await waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemActeInscription).toBeDefined();
      expect(boutonAjouter).not.toHaveAttribute("disabled");
    });

    await act(async () => {
      fireEvent.click(boutonAjouter);
      fireEvent.click(boutonItemActeInscription);
    });

    const boutonRetirer = screen.getAllByTitle(
      "Retirer cet acte ou inscription du projet"
    )[2];
    await waitFor(() => {
      expect(boutonAjouter).toHaveAttribute("disabled");
      expect(boutonRetirer).toBeDefined();
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeTruthy();
    });

    await act(async () => {
      fireEvent.click(boutonRetirer);
    });

    await waitFor(() => {
      expect(boutonAjouter).not.toHaveAttribute("disabled");
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeFalsy();
    });
  });

  test("DOIT conserver les actes ou inscriptions dans le tableau des actes ou inscriptions sauvegardés QUAND on effectue une RMC sur une autre personne.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    // Ajouter acte ou inscription
    const boutonAjouter = screen.getByTitle(
      "Ajouter cet acte ou inscription au projet"
    );
    const boutonItemActeInscription = screen.getByText(
      "Autres pièces justificatives"
    );

    await waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemActeInscription).toBeDefined();

      expect(screen.getByText("PACS - 2011 - 1234590")).toBeInTheDocument();
      expect(
        estDansTableauActesInscriptionsSauvegardes("PACS - 2011 - 1234590")
      ).toBeFalsy();
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(boutonAjouter);
      fireEvent.click(boutonItemActeInscription);
    });

    await waitFor(() => {
      expect(
        estDansTableauActesInscriptionsSauvegardes("PACS - 2011 - 1234590")
      ).toBeTruthy();
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeTruthy();
    });

    await act(async () => {
      fireEvent.mouseOver(
        screen.getByText("Rechercher sur une personne de la requête")
      );
      fireEvent.click(
        screen.getByText("Parent 2 - PHILIPS Yann (M), 01/02/2000")
      );
    });

    await waitFor(() => {
      expect(
        estDansTableauActesInscriptionsSauvegardes("PACS - 2011 - 1234590")
      ).toBeTruthy();
      expect(
        estDansTableauActesInscriptionsSauvegardes(
          "Autres pièces justificatives"
        )
      ).toBeTruthy();
    });
  });
});