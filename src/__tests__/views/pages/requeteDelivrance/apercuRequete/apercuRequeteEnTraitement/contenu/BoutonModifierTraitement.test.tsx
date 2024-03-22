import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { idRequeteRDCSC } from "@mock/data/requeteDelivrance";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { BoutonModifierTraitement } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/contenu/BoutonModifierTraitement";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idEntite: "11",
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

test("est à A_SIGNER", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: (
            <BoutonModifierTraitement
              requete={requeteTestCOURRIER}
            ></BoutonModifierTraitement>
          )
        },
        {
          path: "*",
          element: <></>
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID]
    );

    const { getByText } = render(<RouterProvider router={router} />);

    const bouttonModifierTraitement = getByText(
      /Modifier le traitement/i
    ) as HTMLButtonElement;

    await waitFor(() => {
      expect(bouttonModifierTraitement.disabled).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(bouttonModifierTraitement);
    });
  });
});

test("est à A_VALIDER", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  requeteTestCOURRIER.statutCourant.statut = StatutRequete.A_VALIDER;

  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          element: (
            <BoutonModifierTraitement
              requete={requeteTestCOURRIER}
            ></BoutonModifierTraitement>
          )
        },
        {
          path: "*",
          element: <></>
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID]
    );

    const { getByText } = render(<RouterProvider router={router} />);

    const bouttonModifierTraitement = getByText(
      /Modifier le traitement/i
    ) as HTMLButtonElement;

    await waitFor(() => {
      expect(bouttonModifierTraitement.disabled).toBeFalsy();
    });

    await act(async () => {
      fireEvent.click(bouttonModifierTraitement);
    });
  });
});
