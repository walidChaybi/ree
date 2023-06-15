import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { requeteAvecDocs } from "@mock/data/DetailRequeteDelivrance";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { ficheActeMariage, ficheActeMariage2 } from "@mock/data/ficheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { SaisirExtraitForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import {
  expectEstAbsent,
  expectEstPresentAvecValeur,
  expectEstPresentAvecValeurVide,
  expectEstPresentEtChecked,
  expectEstPresentEtNonChecked,
  expectEstSelectPresentAvecValeur,
  expectEstTexteAbsent,
  expectEstTextePresent
} from "../../../../../../../__tests__utils__/expectUtils";
import React from "react";

const acteMariage = mapActe(ficheActeMariage2.data);
const requete = {
  statutCourant: { statut: StatutRequete.A_SIGNER },
  documentsReponses: [{ typeDocument: "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6" }]
} as IRequeteDelivrance;

beforeAll(async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
});

test("Attendu: le formulaire SaisirExtraitForm pour un acte de mariage s'affiche correctement", async () => {
  render(<SaisirExtraitForm acte={acteMariage} requete={requete} />);

  await waitFor(() => {
    expect(screen.getByTitle("Cliquer pour déverrouiller")).toBeInTheDocument();

    expect(screen.getByText("Evénement mariage")).toBeInTheDocument();

    expect(screen.getByText("Contrat de mariage")).toBeInTheDocument();
    expectEstSelectPresentAvecValeur(
      "evenement.contratMariage.existence",
      "OUI"
    );
    expect(screen.getByText("Avec contrat")).toBeInTheDocument();
    expectEstPresentAvecValeur(
      "evenement.contratMariage.texte",
      "texte du contrat de mariage"
    );

    // Titulaire 1
    expectAbsenceDateLieuSexePourParentTitulaire(1);
    expectEstPresentEtNonChecked("titulaireevt1.adoptepar.true");
    expectEstTexteAbsent("Parents adoptants titulaire 1");

    // Titulaire 2
    expectAbsenceDateLieuSexePourParentTitulaire(2);
    expectEstPresentEtChecked("titulaireevt2.adoptepar.true");
    expect(
      screen.getByText("Parents adoptants titulaire 2")
    ).toBeInTheDocument();
    expect(screen.getByText("Parent adoptant 1")).toBeInTheDocument();
    expectEstPresentAvecValeur(
      "titulaireEvt2.parentAdoptantNaiss1.nomNaissance",
      "TEST ADOPTANT"
    );
    expectEstPresentAvecValeur(
      "titulaireEvt2.parentAdoptantNaiss1.prenoms.prenom1",
      "test"
    );
    expect(screen.getByText("Parent adoptant 2")).toBeInTheDocument();
    expectEstPresentAvecValeurVide(
      "titulaireEvt2.parentAdoptantNaiss2.nomNaissance"
    );
    expectEstPresentAvecValeurVide(
      "titulaireEvt2.parentAdoptantNaiss2.prenoms.prenom1"
    );

    // Données complémentaires plurilingues
    expectEstPresentAvecValeur(
      "donneesComplementairesPlurilingues.nomApresMariageEpoux",
      "nomApresMariage masculin"
    );
    expectEstPresentAvecValeur(
      "donneesComplementairesPlurilingues.nomApresMariageEpouse",
      "nomApresMariage feminin"
    );
  });
});

