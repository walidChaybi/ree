import { RequeteRDCSCInstitutionnel, RequeteRDCSCInteresse, RequeteRDCSCMandataire, RequeteRDCSCParticulier } from "@mock/data/DataRDCSC";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useCreationRequeteDelivranceRDCSC } from "@pages/requeteDelivrance/saisirRequete/hook/CreerRDCSCApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";

describe("Test du hook CreerRDCSCApi", () => {
  const HookConsummerInteresse: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCInteresse);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook intéressé", async () => {
    render(<HookConsummerInteresse />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.PRISE_EN_CHARGE.libelle},${false}`)).toBeDefined();
    });
  });

  const HookConsummerMandataire: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCMandataire);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook mandataire", async () => {
    render(<HookConsummerMandataire />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.PRISE_EN_CHARGE.libelle},${false}`)).toBeDefined();
    });
  });

  const HookConsummerInstitutionnel: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCInstitutionnel);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook institutionnel", async () => {
    render(<HookConsummerInstitutionnel />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.A_TRAITER.libelle},${true}`)).toBeDefined();
    });
  });

  const HookConsummerParticulier: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCParticulier);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook particulier", async () => {
    render(<HookConsummerParticulier />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.BROUILLON.libelle},${false}`)).toBeDefined();
    });
  });
});
