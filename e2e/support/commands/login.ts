const currentEnv = Cypress.env('ENV'); 
const baseOrigin = `${Cypress.config('baseUrl')}`;

export {};

Cypress.Commands.add('login', (username: string, password: string) => {

    if(currentEnv == 'dev'){
        cy.visit(baseOrigin);
    }
    else if (currentEnv == 'uat1'){
        cy.visit('/Shibboleth.sso/Login?SAMLDS=1&entityID=https://idpelise.rec.dsi.diplomatie.gouv.fr/arobasidp/idp');
    
        cy.get('input[id="username"]').type(username);
        cy.get('input[id="password"]').type(password);
        cy.get('button[name="submitBtn"]').click();
        cy.visit(baseOrigin);
        
        cy.logText("L'utilisateur " + username + " est connecté");
    }

    
});