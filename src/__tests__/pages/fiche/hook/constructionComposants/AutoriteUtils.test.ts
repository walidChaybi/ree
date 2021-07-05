import { IFicheRcRca } from "../../../../../model/etatcivil/fiche/IFicheRcRca";
import { getAutorite } from "../../../../../views/pages/fiche/hook/constructionComposants/rcrca/AutoriteUtils";
import {
  ficheAutoriteJuridictionEtrangerAvecConfirmation,
  ficheAutoriteJuridictionFranceAvecConfirmation,
  ficheAutoriteNotaireEtrangerAvecConfirmation,
  ficheAutoriteNotaireFranceAvecConfirmation,
  ficheAutoriteOnac,
  ficheAutoriteOnaceEtrangerAvecConfirmation,
  ficheAutoriteSansConfirmation,
  ficheNonValide
} from "./mock/DecisionAutoriteMock";

test("Autorite utils get autorite : decision en France, de type Juridiction, la source de confirmation est présente", async () => {
  const components = getAutorite(
    ficheAutoriteJuridictionFranceAvecConfirmation as IFicheRcRcaRca
  );

  expect(components).toHaveLength(2);

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxVille = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Ville"
  );
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxVille);

  const idxArrondissement = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Arrondissement"
  );
  expect(idxArrondissement).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxArrondissement);

  const idxDepartement = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Département"
  );
  expect(idxDepartement).toBeGreaterThan(-1);
  expect(idxArrondissement).toBeLessThan(idxDepartement);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Prénom NOM"
    )
  ).toBe(-1);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Région"
    )
  ).toBe(-1);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Pays"
    )
  ).toBe(-1);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "N° CRPCEN"
    )
  ).toBe(-1);
});

test("Autorite utils get autorite : decision à l'étranger, de type Juridiction, la source de confirmation est présente", async () => {
  const components = getAutorite(
    ficheAutoriteJuridictionEtrangerAvecConfirmation as IFicheRcRca
  );

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxVille = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Ville"
  );
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxVille);

  const idxRegion = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Région"
  );
  expect(idxRegion).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxRegion);

  const idxPays = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Pays"
  );
  expect(idxPays).toBeGreaterThan(-1);
  expect(idxRegion).toBeLessThan(idxPays);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Arrondissement"
    )
  ).toBe(-1);
  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Département"
    )
  ).toBe(-1);
  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Prénom NOM"
    )
  ).toBe(-1);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "N° CRPCEN"
    )
  ).toBe(-1);
});

test("Autorite utils get autorite : decision en France, de type Notaire ", async () => {
  const components = getAutorite(
    ficheAutoriteNotaireFranceAvecConfirmation as IFicheRcRca
  );

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxVille = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Ville"
  );
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxType).toBeLessThan(idxVille);

  const idxPrenomNom = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Prénom NOM"
  );
  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Prénom NOM"
    )
  ).toBeGreaterThan(-1);
  expect(idxVille).toBeGreaterThan(idxPrenomNom);

  const idxArrondissement = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Arrondissement"
  );
  expect(idxArrondissement).toBeGreaterThan(-1);
  expect(idxPrenomNom).toBeLessThan(idxArrondissement);

  const idxDepartement = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Département"
  );
  expect(idxDepartement).toBeGreaterThan(-1);
  expect(idxArrondissement).toBeLessThan(idxDepartement);

  const idxCrpcen = components[0].partContent?.contents.findIndex(
    content => content.libelle === "N° CRPCEN"
  );

  expect(idxCrpcen).toBeGreaterThan(-1);
  expect(idxDepartement).toBeLessThan(idxCrpcen);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Région"
    )
  ).toBe(-1);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Pays"
    )
  ).toBe(-1);
});

test("Autorite utils get autorite : decision à l'étranger, de type Notaire ", async () => {
  const components = getAutorite(
    ficheAutoriteNotaireEtrangerAvecConfirmation as IFicheRcRca
  );

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxPrenomNom = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Prénom NOM"
  );
  expect(idxPrenomNom).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxPrenomNom);

  const idxVille = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Ville"
  );
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxPrenomNom).toBeLessThan(idxVille);

  const idxRegion = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Région"
  );
  expect(idxRegion).toBeGreaterThan(-1);
  expect(idxVille).toBeLessThan(idxRegion);

  const idxPays = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Pays"
  );
  expect(idxPays).toBeGreaterThan(-1);
  expect(idxRegion).toBeLessThan(idxPays);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Arrondissement"
    )
  ).toBe(-1);
  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Département"
    )
  ).toBe(-1);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "N° CRPCEN"
    )
  ).toBe(-1);
});

test("Autorite utils get autorite : decision à l'étranger, de type Onac avec confirmation ONAC ", async () => {
  const components = getAutorite(
    ficheAutoriteOnaceEtrangerAvecConfirmation as IFicheRcRca
  );

  const idxType = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Type"
  );
  expect(idxType).toBeGreaterThan(-1);

  const idxPrenomNom = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Titre"
  );
  expect(idxPrenomNom).toBeGreaterThan(-1);
  expect(idxType).toBeLessThan(idxPrenomNom);

  const idxVille = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Ville"
  );
  expect(idxVille).toBeGreaterThan(-1);

  expect(idxPrenomNom).toBeLessThan(idxVille);

  const idxRegion = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Région"
  );
  expect(idxRegion).toBeGreaterThan(-1);
  expect(idxVille).toBeLessThan(idxRegion);

  const idxPays = components[0].partContent?.contents.findIndex(
    content => content.libelle === "Pays"
  );
  expect(idxPays).toBeGreaterThan(-1);
  expect(idxRegion).toBeLessThan(idxPays);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Arrondissement"
    )
  ).toBe(-1);
  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "Département"
    )
  ).toBe(-1);

  expect(
    components[0].partContent?.contents.findIndex(
      content => content.libelle === "N° CRPCEN"
    )
  ).toBe(-1);
});

test("Autorite utils get autorite : la source de confirmation n'est pas présente", async () => {
  const components = getAutorite(ficheAutoriteSansConfirmation as IFicheRcRca);

  expect(components).toHaveLength(1);
});

test("Autorite utils get autorite : donnees non valides", async () => {
  const components = getAutorite(ficheNonValide as IFicheRcRca);

  expect(components[0].partContent?.contents).toHaveLength(0);
});

test("Autorite utils get autorite : onac", async () => {
  const components = getAutorite(ficheAutoriteOnac as IFicheRcRca);
  const element = components[0].partContent?.contents[1].value as JSX.Element;
  expect(element.props.children).toBe("titreOnac");
});
