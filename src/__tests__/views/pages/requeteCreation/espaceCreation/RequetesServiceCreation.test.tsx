import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { OfficierContext } from "@core/contexts/OfficierContext";
import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "@mock/data/connectedUserAvecDroit";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { TypeEntite } from "@model/agent/enum/TypeEntite";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IEntite } from "@model/agent/IEntiteRattachement";
import { IPerimetre } from "@model/agent/IPerimetre";
import {
  IUtilisateur,
  mapHabilitationsUtilisateur
} from "@model/agent/IUtilisateur";
import EspaceCreationPage from "@pages/requeteCreation/espaceCreation/EspaceCreationPage";
import { statutsRequetesCreation } from "@pages/requeteCreation/espaceCreation/params/EspaceCreationParams";
import { RequetesServiceCreation } from "@pages/requeteCreation/espaceCreation/RequetesServiceCreation";
import { URL_REQUETES_CREATION_SERVICE } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { UN } from "@util/Utils";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { createMemoryHistory } from "history";
import React, { useState } from "react";
import { Router } from "react-router-dom";

beforeAll(() => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );

  storeRece.listeUtilisateurs = [
    {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young",
      trigramme: "FOO",
      habilitations: [
        {
          idHabilitation: "123",
          profil: {
            droits: [{ nom: Droit.CREER_ACTE_ETABLI } as IDroit]
          } as IProfil,
          perimetre: {
            nom: Perimetre.MEAE,
            listeIdTypeRegistre: ["meae"]
          } as IPerimetre
        } as IHabilitation
      ],
      entite: {
        idEntite: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
        type: TypeEntite.SECTION,
        code: "Assistance Informatique",
        libelleEntite: "BAG Assitance Informatique"
      } as IEntite
    } as IUtilisateur
  ] as IUtilisateur[];
});

const history = createMemoryHistory();

const queryParametersPourRequetes = {
  statuts: statutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const HookConsummer: React.FC = () => {
  history.push(URL_REQUETES_CREATION_SERVICE);
  const [popinAttribuerAOuvert, setPopinAttribuerAOuvert] =
    useState<boolean>(false);

  return (
    <Router history={history}>
      <RequetesServiceCreation
        queryParametersPourRequetes={queryParametersPourRequetes}
        popinAttribuerAOuvert={popinAttribuerAOuvert}
        setPopinAttribuerAOuvert={setPopinAttribuerAOuvert}
      />
    </Router>
  );
};

test("DOIT afficher le tableau des requêtes de service à vide QUAND on arrive sur la page", async () => {
  render(<HookConsummer />);

  await waitFor(() => {
    // Attendu: les titres des colonnes sont corrects
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getAllByText("Priorisation")[1]).toBeDefined();
    expect(screen.getByText("Postulant/Déclarant")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Attribuée à")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getAllByText("Statut")[1]).toBeDefined();

    // Attendu: les données sont présentes
    expect(screen.queryByText("B-2-8GRZFCS3P")).toBeNull();
    expect(screen.queryByText("YRQFLU")).toBeNull();
  });

  fireEvent.click(screen.getByTestId("loupeButton"));

  await waitFor(() => {
    expect(screen.getByText("B-2-8GRZFCS3P")).toBeDefined();
    expect(screen.getByText("YRQFLU")).toBeDefined();
  });
});

test("DOIT effectuer correctement le tri sur les requêtes de service QUAND on tri par une colonne", async () => {
  render(<HookConsummer />);

  await waitFor(() => {
    expect(screen.getAllByText("Statut")[1]).toBeDefined();
  });

  fireEvent.click(screen.getAllByText("Statut")[1]);

  await waitFor(() => {
    expect(screen.getAllByText("Statut")[1]).toBeDefined();
  });
});

test("DOIT correctement afficher l'attribution des requêtes de service QUAND on clique sur attribuer à", async () => {
  history.push(URL_REQUETES_CREATION_SERVICE);

  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{
          officierDataState: storeRece.utilisateurCourant
        }}
      >
        <EspaceCreationPage selectedTab={UN} />
      </OfficierContext.Provider>
    </Router>
  );

  await act(async () => {
    fireEvent.click(screen.getByTestId("loupeButton"));
  });

  const getColonnesOfficierEtCheckbox = (requete: HTMLElement) => ({
    colonneOfficier: requete.childNodes.item(5) as HTMLElement,
    colonneCheckbox: requete.childNodes.item(6).firstChild?.firstChild
      ?.firstChild as HTMLElement
  });

  const boutonAttribuerA = screen.getByText(/Attribuer à/i);
  const getPopinAttribution = (): HTMLElement | null =>
    screen.queryByText(/Attribuer à un officier de l'état civil/i);
  const requeteAlpha = getColonnesOfficierEtCheckbox(
    screen.getByTestId("c9b817ca-1899-450e-9f04-979541946011")
  );
  const requeteBeta = getColonnesOfficierEtCheckbox(
    screen.getByTestId("54ddf213-d9b7-4747-8e92-68c220f66de3")
  );

  await waitFor(() => {
    expect(boutonAttribuerA).toBeInTheDocument();
    expect(getPopinAttribution()).not.toBeInTheDocument();
    expect(requeteAlpha.colonneCheckbox).not.toBeChecked();
    expect(requeteBeta.colonneCheckbox).not.toBeChecked();
  });

  await act(async () => {
    fireEvent.click(requeteAlpha.colonneCheckbox);
    fireEvent.click(boutonAttribuerA);
  });

  await waitFor(() => {
    expect(requeteAlpha.colonneCheckbox).toBeChecked();
    expect(requeteBeta.colonneCheckbox).not.toBeChecked();

    expect(getPopinAttribution()).toBeInTheDocument();
    expect(screen.getByText("Valider")).toBeDisabled();
  });

  const autocomplete = screen.getAllByTestId("autocomplete")[2];
  const champRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;
  autocomplete.focus();

  await act(async () => {
    fireEvent.change(champRecherche, {
      target: { value: "Y" }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Young Ashley")).toBeEnabled();
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Young Ashley"));
  });
  await act(async () => {
    fireEvent.click(screen.getByText("Valider"));
  });

  await waitFor(() => {
    expect(getPopinAttribution()).not.toBeInTheDocument();
  });
});

test("DOIT rendre possible le click sur une requête", async () => {
  render(<HookConsummer />);

  fireEvent.click(screen.getByTestId("loupeButton"));

  let requete: HTMLElement;

  await waitFor(() => {
    requete = screen.getByText("B-2-8GRZFCS3P");
    fireEvent.click(requete);
  });
});

test("DOIT pouvoir rechercher une requete via son numero NATALi", async () => {
  render(<HookConsummer />);

  const input = screen.getByPlaceholderText("Rechercher un dossier Natali");
  const boutonRechercher = screen.getByTestId("loupeButton");

  fireEvent.change(input, { target: { value: "2022X 200178" } });
  fireEvent.click(boutonRechercher);

  await waitFor(() => {
    expect(screen.queryByText("B-2-8GRZFCS3P")).toBeNull();
    expect(screen.queryByText("YRQFLU")).toBeNull();
    expect(screen.getByText("2022X 200178")).toBeDefined();
  });
});
