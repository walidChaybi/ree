import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import {
  IRMCAutoPersonneParams,
  useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IDataTableauPersonneSelectionnee } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauPersonneSauvegardee";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React, { useEffect, useState } from "react";

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
  const [dataPersonnesSauvegardees, setDataPersonnesSauvegardees] = useState<
    IDataTableauPersonneSelectionnee[]
  >([]);

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
      resultatRMCPersonne={resultatRMCAutoPersonne ?? []}
      sousTypeRequete={props.requete.sousType}
      listeTitulaires={props.requete.titulaires}
      handleClickMenuItem={handleClickSelectionTitulaireRmcPersonne}
      natureActeRequete={NatureActeRequete.NAISSANCE}
      dataPersonnesSelectionnees={dataPersonnesSauvegardees}
      setDataPersonnesSelectionnees={setDataPersonnesSauvegardees}
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
      expect(screen.getByText("Nature")).toBeInTheDocument();
      expect(screen.getByText("Référence")).toBeInTheDocument();
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
});

describe("Test le fonctionnement de l'onglet RMC Personne", () => {
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

  test("DOIT rafraichir les données du tableau QUAND on sélectionne une nouvelle personne depuis le bouton 'RMC Auto sur autre personne'", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    await waitFor(() => {
      expect(screen.getByText("DUPONT")).toBeInTheDocument();
      expect(screen.getByText("Paul")).toBeInTheDocument();
      expect(screen.queryByText("PHILIPS")).not.toBeInTheDocument();
      expect(screen.queryByText("Yann")).not.toBeInTheDocument();
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
      expect(screen.queryAllByText("PHILIPS")).toBeDefined();
      expect(screen.queryAllByText("Yann")).toBeDefined();
    });
  });

  test("DOIT ajouter / retirer une personne au tableau des personnes sauvegardées avec le rôle correspondant QUAND on ajoute / retire une personne au projet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    const listeBoutonAjouter = screen.getAllByText("+");
    const boutonAjouterAlpha = listeBoutonAjouter[0];
    const boutonItemTitulaireAlpha = screen.getAllByText("Titulaire")[0];

    await waitFor(() => {
      expect(boutonAjouterAlpha).toBeDefined();
      expect(boutonItemTitulaireAlpha).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Titulaire")).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(boutonAjouterAlpha);
      fireEvent.click(boutonItemTitulaireAlpha);
    });

    await waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("Titulaire")).toBeTruthy();
    });

    const boutonRetirerAlpha = screen.getByTitle(
      "Retirer cette personne du projet"
    );

    await waitFor(() => {
      expect(boutonRetirerAlpha).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(boutonRetirerAlpha);
    });

    await waitFor(() => {
      expect(boutonRetirerAlpha).not.toBeInTheDocument();
      expect(estDansTableauPersonnesSauvegardees("Titulaire")).toBeFalsy();
    });
  });

  test("DOIT verrouiller / déverrouiller le bouton d'ajout d'une personne QUAND on ajoute / retire cette personne du projet.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    const boutonAjouter = screen.getAllByText("+")[0];
    const boutonItemParent = screen.getAllByText("Parent 1")[0];

    await waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemParent).toBeDefined();
      expect(boutonAjouter).not.toHaveAttribute("disabled");
    });

    await act(async () => {
      fireEvent.click(boutonAjouter);
      fireEvent.click(boutonItemParent);
    });

    const boutonRetirer = screen.getByTitle("Retirer cette personne du projet");
    await waitFor(() => {
      expect(boutonAjouter).toHaveAttribute("disabled");
      expect(boutonRetirer).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Parent 1")).toBeTruthy();
    });

    await act(async () => {
      fireEvent.click(boutonRetirer);
    });

    await waitFor(() => {
      expect(boutonAjouter).not.toHaveAttribute("disabled");
      expect(estDansTableauPersonnesSauvegardees("Parent 1")).toBeFalsy();
    });
  });

  test("DOIT conserver les personnes dans le tableau des personnes sauvegardees QUAND on effectue une RMC sur une autre personne.", async () => {
    await act(async () => {
      render(<HookConsumerOngletRMCPersonne requete={REQUETE} />);
    });

    // Ajouter personne
    const boutonAjouter = screen.getAllByText("+")[0];
    const boutonItemTitulaire = screen.getAllByText("Titulaire")[0];

    await waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemTitulaire).toBeDefined();

      expect(screen.getByText("DUPONT")).toBeInTheDocument();
      expect(screen.queryByText("PHILIPS")).not.toBeInTheDocument();

      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeFalsy();
      expect(estDansTableauPersonnesSauvegardees("Titulaire")).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(boutonAjouter);
      fireEvent.click(boutonItemTitulaire);
    });

    await waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeTruthy();
      expect(estDansTableauPersonnesSauvegardees("Titulaire")).toBeTruthy();
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
      expect(screen.queryByText("PHILIPS")).toBeInTheDocument();
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeTruthy();
      expect(estDansTableauPersonnesSauvegardees("Titulaire")).toBeTruthy();
    });
  });
});
