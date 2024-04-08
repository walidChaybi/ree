import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import { idRequeteRDCSC, requeteRDCSC } from "@mock/data/requeteDelivrance";
import { requeteInformation } from "@mock/data/requeteInformation";
import { Droit } from "@model/agent/enum/Droit";
import { TypeEntite } from "@model/agent/enum/TypeEntite";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IEntite } from "@model/agent/IEntiteRattachement";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_INFORMATION
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

const listeUtilisateurs = [
  {
    entite: { estDansSCEC: true, idEntite: "123" } as IEntite,
    prenom: "",
    nom: "str1",
    habilitations: [
      {
        profil: {
          droits: [{ nom: Droit.DELIVRER } as IDroit]
        } as IProfil
      } as IHabilitation
    ],
    idUtilisateur: "1234"
  } as IUtilisateur,
  {
    entite: { estDansSCEC: true, idEntite: "1234" } as IEntite,
    prenom: "",
    nom: "str2",
    habilitations: [
      {
        profil: {
          droits: [{ nom: Droit.DELIVRER } as IDroit]
        } as IProfil
      } as IHabilitation
    ],
    idUtilisateur: "12345"
  } as IUtilisateur,
  {
    entite: { estDansSCEC: true, idEntite: "1234" } as IEntite,
    prenom: "",
    nom: "str3",
    habilitations: [
      {
        profil: {
          droits: [{ nom: Droit.INFORMER_USAGER } as IDroit]
        } as IProfil
      } as IHabilitation
    ],
    idUtilisateur: "12345"
  } as IUtilisateur
];

function afficheComposant() {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: (
          <MenuTransfert
            idRequete={requeteRDCSC.id}
            typeRequete={requeteRDCSC.type}
            idUtilisateurRequete="111"
            sousTypeRequete={requeteRDCSC.sousType}
            estTransfert={true}
          />
        )
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    ]
  );

  render(<RouterProvider router={router} />);

  storeRece.listeUtilisateurs = listeUtilisateurs;
}

test("renders du bloc Menu Transfert ouvert ", async () => {
  afficheComposant();

  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)
  ).toBeTruthy();

  const menuTransfert = screen.getByText("Transférer");
  const choixService = screen.getByText(/À un service+/);
  const choixOEC = screen.getByText(/À un officier de l'état civil+/);

  await waitFor(() => {
    expect(menuTransfert).toBeDefined();
    expect(choixService).toBeDefined();
    expect(choixOEC).toBeDefined();
  });
});

