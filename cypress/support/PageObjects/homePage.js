/// <reference types = "Cypress"/>

export class HomePage{

    constructor(){
        this.onlineShoppingProduct = "#onlineshoplink";
    }

onlineShop(){
cy.log('Go to Online Shopping')
cy.get(this.onlineShoppingProduct, {timeout:2000}).should('be.visible').click();
}

welcome(user_name){
    cy.xpath(`//h2[contains(@id,'${user_name}')]`);
}



}