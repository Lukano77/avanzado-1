/// <reference types = "Cypress"/>

export class HomePage{

    constructor(){
        this.onlineShoppingProduct = "#onlineshoplink";
    }

onlineShop(){
cy.log('Go to Online Shopping')
cy.get(this.onlineShoppingProduct, {timeout:5000}).should('be.visible').click();
}

}