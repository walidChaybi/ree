import pageData from '../../data/page.json';
import addContext from 'mochawesome/addContext';

export {};

const testContexts: string[] = [];

Cypress.Commands.add('addTestContext', (contexte: any) => {
  testContexts.push(contexte);
});

Cypress.on('test:after:run', (test) => {
  testContexts.forEach((contexte) => {
    addContext({test} as any , contexte);
  });
  testContexts.length = 0; // Réinitialisé pour le test suivant
});
/**
 * Trace à la fois dans la console et dans le contexte du reporting mochawesome
 * @param {String} texte texte à tracer
 */
Cypress.Commands.add('logText', (texte) => {
  cy.log(texte);
  cy.addTestContext(texte);
});

/**
 *  Tranforme le mot passé en paramètre en camelCase
 * @param {string} word Mot à transformer en camelCase
 * @returns {string} Retourne le mot passé en paramètre en camelCase
 */
Cypress.Commands.add('setCamelCase', (word: string) => {
  let listWords = word.split(/[\s-]/);
  let listResult = [];
  let wordModify = '';
  for (let index = 0; index < listWords.length; index++) {
    if (index === 0) {
      listResult.push(listWords[0].toLowerCase());
    } else {
      let firstLetter = listWords[index].charAt(0).toUpperCase();
      let otherLetter = listWords[index].substring(1).toLowerCase();
      wordModify = firstLetter + otherLetter;
      listResult.push(wordModify);
    }
  }
  let result = listResult.join('');
  
  result = result
    .replace(/[ÉÈÊË]/g, 'E')
    .replace(/[éèêë]/g, 'e')
    .replace(/[áàâä]/g, 'a')
    .replace(/[À]/g, 'A')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^\w\s-]/gi, '');
  return cy.wrap(result);
});

/**
 * Récupérer l'objet du menu où l'on travaille ainsi que le menu parent s'il y en a un
 * @param {string} pageName Nom de la page 
 * @returns {object} Retourne un objet comportant l'objet de la page courante et de la page parente s'il y en a une 
 */
Cypress.Commands.add('getPageHierarchy', (pageName: string) => {
  cy.setCamelCase(pageName).then((pageNameCamelCase) =>{
    let parentPage = null;
    let currentPage = null;
    // Recherche de l'emplacement de la page
    const page = Object.keys(pageData).find((v) => v === pageNameCamelCase);
    if (!page) {
      const mainPage = Object.values(pageData).filter((v: Record<string,any>) => v?.page !== undefined).find((v: Record<string,any>) => v.page[pageNameCamelCase]) as Record<string,any>;
      parentPage = mainPage;
      currentPage = mainPage?.page[pageNameCamelCase];
    } else {
      currentPage = pageData[page as keyof typeof pageData];
    }
    cy.wrap({"currentPage": currentPage, "parentPage": parentPage}).as('pageHierarchy');
  });
});

/**
 * Récupérer l'objet de l'élément que l'on va tester (formulaire, tableau, titre...)
   * @param {string} element Element de la page où l'on va executer nos tests (formulaire, tableau, titre...)
   * @param {string} section Valeur facultatif, valeur mise en place dans le fichier json pour englober les éléments.
   * @param {boolean} filterByProfile Valeur facultatif, permet de filtrer les données pour n'avoir que celle en lien avec le profil connecté
   * @return {Object} retourne les objets utilisable pour l'exécution du test appelé
 */
Cypress.Commands.add('getDataByElement', (element: string, section: string | undefined = undefined, filterByProfile: boolean = false)=>{
  cy.get('@fileForExecutingTest').then((fileData)=>{
    let objData = fileData[element as keyof typeof fileData] as Record<string, any>;

    if (section) {
      const subElement = fileData[element as keyof typeof fileData];
      const filteredSectionName = Object.keys(subElement).filter(v => subElement[v as keyof typeof subElement]['label'] === section);
      objData = subElement[filteredSectionName as keyof typeof subElement];
      delete objData.id;
    }

    // Condition afin de pouvoir réaliser les tests d'abscence d'élément sur une page. Sinon ils ne sont pas à récupérer dans les datas à tester.
    if (!filterByProfile) {
      return cy.wrap(objData);
    }
    cy.getDataFilterByProfile(objData).then((objDataFilter: any)=>{
      return cy.wrap(objDataFilter);
    });
  });
});

/**
 * Filtrer les éléments de la page sur lequel on travail selon le profil de l'utilisateur connecté
 * @param {Object} objData objet comportant les éléments à filtrer selon le profil de l'utilisateur connecté
 * @return {Object} retourne les objets utilisable pour l'exécution du test appelé
 */
Cypress.Commands.add('getDataFilterByProfile', (objData: Record<string, any>) => {
  return cy.get('@userProfil').then((profileName)=>{
    const dataFilter: object = Object.fromEntries(
      Object.entries(objData).filter(
        ([, value]: [any, Record<string, any>]) => !value?.accesProfils || value.accesProfils.includes(profileName)
      )
    );
    return cy.wrap(dataFilter);
  });
});

Cypress.Commands.add('requireJsonFile', (filePath: string) => cy.task('dynamicRequire', filePath));
