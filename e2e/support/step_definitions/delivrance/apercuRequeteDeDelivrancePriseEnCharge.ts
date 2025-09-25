import 'cypress-mochawesome-reporter/cucumberSupport';
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import accueil from "../../../data/accueil.json";
import lesRequetesDeDelivranceDeMonService from '../../../data/delivrance/lesRequetesDeDelivranceDeMonService.json';
import apercuRequeteDeDelivrancePriseEnCharge from '../../../data/delivrance/apercuRequeteDeDelivrancePriseEnCharge.json'


// Then La page "Aperçu requête de délivrance (prise en charge)" de la requête "Délivrance Extrait/Copie dématérialisé" au statut "Prise en charge" est conforme
Then(`La page "Aperçu requête de délivrance prise en charge" de la requête {string} au statut {string} est conforme`, (sousType: string, statut: string) => {
    cy.logText(`Then La page "Aperçu requête de délivrance prise en charge" de la requête ` + sousType + ` au statut ` + statut + ` est conforme`);

    // Vérification des titres affichés
    cy.get('@numeroRequete').then((numeroRequete) => {
        for(const key in apercuRequeteDeDelivrancePriseEnCharge.titre){
            let titre = apercuRequeteDeDelivrancePriseEnCharge.titre[key as keyof typeof apercuRequeteDeDelivrancePriseEnCharge.titre]
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
                    cy.logText('Le titre "' + texte + '" est affiché');
                }
            });
        };
    }); 

    // Vérification des boutons affichés
    for(const key in apercuRequeteDeDelivrancePriseEnCharge.bouton){
        let bouton = apercuRequeteDeDelivrancePriseEnCharge.bouton[key as keyof typeof apercuRequeteDeDelivrancePriseEnCharge.bouton]
        cy.get(bouton.identifiant).invoke('text').then((texte) => {
            if('label' in bouton){
                expect(texte.trim()).to.equal(bouton.label);
                cy.logText('Le bouton "' + texte + '" est affiché');
            }
            else {
                expect(texte.trim()).to.equal('');
                cy.logText(`Le bouton dont l'identifiant est "` + bouton.identifiant + `" est affiché`);
            }
        });
    };
}); 

// When Je retourne sur la page "Les requêtes de délivrance de mon service"
When(`Je retourne sur la page "Les requêtes de délivrance de mon service"`, () => {
    cy.logText(`When Je retourne sur la page "Les requêtes de délivrance de mon service"`);

    cy.get(apercuRequeteDeDelivrancePriseEnCharge.bouton.retour.identifiant).click();
    cy.get(accueil.bouton.delivrance.monService.identifiant).click();
    cy.get(lesRequetesDeDelivranceDeMonService.bouton.loupe.identifiant).should('be.visible').click();
});