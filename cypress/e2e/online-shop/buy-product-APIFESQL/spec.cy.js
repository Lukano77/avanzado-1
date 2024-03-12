const directorioName = __dirname.replaceAll('\\', '/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { HomePage } from "../../../support/PageObjects/homePage";
import { OnlineShop } from "../../../support/PageObjects/onlineShop";
import { ProductPage } from "../../../support/PageObjects/productPage";

describe(`${scenarioName} - ${module} `, () => {
    const homePage = new HomePage();
    const onlineShop = new OnlineShop();
    const productPage = new ProductPage();
    before(() => {
        cy.login(Cypress.env().usuario,Cypress.env().password);
        cy.visit('');
        
    })
    it("Should be able to Verify Products, Delete, Add Two Product, Buy a Product and Verify Products using SQL", () => {
        //API
        homePage.welcome(Cypress.env().usuario);
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            cy.verificarProducto(data.product1.id).its('body.products.docs').each((product) =>{
                cy.eliminarProducto(product._id);
            })
            cy.crearProducto(data.product1.id,data.product1.name,data.product1.price,data.product1.img);
            cy.verificarProducto(data.product2.id).its('body.products.docs').each((product) =>{
                cy.eliminarProducto(product._id);
            })
            cy.crearProducto(data.product2.id,data.product2.name,data.product2.price,data.product2.img);


    //FE    
        //#region Dirigirse a Online Shop
        homePage.onlineShop();
        onlineShop.checkTitle();
        //#endregion
        //#region  Buscar el product por su ID en el search
        onlineShop.dropdoownSearching();
        onlineShop.enterProductId(data.product1.id);
        //Tengo que probar que el get del producto
        cy.wait(5000);
        //Agregar 2 productos al carrito
        //Producto 1
        cy.getByDataCy('add-to-cart-'+ data.product1.id).click();
        onlineShop.closeMessageAlert();
        cy.getByDataCy('add-to-cart-'+ data.product1.id).click();
        onlineShop.closeMessageAlert();

        onlineShop.clearProductId();

        //Producto 2
        onlineShop.dropdoownSearching();
        onlineShop.enterProductId(data.product2.id);
        //Tengo que probar que el get del producto
        cy.wait(5000);
        //Agregar 2 productos al carrito
        //Producto 1
        cy.getByDataCy('add-to-cart-'+ data.product2.id).click();
        onlineShop.closeMessageAlert();
        cy.getByDataCy('add-to-cart-'+ data.product2.id).click();
        onlineShop.closeMessageAlert();

        cy.getByDataCy('goShoppingCart').click();
        cy.getByDataCy('goCheckout').click();

        //Checkout
        cy.getByDataCy('firstName').type("Luciano");
        cy.getByDataCy('lastName').type("Cuesta");
        cy.getByDataCy('cardNumber').type("1234567891123456");
        cy.getByDataCy('purchase').click();
      });
    })
})