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
  testContexts.length = 0; // Réinitialiser pour le test suivant
});

/**
 * Trace à la fois dans la console et dans le contexte du reporting mochawesome
 * @param {String} texte texte à tracer
 */
Cypress.Commands.add('logText', (texte) => {
  cy.log(texte);
  cy.addTestContext(texte);
});
