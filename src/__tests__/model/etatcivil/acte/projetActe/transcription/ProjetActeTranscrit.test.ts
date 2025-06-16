import { projetActeNaissanceDto } from "@mock/data/ProjetActe";
import { AnalyseMarginaleProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/AnalyseMarginaleProjetActeTranscrit";
import { DeclarantProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/DeclarantProjetActeTranscrit";
import { EvenementProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/EvenementProjetActeTranscrit";
import { FormuleFinale } from "@model/etatcivil/acte/projetActe/transcription/FormuleFinale";
import { IProjetActeTranscritDto, ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { TitulaireProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/TitulaireProjetActeTranscrit";
import { EStatutActe } from "@model/etatcivil/enum/EStatutActe";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { ETypeActe } from "@model/etatcivil/enum/TypeActe";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Test de la class ProjetActeTranscrit", () => {
  const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  beforeEach(() => {
    consoleErrorSpy.mockClear();
  });

  test("DOIT créer une instance valide à partir de données DTO complètes", () => {
    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(projetActeNaissanceDto);

    expect(projetActeTranscrit).not.toBeNull();
    expect(projetActeTranscrit?.id).toBe(projetActeNaissanceDto.id);
    expect(projetActeTranscrit?.nature).toBe(projetActeNaissanceDto.nature);
    expect(projetActeTranscrit?.statut).toBe(projetActeNaissanceDto.statut);
    expect(projetActeTranscrit?.type).toBe(ETypeActe.TEXTE);
    expect(projetActeTranscrit?.modeCreation).toBe(ETypeRedactionActe.TRANSCRIT);

    expect(projetActeTranscrit?.titulaires).toHaveLength(1);
    expect(projetActeTranscrit?.titulaires[0]).toBeInstanceOf(TitulaireProjetActeTranscrit);
    expect(projetActeTranscrit?.evenement).toBeInstanceOf(EvenementProjetActeTranscrit);
    expect(projetActeTranscrit?.analysesMarginales).toHaveLength(1);
    expect(projetActeTranscrit?.analysesMarginales[0]).toBeInstanceOf(AnalyseMarginaleProjetActeTranscrit);
    expect(projetActeTranscrit?.declarant).toBeInstanceOf(DeclarantProjetActeTranscrit);
    expect(projetActeTranscrit?.formuleFinale).toBeInstanceOf(FormuleFinale);
    expect(projetActeTranscrit?.acteEtranger).toEqual(projetActeNaissanceDto.acteEtranger);
  });

  test("DOIT lever une erreur et retourner null QUAND un champs obligatoire est manquant", () => {
    const projetActeInvalide = { ...projetActeNaissanceDto };
    // @ts-ignore
    delete projetActeInvalide.titulaires;

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(projetActeInvalide as any);

    expect(projetActeTranscrit).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith("Un champ obligatoire d'un ProjetActeTranscrit n'est pas défini.");
  });

  test("DOIT lever une erreur et retourner null QUAND le modeCreation du projet d'acte est invalide", () => {
    const modeCreationProjetActeInvalide = {
      ...projetActeNaissanceDto,
      modeCreation: "DIRECT" as ETypeRedactionActe.TRANSCRIT
    };

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(modeCreationProjetActeInvalide);

    expect(projetActeTranscrit).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Le modeCreation du ProjetActeTranscrit a la valeur ${modeCreationProjetActeInvalide.modeCreation} au lieu de la suivante : ${ETypeRedactionActe.TRANSCRIT}.`
    );
  });

  test("DOIT lever une erreur et retourner null QUAND le statut du projet d'acte est invalide", () => {
    const statutProjetActeInvalide = {
      ...projetActeNaissanceDto,
      statut: "VALIDE" as keyof typeof EStatutActe
    };

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(statutProjetActeInvalide);

    expect(projetActeTranscrit).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Le statut du ProjetActeTranscrit a la valeur ${statutProjetActeInvalide.statut} au lieu de la suivante : ${EStatutActe.BROUILLON}.`
    );
  });

  test("DOIT lever une erreur et retourner null QUAND la nature du projet d'acte est invalide", () => {
    const natureProjetActeInvalide = {
      ...projetActeNaissanceDto,
      nature: "INVALID_NATURE" as keyof typeof ENatureActe
    };

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(natureProjetActeInvalide);

    expect(projetActeTranscrit).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `La nature du ProjetActeTranscrit a la valeur ${natureProjetActeInvalide.nature} au lieu d'une des suivantes : ${Object.keys(ENatureActe)}.`
    );
  });

  test("DOIT lever une erreur et retourner null QUAND le type du projet d'acte est invalide", () => {
    const typeProjetActeInvalide = {
      ...projetActeNaissanceDto,
      type: "INVALID_TYPE" as keyof typeof ETypeActe
    };

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(typeProjetActeInvalide);

    expect(projetActeTranscrit).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Le type du ProjetActeTranscrit a la valeur ${typeProjetActeInvalide.type} au lieu d'une des suivantes : ${Object.keys(ETypeActe)}.`
    );
  });

  test("DOIT lever une erreur et retourner null QUAND un champs obligatoire du declarant est manquant", () => {
    const declarantAvecChampsObligatoireManquant = {
      identiteDeclarant: "PERE",
      prenoms: [],
      nom: "",
      age: 50,
      qualite: "",
      sansProfession: true,
      profession: "",
      complementDeclarant: "",
      adresseDomicile: { ville: "Nantes", region: "Loire-atlantique", pays: "France" }
    };

    const projetActeTranscritDto: IProjetActeTranscritDto = {
      ...projetActeNaissanceDto,
      declarant: declarantAvecChampsObligatoireManquant as any
    };

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(projetActeTranscritDto);

    expect(projetActeTranscrit).toBeNull();
  });

  test("DOIT lever une erreur et retourner null QUAND un champs obligatoire de la formuleFinale est manquant", () => {
    const formuleFinaleAvecChampsObligatoireManquant = {
      idFormuleFinale: "51ee56e7-efa9-40e5-aa70-d3250c502151",
      nomDemandeur: "",
      prenomDemandeur: "",
      qualiteDemandeur: "",
      nomTransmetteur: "",
      autresPieces: "",
      legalisation: "APOSTILLE",
      pieceProduite: "COPIE",
      modeDepot: "TRANSMISE",
      identiteTransmetteur: "PERE"
    };

    const projetActeTranscritDto: IProjetActeTranscritDto = {
      ...projetActeNaissanceDto,
      formuleFinale: formuleFinaleAvecChampsObligatoireManquant as any
    };

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(projetActeTranscritDto);

    expect(projetActeTranscrit).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith("Un champ obligatoire d'une FormuleFinale n'est pas défini.");
  });

  test("DOIT lever une erreur QUAND un champs obligatoire du titulaire est manquant", () => {
    const titulaireAvecChampsObligatoireManquant = [
      {
        nom: "ddddddcc",
        prenoms: [],
        ordre: 1,
        sexe: "MASCULIN",
        naissance: {
          annee: 1992,
          jour: 12,
          mois: 11,
          voie: "12",
          ville: "Nantes",
          arrondissement: null,
          pays: "France",
          region: "Loire-atlantique",
          heure: 8,
          minute: 30,
          neDansLeMariage: false
        },
        filiations: [],
        nomPartie1: "",
        nomPartie2: "",
        pasDePrenom: false,
        domicile: {
          ville: "Nantes",
          region: "Loire-atlantique",
          pays: "France"
        }
      }
    ];

    const projetActeTranscritDto: IProjetActeTranscritDto = {
      ...projetActeNaissanceDto,
      titulaires: [titulaireAvecChampsObligatoireManquant as any]
    };
    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(projetActeTranscritDto);

    expect(projetActeTranscrit).not.toBeNull();
    expect(projetActeTranscrit?.titulaires).toHaveLength(0);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Un champ obligatoire d'un titulaireProjetActeTranscrit n'est pas défini.");
  });

  test("DOIT lever une erreur QUAND un champs obligatoire de l'analyse marginale est manquant", () => {
    const analysesMarginalesAvecChampsObligatoireManquant = [
      {
        id: "51eeb7e0-8b43-439e-b9aa-7d077c607f10",
        titulaires: [{ nom: "dddddd", prenoms: [], ordre: 1, typeDeclarationConjointe: "ABSENCE_DECLARATION" }],
        estValide: false
      }
    ];

    const projetActeTranscritDto: IProjetActeTranscritDto = {
      ...projetActeNaissanceDto,
      analyseMarginales: [analysesMarginalesAvecChampsObligatoireManquant as any]
    };

    const projetActeTranscrit = ProjetActeTranscrit.depuisDto(projetActeTranscritDto);

    expect(projetActeTranscrit).not.toBeNull();
    expect(projetActeTranscrit?.analysesMarginales).toHaveLength(0);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Un champ obligatoire d'un AnalyseMarginaleProjetActeTranscription n'est pas défini.");
  });
});
