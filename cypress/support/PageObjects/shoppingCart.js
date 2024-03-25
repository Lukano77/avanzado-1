/// <reference types = "Cypress"/>

export class ShoppingCart {


    constructor(){
        this.CheckOut = "#goCheckout";
        this.productAmount='productAmount'
        this.productName='productName'
        this.unitPrice='unitPrice'
        this.totalPrice='totalPrice'

    }
    verifyTheProductAdded(){
        cy.get(this.onlineShoppingProduct).click();
    }

    goToCheckOut(){
        cy.get(this.CheckOut).click();
    }
}