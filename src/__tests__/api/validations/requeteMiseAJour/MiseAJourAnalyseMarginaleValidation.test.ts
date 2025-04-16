import { IMiseAJourAnalyseMarginaleDto } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { MiseAJourAnalyseMarginaleValeursForm } from "@api/validations/requeteMiseAJour/MiseAJourAnalyseMarginaleValidation";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { describe, expect, test } from "vitest";
import { IAnalyseMarginaleMiseAJour } from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";

describe("test MiseAJourAnalyseMarginaleValeursForm", () => {
  test("versDto traite les valeurs vides", () => {
    const analyseMarginaleMiseAJourVide: IAnalyseMarginaleMiseAJour = {
      nom: "",
      nomSecable: false,
      nomPartie1: "",
      nomPartie2: "",
      prenoms: PrenomsForm.valeursInitiales(),
      motif: ""
    };

    const resultatAttendu: IMiseAJourAnalyseMarginaleDto = {
      motifModification: "",
      titulaires: [{ ordre: 1, nom: "", prenoms: [], nomPartie1: null, nomPartie2: null }]
    };

    expect(MiseAJourAnalyseMarginaleValeursForm.versDto(analyseMarginaleMiseAJourVide)).toStrictEqual(resultatAttendu);
  });
});
