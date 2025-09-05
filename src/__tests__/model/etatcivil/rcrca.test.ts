import {
  ficheDeuxInteresseNumeroOrdreNonOrdonne,
  ficheUnInteresseLieuDecesDateDeces,
  ficheUnInteressePrenomNonOrdonne,
  ficheUnInteresseVilleNaissanceALEtrangerAvecRegion,
  ficheUnInteresseVilleNaissanceALEtrangerSansRegion,
  ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis,
  ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis,
  ficheUnInteresseVilleNaissanceFranceSansArrondissement
} from "@mock/data/ficheEtBandeau/divers/InteressesMock";
import { FicheRcDecisionNotaire, mockRcDto } from "@mock/data/ficheRC";
import { ficheRcaDecisionAvecInstructionProcureur, mockRcaDto } from "@mock/data/ficheRCA";
import { ENationalite } from "@model/etatcivil/enum/Nationalite";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IDecisionRcRcaDTO } from "@model/etatcivil/rcrca/DecisionRcRca";
import { FicheRcRca, IFicheRcDto, IFicheRcaDto } from "@model/etatcivil/rcrca/FicheRcRca";
import { mappingInscriptionsRCDepuisFicheRcDto } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IInteresseDTO, Interesse } from "@model/etatcivil/rcrca/Interesse";
import DateUtils from "@util/DateUtils";
import { describe, expect, test, vi } from "vitest";

