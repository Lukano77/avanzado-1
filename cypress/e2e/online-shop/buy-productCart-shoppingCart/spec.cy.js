const directorioName = __dirname.replaceAll('\\', '/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { HomePage } from "../../../support/PageObjects/homePage";
import { OnlineShop } from "../../../support/PageObjects/onlineShop";
import { ProductPage } from "../../../support/PageObjects/productPage";
import { ShoppingCart } from "../../../support/PageObjects/shoppingCart";

describe(`${scenarioName} - ${module} `, () => {
    const homePage = new HomePage();
    const onlineShop = new OnlineShop();
    const productPage = new ProductPage();
    const shoppingCart = new ShoppingCart();
    before(() => {
        cy.login(Cypress.env().usuario, Cypress.env().password);
        cy.visit('');

    })
    it("Agregar dos productos de ONLINE SHOP y verificar que esten en el Checkout, luego verificar la compra y obtener dicha compra en sql", () => {
      homePage.onlineShop();
      cy.wait(3000)
      //Product1
      cy.getByDataCy('name').eq(0).should('be.visible').invoke("text").as('nombrePrimerProducto')
      cy.log('@nombrePrimerProducto')
      cy.getByDataCy('price').eq(0).should('be.visible').invoke("text").as('nombrePrimerPrecio')
      cy.get('[data-cy^="add-to-cart-"').eq(0).click();
      onlineShop.closeMessageAlert();
      cy.get('[data-cy^="add-to-cart-"').eq(0).click();
      onlineShop.closeMessageAlert();
      
      //Product2
      cy.getByDataCy('name').eq(1).should('be.visible').invoke("text").as('nombreSegundoProducto')
      cy.getByDataCy('price').eq(1).should('be.visible').invoke("text").as('nombreSegundoPrecio')
      cy.get('[data-cy^="add-to-cart-"').eq(1).click()
      onlineShop.closeMessageAlert();
      

      //SHOPPING CART

      cy.wait(3000)
      cy.getByDataCy('goShoppingCart').click()

      cy.getByDataCy('productAmount').eq(0).invoke('text').then(function(quantity) {
        expect(quantity).to.be.equal('2')
      })
      cy.getByDataCy('productName').eq(0).invoke('text').then(function(quantity) {
        expect(quantity).to.be.equal(this.nombrePrimerProducto)
      })
      cy.getByDataCy('unitPrice').eq(0).invoke('text').then(function(quantity) {
        expect(quantity).to.be.equal(`$${this.nombrePrimerPrecio}`)
      })

      //cy.getByDataCy('totalPrice').eq(0);

      cy.getByDataCy('productAmount').eq(1).invoke('text').then(function(quantity) {
        expect(quantity).to.be.equal('1')
      })
      cy.getByDataCy('productName').eq(1).invoke('text').then(function(quantity) {
        expect(quantity).to.be.equal(this.nombreSegundoProducto)
      })
        cy.getByDataCy('unitPrice').eq(1).invoke('text').then(function(quantity){
        expect(quantity).to.be.equal(`$${this.nombreSegundoPrecio}`)
      })
    })
})