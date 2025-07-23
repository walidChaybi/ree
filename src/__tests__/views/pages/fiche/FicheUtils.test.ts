import { pacsModificationNotaireMap } from "@mock/data/fichePACS";
import { ficheRca } from "@mock/data/ficheRCA";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { StatutFiche } from "@model/etatcivil/fiche/StatutFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { IDataFicheProps } from "@pages/fiche/FichePage";
import { getFicheTitle, setFiche } from "@pages/fiche/FicheUtils";
import { expect, test } from "vitest";

test("ficheUtils getFicheTitle works", () => {
  const title = getFicheTitle(
    "categorie",
    "2020",
    "numero",
    [
      { nom: "nom1", prenom: "" },
      { nom: "nom2", prenom: "" }
    ],
    ETypeFiche.ACTE
  );
  expect(title).toBe("CATEGORIE - nom1 et nom2");

  const title2 = getFicheTitle("categorie", "2020", "numero", [{ nom: "nom1", prenom: "prenom" }], ETypeFiche.PACS);
  expect(title2).toBe("CATEGORIE - nom1 prenom - N° 2020 - numero");
});

test("ficheUtils setFiche PACS works", () => {
  const dataFiche: IDataFicheProps = {
    identifiant: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    categorie: ETypeFiche.PACS
  };

  const fiche = setFiche(UtilisateurConnecte.inconnu(), dataFiche, FichePacs.depuisDto(pacsModificationNotaireMap));

  expect(fiche.bandeauFiche.titreFenetre).toBe("PACS - DUREL Marie Charlotte et DUPE Louis-Philippe - N° 2018 - 123456");
  expect(fiche.bandeauFiche.statutsFiche).toStrictEqual([
    StatutFiche.depuisDto({
      statut: "ACTIF",
      dateStatut: 1606381200000,
      statutFicheEvenement: {
        id: "",
        ville: "nantes",
        region: "Pays de Loire",
        pays: "FRANCE",
        date: { annee: "2020" }
      },
      motif: "",
      complementMotif: ""
    })
  ]);
});

test("ficheUtils setFiche RCA works", () => {
  const dataFiche: IDataFicheProps = {
    identifiant: "8c9ea77f-55dc-494f-8e75-b136ac7ce63d",
    categorie: ETypeFiche.RCA
  };

  const data = FicheRcRca.RcaDepuisDto(ficheRca.data);

  const fiche = setFiche(UtilisateurConnecte.inconnu(), dataFiche, data);

  expect(fiche.bandeauFiche.titreFenetre).toBe("RCA - FLECK Léo - N° 2020 - 4093");
  expect(fiche.bandeauFiche.annee).toBe("2020");
});