describe("test FicheRcRca", () => {
  describe("test interessesCommeSectionPartProps", () => {
    test("Interesse utils get interesse : affichés suivant leur numero d'ordre ", () => {
      const components = FicheRcRca.RcDepuisDto(ficheDeuxInteresseNumeroOrdreNonOrdonne)?.interessesCommeSectionPartProps;
      if (!components) {
        return;
      }

      expect(components).toHaveLength(3);
      expect(components[0].partContent?.title).toBe("Intéressé 1");
      expect(components[1].partContent?.title).toBe("Intéressé 2");
    });

    test("Interesse utils get interesse : affichage correct d'un interessé  ", () => {
      const ficheRcRca = FicheRcRca.RcDepuisDto(ficheUnInteressePrenomNonOrdonne) as FicheRcRca;
      const components = ficheRcRca.interessesCommeSectionPartProps;

      const idxNom = components[0].partContent?.contents.findIndex(content => content.libelle === "Nom");
      expect(idxNom).toBeGreaterThan(-1);

      const idxAutresNom = components[0].partContent?.contents.findIndex(content => content.libelle === "Autre(s) nom(s)");
      expect(idxAutresNom).toBeGreaterThan(-1);
      const valueAutresNom: JSX.Element = components[0].partContent?.contents[idxAutresNom as number].value as JSX.Element;

      expect(valueAutresNom.props.children).toBe("favarotti, favarotti2");
      expect(idxNom).toBeLessThan(idxAutresNom as number);

      const idxPrenoms = components[0].partContent?.contents.findIndex(content => content.libelle === "Prénom(s)");
      expect(idxPrenoms).toBeGreaterThan(-1);

      expect((components[0].partContent?.contents[idxPrenoms as number].value as JSX.Element).props.children).toBe("Flavio, Enrico, Pablo");
      expect(idxAutresNom).toBeLessThan(idxPrenoms as number);

      const idxAutrePrenoms = components[0].partContent?.contents.findIndex(content => content.libelle === "Autre(s) prénom(s)");
      expect(idxAutrePrenoms).toBeGreaterThan(-1);

      expect((components[0].partContent?.contents[idxAutrePrenoms as number].value as JSX.Element).props.children).toBe("autreP1, autreP2");
      expect(idxPrenoms).toBeLessThan(idxAutrePrenoms as number);

      const idxDateNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Date de naissance");
      expect(idxDateNaissance).toBeGreaterThan(-1);

      expect(components[0].partContent?.contents[idxDateNaissance as number].value).toBe("25/05/1980");
      expect(idxAutrePrenoms).toBeLessThan(idxDateNaissance as number);

      const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
      expect(idxLieuNaissance).toBeGreaterThan(-1);

      expect(idxDateNaissance).toBeLessThan(idxLieuNaissance as number);

      const idxNationalite = components[0].partContent?.contents.findIndex(content => content.libelle === "Nationalité");
      expect(idxNationalite).toBeGreaterThan(-1);

      expect(idxLieuNaissance).toBeLessThan(idxNationalite as number);

      const idxSexe = components[0].partContent?.contents.findIndex(content => content.libelle === "Sexe");
      expect(idxSexe).toBeGreaterThan(-1);

      expect(idxNationalite).toBeLessThan(idxSexe as number);
    });

    test("Interesse utils get interesse :  affichage lieu naissance en france dans une ville avec arrondissement ", () => {
      const components = FicheRcRca.RcDepuisDto(ficheUnInteresseVilleNaissanceFranceSansArrondissement)?.interessesCommeSectionPartProps;
      if (!components) {
        return;
      }

      const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
      expect(idxLieuNaissance).toBeGreaterThan(-1);

      expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Nantes (Pays de la Loire)");
    });

    test("Interesse utils get interesse :  affichage lieu naissance en france dans une ville avec arrondissement sauf Paris ", () => {
      const components = FicheRcRca.RcDepuisDto(
        ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis
      )?.interessesCommeSectionPartProps;
      if (!components) {
        return;
      }
      const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
      expect(idxLieuNaissance).toBeGreaterThan(-1);

      expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Lyon 2ème arrondissement (Auvergne-Rhône-Alpes)");
    });

    test("Interesse utils get interesse :  affichage lieu naissance en france à Paris ", () => {
      const components = FicheRcRca.RcDepuisDto(
        ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis
      )?.interessesCommeSectionPartProps;
      if (!components) {
        return;
      }
      const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
      expect(idxLieuNaissance).toBeGreaterThan(-1);

      expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Paris 2ème arrondissement");
    });

    test("Interesse utils get interesse :  affichage lieu naissance à l'étranger sans region", () => {
      const components = FicheRcRca.RcDepuisDto(ficheUnInteresseVilleNaissanceALEtrangerSansRegion)?.interessesCommeSectionPartProps;
      if (!components) {
        return;
      }
      const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
      expect(idxLieuNaissance).toBeGreaterThan(-1);

      expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Berlin (Allemagne)");
    });

    test("Interesse utils get interesse :  affichage lieu naissance à l'étranger avec region ", () => {
      const components = FicheRcRca.RcDepuisDto(ficheUnInteresseVilleNaissanceALEtrangerAvecRegion)?.interessesCommeSectionPartProps;
      if (!components) {
        return;
      }
      const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
      expect(idxLieuNaissance).toBeGreaterThan(-1);

      expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Berlin, RegionBerlin (Allemagne)");
    });

    test("Interesse utils get interesse :  affichage date décès et lieu décès rca ", () => {
      const components = FicheRcRca.RcaDepuisDto(ficheUnInteresseLieuDecesDateDeces)?.interessesCommeSectionPartProps;
      if (!components) {
        return;
      }
      const idxSexe = components[0].partContent?.contents.findIndex(content => content.libelle === "Sexe");

      const idxDateDeces = components[0].partContent?.contents.findIndex(content => content.libelle === "Date de décès");
      expect(idxDateDeces).toBeGreaterThan(idxSexe as number);

      expect(components[0].partContent?.contents[idxDateDeces as number].value).toBe("02/03/2018");

      const idxLieuDeces = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de décès");
      expect(idxLieuDeces).toBeGreaterThan(idxDateDeces as number);

      expect(components[0].partContent?.contents[idxLieuDeces as number].value).toBe("Berlin, RegionBerlin (Allemagne)");
    });
  });

  describe("test commePanelAccordionReceSection", () => {
    test("QUAND on utilise une fiche RC", () => {
      const panels = (FicheRcRca.RcDepuisDto(mockRcDto.data) as FicheRcRca).commePanelAccordionReceSection;
      expect(panels.panels).toHaveLength(1);
      expect(panels.panels[0].panelAreas).toHaveLength(5);
      expect(panels.panels[0].title).toBe("Visualisation du RC");
    });

    test("QUAND on utilise une fiche RCA", () => {
      const panels = (
        FicheRcRca.RcaDepuisDto({
          ...mockRcaDto.data,
          personnes: []
        }) as FicheRcRca
      ).commePanelAccordionReceSection;
      expect(panels.panels).toHaveLength(1);
      expect(panels.panels[0].panelAreas).toHaveLength(5);
      expect(panels.panels[0].title).toBe("Visualisation du RCA");
    });
  });

  describe("test modeles DTO invalides", () => {
    test("Fiche RCA avec une DecisionRcRca manquante", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const ficheRca = { ...ficheRcaDecisionAvecInstructionProcureur, decision: undefined as unknown as IDecisionRcRcaDTO } as IFicheRcaDto;

      FicheRcRca.RcaDepuisDto(ficheRca);

      expect(consoleErrorMock).toHaveBeenCalledWith("Le champ obligatoire decision d'un FicheRca n'est pas défini.");

      consoleErrorMock.mockRestore();
    });

    test("Fiche RC avec une nature manquante", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const ficheRc = { ...FicheRcDecisionNotaire, nature: undefined as unknown } as IFicheRcDto;

      FicheRcRca.RcDepuisDto(ficheRc);

      expect(consoleErrorMock).toHaveBeenCalledWith("Le champ obligatoire nature d'un FicheRc n'est pas défini.");

      consoleErrorMock.mockRestore();
    });

    test("Fiche RC avec une dateInscription manquante", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const ficheRc = { ...FicheRcDecisionNotaire, dateInscription: undefined as unknown } as IFicheRcDto;

      FicheRcRca.RcDepuisDto(ficheRc);

      expect(consoleErrorMock).toHaveBeenCalledWith("Le champ obligatoire dateInscription d'un FicheInscription n'est pas défini.");

      expect(consoleErrorMock).toHaveBeenCalledWith("La fiche RC récupérée est incomplète, donc invalide.");

      consoleErrorMock.mockRestore();
    });

    test("Fiche RCA avec un typeInscription invalide", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const ficheRca = { ...ficheRcaDecisionAvecInstructionProcureur, typeInscription: "nul" as unknown } as IFicheRcaDto;

      FicheRcRca.RcaDepuisDto(ficheRca);

      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Le typeInscription d'un FicheRca a la valeur nul au lieu d'une des suivantes : INSCRIPTION"
      );

      consoleErrorMock.mockRestore();
    });

    test("Fiche RC avec un typeInscription invalide", () => {
      const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

      const ficheRc = { ...FicheRcDecisionNotaire, typeInscription: "nul" as unknown } as IFicheRcDto;

      FicheRcRca.RcDepuisDto(ficheRc);

      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Le typeInscription d'un FicheRc a la valeur nul au lieu d'une des suivantes : INSCRIPTION,RENOUVELLEMENT,MODIFICATION,RADIATION,MAIN_LEVEE,FIN_MESURE,CADUCITE,INCONNU"
      );

      consoleErrorMock.mockRestore();
    });
  });
});

