import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { requeteAvecDocs } from "@mock/data/DetailRequeteDelivrance";
import { ficheActeDeces2 } from "@mock/data/ficheActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SaisirExtraitForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import React from "react";
import {
  expectEstAbsent,
  expectEstPresentAvecValeur,
  expectEstPresentAvecValeurEtDisabled
} from "../../../../../../../__tests__utils__/expectUtils";

const acteDeces = mapActe(ficheActeDeces2.data);
const requete = {
  statutCourant: { statut: StatutRequete.A_SIGNER }
} as IRequeteDelivrance;

beforeAll(async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
});

test("Attendu: le formulaire SaisirExtraitForm pour un acte de décès s'affiche correctement", async () => {
  render(<SaisirExtraitForm acte={acteDeces} requete={requete} />);

  await waitFor(() => {
    expect(screen.getByTitle("Cliquer pour déverrouiller")).toBeInTheDocument();
    expect(screen.getByText("Evénement décès")).toBeInTheDocument();

    expectEstPresentAvecValeurEtDisabled("evenement.dateEvenement.jour", "13");
    expectEstPresentAvecValeurEtDisabled("evenement.dateEvenement.mois", "04");
    expectEstPresentAvecValeurEtDisabled(
      "evenement.dateEvenement.annee",
      "2020"
    );

    expectEstPresentAvecValeur("evenement.lieuEvenement.ville", "Barcelone");
    expectEstPresentAvecValeur(
      "evenement.lieuEvenement.regionDepartement",
      "Catalogne"
    );
    expectEstPresentAvecValeur("evenement.lieuEvenement.pays", "Espagne");

    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.evenement.dateEvenement.jour",
      "25"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.evenement.dateEvenement.mois",
      "06"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.evenement.dateEvenement.annee",
      "1990"
    );

    // Dernier conjoint
    expect(screen.getByText("Dernier conjoint")).toBeInTheDocument();
    expectEstPresentAvecValeur(
      "dernierConjoint.nomNaissance",
      "le dernier des "
    );
    expectEstPresentAvecValeur("dernierConjoint.prenoms", "mohicans");

    // Parent 1: Absence date et lieu de naissance
    expectEstAbsent(
      "titulaireEvt1.parentNaiss1.dateNaissanceOuAgeDe.date.annee"
    );
    expectEstAbsent("titulaireEvt1.parentNaiss1.dateNaissanceOuAgeDe.age");
    expectEstAbsent("titulaireEvt1.parentNaiss1.lieuNaissance.lieuComplet");

    // Parent 2: Absence date et lieu de naissance
    expectEstAbsent(
      "titulaireEvt1.parentNaiss2.dateNaissanceOuAgeDe.date.annee"
    );
    expectEstAbsent("titulaireEvt1.parentNaiss2.dateNaissanceOuAgeDe.age");
    expectEstAbsent("titulaireEvt1.parentNaiss2.lieuNaissance.lieuComplet");
  });
});

test("Attendu: la validation du formulaire décès fonctionne correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={mapActe(ficheActeDeces2.data)}
      requete={mappingRequeteDelivrance(requeteAvecDocs)}
    />
  );

  await act(async () => {
    fireEvent.click(screen.getByLabelText("Valider"));
  });
  await waitFor(() => {
    expect(screen.getByLabelText("Valider")).toBeInTheDocument();
  });
});
