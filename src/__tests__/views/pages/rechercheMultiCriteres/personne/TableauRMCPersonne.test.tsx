import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import {
  IRMCAutoPersonneParams,
  useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { TableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonne";
import { mapDataTableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { IDataTableauRMCPersonne } from "@pages/requeteCreation/commun/composants/ongletRMCPersonne/IDataTableauRMCPersonne";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

interface HookConsumerTableauRMCPersonneProps {
  requete: IRequeteCreationTranscription;
}

const HookConsumerTableauRMCPersonne: React.FC<
  HookConsumerTableauRMCPersonneProps
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

  return (
    <TableauRMCPersonne
      dataTableauRMCPersonne={
        resultatRMCAutoPersonne
          ? mapDataTableauRMCPersonne(resultatRMCAutoPersonne)
          : []
      }
      identifiantsPersonnesSelectionnees={[]}
      getIdentifiantPersonne={() => ""}
      onClickBoutonAjouterPersonne={() => {}}
      natureActeRequete={NatureActeRequete.NAISSANCE}
    />
  );
};

test("Attendu: L'affichage du tableau de la RMC Personne s'affiche correctement.", async () => {
  const requete = mappingRequeteCreation(requeteCreationTranscription);
  await act(async () => {
    render(<HookConsumerTableauRMCPersonne requete={requete} />);
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
    expect(screen.getByText("DUPONT")).toBeInTheDocument();
    expect(screen.getByText("Paul")).toBeInTheDocument();
    expect(screen.getAllByText("M")).toBeDefined();
    expect(screen.getAllByText("04/03/1963")).toBeDefined();
    expect(screen.getAllByText("Dunkerque")).toBeDefined();
    expect(screen.getByText("PACS - 2011 - 1234590")).toBeInTheDocument();
  });
});

const tableauRMCMock: IDataTableauRMCPersonne[] = [
  {
    idPersonne: "74a741ad-bca0-412b-9017-6c79e3f54e70",
    nom: "Prodesk",
    autresNoms: "",
    prenoms: "Elodie",
    dateNaissance: "25/06/1990",
    lieuNaissance: "Barcelone (Espagne)",
    sexe: "F",
    idActeOuInscription: "",
    nature: "",
    statut: "",
    reference: "",
    statutOuType: ""
  },
  {
    idActeOuInscription: "7566e16c-2b0e-11eb-adc1-0242ac120002",
    nature: "tutelle aménagée",
    statut: "ACTIF",
    reference: "RC - 2020 - 14",
    categorieRepertoire: TypeFiche.RC,
    statutOuType: "Inscription",
    idPersonne: "",
    nom: "",
    autresNoms: "",
    prenoms: "",
    dateNaissance: "",
    lieuNaissance: "",
    sexe: ""
  }
];

test("Ouverture d'un acte", async () => {
  render(
    <TableauRMCPersonne
      dataTableauRMCPersonne={tableauRMCMock}
      identifiantsPersonnesSelectionnees={[]}
      getIdentifiantPersonne={data => data.idPersonne}
      onClickBoutonAjouterPersonne={() => {}}
      natureActeRequete={NatureActeRequete.NAISSANCE}
    />
  );

  const ligne = screen.getByText("RC - 2020 - 14");

  const vue = screen.queryByText("Visualisation du RC");
  expect(vue).toBeNull();

  fireEvent.click(ligne);

    await waitFor(() => {
      const vue = screen.getByText("Visualisation du RC");
      expect(vue).toBeDefined();
    });
});