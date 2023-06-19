import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { idRequeteRDCSC } from "@mock/data/requeteDelivrance";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { BoutonTerminerApresImpression } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/contenu/BoutonTerminerApresImpression";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idEntite: "11",
  sousType: SousTypeDelivrance.RDC,
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_VALIDER,
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
  documentsReponses: [
    { idRc: "123456789" },
    { idRca: "123456789" },
    { idPacs: "123456789" }
  ]
} as IRequeteDelivrance;

test("est à A_VALIDER et provient de COURRIER", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID);

  const { getByText } = render(
    <Router history={history}>
      <BoutonTerminerApresImpression
        requete={requeteTestCOURRIER}
      ></BoutonTerminerApresImpression>
    </Router>
  );

  const bouttonSigner = getByText(
    /Terminer après impression locale/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonSigner.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonSigner);
  });
});