test("Attendu: la validation du formulaire mariage fonctionne correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={acteMariage}
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

function expectAbsenceDateLieuSexePourParentTitulaire(numeroTitulaire: number) {
  // Parent 1: Absence date,lieu de naissance et sexe
  expectEstAbsent(
    `titulaireEvt${numeroTitulaire}.parentNaiss1.dateNaissanceOuAgeDe.date.annee`
  );
  expectEstAbsent(
    `titulaireEvt${numeroTitulaire}.parentNaiss1.dateNaissanceOuAgeDe.age`
  );
  expectEstAbsent(
    `titulaireEvt${numeroTitulaire}.parentNaiss1.lieuNaissance.lieuComplet`
  );
  expectEstAbsent(`titulaireEvt${numeroTitulaire}.parentNaiss1.sexe`);

  // Parent 2: Absence date, lieu de naissance et sexe
  expectEstAbsent(
    `titulaireEvt${numeroTitulaire}.parentNaiss2.dateNaissanceOuAgeDe.date.annee`
  );
  expectEstAbsent(
    `titulaireEvt${numeroTitulaire}.parentNaiss2.dateNaissanceOuAgeDe.age`
  );
  expectEstAbsent(
    `titulaireEvt${numeroTitulaire}.parentNaiss2.lieuNaissance.lieuComplet`
  );
  expectEstAbsent(`titulaireEvt${numeroTitulaire}.parentNaiss2.sexe`);
}

test('Attendu: la case à cocher "Adopté par" fonctionne correctement', async () => {
  render(<SaisirExtraitForm acte={acteMariage} requete={requete} />);

  const caseACocherAdoptePar = expectEstPresentEtNonChecked(
    "titulaireevt1.adoptepar.true"
  );
  expectEstTexteAbsent("Parents adoptants titulaire 1");

  await act(async () => {
    fireEvent.click(caseACocherAdoptePar);
  });

  await waitFor(() => {
    expectEstPresentEtChecked("titulaireevt1.adoptepar.true");
    expectEstTextePresent("Parents adoptants titulaire 1");

    expectEstPresentAvecValeurVide(
      "titulaireEvt1.parentAdoptantNaiss1.nomNaissance"
    );
    expectEstPresentAvecValeurVide(
      "titulaireEvt1.parentAdoptantNaiss1.prenoms.prenom1"
    );
    expectEstPresentAvecValeurVide(
      "titulaireEvt1.parentAdoptantNaiss2.nomNaissance"
    );
    expectEstPresentAvecValeurVide(
      "titulaireEvt1.parentAdoptantNaiss2.prenoms.prenom1"
    );
  });

  await act(async () => {
    fireEvent.click(caseACocherAdoptePar);
  });

  await waitFor(() => {
    expectEstPresentEtNonChecked("titulaireevt1.adoptepar.true");
    expectEstTexteAbsent("Parents adoptants titulaire 1");
  });
});

test("Attendu: le déverrouillage des champs fonctionne correctement.", async () => {
  render(<SaisirExtraitForm acte={acteMariage} requete={requete} />);

  const dateEvenementJour = screen.getByLabelText(
    "evenement.dateEvenement.jour"
  ) as HTMLInputElement;
  const dateEvenementMois = screen.getByLabelText(
    "evenement.dateEvenement.mois"
  ) as HTMLInputElement;
  const dateEvenementAnnee = screen.getByLabelText(
    "evenement.dateEvenement.annee"
  ) as HTMLInputElement;
  const lieuEvenement = screen.getByLabelText(
    "evenement.lieuEvenement.lieuComplet"
  ) as HTMLInputElement;
  const villeEvenement = screen.getByLabelText(
    "evenement.lieuEvenement.ville"
  ) as HTMLInputElement;
  const nomNaissance = screen.getByLabelText(
    "titulaireEvt2.nomNaissance"
  ) as HTMLInputElement;
  const prenom = screen.getByLabelText(
    "titulaireEvt2.prenoms.prenom1"
  ) as HTMLInputElement;
  const sexe = screen.getByLabelText(
    "titulaireevt2.sexe.feminin"
  ) as HTMLInputElement;
  const dateNaissanceTitulaireJour = screen.getByLabelText(
    "titulaireEvt2.evenement.dateNaissanceOuAgeDe.date.jour"
  ) as HTMLInputElement;
  const dateNaissanceTitulaireMois = screen.getByLabelText(
    "titulaireEvt2.evenement.dateNaissanceOuAgeDe.date.mois"
  ) as HTMLInputElement;
  const dateNaissanceTitulaireAnnee = screen.getByLabelText(
    "titulaireEvt2.evenement.dateNaissanceOuAgeDe.date.annee"
  ) as HTMLInputElement;
  const ageDe = screen.getByLabelText(
    "titulaireEvt2.evenement.dateNaissanceOuAgeDe.age"
  ) as HTMLInputElement;

  const parentNomNaissance = screen.getByLabelText(
    "titulaireEvt2.parentNaiss1.nomNaissance"
  ) as HTMLInputElement;
  const parentPrenom = screen.getByLabelText(
    "titulaireEvt2.parentNaiss1.prenoms.prenom1"
  ) as HTMLInputElement;

  const boutonDeverrouillage = screen.getByTitle(
    "Cliquer pour déverrouiller"
  ) as HTMLInputElement;
  await waitFor(() => {
    expect(boutonDeverrouillage).toBeInTheDocument();
  });

  await waitFor(() => {
    // Lieu evenement
    expect(lieuEvenement).toBeInTheDocument();
    expect(lieuEvenement.value).toBe("Lyon, Rhône");
    expect(villeEvenement).toBeInTheDocument();
    expect(villeEvenement.value).toBe("Lyon");
    // Date evenement
    expect(dateEvenementJour).toBeInTheDocument();
    expect(dateEvenementJour.value).toBe("");
    expect(dateEvenementMois).toBeInTheDocument();
    expect(dateEvenementMois.value).toBe("");
    expect(dateEvenementAnnee).toBeInTheDocument();
    expect(dateEvenementAnnee.value).toBe("1947");
    // Nom de naissance
    expect(nomNaissance).toBeInTheDocument();
    expect(nomNaissance.value).toBe("BERTIER");
    // Prenom
    expect(prenom).toBeInTheDocument();
    expect(prenom.value).toBe("feliza");
    // Sexe
    expect(sexe).toBeInTheDocument();
    expect(sexe.value).toBe("FEMININ");
    // Date naissance titulaire
    expect(dateNaissanceTitulaireJour).toBeInTheDocument();
    expect(dateNaissanceTitulaireJour.value).toBe("10");
    expect(dateNaissanceTitulaireMois).toBeInTheDocument();
    expect(dateNaissanceTitulaireMois.value).toBe("10");
    expect(dateNaissanceTitulaireAnnee).toBeInTheDocument();
    expect(dateNaissanceTitulaireAnnee.value).toBe("1901");
    expect(ageDe).toBeInTheDocument();
    expect(ageDe.value).toBe("");
    // Parent
    expect(parentNomNaissance).toBeInTheDocument();
    expect(parentNomNaissance.value).toBe("Washington");
    expect(parentPrenom).toBeInTheDocument();
    expect(parentPrenom.value).toBe("Jsandye");

    expect(lieuEvenement.disabled).toBeTruthy();
    expect(villeEvenement.disabled).toBeFalsy();
    expect(dateEvenementJour.disabled).toBeFalsy();
    expect(dateEvenementMois.disabled).toBeFalsy();
    expect(dateEvenementAnnee.disabled).toBeFalsy();
    expect(nomNaissance.disabled).toBeTruthy();
    expect(prenom.disabled).toBeTruthy();
    expect(sexe.disabled).toBeTruthy();
    expect(dateNaissanceTitulaireJour.disabled).toBeTruthy();
    expect(dateNaissanceTitulaireMois.disabled).toBeTruthy();
    expect(dateNaissanceTitulaireAnnee.disabled).toBeTruthy();
    expect(ageDe.disabled).toBeTruthy();
    expect(parentNomNaissance.disabled).toBeTruthy();
    expect(parentPrenom.disabled).toBeTruthy();
  });

  // Déverrouille
  await act(async () => {
    fireEvent.click(boutonDeverrouillage);
  });

  await waitFor(() => {
    expect(lieuEvenement.disabled).toBeTruthy();
    expect(villeEvenement.disabled).toBeFalsy();
    expect(dateEvenementJour.disabled).toBeFalsy();
    expect(dateEvenementMois.disabled).toBeFalsy();
    expect(dateEvenementAnnee.disabled).toBeFalsy();
    expect(nomNaissance.disabled).toBeFalsy();
    expect(prenom.disabled).toBeFalsy();
    expect(sexe.disabled).toBeFalsy();
    expect(dateNaissanceTitulaireJour.disabled).toBeFalsy();
    expect(dateNaissanceTitulaireMois.disabled).toBeFalsy();
    expect(dateNaissanceTitulaireAnnee.disabled).toBeFalsy();
    expect(ageDe.disabled).toBeTruthy();
    expect(parentNomNaissance.disabled).toBeFalsy();
    expect(parentPrenom.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.input(dateNaissanceTitulaireJour, {
      target: { value: "" }
    });
  });
  await act(async () => {
    fireEvent.input(dateNaissanceTitulaireMois, {
      target: { value: "" }
    });
  });
  await act(async () => {
    fireEvent.input(dateNaissanceTitulaireAnnee, {
      target: { value: "" }
    });
  });

  await waitFor(() => {
    expect(dateNaissanceTitulaireJour.disabled).toBeFalsy();
    expect(dateNaissanceTitulaireMois.disabled).toBeFalsy();
    expect(dateNaissanceTitulaireAnnee.disabled).toBeFalsy();
    expect(ageDe.disabled).toBeFalsy();
  });

  // Verrouille
  await act(async () => {
    fireEvent.input(ageDe, {
      target: { value: 26 }
    });
    fireEvent.click(boutonDeverrouillage);
  });

  await waitFor(() => {
    expect(lieuEvenement.disabled).toBeTruthy();
    expect(villeEvenement.disabled).toBeFalsy();

    expect(dateEvenementJour.disabled).toBeFalsy();
    expect(dateEvenementMois.disabled).toBeFalsy();
    expect(dateEvenementAnnee.disabled).toBeFalsy();

    expect(nomNaissance.disabled).toBeTruthy();
    expect(prenom.disabled).toBeTruthy();
    expect(sexe.disabled).toBeTruthy();

    expect(dateNaissanceTitulaireJour.disabled).toBeTruthy();
    expect(dateNaissanceTitulaireMois.disabled).toBeTruthy();
    expect(dateNaissanceTitulaireAnnee.disabled).toBeTruthy();
    expect(ageDe.disabled).toBeFalsy();

    expect(parentNomNaissance.disabled).toBeTruthy();
    expect(parentPrenom.disabled).toBeTruthy();
  });
});

test("DOIT conserver les prenoms saisies QUAND le bouton 'Adopté par' est coché ou décoché", async () => {
  render(
    <SaisirExtraitForm
      acte={mapActe(ficheActeMariage.data)}
      requete={requete}
    />
  );
  const adoptionTitulaire = screen.getByLabelText("titulaireEvt1.adoptePar");
  const ajouterPrenomParent1 = screen.getAllByText(
    "Ajouter prénom"
  )[1] as HTMLAnchorElement;
  const prenom3 = "titulaireEvt1.parentNaiss1.prenoms.prenom3";
  await waitFor(() => {
    expect(screen.queryByLabelText(prenom3)).not.toBeInTheDocument();
  });
  fireEvent.click(ajouterPrenomParent1);
  fireEvent.click(adoptionTitulaire);
  await waitFor(() => {
      expect(screen.queryByLabelText(prenom3)).toBeInTheDocument();
  });
});
