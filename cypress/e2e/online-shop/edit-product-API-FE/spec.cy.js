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
    it("Should be able to Delete, Add and Edit a Product", () => {
        //API
        homePage.welcome(Cypress.env().usuario);
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            cy.eliminarProducto(data.product.id);
            cy.crearProducto(data.product.id,data.product.name,data.product.price,data.product.img);
            cy.editarProducto(data.editproduct.id,data.editproduct.name,data.editproduct.price,data.editproduct.img);
        //FE    
        //#region Dirigirse a Online Shop
        homePage.onlineShop();
        onlineShop.checkTitle();
        //#endregion
        //#region  Buscar el product por su ID en el search
        onlineShop.dropdoownSearching();
        onlineShop.enterProductId(data.editproduct.id);
        //I had to use this wait because if I dont use is not working.
        //Im trying to use wait when I enter a product but its not working.
        cy.wait(3000);
        //#endregion
        //Verificamos que los datos del producto corresponden a los enviados en la edicion
        cy.getByDataCy('name').should('be.visible').invoke('text').then(function (editarporducto) {
            expect(editarporducto).to.be.equal(data.editproduct.name)
        })
        cy.getByDataCy('price').should('be.visible').invoke('text').then(function (editarporducto) {
            expect(editarporducto).to.be.equal(data.editproduct.price)
        })
            
        });
    })
})