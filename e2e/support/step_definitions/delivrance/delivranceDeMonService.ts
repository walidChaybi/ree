import 'cypress-mochawesome-reporter/cucumberSupport';
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import accueil from "../../../data/accueil.json";
import lesRequetesDeDelivranceDeMonService from '../../../data/delivrance/lesRequetesDeDelivranceDeMonService.json';
import sousType from '../../../data/delivrance/sousType.json';

When("J'accède aux requêtes de délivrance de mon service", () => {
    cy.logText(`When J'accède aux requêtes de délivrance de mon service`);

    cy.get(accueil.bouton.delivrance.monService.identifiant).click();
}); 

When("Je filtre les requêtes {string} au statut {string}", (sousTypeRequete: string, statut: string) => {
    cy.logText(`When Je filtre les requêtes ` + sousTypeRequete + ` au statut ` + statut);

    cy.get(lesRequetesDeDelivranceDeMonService.formulaire.recherche.champs.sousType.identifiantChamp).select(sousTypeRequete);
    cy.get(lesRequetesDeDelivranceDeMonService.formulaire.recherche.champs.statut.identifiantChamp).select(statut);
    cy.get(lesRequetesDeDelivranceDeMonService.bouton.loupe.identifiant).should('be.visible').click();

    cy.wrap(sousTypeRequete).as('filtreSousTypeRequete');
    cy.wrap(statut).as('filtreStatut');
}); 

Then("La restitution des requêtes de délivrance de mon service correspond aux filtres", () => {
    cy.logText(`Then La restitution des requêtes de délivrance de mon service correspond aux filtres`);

    cy.get('@filtreSousTypeRequete').then((filtreSousTypeRequete : any) => {
        if(filtreSousTypeRequete){
            cy.get(lesRequetesDeDelivranceDeMonService.tableau.information.identifiantLigneGenerique + " > " + lesRequetesDeDelivranceDeMonService.tableau.colonne.sousType.identifiantColonne).each(($el) => {
                cy.wrap($el).invoke('text').then((texte) => {
                    expect(texte.trim()).to.equal(sousType[filtreSousTypeRequete as keyof typeof sousType]);
                });
            });
            cy.logText('Les lignes de résultats ont bien pour Sous-Type "' + sousType[filtreSousTypeRequete as keyof typeof sousType] + '"');
        } 
    })

    cy.get('@filtreStatut').then((filtreStatut : any) => {
        if(filtreStatut){
            cy.get(lesRequetesDeDelivranceDeMonService.tableau.information.identifiantLigneGenerique + " > " + lesRequetesDeDelivranceDeMonService.tableau.colonne.statut.identifiantColonne).each(($el) => {
                cy.wrap($el).invoke('text').then((texte) => {
                    expect(texte.trim()).to.equal(filtreStatut);
                });
            });
            cy.logText('Les lignes de résultats ont bien pour Statut "' + filtreStatut + '"');
        }
    })
}); 

When("Je clique sur la requête {string}", (requete: string) => {
    cy.logText(`When Je clique sur la requête  ` + requete);

    // Enregistrer le numéro de la requête
    cy.get(lesRequetesDeDelivranceDeMonService.tableau.information.identifiantLigneParDataTestid.replace("XXX", requete) + " > " + lesRequetesDeDelivranceDeMonService.tableau.colonne.numero.identifiantColonne).invoke('text').then((numeroRequete) => {
        cy.wrap(numeroRequete).as('numeroRequete');
        cy.wrap(requete.toString()).as('requete');
    });

    cy.get(lesRequetesDeDelivranceDeMonService.tableau.information.identifiantLigneParDataTestid.replace("XXX", requete)).click();
}); 

Then("La requête est au statut {string}", (statut: string) => {
    cy.logText(`Then La requête est au statut ` + statut);

    cy.get('@numeroRequete').then((numeroRequete) => {
        cy.get('@requete').then((requete) => {
            cy.get(lesRequetesDeDelivranceDeMonService.tableau.information.identifiantLigneParDataTestid.replace("XXX", requete.toString()) + " > " + lesRequetesDeDelivranceDeMonService.tableau.colonne.statut.identifiantColonne).invoke('text').then((texte) => {
                expect(texte.trim()).to.equal(statut);
                cy.logText('La requête "' + numeroRequete + '" est au statut "' + statut + '"');
            });
        });
    });
});
