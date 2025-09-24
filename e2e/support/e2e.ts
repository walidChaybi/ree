// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/login';
import './commands/main';

import devConfig from './../cypress.config';
import uat1Config from './../uat1.config';

// Import pour pouvoir utiliser cy.addTestContext()
import 'cypress-mochawesome-reporter/register';

// hook pour Afficher les screenshots d'échec dans le reporter html mochawesome
afterEach(function () {
    if (this.currentTest?.state === 'failed') {
        const screenshotFileName = `${this.currentTest.parent?.title} -- ${this.currentTest.title} (failed).png`;
        const specName = Cypress.spec.name;
        const screenshotPath = `../screenshots/${specName}/${screenshotFileName}`;
        
        cy.addTestContext({
            title: 'Screenshot on failure',
            value: screenshotPath,
        });
    
    }
});
