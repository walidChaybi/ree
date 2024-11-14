import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import { idRequeteRDCSC } from "@mock/data/requeteDelivrance";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { BoutonTerminerApresImpression } from "../../../../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonTerminerApresImpression";
import { elementAvecContexte } from "../../../../__tests__utils__/testsUtil";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idService: "11",
  sousType: SousTypeDelivrance.RDC,
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_VALIDER,
    dateEffet: 1577923200000,
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
          numeroOrdre: 1,
        },
      ],
      jourNaissance: 31,
      moisNaissance: 12,
      anneeNaissance: 1981,
      sexe: Sexe.MASCULIN.libelle,
    },
  ],
  documentsReponses: [
    { idRc: "123456789" },
    { idRca: "123456789" },
    { idPacs: "123456789" },
  ],
} as IRequeteDelivrance;

test("est à A_VALIDER et provient de COURRIER", () => {
  const { getByText } = render(
    elementAvecContexte(
      <MemoryRouter
        initialEntries={[URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID]}
      >
        <BoutonTerminerApresImpression
          requete={requeteTestCOURRIER}
        ></BoutonTerminerApresImpression>
      </MemoryRouter>,
      userDroitnonCOMEDEC,
    ),
  );

  const bouttonSigner = getByText(
    /Terminer après impression locale/i,
  ) as HTMLButtonElement;

  waitFor(() => {
    expect(bouttonSigner.disabled).toBeFalsy();
  });

  fireEvent.click(bouttonSigner);
});
