import { MenuTransfert } from "@composant/menuTransfert/MenuTransfert";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { idRequeteRDCSC, requeteRDCSC } from "@mock/data/requeteDelivrance";
import { requeteInformation } from "@mock/data/requeteInformation";
import { IDroit, IHabilitation, IProfil } from "@model/agent/Habilitation";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { ETypeService } from "@model/agent/enum/ETypeService";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_INFORMATION
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

const listeUtilisateurs = [
  {
    service: { estDansScec: true, idService: "123" } as IService,
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
    service: { estDansScec: true, idService: "1234" } as IService,
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
    service: { estDansScec: true, idService: "1234" } as IService,
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

const listeServices = [
  {
    idService: "1234",
    type: ETypeService.BUREAU,
    code: "1234",
    libelleService: "str1",
    estDansScec: true
  },
  {
    idService: "12345",
    type: ETypeService.DEPARTEMENT,
    code: "12345",
    libelleService: "str2",
    estDansScec: true
  }
];

const routerAvecContexte = (
  router: any,
  utilisateurs?: IUtilisateur[],
  services?: IService[]
): any => {
  return (
    <MockRECEContextProvider utilisateurs={utilisateurs} services={services}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};

function afficheComposant(
  utilisateurs?: IUtilisateur[],
  services?: IService[]
) {
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

  render(routerAvecContexte(router, utilisateurs, services));
}

test.skip("renders du bloc Menu Transfert ouvert ", () => {
  afficheComposant(listeUtilisateurs);

  waitFor(() => {
    expect(
      gestionnaireFeatureFlag.estActif(
        FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
      )
    ).toBeTruthy();
  });

  const menuTransfert = screen.getByText("Transférer");
  const choixService = screen.getByText(/À un service+/);
  const choixOEC = screen.getByText(/À un officier de l'état civil+/);

  waitFor(() => {
    expect(menuTransfert).toBeDefined();
    expect(choixService).toBeDefined();
    expect(choixOEC).toBeDefined();
  });
});

test.skip("check popin service", () => {
  afficheComposant(listeUtilisateurs);

  let choixService: HTMLElement;

  const menuTransfert = screen.getByText("Transférer");
  fireEvent.click(menuTransfert);

  choixService = screen.getByText(/À un service+/);
  fireEvent.click(choixService);

  const valider = screen.getByText(/Valider+/) as HTMLButtonElement;
  const annuler = screen.getByText(/Annuler+/) as HTMLButtonElement;
  const title = screen.getByText(/Transfert à un service+/);

  waitFor(() => {
    expect(valider).toBeDefined();
    expect(valider.disabled).toBeTruthy();
    expect(title).toBeDefined();
  });

  const autocomplete = screen.getByLabelText(
    /TransfertPopin+/
  ) as HTMLInputElement;

  waitFor(() => {
    expect(autocomplete).toBeDefined();
  });

  fireEvent.click(annuler);
});

test.skip("check popin agent", () => {
  afficheComposant(listeUtilisateurs);

  let choixService: HTMLElement;

  const menuTransfert = screen.getByText("Transférer");
  fireEvent.click(menuTransfert);

  choixService = screen.getByText(/À un officier de l'état civil+/);
  fireEvent.click(choixService);

  const valider = screen.getByText(/Valider+/) as HTMLButtonElement;
  const title = screen.getByText("Transfert à un officier de l'état civil");

  waitFor(() => {
    expect(valider).toBeDefined();
    expect(valider.disabled).toBeTruthy();
    expect(title).toBeDefined();
  });

  const autocomplete = screen.getByLabelText(
    /TransfertPopin+/
  ) as HTMLInputElement;

  waitFor(() => {
    expect(autocomplete).toBeDefined();
  });
});

test.skip("check autocomplete service", () => {
  afficheComposant(undefined, listeServices);
  const menuTransfert = screen.getByText("Transférer");

  waitFor(() => {
    expect(menuTransfert).toBeDefined();
  });

  fireEvent.click(menuTransfert);

  const choixService = screen.getByText(/À un service+/);
  waitFor(() => {
    expect(choixService).toBeDefined();
  });

  fireEvent.click(choixService);

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
  });

  autocomplete.focus();

  fireEvent.change(inputChampRecherche, {
    target: {
      value: "s"
    }
  });
  const str1 = screen.getByText("str1");

  waitFor(() => {
    expect(str1).toBeDefined();
    expect(screen.getByText("str2")).toBeDefined();
  });

  fireEvent.click(str1);

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  waitFor(() => {
    expect(inputChampRecherche.value).toStrictEqual("str1");
    expect(valider.disabled).toBeFalsy();
  });

  const reset = screen.getByTitle("Vider le champ");

  waitFor(() => {
    expect(reset).toBeDefined();
  });

  fireEvent.click(reset);

  waitFor(() => {
    expect(valider.disabled).toBeTruthy();
  });
});

test.skip("check autocomplete agent", () => {
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

  render(routerAvecContexte(router, listeUtilisateurs));

  const menuTransfert = screen.getByText("Transférer");

  waitFor(() => {
    expect(menuTransfert).toBeDefined();
  });

  fireEvent.click(menuTransfert);

  const choixService = screen.getByText(/À un officier de l'état civil+/);

  waitFor(() => {
    expect(choixService).toBeDefined();
  });

  fireEvent.click(choixService);

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
  });

  autocomplete.focus();
  fireEvent.change(inputChampRecherche, {
    target: {
      value: "s"
    }
  });

  const str1 = screen.getByText("str1");
  waitFor(() => {
    expect(str1).toBeDefined();
    expect(screen.getByText("str2")).toBeDefined();
  });

  fireEvent.click(str1);

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  waitFor(() => {
    expect(inputChampRecherche.value).toStrictEqual("str1 ");
    expect(valider.disabled).toBeFalsy();
  });

  fireEvent.click(valider);

  waitFor(() => {
    expect(router.state.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
  });
});

test.skip("renders du bloc Menu Transfert fermer ", () => {
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

  render(routerAvecContexte(router, listeUtilisateurs));

  let menuTransfert = screen.getByText("Transférer");

  waitFor(() => {
    expect(menuTransfert).toBeDefined();
  });

  fireEvent.click(menuTransfert);

  let choixService = screen.getByText(/À un service+/);
  let choixOEC = screen.getByText(/À un officier de l'état civil+/);

  waitFor(() => {
    expect(choixService).toBeDefined();
    expect(choixOEC).toBeDefined();
  });

  fireEvent.click(choixOEC);

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
  });

  autocomplete.focus();

  fireEvent.change(inputChampRecherche, {
    target: {
      value: "s"
    }
  });

  const OEC = screen.getByText("str3");

  waitFor(() => {
    expect(OEC).toBeDefined();
  });

  fireEvent.click(OEC);

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  waitFor(() => {
    expect(valider).toBeDefined();
  });

  fireEvent.click(valider);

  waitFor(() => {
    expect(router.state.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
  });
});
