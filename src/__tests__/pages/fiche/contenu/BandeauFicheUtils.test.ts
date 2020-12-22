import { setDataBandeau } from "../../../../views/pages/fiche/contenu/BandeauFicheUtils";
import DATA_FICHE from "../data/bandeauRc";

test("bandeauFicheUtils setDataBandeau works", async () => {
  const bandeauFiche = setDataBandeau(DATA_FICHE.dataBandeau);
  expect(bandeauFiche.titreFenetre).toBe("RC - NOM1 et NOM2 - N° 2018 - 56533");
  expect(bandeauFiche.statutsFiche).toEqual([
    { statut: "Actif" },
    { statut: "Inactif" }
  ]);
  expect(bandeauFiche.prenom1).toBe("prenom12");
  expect(bandeauFiche.prenom2).toBe("prenom22");
  expect(bandeauFiche.alertes).toEqual([
    { alerte: undefined, dateCreation: 1581807600 }
  ]);
});
