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
        this.addProduct = "#add-product"

        //Add New Product
        this.productName="#productName";
        this.productPrice="#productPrice";
        this.productCard="#productCard";
        this.productId="#productID";
        this.createProduct="#createProduct";
        this.deleteProduct="#delete-"

        this.deleteProductModal="#saveEdit";

    }

    checkTitle(){
        cy.get('.css-1vqu2wk').should('have.text','Online shop');
    }

    clickaddNewProductButton(){
        cy.get(this.addProduct).should('be.visible').click();
    }

    //Modal
    addNewProduct(productName,productPrice,ProductImageUrl,id){
        cy.get(this.productName).type(productName)
        cy.get(this.productPrice).type(productPrice);
        cy.get(this.productCard).type(ProductImageUrl);
        cy.get(this.productId).type(id);
    }

    deletingProducTrashIcon(id){
        cy.get(this.deleteProduct+id).click();
    }

    deletingProduct(){
        cy.get(this.deleteProductModal).click();
    }

    createProductButton(){
        cy.get(this.createProduct).should('exist').click();
    }

    closeMessageAlert(){
        cy.get(this.close, {timeout:3000}).should('exist').click();
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

    clearProductId(){
        cy.get(this.searchBar).clear();
    }

    validateNonProductExist(product){
        cy.get(product).should('not.exist')
    }

    getNameProduct(){
        cy.get(this.productName).should('be.visible');
    }
    
    
}