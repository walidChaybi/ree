import { creationCompositionExtraitPlurilingue } from "@hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import {
    ficheActeAvecAnneeNaissanceTitulaireAbsente,
    ficheActeAvecTitulaireIndetermine,
    ficheActeAvecUnParentTitulaireInconnu,
    ficheActeAvecUnParentTitulaireIndetermine,
    ficheActeNaissanceAvecParentsDeMemeSexe,
    ficheActeNaissanceAvecTitulaireInconnu
} from "../../../../../../mock/data/ficheActe";
import { mentionsPlurilinguesMariageAvec6 } from "../../../../../../mock/data/mentions";

const validation = "O";
const mentionsRetirees: string[] = [];





describe("Composition extrait plurilingue de Naissance", () => {
  test("Doit mettre le document en erreur si le titulaire est de sexe inconnu", () => {
    const acte = mapActe(ficheActeNaissanceAvecTitulaireInconnu.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si un des parents est de sexe inconnu", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si l'annee de naissance du titulaire est manquante", () => {
    const acte = mapActe(ficheActeAvecAnneeNaissanceTitulaireAbsente.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si le titulaire de l'acte est de genre indeterminé", () => {
    const acte = mapActe(ficheActeAvecTitulaireIndetermine.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_erreur).toEqual(true);
  });

  test("Doit mettre le document en erreur si les parents du titulaires sont de même sexe", () => {
    const acte = mapActe(ficheActeNaissanceAvecParentsDeMemeSexe.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_erreur).toEqual(true);
  });

  test("Doit mettre le document en erreur si les parents du titulaires est de sexe indetermine", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireIndetermine.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.filigrane_erreur).toEqual(true);
  });

  test("Doit composer l'etrait avec les bonne données", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      Validation.O,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    const nom = "Patamob";
    const prenoms = "Alphonse";
    const date_naissance = {
      jour: 10,
      mois: 10,
      annee: 1901
    };
    const lieuNaissance = "Paris, Paris (France)";

    const nomPere = "";
    const prenomPere = "";

    if (compositionCorps.titulaire_1) {
      expect(compositionCorps.titulaire_1.nom).toBe(nom);
      expect(compositionCorps.titulaire_1.prenoms).toBe(prenoms);
      expect(compositionCorps.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps.titulaire_1.date_naissance?.jour).toBe(
        date_naissance.jour
      );
      expect(compositionCorps.titulaire_1.nom_pere).toBe(nomPere);

      expect(compositionCorps.titulaire_1?.prenoms_pere).toBe(prenomPere);
    }
  });

  test("Doit afficher les mentions quand le nombre de mentions est en dessous ou égale de la limite", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);
    acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    const mentierAfficherUn = "Sc 31-01-92 Nantes Jenmi";

    expect(compositionCorps.autres_enonciations_acte.enonciations[0]).toBe(
      mentierAfficherUn
    );
  });

  test("Ne doit pas affiché une mention sur l'extrait si elle est présente dans les mentions retirées", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);
    acte.mentions = mentionsPlurilinguesMariageAvec6 as any as IMention[];
    const mentionsRetirees: string[] = ["f6947623-9959-4d07-8963-f55b16a01071"];

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    const mentionAfficherUn = "Sc 31-12-98 Nantes Jenmi";

    expect(compositionCorps.autres_enonciations_acte.enonciations[0]).toBe(
      mentionAfficherUn
    );
  });

  test("Ne doit pas éditer le nom si il est égale à SNP et prénom si égale à SPC", () => {
    const acte = mapActe(ficheActeAvecUnParentTitulaireInconnu.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.titulaire_1?.nom_pere).toBe("");
    expect(compositionCorps.titulaire_1?.prenoms_pere).toBe("");
  });

  test("Doit formater les prénoms correctement", () => {
    const acte = mapActe(ficheActeAvecAnneeNaissanceTitulaireAbsente.data);

    const compositionCorps = creationCompositionExtraitPlurilingue(
      acte as any as IFicheActe,
      validation as Validation,
      SousTypeDelivrance.RDC,
      mentionsRetirees
    );

    expect(compositionCorps.titulaire_1?.prenoms_pere).toBe("Jean, Louis");
  });
});
