import {
  RequeteRDCSCInstitutionnel,
  RequeteRDCSCInteresse,
  RequeteRDCSCMandataire,
  RequeteRDCSCParticulier
} from "@mock/data/DataRDCSC";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useCreationRequeteDelivranceRDCSC } from "@pages/requeteDelivrance/saisirRequete/hook/CreerRDCSCApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

const HookConsummerInteresse: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCInteresse);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook intéressé", () => {
  render(<HookConsummerInteresse />);
  waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCMandataire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook mandataire", () => {
  render(<HookConsummerMandataire />);
  waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(
    RequeteRDCSCInstitutionnel
  );
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook institutionnel", () => {
  render(<HookConsummerInstitutionnel />);
  waitForResultat(StatutRequete.A_TRAITER, true);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCParticulier);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook particulier", () => {
  render(<HookConsummerParticulier />);
  waitForResultat(StatutRequete.BROUILLON, false);
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