test("check popin service", async () => {
  afficheComposant();

  let choixService: HTMLElement;
  await waitFor(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  await waitFor(() => {
    choixService = screen.getByText(/À un service+/);
    fireEvent.click(choixService);
  });

  const valider = screen.getByText(/Valider+/) as HTMLButtonElement;
  const annuler = screen.getByText(/Annuler+/) as HTMLButtonElement;
  const title = screen.getByText(/Transfert à un service+/);
  expect(valider).toBeDefined();
  expect(valider.disabled).toBeTruthy();
  expect(title).toBeDefined();
  const autocomplete = screen.getByLabelText(
    /TransfertPopin+/
  ) as HTMLInputElement;
  expect(autocomplete).toBeDefined();

  await waitFor(() => {
    fireEvent.click(annuler);
  });
});

test("check popin agent", async () => {
  afficheComposant();

  let choixService: HTMLElement;
  await waitFor(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  await waitFor(() => {
    choixService = screen.getByText(/À un officier de l'état civil+/);
    fireEvent.click(choixService);
  });

  const valider = screen.getByText(/Valider+/) as HTMLButtonElement;
  const title = screen.getByText("Transfert à un officier de l'état civil");
  expect(valider).toBeDefined();
  expect(valider.disabled).toBeTruthy();
  expect(title).toBeDefined();
  const autocomplete = screen.getByLabelText(
    /TransfertPopin+/
  ) as HTMLInputElement;
  expect(autocomplete).toBeDefined();
});

test("check autocomplete service", async () => {
  afficheComposant();

  storeRece.listeEntite = [
    {
      idEntite: "1234",
      type: TypeEntite.BUREAU,
      code: "1234",
      libelleEntite: "str1",
      estDansSCEC: true
    },
    {
      idEntite: "12345",
      type: TypeEntite.DEPARTEMENT,
      code: "12345",
      libelleEntite: "str2",
      estDansSCEC: true
    }
  ];
  const menuTransfert = screen.getByText("Transférer");
  await waitFor(() => {
    expect(menuTransfert).toBeInTheDocument();
  });
  fireEvent.click(menuTransfert);

  const choixService = screen.getByText(/À un service+/);
  await waitFor(() => {
    expect(choixService).toBeInTheDocument();
  });
  fireEvent.click(choixService);

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;
  autocomplete.focus();
  fireEvent.change(inputChampRecherche, {
    target: {
      value: "s"
    }
  });
  const str1 = screen.getByText("str1");

  await waitFor(() => {
    expect(str1).toBeInTheDocument();
    expect(screen.getByText("str2")).toBeInTheDocument();
  });
  fireEvent.click(str1);

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  await waitFor(() => {
    expect(inputChampRecherche.value).toStrictEqual("str1");
    expect(valider.disabled).toBeFalsy();
  });

  const reset = screen.getByTitle("Vider le champ");

  await waitFor(() => {
    expect(reset).toBeDefined();
  });

  fireEvent.click(reset);

  await waitFor(() => {
    expect(valider.disabled).toBeTruthy();
  });
});

test("check autocomplete agent", async () => {
  storeRece.listeUtilisateurs = listeUtilisateurs;
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: (
          <MenuTransfert
            idRequete={requeteRDCSC.id}
            typeRequete={requeteRDCSC.type}
            idUtilisateurRequete="111"
            sousTypeRequete={requeteRDCSC.sousType}
            estTransfert={true}
          />
        )
      },
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <EspaceDelivrancePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequeteRDCSC
      )
    ]
  );

  render(<RouterProvider router={router} />);

  act(() => {
    const menuTransfert = screen.getByText("Transférer");
    fireEvent.click(menuTransfert);
  });

  act(() => {
    const choixService = screen.getByText(/À un officier de l'état civil+/);
    fireEvent.click(choixService);
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;
  autocomplete.focus();
  act(() => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
  });
  const str1 = screen.getByText("str1");
  expect(str1).toBeInTheDocument();
  expect(screen.getByText("str2")).toBeInTheDocument();

  act(() => {
    fireEvent.click(str1);
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  expect(inputChampRecherche.value).toStrictEqual("str1 ");
  expect(valider.disabled).toBeFalsy();

  await act(async () => {
    fireEvent.click(valider);
  });

  expect(router.state.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
});

test("renders du bloc Menu Transfert fermer ", async () => {
  storeRece.listeUtilisateurs = listeUtilisateurs;
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        element: (
          <MenuTransfert
            idRequete={requeteInformation.id}
            typeRequete={requeteInformation.type}
            idUtilisateurRequete="111"
            sousTypeRequete={requeteInformation.sousType}
            estTransfert={true}
            menuFermer={false}
          />
        )
      },
      {
        path: URL_MES_REQUETES_INFORMATION,
        element: <EspaceInformationPage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        requeteInformation.id
      )
    ]
  );

  render(<RouterProvider router={router} />);

  let menuTransfert = screen.getByText("Transférer");

  await waitFor(() => {
    expect(menuTransfert).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(menuTransfert);
  });

  let choixService = screen.getByText(/À un service+/);
  let choixOEC = screen.getByText(/À un officier de l'état civil+/);

  await waitFor(() => {
    expect(choixService).toBeDefined();
    expect(choixOEC).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(choixOEC);
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
    autocomplete.focus();
  });
  await act(async () => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
  });

  const OEC = screen.getByText("str3");
  await waitFor(() => {
    expect(OEC).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(OEC);
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;
  await waitFor(() => {
    expect(valider).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(valider);
  });

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
  });
});
