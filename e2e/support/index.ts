/// <reference types="cypress" />
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      //------------------------ logins ----------------------------------------
      login(username: string, password: string): Chainable<void>,
      //------------------------ main   ----------------------------------------
      addTestContext(contexte: any): Chainable<void>,
      logText(texte: string): Chainable<void>,
    }
  }
}
