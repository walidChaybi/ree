import { GestionnaireNomenclature } from "@api/nomenclature/GestionnaireNomenclature";
import { renderHook } from "@testing-library/react";
import { gestionnaireDoubleOuverture } from "@util/GestionnaireDoubleOuverture";
import { GestionnaireARetraiterDansSaga } from "@util/migration/GestionnaireARetraiterDansSaga";
import { describe, expect, test, vi } from "vitest";
import { useChargerDonneesApplicatives } from "../../hooks/ChargerDonneesApplicativesHook";

describe("Test du hook charger données applicatives", () => {
  test("Les appels aux méthodes d'initailisation sont effectués", () => {
    const spyInitSaga = vi.fn();
    const spyInitDoubleOuverture = vi.fn();
    const spyChargerNomenclatures = vi
      .fn()
      .mockReturnValue(new Promise(() => Promise.resolve()));
    GestionnaireARetraiterDansSaga.init = spyInitSaga;
    gestionnaireDoubleOuverture.init = spyInitDoubleOuverture;
    GestionnaireNomenclature.chargerToutesLesNomenclatures =
      spyChargerNomenclatures;

    renderHook(() => useChargerDonneesApplicatives());

    expect(spyInitSaga).toHaveBeenCalledOnce();
    expect(spyInitDoubleOuverture).toHaveBeenCalledOnce();
    expect(spyChargerNomenclatures).toHaveBeenCalledOnce();
  });
});
