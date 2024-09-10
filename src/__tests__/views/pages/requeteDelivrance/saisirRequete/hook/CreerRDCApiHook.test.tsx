import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useCreationRequeteDelivranceRDC } from "@pages/requeteDelivrance/saisirRequete/hook/CreerRDCApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import {
  RequeteRDCAutreProfessionnnel,
  RequeteRDCInstitutionnel,
  RequeteRDCMandataire,
  RequeteRDCParticulier,
  RequeteRDCTitulaire
} from "../../../../../../mock/data/DataRDC";

const HookConsummerTitulaire: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCTitulaire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook mandataire", () => {
  render(<HookConsummerTitulaire />);
  waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCMandataire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook mandataire", () => {
  render(<HookConsummerMandataire />);
  waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCInstitutionnel);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook institutionnel", () => {
  render(<HookConsummerInstitutionnel />);
  waitForResultat(StatutRequete.A_TRAITER, true);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCParticulier);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook particulier", () => {
  render(<HookConsummerParticulier />);
  waitForResultat(StatutRequete.BROUILLON, false);
});

const HookConsummerAutreProfessionnel: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(
    RequeteRDCAutreProfessionnnel
  );
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook autre professionnel", () => {
  render(<HookConsummerAutreProfessionnel />);
  waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

function waitForResultat(futurStatut: StatutRequete, refus: boolean) {
  waitFor(() => {
    expect(
      screen.getByText(
        `1072bc37-f889-4365-8f75-912166b767dd,${futurStatut.libelle},${refus}`
      )
    ).toBeDefined();
  });
}


