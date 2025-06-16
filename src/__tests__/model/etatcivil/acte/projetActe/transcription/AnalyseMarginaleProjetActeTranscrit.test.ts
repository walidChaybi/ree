import { TitulaireAnalyseMarginale } from "@model/etatcivil/acte/TitulaireAnalyseMarginale";
import {
  AnalyseMarginaleProjetActeTranscrit,
  IAnalyseMarginaleProjetActeTranscritDto
} from "@model/etatcivil/acte/projetActe/transcription/AnalyseMarginaleProjetActeTranscrit";
import { describe, expect, test, vi } from "vitest";
import DateRECE from "../../../../../../utils/DateRECE";

describe("AnalyseMarginaleProjetActeTranscrit", () => {
  const analyseMarginaleDto: IAnalyseMarginaleProjetActeTranscritDto = {
    id: "51eeb7e0-8b43-439e-b9aa-7d077c607f10",
    dateDebut: 1747298093,
    titulaires: [{ nom: "Bahuaud", prenoms: [], ordre: 1, typeDeclarationConjointe: "ABSENCE_DECLARATION" }],
    estValide: false
  };

  test("DOIT créer une instance valide à partir de données DTO complètes", () => {
    const mockTitulaire = TitulaireAnalyseMarginale.depuisDto({
      nom: "Bahuaud",
      prenoms: [],
      ordre: 1,
      typeDeclarationConjointe: "ABSENCE_DECLARATION"
    }) as TitulaireAnalyseMarginale;
    const mockTitulaireDepuisDto = vi.spyOn(TitulaireAnalyseMarginale, "depuisDto").mockReturnValue(mockTitulaire);

    const dateDebut = new DateRECE({ jour: "15", annee: "2025", heure: "10", minute: "34", mois: "05" });
    const mockDepuisTimestamp = vi.spyOn(DateRECE, "depuisTimestamp").mockReturnValue(dateDebut);

    const analyseMarginale = AnalyseMarginaleProjetActeTranscrit.depuisDto(analyseMarginaleDto);

    expect(analyseMarginale).not.toBeNull();
    expect(analyseMarginale?.id).toBe(analyseMarginaleDto.id);
    expect(analyseMarginale?.estValide).toBe(false);
    expect(analyseMarginale?.dateDebut).toBe(dateDebut);
    expect(analyseMarginale?.dateFin).toBeUndefined();

    expect(analyseMarginale?.titulaires).toHaveLength(1);
    expect(analyseMarginale?.titulaires[0]).toBe(mockTitulaire);

    expect(mockTitulaireDepuisDto).toHaveBeenCalledWith(analyseMarginaleDto.titulaires[0], 0, analyseMarginaleDto.titulaires);
    expect(mockDepuisTimestamp).toHaveBeenCalledWith(analyseMarginaleDto.dateDebut);

    mockTitulaireDepuisDto.mockRestore();
    mockDepuisTimestamp.mockRestore();
  });

  test("DOIT convertir correctement l'instance en DTO", () => {
    const analyseMarginale = AnalyseMarginaleProjetActeTranscrit.depuisDto(analyseMarginaleDto);

    expect(analyseMarginale?.versDto()).toMatchObject({
      id: "51eeb7e0-8b43-439e-b9aa-7d077c607f10",
      dateDebut: 1747260000,
      titulaires: [{ nom: "Bahuaud", prenoms: [], ordre: 1 }]
    });
  });
});
