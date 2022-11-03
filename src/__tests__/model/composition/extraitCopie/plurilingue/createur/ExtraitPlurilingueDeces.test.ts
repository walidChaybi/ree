import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import request from "superagent";
import { ficheActeDeces } from "../../../../../../mock/data/ficheActe";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [configRequetes[0]]);

const validation = "O";
const mentionsRetirees: string[] = [];

beforeAll(() => {
  DocumentDelivrance.init();
});

afterAll(() => {
  superagentMock.unset();
});

describe("Composition extrait plurilingue de Naissance", () => {
  test("Doit composer l'etrait avec les bonne données", () => {
    const acte = mapActe(ficheActeDeces.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    const nom = "GREENWALD";
    const prenoms = "Marie-paulita, Zaria, Léna";
    const sexe = "F";
    const date_naissance = {
      jour: "",
      mois: 3,
      annee: 1948
    };
    const date_deces = {
      jour: 11,
      mois: 3,
      annee: 1995
    };
    const lieuNaissance = "Milan, Lombardie (Italie)";

    const nomPere = "Sacken";
    const prenomsPere = "Carmela, Linzy";

    if (compositionCorps.titulaire_1) {
      expect(compositionCorps.titulaire_1.nom).toBe(nom);
      expect(compositionCorps.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps.titulaire_1.sexe).toBe(sexe);
      expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(
        date_naissance.jour
      );
      expect(compositionCorps.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps.titulaire_1.prenoms_pere).toBe(prenomsPere);
      expect(compositionCorps.titulaire_1.nom_dernier_conjoint).toBe(
        "De fontaine"
      );
      expect(compositionCorps.titulaire_1.prenoms_dernier_conjoint).toBe(
        "Ratus"
      );
      expect(compositionCorps.titulaire_1.date_deces?.annee).toBe(
        date_deces.annee
      );
      expect(compositionCorps.titulaire_1.lieu_deces).toBe(
        "Lille, Loire-Atlantique (France)"
      );
    }
  });
});
