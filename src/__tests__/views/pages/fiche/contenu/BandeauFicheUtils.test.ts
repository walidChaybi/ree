import { acte } from "@mock/data/ficheEtBandeau/ficheActe";
import { fichePacsPourBandeau } from "@mock/data/fichePACS";
import { FicheRcPourBandeauFiche } from "@mock/data/ficheRC";
import { TypeFiche } from "@model/etatcivil/enum/TypeFiche";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { IDataFicheProps } from "@pages/fiche/FichePage";
import { setDataBandeau } from "@pages/fiche/contenu/BandeauFicheUtils";
import { expect, test } from "vitest";

test("bandeauFicheUtils setDataBandeau fonctionne pour RC/RCA", () => {
  const dataFiche = {
    identifiant: "d994e5c1-6bcd-44cd-af7a-41da6bab4669",
    categorie: TypeFiche.RC
  } as IDataFicheProps;

  const ficheRc = FicheRcRca.RcDepuisDto(FicheRcPourBandeauFiche);

  const bandeauFiche = setDataBandeau(dataFiche, ficheRc);

  expect(bandeauFiche.titreFenetre).toBe("RC - NOM1 Prenom11 et NOM2 Prenom21 - N° 2018 - 56533");
  expect(bandeauFiche.statutsFiche).toEqual(ficheRc?.statutsFiche);
  expect(bandeauFiche.personnes[0].prenom).toBe("Prenom11");
  expect(bandeauFiche.personnes[1].prenom).toBe("Prenom21");
  expect(bandeauFiche.alertes).toEqual([{ alerte: "Date de fin de mesure dépassée", dateCreation: 1581807600 }]);
});

test("bandeauFicheUtils setDataBandeau fonctionne pour PACS", () => {
  const dataFiche = {
    identifiant: "d994e5c1-6bcd-44cd-af7a-41da6bab4669",
    categorie: TypeFiche.PACS
  } as IDataFicheProps;

  const fichePacs = FichePacs.depuisDto(fichePacsPourBandeau);

  const bandeauFiche = setDataBandeau(dataFiche, fichePacs);

  expect(bandeauFiche.titreFenetre).toBe("PACS - NOM1 Prenom11 et NOM2 Prenom21 - N° 2019 - 29369");
  expect(bandeauFiche.statutsFiche).toEqual(fichePacs?.statutsFiche);
  expect(bandeauFiche.personnes[0].prenom).toBe("Prenom11");
  expect(bandeauFiche.personnes[1].prenom).toBe("Prenom21");
});

test("bandeauFicheUtils setDataBandeau works Acte", () => {
  const dataFiche = {
    identifiant: "d994e5c1-6bcd-44cd-af7a-41da6bab4669",
    categorie: TypeFiche.ACTE
  } as IDataFicheProps;

  const data = acte;

  const bandeauFiche = setDataBandeau(dataFiche, data);

  expect(bandeauFiche.titreFenetre).toBe("ABSENCE - GREENWALD Paulita et DUPE Laurent");
  expect(bandeauFiche.personnes[0].prenom).toBe("Paulita");
  expect(bandeauFiche.registre).toBe("CSL.DX.1922.NA.T.410.681");
});
