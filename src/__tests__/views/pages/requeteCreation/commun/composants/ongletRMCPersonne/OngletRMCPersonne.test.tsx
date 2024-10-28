import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteCreationEtablissement } from "@mock/data/requeteCreation";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { useDataTableauxOngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/hook/DataTableauxOngletRMCPersonneHook";
import { OngletRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/OngletRMCPersonne";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useEffect } from "react";
import { describe, expect, test } from "vitest";

interface HookConsumerTableauRMCAutoPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerOngletRMCPersonne: React.FC<HookConsumerTableauRMCAutoPersonneProps> = props => {
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
      const titulaire = getPostulantNationaliteOuTitulaireActeTranscritDresse(props.requete);
      if (titulaire) {
        setRmcAutoPersonneParams(mapTitulaireVersRMCAutoPersonneParams(titulaire));
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
      dataActesInscriptionsSelectionnes={dataActesInscriptionsSelectionnes || []}
      setDataActesInscriptionsSelectionnes={setDataActesInscriptionsSelectionnes}
      setRmcAutoPersonneParams={setRmcAutoPersonneParams}
      tableauRMCPersonneEnChargement={rmcAutoPersonneEnChargement}
      tableauPersonnesSelectionneesEnChargement={!dataPersonnesSelectionnees}
      tableauActesInscriptionsSelectionnesEnChargement={!dataActesInscriptionsSelectionnes}
    />
  );
};

const REQUETE = mappingRequeteCreation(requeteCreationTranscription);

const hookConsumerOngletRMCPersonneAvecContexte = (requete: IRequeteCreation): any => {
  return (
    <MockRECEContextProvider>
      <HookConsumerOngletRMCPersonne requete={requete} />
    </MockRECEContextProvider>
  );
};

describe("Test l'affichage de l'onglet RMC Personne", () => {
  test("DOIT rendre le tableau de résultat la RMC Personne QUAND on ouvre l'onglet.", async () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    await waitFor(() => {
      expect(screen.getAllByText("Nom")).toBeDefined();
      expect(screen.getAllByText("Autres noms")).toBeDefined();
      expect(screen.getAllByText("Prénoms")).toBeDefined();
      expect(screen.getAllByText("Sexe")).toBeDefined();
      expect(screen.getAllByText("Date de naissance")).toBeDefined();
      expect(screen.getAllByText("Lieu de naissance")).toBeDefined();
      expect(screen.getAllByText("Nature")[0]).toBeDefined();
      expect(screen.getAllByText("Référence")[0]).toBeDefined();
      expect(screen.getByText("Statut / Type")).toBeDefined();
    });
  });

  test("DOIT rendre le tableau des personnes sélectionnées pour le projet QUAND on ouvre l'onglet.", async () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    await waitFor(() => {
      expect(screen.getByText("Personnes sélectionnées pour le projet")).toBeDefined();
      expect(screen.getAllByText("Nom")).toBeDefined();
      expect(screen.getAllByText("Autres noms")).toBeDefined();
      expect(screen.getAllByText("Prénoms")).toBeDefined();
      expect(screen.getAllByText("Sexe")).toBeDefined();
      expect(screen.getAllByText("Date de naissance")).toBeDefined();
      expect(screen.getAllByText("Lieu de naissance")).toBeDefined();
      expect(screen.getByText("Rôle")).toBeDefined();
    });
  });

  test("DOIT rendre le tableau des actes/inscriptions sélectionnés pour le projet QUAND on ouvre l'onglet.", async () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    await waitFor(() => {
      expect(screen.getByText("Actes et inscriptions sélectionnés pour le projet")).toBeDefined();
      expect(screen.getAllByText("Nom")).toBeDefined();
      expect(screen.getAllByText("Autres noms")).toBeDefined();
      expect(screen.getAllByText("Prénoms")).toBeDefined();
      expect(screen.getAllByText("Sexe")).toBeDefined();
      expect(screen.getAllByText("Date de naissance")).toBeDefined();
      expect(screen.getAllByText("Lieu de naissance")).toBeDefined();
      expect(screen.getAllByText("Nature")).toBeDefined();
      expect(screen.getAllByText("Référence")).toBeDefined();
      expect(screen.getByText("Type PJ")).toBeDefined();
    });
  });

  test("DOIT afficher le bouton-menu pour lancer une nouvelle RMC Auto QUAND on ouvre l'onglet.", async () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    await waitFor(() => {
      expect(screen.getByText("Rechercher sur une personne de la requête")).toBeDefined();
    });
  });

  test.skip("DOIT rafraichir les données du tableau QUAND on sélectionne une nouvelle personne depuis le bouton 'RMC Auto sur autre personne'", () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    waitFor(() => {
      expect(screen.getByText("DUPONT")).toBeDefined();
      expect(screen.getByText("Paul")).toBeDefined();
    });

    fireEvent.mouseOver(screen.getByText("Rechercher sur une personne de la requête"));
    fireEvent.click(screen.getByText("Parent 2 - PHILIPS Yann (M), 01/02/2000"));

    waitFor(() => {
      expect(screen.queryByText("DUPONT")).toBeNull();
      expect(screen.queryByText("Paul")).toBeNull();
    });
  });

  test("DOIT ne pas afficher le tableau des personnes selectionnées et les boutons ajouter personne QUAND on se trouve en étblissement", async () => {
    const requeteEtablissement = mappingRequeteCreation(requeteCreationEtablissement);
    render(hookConsumerOngletRMCPersonneAvecContexte(requeteEtablissement));

    await waitFor(() => {
      expect(screen.queryByTitle("Ajouter cette personne au projet")).toBeNull();
      expect(screen.queryByText("Personnes sélectionnées pour le projet")).toBeNull();
      expect(screen.queryByText("Actes et inscriptions sélectionnés pour le projet")).toBeDefined();
    });
  });
});

