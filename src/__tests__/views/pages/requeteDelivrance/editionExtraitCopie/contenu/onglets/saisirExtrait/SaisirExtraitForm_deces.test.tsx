import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteAvecDocs } from "@mock/data/DetailRequeteDelivrance";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { ficheActeDeces2 } from "@mock/data/ficheActe";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { SaisirExtraitForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { beforeAll, expect, test } from "vitest";
import {
  expectEstAbsent,
  expectEstPresentAvecValeur,
  expectEstPresentAvecValeurEtDisabled
} from "../../../../../../../__tests__utils__/expectUtils";

const acteDeces = mapActe(ficheActeDeces2.data);
const requete = {
  statutCourant: { statut: StatutRequete.A_SIGNER }
} as IRequeteDelivrance;

beforeAll(() => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
});

const saisirExtraitFormAvecContexte = (
  acte: IFicheActe,
  requete: IRequeteDelivrance
): any => {
  return (
    <MockRECEContextProvider>
      <SaisirExtraitForm acte={acte} requete={requete} />
    </MockRECEContextProvider>
  );
};

test.skip("Attendu: le formulaire SaisirExtraitForm pour un acte de décès s'affiche correctement", () => {
  render(saisirExtraitFormAvecContexte(acteDeces, requete));

  waitFor(() => {
    expect(screen.getByTitle("Cliquer pour déverrouiller")).toBeDefined();
    expect(screen.getByText("Evénement décès")).toBeDefined();

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
    expect(screen.getByText("Dernier conjoint")).toBeDefined();
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

test("Attendu: la validation du formulaire décès fonctionne correctement", () => {
  render(
    saisirExtraitFormAvecContexte(
      mapActe(ficheActeDeces2.data),
      mappingRequeteDelivrance(requeteAvecDocs)
    )
  );

  fireEvent.click(screen.getByLabelText("Valider"));

  waitFor(() => {
    expect(screen.getByLabelText("Valider")).toBeDefined();
  });
});
