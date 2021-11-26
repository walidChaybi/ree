import { TypeFiche } from "../../../../model/etatcivil/enum/TypeFiche";
import { setDataBandeau } from "../../../../views/pages/fiche/contenu/BandeauFicheUtils";
import { IDataFicheProps } from "../../../../views/pages/fiche/FichePage";
import DATA_FICHE_PACS from "../data/bandeauPacs";
import DATA_FICHE_RC from "../data/bandeauRc";
import { acte } from "../data/ficheActe";

test("bandeauFicheUtils setDataBandeau works RC / RCA", async () => {
  const dataFiche = {
    identifiant: "d994e5c1-6bcd-44cd-af7a-41da6bab4669",
    categorie: TypeFiche.RC
  } as IDataFicheProps;

  const data = DATA_FICHE_RC.dataBandeau;

  const bandeauFiche = setDataBandeau(dataFiche, data);

  expect(bandeauFiche.titreFenetre).toBe(
    "RC - NOM1 Prenom11 et NOM2 Prenom21 - N° 2018 - 56533"
  );
  expect(bandeauFiche.statutsFiche).toEqual([
    { statut: "Actif" },
    { statut: "Inactif" }
  ]);
  expect(bandeauFiche.personnes[0].prenom).toBe("Prenom11");
  expect(bandeauFiche.personnes[1].prenom).toBe("Prenom21");
  expect(bandeauFiche.alertes).toEqual([
    { alerte: "Date de fin de mesure dépassée", dateCreation: 1581807600 }
  ]);
});

test("bandeauFicheUtils setDataBandeau works PACS", async () => {
  const dataFiche = {
    identifiant: "d994e5c1-6bcd-44cd-af7a-41da6bab4669",
    categorie: TypeFiche.PACS
  } as IDataFicheProps;

  const data = DATA_FICHE_PACS.dataBandeau;

  const bandeauFiche = setDataBandeau(dataFiche, data);

  expect(bandeauFiche.titreFenetre).toBe(
    "PACS - NOM1 Prenom11 et NOM2 Prenom21 - N° 2019 - 29369"
  );
  expect(bandeauFiche.statutsFiche).toEqual([
    { statut: "Actif" },
    { statut: "Inactif" }
  ]);
  expect(bandeauFiche.personnes[0].prenom).toBe("Prenom11");
  expect(bandeauFiche.personnes[1].prenom).toBe("Prenom21");
});

test("bandeauFicheUtils setDataBandeau works Acte", async () => {
  const dataFiche = {
    identifiant: "d994e5c1-6bcd-44cd-af7a-41da6bab4669",
    categorie: TypeFiche.ACTE
  } as IDataFicheProps;

  const data = acte;

  const bandeauFiche = setDataBandeau(dataFiche, data);

  expect(bandeauFiche.titreFenetre).toBe(
    "ABSENCE - GREENWALD Paulita et DUPE Laurent - N° 1921 - 410"
  );
  expect(bandeauFiche.personnes[0].prenom).toBe("Paulita");
  expect(bandeauFiche.registre).toBe("CSL.DX.1922.NA.T.410.681");
});