describe.skip("Test le fonctionnement de l'ajout / suppression des personnes au projet.", () => {
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

  test("DOIT ajouter / retirer une personne au tableau des personnes sauvegardées avec le rôle correspondant QUAND on ajoute / retire une personne au projet.", () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    const boutonAjouter = screen.getAllByText("+")[0];
    const boutonItemTitulaire = screen.getAllByText("Parent 2")[0];

    waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemTitulaire).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });

    fireEvent.click(boutonAjouter);
    fireEvent.click(boutonItemTitulaire);

    waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });

    const boutonRetirer = screen.getAllByTitle("Retirer cette personne du projet")[1];

    waitFor(() => {
      expect(boutonRetirer).toBeDefined();
    });

    fireEvent.click(boutonRetirer);

    waitFor(() => {
      expect(boutonRetirer).not.toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });
  });

  test("DOIT rendre invisible / visible le bouton d'ajout d'une personne QUAND on ajoute / retire cette personne du projet.", () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    let boutonAjouter = screen.getByTitle("Ajouter cette personne au projet");
    const boutonItemParent = screen.getByText("Parent 2");

    waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemParent).toBeDefined();
    });

    fireEvent.click(boutonAjouter);
    fireEvent.click(boutonItemParent);

    const boutonRetirer = screen.getAllByTitle("Retirer cette personne du projet")[1];

    waitFor(() => {
      expect(boutonAjouter).not.toBeDefined();
      expect(boutonRetirer).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });

    fireEvent.click(boutonRetirer);

    boutonAjouter = screen.getByTitle("Ajouter cette personne au projet");
    waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });
  });

  test("DOIT conserver les personnes dans le tableau des personnes sauvegardees QUAND on effectue une RMC sur une autre personne.", () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    // Ajouter personne
    const boutonAjouter = screen.getAllByText("+")[0];
    const boutonItemTitulaire = screen.getAllByText("Parent 2")[0];

    waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemTitulaire).toBeDefined();

      expect(screen.getByText("DUPONT")).toBeDefined();
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeFalsy();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeFalsy();
    });

    fireEvent.click(boutonAjouter);
    fireEvent.click(boutonItemTitulaire);

    waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeTruthy();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });

    fireEvent.mouseOver(screen.getByText("Rechercher sur une personne de la requête"));
    fireEvent.click(screen.getByText("Parent 2 - PHILIPS Yann (M), 01/02/2000"));

    waitFor(() => {
      expect(estDansTableauPersonnesSauvegardees("DUPONT")).toBeTruthy();
      expect(estDansTableauPersonnesSauvegardees("Parent 2")).toBeTruthy();
    });
  });
});

