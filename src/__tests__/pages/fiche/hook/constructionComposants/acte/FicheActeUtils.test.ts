import {
  userDroitConsulterArchive,
  userDroitConsulterPerimetreMEAE,
  userDroitConsulterPerimetreTUNIS
} from "../../../../../../mock/data/connectedUserAvecDroit";
import { storeRece } from "../../../../../../views/common/util/storeRece";
import { getPanelsActe } from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/FicheActeUtils";
import { acte } from "../../../data/ficheActe";

test("ficheUtils acte avec utilisateur qui a le droit CONSULTER sur le périmètre MEAE", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;
  const panels = getPanelsActe(acte);
  expect(panels.panels).toHaveLength(3);
  expect(panels.panels[0].panelAreas).toHaveLength(2);
  expect(panels.panels[0].title).toBe("Résumé de l'acte");
});

test("ficheUtils acte avec utilisateur qui a uniquement le droit CONSULTER_ARCHIVES", async () => {
  storeRece.utilisateurCourant = userDroitConsulterArchive;
  const panels = getPanelsActe(acte);
  expect(panels.panels).toHaveLength(2);
  expect(panels.panels[0].panelAreas).toHaveLength(2);
  expect(panels.panels[0].title).toBe("Résumé de l'acte");
});

test("ficheUtils acte avec utilisateur qui a le droit CONSULTER sur le périmètre TUNIS et un Type Registre", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTUNIS;
  const panels = getPanelsActe(acte);
  expect(panels.panels).toHaveLength(3);
  expect(panels.panels[0].panelAreas).toHaveLength(2);
  expect(panels.panels[0].title).toBe("Résumé de l'acte");
});
