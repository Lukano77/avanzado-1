/// <reference types = "Cypress"/>

export class HomePage{

    constructor(){
        this.onlineShoppingProduct = "#onlineshoplink";
    }

onlineShop(){
cy.get(this.onlineShoppingProduct).click();
}

}