import { pacsModificationNotaireMap } from "../../../mock/data/PACS";
import { NatureRca } from "../../../model/etatcivil/enum/NatureRca";
import { TypeFiche } from "../../../model/etatcivil/enum/TypeFiche";
import { IFicheRcRca } from "../../../model/etatcivil/rcrca/IFicheRcRca";
import { IDataFicheProps } from "../../../views/pages/fiche/FichePage";
import { getFicheTitle, setFiche } from "../../../views/pages/fiche/FicheUtils";

test("ficheUtils getFicheTitle works", async () => {
  const title = getFicheTitle("categorie", "2020", "numero", [
    { nom: "nom1", prenom: " " },
    { nom: "nom2", prenom: " " }
  ]);
  expect(title).toBe("CATEGORIE - NOM1 et NOM2 - N° 2020 - numero");

  const title2 = getFicheTitle("categorie", "2020", "numero", [
    { nom: "nom1", prenom: undefined! }
  ]);
  expect(title2).toBe("CATEGORIE - NOM1 - N° 2020 - numero");
});

test("ficheUtils setFiche PACS works", () => {
  const dataFiche: IDataFicheProps = {
    identifiant: "89c9d030-26c3-41d3-bdde-8b4dcc0420e0",
    categorie: TypeFiche.PACS
  };

  const fiche = setFiche(dataFiche, pacsModificationNotaireMap);

  expect(fiche.bandeauFiche.titreFenetre).toBe(
    "PACS - DUREL et DUPE - N° 2018 - 123456"
  );
  expect(fiche.bandeauFiche.statutsFiche).toStrictEqual([
    {
      statut: "Actif",
      dateStatut: 1606381200000,
      statutFicheEvenement: {
        ville: "nantes",
        region: "Pays de Loire",
        pays: "FRANCE",
        date: { annee: "2020" }
      },
      motif: "",
      complementMotif: ""
    }
  ]);
});

test("ficheUtils setFiche RCA works", () => {
  const dataFiche: IDataFicheProps = {
    identifiant: "1",
    categorie: TypeFiche.RCA
  };

  const data: IFicheRcRca = {
    id: "1",
    categorie: TypeFiche.RCA,
    annee: "1992",
    numero: "1",
    alertes: [{ alerte: "ouhou", dateCreation: 1 }],
    interesses: [],
    statutsFiche: [],
    nature: ("hi" as unknown) as NatureRca,
    mandataires: [],
    inscriptionsImpactees: [],
    inscriptionsLiees: [],
    personnes: []
  };

  const fiche = setFiche(dataFiche, data);

  expect(fiche.bandeauFiche.titreFenetre).toBe("RCA -  - N° 1992 - 1");
  expect(fiche.bandeauFiche.annee).toBe("1992");
});
