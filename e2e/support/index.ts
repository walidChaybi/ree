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
      setCamelCase(word: string): Chainable<string>,
      getPageHierarchy(pageName: string): void;
      getDataByElement(element: string, section?: string|undefined, filterByProfile?: boolean): any;
      getDataFilterByProfile(objData: any): any;
      requireJsonFile(filePath: string): any;
      //-------------------------
      addTestContext(context: any): Chainable<void>;
    }
  }
}
