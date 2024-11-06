import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useCreationRequeteDelivranceRDC } from "@pages/requeteDelivrance/saisirRequete/hook/CreerRDCApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import {
  RequeteRDCAutreProfessionnnel,
  RequeteRDCInstitutionnel,
  RequeteRDCMandataire,
  RequeteRDCParticulier,
  RequeteRDCTitulaire
} from "../../../../../../mock/data/DataRDC";

describe("Test du hook CreerRDCApi", () => {
  const HookConsummerTitulaire: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDC(RequeteRDCTitulaire);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook mandataire", async () => {
    render(<HookConsummerTitulaire />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.PRISE_EN_CHARGE.libelle},${false}`)).toBeDefined();
    });
  });

  const HookConsummerMandataire: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDC(RequeteRDCMandataire);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook mandataire", async () => {
    render(<HookConsummerMandataire />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.PRISE_EN_CHARGE.libelle},${false}`)).toBeDefined();
    });
  });

  const HookConsummerInstitutionnel: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDC(RequeteRDCInstitutionnel);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook institutionnel", async () => {
    render(<HookConsummerInstitutionnel />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.A_TRAITER.libelle},${true}`)).toBeDefined();
    });
  });

  const HookConsummerParticulier: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDC(RequeteRDCParticulier);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook particulier", async () => {
    render(<HookConsummerParticulier />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.BROUILLON.libelle},${false}`)).toBeDefined();
    });
  });

  const HookConsummerAutreProfessionnel: React.FC = () => {
    const resultat = useCreationRequeteDelivranceRDC(RequeteRDCAutreProfessionnnel);
    return <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>;
  };

  test("Création requête délivrance hook autre professionnel", async () => {
    render(<HookConsummerAutreProfessionnel />);
    await waitFor(() => {
      expect(screen.getByText(`1072bc37-f889-4365-8f75-912166b767dd,${StatutRequete.PRISE_EN_CHARGE.libelle},${false}`)).toBeDefined();
    });
  });
});
