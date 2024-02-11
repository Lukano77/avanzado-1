/// <reference types = "Cypress"/>

export class ShoppingCart {


    constructor(){
        this.CheckOut = "#goCheckout";
    }
    verifyTheProductAdded(){
        cy.get(this.onlineShoppingProduct).click();
    }

    goToCheckOut(){
        cy.get(this.CheckOut).click();
    }
}