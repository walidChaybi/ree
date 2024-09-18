import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "@mock/data/mockConnectedUserAvecDroit";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { ApercuRequeteEtablissementSimplePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage";
import { ApercuReqCreationTranscriptionSimplePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import {
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { beforeAll, beforeEach, expect, test } from "vitest";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

beforeAll(() => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );
});

beforeEach(() => {
  TypePieceJustificative.init();
});

test("renders VoletPiecesJustificatives Etablissement", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: <ApercuRequeteEtablissementSimplePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    fireEvent.click(screen.getByText("Pièces justificatives"));
  });

  await waitFor(() => {
    expect(screen.getAllByText("AN parent 1")[0]).toBeDefined();
    expect(screen.getAllByText("Pièce d'identité postulant")[0]).toBeDefined();
    expect(screen.getAllByText("Divorce union antérieure 1")[0]).toBeDefined();
    expect(screen.getAllByText("fichierPJ")[2]).toBeDefined();

    expect(screen.getAllByText("AN parent 1")).toHaveLength(2);
    expect(screen.getAllByText("Pièce d'identité postulant")).toHaveLength(2);
    expect(screen.getAllByText("Divorce union antérieure 1")).toHaveLength(2);
  });
});

test("renders VoletPiecesJustificatives Transcription", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
        element: <ApercuReqCreationTranscriptionSimplePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
        "d4f9e898-cf26-42cc-850b-007e9e475e7a"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    expect(screen.getAllByText("Acte à transcrire")[0]).toBeDefined();
    expect(screen.getAllByText("Titulaire")[0]).toBeDefined();
    expect(screen.getAllByText("Parents du titulaire")[0]).toBeDefined();
    expect(
      screen.getAllByText("Autres pièces justificatives")[0]
    ).toBeDefined();
  });
});

test("Modifier le titre d'un fichier d'une pièce jointe Etablissement", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: <ApercuRequeteEtablissementSimplePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    expect(screen.getAllByTitle("Modifier le libellé")[3]).toBeDefined();
  });

  fireEvent.click(screen.getAllByTitle("Modifier le libellé")[3]);

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  );

  fireEvent.change(inputModificationLibelle, {
    target: {
      value: "nouveauLibelle"
    }
  });
  inputModificationLibelle.blur();

  await waitFor(() => {
    expect(screen.getAllByText("nouveauLibelle")[0]).toBeDefined();
  });
});

test("Modifier le titre d'un fichier d'une pièce jointe Transcription", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
        element: <ApercuReqCreationTranscriptionSimplePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
        "d4f9e898-cf26-42cc-850b-007e9e475e7a"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    expect(screen.getAllByTitle("Modifier le libellé")[0]).toBeDefined();
  });

  fireEvent.click(screen.getAllByTitle("Modifier le libellé")[0]);

  const inputModificationLibelle = screen.getByLabelText("input-creation-nom");

  fireEvent.change(inputModificationLibelle, {
    target: {
      value: "nouveauLibelle"
    }
  });
  inputModificationLibelle.blur();

  await waitFor(() => {
    expect(screen.getAllByText("nouveauLibelle")[0]).toBeDefined();
  });
});

test("Modifier le titre d'un fichier et revenir en arrière", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: <ApercuRequeteEtablissementSimplePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    expect(screen.getAllByTitle("Modifier le libellé")[3]).toBeDefined();
  });

  fireEvent.click(screen.getAllByTitle("Modifier le libellé")[3]);

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  ) as HTMLInputElement;

  fireEvent.change(inputModificationLibelle, {
    target: {
      value: "test libelle"
    }
  });
  fireEvent.keyDown(inputModificationLibelle, {
    key: "Enter",
    code: "Enter",
    charCode: 13
  });

  await waitFor(() => {
    expect(screen.getAllByText("test libelle")[0]).toBeDefined();
  });

  fireEvent.click(
    screen.getAllByTitle("Annuler la modification du libellé")[0]
  );

  await waitFor(() => {
    expect(screen.getAllByText("Titre de séjour postulant")[0]).toBeDefined();
  });
});

test("Modifier le titre puis annuler", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: <ApercuRequeteEtablissementSimplePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    expect(screen.getAllByTitle("Modifier le libellé")[3]).toBeDefined();
  });

  fireEvent.click(screen.getAllByTitle("Modifier le libellé")[3]);

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  );

  fireEvent.change(inputModificationLibelle, {
    target: {
      value: "test libelle"
    }
  });
  fireEvent.keyDown(inputModificationLibelle, {
    key: "Escape",
    code: "Escape",
    charCode: 27
  });

  await waitFor(() => {
    expect(screen.getAllByText("Titre de séjour postulant")[0]).toBeDefined();
  });
});

test("Ouvrir deux pièces jointes côte à côte.", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: <ApercuRequeteEtablissementSimplePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  await waitFor(() => {
    fireEvent.click(screen.getByText("Pièces justificatives"));
  });

  let accordionAlpha1: HTMLDivElement;
  let accordionAlpha2: HTMLDivElement;
  let accordionBeta1: HTMLDivElement;
  let accordionBeta2: HTMLDivElement;

  await waitFor(() => {
    const titreAccordions = screen.getAllByRole("button", { expanded: false });

    const accordionsAlpha = titreAccordions.filter(accordion =>
      accordion.textContent?.includes("carteIdentite")
    );
    const accordionsBeta = titreAccordions.filter(accordion =>
      accordion.textContent?.includes("titreSejour")
    );

    expect(accordionsAlpha).toHaveLength(2);
    expect(accordionsBeta).toHaveLength(2);

    accordionAlpha1 = accordionsAlpha[0] as HTMLDivElement;
    accordionAlpha2 = accordionsAlpha[1] as HTMLDivElement;
    accordionBeta1 = accordionsBeta[0] as HTMLDivElement;
    accordionBeta2 = accordionsBeta[1] as HTMLDivElement;

    expect(accordionAlpha1.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionAlpha2.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionBeta1.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionBeta2.classList.contains("Mui-expanded")).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(accordionAlpha1);
    fireEvent.click(accordionBeta1);
  });

  await waitFor(() => {
    expect(accordionAlpha1.classList.contains("Mui-expanded")).toBeTruthy();
    expect(accordionAlpha2.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionBeta1.classList.contains("Mui-expanded")).toBeTruthy();
    expect(accordionBeta2.classList.contains("Mui-expanded")).toBeFalsy();
  });
});