describe("test Interesse", () => {
  test("Erreur si le sexe est invalide", () => {
    const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

    const interesse: IInteresseDTO = {
      ...ficheRcaDecisionAvecInstructionProcureur.interesses[0],
      sexe: "nul" as unknown as keyof typeof ESexe
    };

    Interesse.depuisDto(interesse);

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Le sexe d'un Interesse a la valeur nul au lieu d'une des suivantes : MASCULIN,FEMININ,INDETERMINE,INCONNU."
    );

    consoleErrorMock.mockRestore();
  });

  test("Erreur si la nationalite est invalide", () => {
    const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

    const interesse: IInteresseDTO = {
      ...ficheRcaDecisionAvecInstructionProcureur.interesses[0],
      nationalite: "nul" as unknown as keyof typeof ENationalite
    };

    Interesse.depuisDto(interesse);

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "La nationalité d'un Interesse a la valeur nul au lieu d'une des suivantes : FRANCAISE,ETRANGERE,INCONNUE."
    );

    consoleErrorMock.mockRestore();
  });

  test("Erreur si un attribut obligatoire est manquant", () => {
    const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

    const interesse: IInteresseDTO = {
      ...ficheRcaDecisionAvecInstructionProcureur.interesses[0],
      nomFamille: undefined as unknown as keyof typeof ENationalite
    };

    Interesse.depuisDto(interesse);

    expect(consoleErrorMock).toHaveBeenCalledWith("Un champ obligatoire d'un Interesse n'est pas défini.");

    consoleErrorMock.mockRestore();
  });
});

describe("test IInscriptionRC", () => {
  test("test mappingInscriptionsRCDepuisFicheRcDto", () => {
    expect(mappingInscriptionsRCDepuisFicheRcDto([ficheDeuxInteresseNumeroOrdreNonOrdonne])).toStrictEqual([
      {
        dateInscription: DateUtils.getDateDepuisDateArrayDto([2020, 11, 18]),
        idInscription: "135e4dfe-9757-4d5d-8715-359c6e73289b",
        nature: null,
        typeInscription: "Inscription"
      }
    ]);
  });
});
