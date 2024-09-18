import {
  userDroitCOMEDEC,
  userDroitnonCOMEDEC
} from "@mock/data/mockConnectedUserAvecDroit";
import { idRequeteRDCSC } from "@mock/data/requeteDelivrance";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { BoutonPrendreEnCharge } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/contenu/BoutonPrendreEnCharge";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idService: "11",
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDC,
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_TRAITER,
    dateEffet: 1577923200000
  },
  idUtilisateur: "idUtilisateurConnectedUser",
  provenanceRequete: { provenance: Provenance.COURRIER },
  titulaires: [
    {
      id: "0",
      position: 0,
      nationalite: Nationalite.FRANCAISE,
      nomNaissance: "Garcia",
      prenoms: [
        {
          prenom: "Hugo",
          numeroOrdre: 1
        }
      ],
      jourNaissance: 31,
      moisNaissance: 12,
      anneeNaissance: 1981,
      sexe: Sexe.MASCULIN.libelle
    }
  ]
} as IRequeteDelivrance;

test("est à A_TRAITER ou TRANSFEREE et provient de COURRIER", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        element: (
          <BoutonPrendreEnCharge
            requete={requeteTestCOURRIER}
          ></BoutonPrendreEnCharge>
        )
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID]
  );

  const { getByText } = render(<RouterProvider router={router} />);

  const bouttonPrendreEnCharge = getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonPrendreEnCharge);
});

const requeteTestCOMEDEC = {
  id: idRequeteRDCSC,
  idService: "11",
  dateCreation: 1577836800000,
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDC,
  statutCourant: {
    statut: StatutRequete.A_TRAITER,
    dateEffet: 1577923200000
  },
  idUtilisateur: "idUtilisateurConnectedUser",
  provenanceRequete: { provenance: Provenance.COMEDEC },
  titulaires: [
    {
      id: "0",
      position: 0,
      nationalite: Nationalite.FRANCAISE,
      nomNaissance: "Garcia",
      prenoms: [
        {
          prenom: "Hugo",
          numeroOrdre: 1
        }
      ],
      jourNaissance: 31,
      moisNaissance: 12,
      anneeNaissance: 1981,
      sexe: Sexe.MASCULIN.libelle
    }
  ]
} as IRequeteDelivrance;

test("est à A_TRAITER ou TRANSFEREE et provient de COMEDEC", () => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        element: (
          <BoutonPrendreEnCharge
            requete={requeteTestCOMEDEC}
          ></BoutonPrendreEnCharge>
        )
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d423"
      )
    ]
  );

  const { getByText } = render(<RouterProvider router={router} />);

  const bouttonPrendreEnCharge = getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonPrendreEnCharge);
});
