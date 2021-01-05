import { setDataBandeau } from "../../../../views/pages/fiche/contenu/BandeauFicheUtils";
import DATA_FICHE_RC from "../data/bandeauRc";
import DATA_FICHE_PACS from "../data/bandeauPacs";

test("bandeauFicheUtils setDataBandeau works RC / RCA", async () => {
  const bandeauFiche = setDataBandeau(DATA_FICHE_RC.dataBandeau, "rc");
  expect(bandeauFiche.titreFenetre).toBe("RC - NOM1 et NOM2 - N° 2018 - 56533");
  expect(bandeauFiche.statutsFiche).toEqual([
    { statut: "Actif" },
    { statut: "Inactif" }
  ]);
  expect(bandeauFiche.prenom1).toBe("prenom11");
  expect(bandeauFiche.prenom2).toBe("prenom21");
  expect(bandeauFiche.alertes).toEqual([
    { alerte: "Date de fin de mesure dépassée", dateCreation: 1581807600 }
  ]);
});

test("bandeauFicheUtils setDataBandeau works PACS", async () => {
  const bandeauFiche = setDataBandeau(DATA_FICHE_PACS.dataBandeau, "pacs");
  expect(bandeauFiche.titreFenetre).toBe(
    "PACS - NOM1 et NOM2 - N° 2019 - 29369"
  );
  expect(bandeauFiche.statutsFiche).toEqual([
    { statut: "Actif" },
    { statut: "Inactif" }
  ]);
  expect(bandeauFiche.prenom1).toBe("prenom11");
  expect(bandeauFiche.prenom2).toBe("prenom21");
});
