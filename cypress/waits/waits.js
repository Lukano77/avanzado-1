/// <reference types = "Cypress"/>

export class Waits{
    constructor(){
        this.welcome = "#user_pushingit_0"
    }

    Welcome(){
        cy.get(this.welcome).should('be.visible')
        .and(('have.text','Welcome'));
    }
}