import { annulationJuridictionMap, dissolutionJuridictionMap, dissolutionPosteMap, pacsModificationNotaireMap } from "@mock/data/fichePACS";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { SectionPartProps } from "@widget/section/SectionPart";
import { expect, test } from "vitest";

test("ficheUtils Pacs fonctionne avec modification notaire", () => {
  const panels = (FichePacs.depuisDto(pacsModificationNotaireMap) as FichePacs).commePanelAccordionReceSection;

  expect(panels.panels.length).toBe(1);
  expect(panels.panels[0].panelAreas.length).toBe(5);

  ///////////// PARTIE 1: Inscription des registre des PACS des étrangers nés à l'étranger
  expect(panels.panels[0].panelAreas[0].parts?.length).toBe(1);
  expect(panels.panels[0].panelAreas[0].title).toBe("Inscription au registre des PACS des étrangers nés à l'étranger");
  expect((panels.panels[0].panelAreas[0].parts as SectionPartProps[])[0].partContent?.contents.length).toBe(3);
  expect((panels.panels[0].panelAreas[0].parts as SectionPartProps[])[0].partContent?.contents[0].libelle).toBe("Statut du PACS");
  expect((panels.panels[0].panelAreas[0].parts as SectionPartProps[])[0].partContent?.contents[0].value).toBe("Modifié");
  ///////////// PARTIE 2: Partenaires
  expect(panels.panels[0].panelAreas[1].parts?.length).toBe(2);
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.title).toBe("Partenaire 1");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents.length).toBe(8);
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[0].libelle).toBe("Nom");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[0].value).toBe("DUREL");

  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[1].libelle).toBe("Autre(s) nom(s)");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[1].value).toBe("DUDU, DUDU2");

  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[2].libelle).toBe("Prénoms");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[2].value).toBe("Marie Charlotte, Sara");

  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[3].libelle).toBe("Autre(s) prénom(s)");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[3].value).toBe("Natacha, Natacha2");

  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[4].libelle).toBe("Date de naissance");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[4].value).toBe("01/09/1983");

  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[5].libelle).toBe("Lieu de naissance");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[5].value).toBe("paris 20ème arrondissement");

  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[6].libelle).toBe("Nationalité");
  expect((panels.panels[0].panelAreas[1].parts as SectionPartProps[])[0].partContent?.contents[6].value).toBe("Française");
  ///////////// PARTIE 3: Enregistrement du PACS
  expect(panels.panels[0].panelAreas[2].parts?.length).toBe(2);
  expect(panels.panels[0].panelAreas[2].title).toBe("Enregistrement du PACS");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents.length).toBe(4);
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[0].libelle).toBe("Autorité");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[0].value).toBe("Notaire");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[1].libelle).toBe("Prénom nom");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[1].value).toBe("Maître Dominique ESTER");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[2].libelle).toBe("N° CRPCEN");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[2].value).toBe("1235467890");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[3].libelle).toBe("Date");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[3].value).toBe("19/01/1970");

  ///////////// PARTIE 4: Modification du pacs
  expect(panels.panels[0].panelAreas[3].parts?.length).toBe(2);

  // 4.1: Infos autorité
  expect(panels.panels[0].panelAreas[3].title).toBe("Modification du PACS");
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents.length).toBe(5);
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[0].libelle).toBe("Autorité");
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[0].value).toBe("Notaire");
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[1].libelle).toBe("Prénom nom");
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[1].value).toBe(
    "Maître Martin DE LA PLUME DANS LE BEC"
  );
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[2].libelle).toBe("N° CRPCEN");
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[2].value).toBe("987563141");
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[3].libelle).toBe(
    "Date d'enregistrement de la convention modificative"
  );
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[3].value).toBe("22/01/2021");
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[4].libelle).toBe(
    "Date d'effet à l'égard des tiers"
  );
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[0].partContent?.contents[4].value).toBe("22/01/2021");

  // PARTIE 5: Historique Statut

  // 4.2: Localisation
  expect((panels.panels[0].panelAreas[3].parts as SectionPartProps[])[1].partContent?.contents.length).toBe(4);
});

test("ficheUtils Pacs fonctionne avec annulation juridiction", () => {
  const panels = (FichePacs.depuisDto(annulationJuridictionMap) as FichePacs).commePanelAccordionReceSection;

  expect(panels.panels.length).toBe(1);
  expect(panels.panels[0].panelAreas.length).toBe(5);

  ///////////// PARTIE 3: Enregistrement du PACS
  expect(panels.panels[0].panelAreas[2].parts?.length).toBe(2);
  expect(panels.panels[0].panelAreas[2].title).toBe("Enregistrement du PACS");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents.length).toBe(2);

  // 3.1 Autorité
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[0].libelle).toBe("Autorité");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[0].value).toBe("Tribunal judiciaire");

  // 3.2 Localisation
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[1].partContent?.contents[0].libelle).toBe("Ville");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[1].partContent?.contents[0].value).toBe("paris");
  // Vérif Departement vide
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[1].partContent?.contents[2].libelle).toBe("Région/Dpt");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[1].partContent?.contents[2].value).toBe("");

  ///////////// PARTIE 4: Annulation du pacs
  expect(panels.panels[0].panelAreas[3].parts?.length).toBe(2);

  expect(panels.panels[0].panelAreas[3].title).toBe("Annulation du PACS");
});

test("ficheUtils Pacs fonctionne avec dissoultion juridiction", () => {
  const panels = (FichePacs.depuisDto(dissolutionJuridictionMap) as FichePacs).commePanelAccordionReceSection;

  expect(panels.panels.length).toBe(1);
  expect(panels.panels[0].panelAreas.length).toBe(5);

  ///////////// PARTIE 4: Dissolution du pacs
  expect(panels.panels[0].panelAreas[3].parts?.length).toBe(2);

  expect(panels.panels[0].panelAreas[3].title).toBe("Dissolution du PACS");
});

test("ficheUtils Pacs fonctionne avec dissolution poste", () => {
  const panels = (FichePacs.depuisDto(dissolutionPosteMap) as FichePacs).commePanelAccordionReceSection;

  expect(panels.panels.length).toBe(1);
  expect(panels.panels[0].panelAreas.length).toBe(5);

  ///////////// PARTIE 3: Enregistrement du PACS
  expect(panels.panels[0].panelAreas[2].parts?.length).toBe(2);
  expect(panels.panels[0].panelAreas[2].title).toBe("Enregistrement du PACS");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents.length).toBe(2);

  // 3.1 Autorité Poste
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[0].libelle).toBe("Autorité");
  expect((panels.panels[0].panelAreas[2].parts as SectionPartProps[])[0].partContent?.contents[0].value).toBe("Ambassade");

  // Le type de poste n'est pas affiché, il est testé par le code suivant:
  expect(dissolutionPosteMap.autorite.typePoste).toBe("Ambassade");

  ///////////// PARTIE 4: Dissolution du pacs
  expect(panels.panels[0].panelAreas[3].parts?.length).toBe(2);

  expect(panels.panels[0].panelAreas[3].title).toBe("Dissolution du PACS");
});
