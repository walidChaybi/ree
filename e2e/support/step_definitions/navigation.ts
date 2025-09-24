import 'cypress-mochawesome-reporter/cucumberSupport';
import { BeforeAll, Given } from '@badeball/cypress-cucumber-preprocessor';

const currentEnv = Cypress.env('ENV');  

const userUsername = Cypress.env('USER_USERNAME');
const userPassword = Cypress.env('USER_PASSWORD');

BeforeAll(() => { 
    if(currentEnv == 'dev'){
        cy.intercept({
            method: 'GET',
            url: `${Cypress.env('BASE_ORIGIN')}**`,
        } , (req) => {
            req.headers['id_sso'] = '00001000';
            req.headers['profil'] = 'RECE_USER';
            req.continue();
        });
    
        cy.intercept({
            method: 'POST',
            url: `${Cypress.env('BASE_ORIGIN')}**`,
        } , (req) => {
            req.headers['id_sso'] = '00001000';
            req.headers['profil'] = 'RECE_USER';
            req.continue();
        }); 
    } 
});

Given("Je suis connecté avec un compte utilisateur ayant le profil delivrance sur le site RECE", () => {
    cy.login(userUsername, userPassword);
}); 