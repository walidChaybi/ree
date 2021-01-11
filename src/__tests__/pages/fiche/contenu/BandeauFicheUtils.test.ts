import { setDataBandeau } from "../../../../views/pages/fiche/contenu/BandeauFicheUtils";
import DATA_FICHE_RC from "../data/bandeauRc";
import DATA_FICHE_PACS from "../data/bandeauPacs";
import { fournisseurDonneesBandeauFactory } from "../../../../views/pages/fiche/contenu/fournisseurDonneesBandeau/fournisseurDonneesBandeauFactory";
import { acte } from "../data/ficheActe";

test("bandeauFicheUtils setDataBandeau works RC / RCA", async () => {
  const bandeauFiche = setDataBandeau(
    "rc",
    fournisseurDonneesBandeauFactory.createFournisseur(
      "rc",
      DATA_FICHE_RC.dataBandeau
    )
  );
  expect(bandeauFiche.titreFenetre).toBe("RC - NOM1 et NOM2 - N° 2018 - 56533");
  expect(bandeauFiche.statutsFiche).toEqual([
    { statut: "Actif" },
    { statut: "Inactif" }
  ]);
  expect(bandeauFiche.personnes[0].prenom).toBe("prenom11");
  expect(bandeauFiche.personnes[1].prenom).toBe("prenom21");
  expect(bandeauFiche.alertes).toEqual([
    { alerte: "Date de fin de mesure dépassée", dateCreation: 1581807600 }
  ]);
});

test("bandeauFicheUtils setDataBandeau works PACS", async () => {
  const bandeauFiche = setDataBandeau(
    "pacs",
    fournisseurDonneesBandeauFactory.createFournisseur(
      "pacs",
      DATA_FICHE_PACS.dataBandeau
    )
  );
  expect(bandeauFiche.titreFenetre).toBe(
    "PACS - NOM1 et NOM2 - N° 2019 - 29369"
  );
  expect(bandeauFiche.statutsFiche).toEqual([
    { statut: "Actif" },
    { statut: "Inactif" }
  ]);
  expect(bandeauFiche.personnes[0].prenom).toBe("prenom11");
  expect(bandeauFiche.personnes[1].prenom).toBe("prenom21");
});

test("bandeauFicheUtils setDataBandeau works Acte", async () => {
  const bandeauFiche = setDataBandeau(
    "acte",
    fournisseurDonneesBandeauFactory.createFournisseur("acte", acte)
  );

  expect(bandeauFiche.titreFenetre).toBe(
    "ABSENCE - GREENWALD et DUPE - N° 1921 - 413"
  );
  expect(bandeauFiche.personnes[0].prenom).toBe("Paulita");
  expect(bandeauFiche.registre).toBe("CSL.DX.1921.413.NA.T");
});
