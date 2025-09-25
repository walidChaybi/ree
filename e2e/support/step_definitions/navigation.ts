import 'cypress-mochawesome-reporter/cucumberSupport';
import { BeforeAll, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import globalVariables from "../../data/variablesglobales.json"

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

Then("La page {string} s'affiche", (nomPage: string) => {
    cy.logText(`Then La page ` + nomPage + ` s'affiche`);

    cy.getPageHierarchy(nomPage);
    cy.get('@pageHierarchy').then(({ currentPage, parentPage }: any) => {
        let dataFile;
        dataFile = (parentPage ? `${parentPage.labelCamelCase}/${currentPage.labelCamelCase}`: `${currentPage.labelCamelCase}`);
        cy.requireJsonFile(`${dataFile}.json`).then((data: object) => {
            cy.get(globalVariables.filAriane.identifiant).should("contain.text", currentPage.label);
            cy.wrap(data).as('fileForExecutingTest')
        });
    });
    cy.logText('La page "' + nomPage + '" est affichée');
});

Then("L'onglet {string} est sélectionné", (nomOnglet: string) => {
    cy.logText(`Then L'onglet ` + nomOnglet + ` est sélectionné`);

    cy.getDataByElement(globalVariables.jsonElement.onglet, nomOnglet).then((objData: Record<string, any>)=>{
        cy.get(objData.identifiant).should('have.attr', 'aria-selected', 'true');
    });
    cy.logText(`L'onglet "` + nomOnglet + `" est sélectionné par défaut`);
}); 

