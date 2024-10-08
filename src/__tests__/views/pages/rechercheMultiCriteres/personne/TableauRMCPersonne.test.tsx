import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import {
  IRMCAutoPersonneParams,
  useRMCAutoPersonneApiAvecCacheHook
} from "@hook/rmcAuto/RMCAutoPersonneApiHook";
import { mapTitulaireVersRMCAutoPersonneParams } from "@hook/rmcAuto/RMCAutoPersonneUtils";
import { userDroitConsulterArchive } from "@mock/data/mockConnectedUserAvecDroit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { officierALeDroitSurLePerimetre } from "@model/agent/IOfficier";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { IDataTableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/IDataTableauRMCPersonne";
import { TableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonne";
import { mapDataTableauRMCPersonne } from "@pages/rechercheMultiCriteres/personne/TableauRMCPersonneUtils";
import { getPostulantNationaliteOuTitulaireActeTranscritDresse } from "@pages/requeteCreation/commun/requeteCreationUtils";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { beforeAll, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";

beforeAll(() => {
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
      identifiantsActesInscriptionsSelectionnes={[]}
      natureActeRequete={NatureActeRequete.NAISSANCE}
      onClickBoutonAjouterPersonneOuActeInscription={() => {}}
      typeRedactionActe={"" as TypeRedactionActe}
    />
  );
};

test("Attendu: L'affichage du tableau de la RMC Personne s'affiche correctement.", () => {
  const requete = mappingRequeteCreation(requeteCreationTranscription);
  render(<HookConsumerTableauRMCPersonne requete={requete} />);

  waitFor(() => {
    // Colonnes tableau
    expect(screen.getByText("Nom")).toBeDefined();
    expect(screen.getByText("Autres noms")).toBeDefined();
    expect(screen.getByText("Prénoms")).toBeDefined();
    expect(screen.getByText("Sexe")).toBeDefined();
    expect(screen.getByText("Date de naissance")).toBeDefined();
    expect(screen.getByText("Lieu de naissance")).toBeDefined();
    expect(screen.getByText("Nature")).toBeDefined();
    expect(screen.getByText("Référence")).toBeDefined();
    expect(screen.getByText("Statut / Type")).toBeDefined();

    // Données tableau
    expect(screen.getByText("DUPONT")).toBeDefined();
    expect(screen.getByText("Paul")).toBeDefined();
    expect(screen.getAllByText("M")).toBeDefined();
    expect(screen.getAllByText("04/03/1963")).toBeDefined();
    expect(screen.getAllByText("Dunkerque")).toBeDefined();
    expect(screen.getByText("PACS - 2011 - 1234590")).toBeDefined();
  });
});

const tableauRMCMock: IDataTableauRMCPersonne[] = [
  {
    idPersonneOuActeInscription: "74a741ad-bca0-412b-9017-6c79e3f54e70",
    estDataPersonne: true,
    nom: "Prodesk",
    autresNoms: "",
    prenoms: "Elodie",
    dateNaissance: "25/06/1990",
    lieuNaissance: "Barcelone (Espagne)",
    sexe: "F",
    nature: "",
    statut: "",
    reference: "",
    statutOuType: ""
  },
  {
    idPersonneOuActeInscription: "7566e16c-2b0e-11eb-adc1-0242ac120002",
    estDataPersonne: false,
    nature: "tutelle aménagée",
    statut: "ACTIF",
    reference: "RC - 2020 - 14",
    typeFiche: TypeFiche.RC,
    statutOuType: "Inscription",
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
      natureActeRequete={NatureActeRequete.NAISSANCE}
      identifiantsActesInscriptionsSelectionnes={[]}
      onClickBoutonAjouterPersonneOuActeInscription={() => {}}
      typeRedactionActe={"" as TypeRedactionActe}
    />
  );

  const ligne = screen.getByText("RC - 2020 - 14");

  const vue = screen.queryByText("Visualisation du RC");
  expect(vue).toBeNull();

  fireEvent.click(ligne);

  waitFor(() => {
    const vue = screen.queryByText("Visualisation du RC");
    if (
      officierALeDroitSurLePerimetre(
        Droit.CONSULTER,
        Perimetre.TOUS_REGISTRES,
        userDroitConsulterArchive
      )
    ) {
      expect(vue).toBeDefined();
    } else {
      expect(vue).toBeNull();
    }
  });
});
