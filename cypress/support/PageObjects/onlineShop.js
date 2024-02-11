/// <reference types = "Cypress"/>

export class OnlineShop {
    constructor(){
        this.alert = '#chakra-modal--header-\:re\:';
        this.close = '#closeModal';
        this.shoppingCart = '#goShoppingCart';
        //Product List
        this.productList = "li.css-0";
        this.searchType = "#search-type";
        this.searchBar = "#search-bar"
    }


    checkTitle(){
        cy.get('.css-1vqu2wk').contains('Online shop');
    }
    
    addProduct(product){
        cy.get(`[data-cy='${product}']`).click();
    }

    closeMessageAlert(){
        cy.get(this.close, {timeout:3000}).click();
    }

    goToShoppingCart(){
        cy.get(this.shoppingCart).click();
    }

    dropdoownSearching(){
        cy.get(this.searchType).select("id").invoke("val").should("eq","id");
    }

    enterProductId(product){
        cy.get(this.searchBar).type(product+'{enter}');
    }
    
}