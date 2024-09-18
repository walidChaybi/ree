import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteAvecDocs } from "@mock/data/DetailRequeteDelivrance";
import { ficheActeMariage, ficheActeMariage2 } from "@mock/data/ficheActe";
import { userDroitnonCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
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
  expectEstPresentAvecValeurVide,
  expectEstPresentEtChecked,
  expectEstPresentEtNonChecked,
  expectEstSelectPresentAvecValeur,
  expectEstTexteAbsent,
  expectEstTextePresent
} from "../../../../../../../__tests__utils__/expectUtils";

const acteMariage = mapActe(ficheActeMariage2.data);
const requete = {
  statutCourant: { statut: StatutRequete.A_SIGNER },
  documentsReponses: [{ typeDocument: "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6" }]
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

test.skip("Attendu: le formulaire SaisirExtraitForm pour un acte de mariage s'affiche correctement", () => {
  render(saisirExtraitFormAvecContexte(acteMariage, requete));

  waitFor(() => {
    expect(screen.getByTitle("Cliquer pour déverrouiller")).toBeDefined();

    expect(screen.getByText("Evénement mariage")).toBeDefined();

    expect(screen.getByText("Contrat de mariage")).toBeDefined();
    expectEstSelectPresentAvecValeur(
      "evenement.contratMariage.existence",
      "OUI"
    );
    expect(screen.getByText("Avec contrat")).toBeDefined();
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
    expect(screen.getByText("Parents adoptants titulaire 2")).toBeDefined();
    expect(screen.getByText("Parent adoptant 1")).toBeDefined();
    expectEstPresentAvecValeur(
      "titulaireEvt2.parentAdoptantNaiss1.nomNaissance",
      "TEST ADOPTANT"
    );
    expectEstPresentAvecValeur(
      "titulaireEvt2.parentAdoptantNaiss1.prenoms.prenom1",
      "test"
    );
    expect(screen.getByText("Parent adoptant 2")).toBeDefined();
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

test("Attendu: la validation du formulaire mariage fonctionne correctement", () => {
  render(
    saisirExtraitFormAvecContexte(
      acteMariage,
      mappingRequeteDelivrance(requeteAvecDocs)
    )
  );

  fireEvent.click(screen.getByLabelText("Valider"));

  waitFor(() => {
    expect(screen.getByLabelText("Valider")).toBeDefined();
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

test.skip('Attendu: la case à cocher "Adopté par" fonctionne correctement', () => {
  render(saisirExtraitFormAvecContexte(acteMariage, requete));

  const caseACocherAdoptePar = expectEstPresentEtNonChecked(
    "titulaireevt1.adoptepar.true"
  );
  expectEstTexteAbsent("Parents adoptants titulaire 1");

  fireEvent.click(caseACocherAdoptePar);

  waitFor(() => {
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

  fireEvent.click(caseACocherAdoptePar);

  waitFor(() => {
    expectEstPresentEtNonChecked("titulaireevt1.adoptepar.true");
    expectEstTexteAbsent("Parents adoptants titulaire 1");
  });
});

test("Attendu: le déverrouillage des champs fonctionne correctement.", () => {
  render(saisirExtraitFormAvecContexte(acteMariage, requete));

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

  waitFor(() => {
    expect(boutonDeverrouillage).toBeDefined();
  });

  waitFor(() => {
    // Lieu evenement
    expect(lieuEvenement).toBeDefined();
    expect(lieuEvenement.value).toBe("Lyon, Rhône");
    expect(villeEvenement).toBeDefined();
    expect(villeEvenement.value).toBe("Lyon");
    // Date evenement
    expect(dateEvenementJour).toBeDefined();
    expect(dateEvenementJour.value).toBe("");
    expect(dateEvenementMois).toBeDefined();
    expect(dateEvenementMois.value).toBe("");
    expect(dateEvenementAnnee).toBeDefined();
    expect(dateEvenementAnnee.value).toBe("1947");
    // Nom de naissance
    expect(nomNaissance).toBeDefined();
    expect(nomNaissance.value).toBe("BERTIER");
    // Prenom
    expect(prenom).toBeDefined();
    expect(prenom.value).toBe("feliza");
    // Sexe
    expect(sexe).toBeDefined();
    expect(sexe.value).toBe("FEMININ");
    // Date naissance titulaire
    expect(dateNaissanceTitulaireJour).toBeDefined();
    expect(dateNaissanceTitulaireJour.value).toBe("10");
    expect(dateNaissanceTitulaireMois).toBeDefined();
    expect(dateNaissanceTitulaireMois.value).toBe("10");
    expect(dateNaissanceTitulaireAnnee).toBeDefined();
    expect(dateNaissanceTitulaireAnnee.value).toBe("1901");
    expect(ageDe).toBeDefined();
    expect(ageDe.value).toBe("");
    // Parent
    expect(parentNomNaissance).toBeDefined();
    expect(parentNomNaissance.value).toBe("Washington");
    expect(parentPrenom).toBeDefined();
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
  fireEvent.click(boutonDeverrouillage);

  waitFor(() => {
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

  fireEvent.input(dateNaissanceTitulaireJour, {
    target: { value: "" }
  });
  fireEvent.input(dateNaissanceTitulaireMois, {
    target: { value: "" }
  });
  fireEvent.input(dateNaissanceTitulaireAnnee, {
    target: { value: "" }
  });

  waitFor(() => {
    expect(dateNaissanceTitulaireJour.disabled).toBeFalsy();
    expect(dateNaissanceTitulaireMois.disabled).toBeFalsy();
    expect(dateNaissanceTitulaireAnnee.disabled).toBeFalsy();
    expect(ageDe.disabled).toBeFalsy();
  });

  // Verrouille
  fireEvent.input(ageDe, {
    target: { value: 26 }
  });
  fireEvent.click(boutonDeverrouillage);

  waitFor(() => {
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

test("DOIT conserver les prenoms saisies QUAND le bouton 'Adopté par' est coché ou décoché", () => {
  render(
    saisirExtraitFormAvecContexte(mapActe(ficheActeMariage.data), requete)
  );
  const adoptionTitulaire = screen.getByLabelText("titulaireEvt1.adoptePar");
  const ajouterPrenomParent1 = screen.getAllByText(
    "Ajouter prénom"
  )[1] as HTMLAnchorElement;
  const prenom3 = "titulaireEvt1.parentNaiss1.prenoms.prenom3";

  waitFor(() => {
    expect(screen.queryByLabelText(prenom3)).toBeNull();
  });

  fireEvent.click(ajouterPrenomParent1);
  fireEvent.click(adoptionTitulaire);
  waitFor(() => {
    expect(screen.getByLabelText(prenom3)).toBeDefined();
  });
});
