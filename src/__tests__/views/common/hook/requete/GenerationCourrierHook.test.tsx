import {
  mapCourrierPourSauvegarde,
  mappingSaisieAdresseVersAdresseRequerant,
  useGenerationCourrierHook
} from "@hook/requete/GenerationCourrierHook";
import { idDocumentsReponse } from "@mock/data/DocumentReponse";
import { OptionsChoisiesCourrier17, RequeteRDDCourrier17, SaisieCourrier17 } from "@mock/data/SaisieCourrier";
import { Orientation } from "@model/composition/enum/Orientation";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { ISauvegardeCourrier } from "@model/requete/ISauvegardeCourrier";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import { MimeType } from "../../../../../ressources/MimeType";

describe("Test GenerationCourrierHook", () => {
  const saisieCourrier = SaisieCourrier17;
  const requete = RequeteRDDCourrier17;
  const optionsChoisies = OptionsChoisiesCourrier17;

  const params = {
    saisieCourrier,
    optionsChoisies,
    requete,
    mettreAJourStatut: true
  };

  const HookConsummer: React.FC = () => {
    const res = useGenerationCourrierHook(params);

    return <div data-testid="resulatIdDoc">{res?.idDocumentReponse && <>{`idDocumentReponse=${res?.idDocumentReponse}`}</>}</div>;
  };

  test("Attendu: la génération d'un courrier s'effectue correctement", () => {
    render(<HookConsummer></HookConsummer>);

    waitFor(() => {
      expect(screen.getByTestId("resulatIdDoc").innerHTML).toBe(`idDocumentReponse=${idDocumentsReponse[0]}`);
    });
  });

  test("mapCourrierPourSauvegarde fonctionne correctement", () => {
    const donneesComposition = {
      contenu: "contenu donnees composition",
      nbPages: 5
    };
    const courrier = { libelle: "libelle courrier", id: "id courrier" };

    const documentReponse1: ISauvegardeCourrier = mapCourrierPourSauvegarde(
      { ...saisieCourrier, requerant: { ...saisieCourrier.requerant, raisonSociale: "raison sociale" } },
      donneesComposition,
      optionsChoisies,
      courrier
    );

    const expectedResult1 = {
      nomRequerant: saisieCourrier.requerant.nom,
      prenomRequerant: saisieCourrier.requerant.prenom,
      raisonSocialeRequerant: "raison sociale",
      adresseRequerant: mappingSaisieAdresseVersAdresseRequerant(saisieCourrier),
      motif: saisieCourrier.requete.motif,
      nombreExemplairesDemandes: parseInt(saisieCourrier.requete.nbExemplaire.toString()),
      documentReponse: {
        contenu: donneesComposition.contenu,
        nom: courrier.libelle,
        mimeType: MimeType.APPLI_PDF,
        typeDocument: courrier.id, // UUID du courrier (nomenclature)
        nbPages: donneesComposition.nbPages,
        orientation: Orientation.PORTRAIT,
        optionsCourrier: optionsChoisies?.map(optionChoisie => {
          return {
            code: optionChoisie.id,
            numeroOrdreEdition: optionChoisie.ordreEdition,
            texte: optionChoisie.texteOptionCourrierModifie ? optionChoisie.texteOptionCourrierModifie : optionChoisie.texteOptionCourrier
          };
        }),
        texteLibreCourrier: {
          texte: saisieCourrier.texteLibre.texte
        }
      } as IDocumentReponse
    };

    expect(documentReponse1).toStrictEqual(expectedResult1);

    const documentReponse2: ISauvegardeCourrier = mapCourrierPourSauvegarde(undefined, donneesComposition, undefined, courrier);

    const expectedResult2 = {
      nomRequerant: "",
      prenomRequerant: "",
      raisonSocialeRequerant: "",
      adresseRequerant: mappingSaisieAdresseVersAdresseRequerant(saisieCourrier),
      motif: "",
      nombreExemplairesDemandes: NaN,
      documentReponse: {
        contenu: donneesComposition.contenu,
        nom: courrier.libelle,
        mimeType: MimeType.APPLI_PDF,
        typeDocument: courrier.id, // UUID du courrier (nomenclature)
        nbPages: donneesComposition.nbPages,
        orientation: Orientation.PORTRAIT,
        optionsCourrier: undefined,
        texteLibreCourrier: {
          texte: ""
        }
      } as IDocumentReponse
    };

    expect(documentReponse2).toStrictEqual(expectedResult2);
  });
});