describe.skip("Test le fonctionnement de l'ajout / suppression des actes ou isncriptions au projet.", () => {
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

  test("DOIT ajouter / retirer un acte ou inscription au tableau des acte ou inscriptions sauvegardés avec le type PJ correspondant QUAND on ajoute / retire un acte ou inscription au projet.", () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    const boutonAjouter = screen.getByTitle("Ajouter cet acte ou inscription au projet");
    const boutonItemTitulaire = screen.getByText("Autres pièces justificatives");

    waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemTitulaire).toBeDefined();
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeFalsy();
    });

    fireEvent.click(boutonAjouter);
    fireEvent.click(boutonItemTitulaire);

    waitFor(() => {
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeTruthy();
    });

    const boutonRetirerAlpha = screen.getAllByTitle("Retirer cet acte ou inscription du projet")[2];

    waitFor(() => {
      expect(boutonRetirerAlpha).toBeDefined();
    });

    fireEvent.click(boutonRetirerAlpha);

    waitFor(() => {
      expect(boutonRetirerAlpha).not.toBeDefined();
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeFalsy();
    });
  });

  test("DOIT afficher / masquer le bouton d'ajout d'un acte ou inscription QUAND on ajoute / retire cet acte ou inscription du projet.", () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    const boutonAjouter = screen.getByTitle("Ajouter cet acte ou inscription au projet");
    const boutonItemActeInscription = screen.getByText("Autres pièces justificatives");

    waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemActeInscription).toBeDefined();
    });

    fireEvent.click(boutonAjouter);
    fireEvent.click(boutonItemActeInscription);

    const boutonRetirer = screen.getAllByTitle("Retirer cet acte ou inscription du projet")[2];
    waitFor(() => {
      expect(boutonAjouter).not.toBeDefined();
      expect(boutonRetirer).toBeDefined();
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeTruthy();
    });

    fireEvent.click(boutonRetirer);

    waitFor(() => {
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeFalsy();
    });
  });

  test("DOIT conserver les actes ou inscriptions dans le tableau des actes ou inscriptions sauvegardés QUAND on effectue une RMC sur une autre personne.", () => {
    render(hookConsumerOngletRMCPersonneAvecContexte(REQUETE));

    // Ajouter acte ou inscription
    const boutonAjouter = screen.getByTitle("Ajouter cet acte ou inscription au projet");
    const boutonItemActeInscription = screen.getByText("Autres pièces justificatives");

    waitFor(() => {
      expect(boutonAjouter).toBeDefined();
      expect(boutonItemActeInscription).toBeDefined();

      expect(screen.getByText("PACS - 2011 - 1234590")).toBeDefined();
      expect(estDansTableauActesInscriptionsSauvegardes("PACS - 2011 - 1234590")).toBeFalsy();
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeFalsy();
    });

    fireEvent.click(boutonAjouter);
    fireEvent.click(boutonItemActeInscription);

    waitFor(() => {
      expect(estDansTableauActesInscriptionsSauvegardes("PACS - 2011 - 1234590")).toBeTruthy();
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeTruthy();
    });

    fireEvent.mouseOver(screen.getByText("Rechercher sur une personne de la requête"));
    fireEvent.click(screen.getByText("Parent 2 - PHILIPS Yann (M), 01/02/2000"));

    waitFor(() => {
      expect(estDansTableauActesInscriptionsSauvegardes("PACS - 2011 - 1234590")).toBeTruthy();
      expect(estDansTableauActesInscriptionsSauvegardes("Autres pièces justificatives")).toBeTruthy();
    });
  });
});
