import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import { BoutonModifierTraitement } from "../../../../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonModifierTraitement";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";
import { idRequeteRDCSC } from "../../../../mock/data/requeteDelivrance";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idService: "11",
  type: TypeRequete.DELIVRANCE,
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_SIGNER,
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
  ],
  sousType: SousTypeDelivrance.RDD
} as IRequeteDelivrance;

describe("BoutonModifierTraitement - ", () => {
  test("est à A_SIGNER", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: <BoutonModifierTraitement requete={requeteTestCOURRIER}></BoutonModifierTraitement>
        },
        {
          path: "*",
          element: <></>
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID]
    );

    const { getByText } = render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    const bouttonModifierTraitement = getByText("Modifier le traitement") as HTMLButtonElement;

    waitFor(() => {
      expect(bouttonModifierTraitement.disabled).toBeFalsy();
    });

    fireEvent.click(bouttonModifierTraitement);
  });

  test("est à A_VALIDER", () => {
    requeteTestCOURRIER.statutCourant.statut = StatutRequete.A_VALIDER;

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: <BoutonModifierTraitement requete={requeteTestCOURRIER}></BoutonModifierTraitement>
        },
        {
          path: "*",
          element: <></>
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID]
    );

    const { getByText } = render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    const bouttonModifierTraitement = getByText("Modifier le traitement") as HTMLButtonElement;

    waitFor(() => {
      expect(bouttonModifierTraitement.disabled).toBeFalsy();
    });

    fireEvent.click(bouttonModifierTraitement);
  });
});
