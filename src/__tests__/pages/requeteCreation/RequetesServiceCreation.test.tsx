import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { OfficierContext } from "@core/contexts/OfficierContext";
import { mappingOfficier } from "@core/login/LoginHook";
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
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { createMemoryHistory } from "history";
import React, { useState } from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "../../../mock/data/connectedUserAvecDroit";
import { configRequetesCreation } from "../../../mock/superagent-config/superagent-mock-requetes-creation";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesCreation
);

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

afterAll(() => {
  superagentMock.unset();
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

test("Attendu: les requêtes de service s'affichent correctement", async () => {
  render(<HookConsummer />);

  await waitFor(() => {
    // Attendu: les titres des colonnes sont corrects
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getByText("Priorisation")).toBeDefined();
    expect(screen.getByText("Postulant/Déclarant")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Attribuée à")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getByText("Statut")).toBeDefined();

    // Attendu: les données sont présentes
    expect(screen.getByText("N7MMP8 / B-2-8GRZFCS3P")).toBeDefined();
    expect(screen.getByText("YRQFLU /")).toBeDefined();
  });
});

test("Attendu: Le tri sur les requêtes de service s'effectue correctement", async () => {
  render(<HookConsummer />);

  await waitFor(() => {
    expect(screen.getByText("Statut")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Statut"));

  await waitFor(() => {
    expect(screen.getByText("Statut")).toBeDefined();
  });
});

test("Attendu: L'affichage de l'attribution des requêtes de service s'effectue correctement.", async () => {
  history.push(URL_REQUETES_CREATION_SERVICE);

  await act(async () => {
    render(
      <Router history={history}>
        <OfficierContext.Provider
          value={{
            officierDataState: storeRece.utilisateurCourant
          }}
        >
          <EspaceCreationPage selectedTab={1} />
        </OfficierContext.Provider>
      </Router>
    );
  });

  const getColonnesOfficierEtCheckbox = (requete: HTMLElement) => ({
    colonneOfficier: requete.childNodes.item(5) as HTMLElement,
    colonneCheckbox: requete.childNodes.item(6).firstChild
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

  const autocomplete = screen.getByTestId("autocomplete");
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

  let requete: HTMLElement;

  await waitFor(() => {
    requete = screen.getByText("N7MMP8 / B-2-8GRZFCS3P");
    fireEvent.click(requete);
  });
});

afterAll(() => {
  superagentMock.unset();
});
