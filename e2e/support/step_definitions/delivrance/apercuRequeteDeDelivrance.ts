import 'cypress-mochawesome-reporter/cucumberSupport';
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import apercuRequeteDeDelivrance from '../../../data/delivrance/apercuRequeteDeDelivrance.json'

Then(`La page "Aperçu requête de délivrance" de la requête {string} au statut {string} est conforme`, (sousType: string, statut: string) => {
    cy.logText(`Then La page "Aperçu requête de délivrance" de la requête ` + sousType + ` au statut ` + statut +` est conforme`);

    // Vérification des titres affichés
    cy.get('@numeroRequete').then((numeroRequete) => {
        for(const key in apercuRequeteDeDelivrance.titre){
            let titre = apercuRequeteDeDelivrance.titre[key as keyof typeof apercuRequeteDeDelivrance.titre]
            cy.get(titre.identifiant).invoke('text').then((texte) => {
                if('label' in titre){
                    if(key == "bandeauRequete"){
                        expect(texte).to.include("Requête " + statut.toLowerCase())
                    }
                    else if(key == "descriptionRequete"){
                        expect(texte.trim()).to.equal(titre.label.replace("XXXXXX", numeroRequete.toString()));
                    }
                    else if(key == "documentsADelivrer" && 'identifiantBouton' in titre){
                        cy.get(titre.identifiantBouton).should('have.attr', 'disabled');
                        expect(texte.trim()).to.equal(titre.label);
                    }
                    else{
                        expect(texte.trim()).to.equal(titre.label);
                    }
                    cy.logText('La titre "' + texte + '" est affiché');
                }
            });
        };
    }); 

    // Vérification des boutons affichés
    for(const key in apercuRequeteDeDelivrance.bouton){
        let bouton = apercuRequeteDeDelivrance.bouton[key as keyof typeof apercuRequeteDeDelivrance.bouton]
        cy.get(bouton.identifiant).invoke('text').then((texte) => {
            expect(texte.trim()).to.equal(bouton.label);
            cy.logText('Le bouton "' + texte + '" est affiché');
        });
    };
}); 

When(`Je prends en charge la requête`, () => {
    cy.logText(`When Je prends en charge la requête`);

    cy.get(apercuRequeteDeDelivrance.bouton.prendreEnCharge.identifiant).click();
});
