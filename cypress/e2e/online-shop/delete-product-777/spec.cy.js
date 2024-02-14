const directorioName = __dirname.replaceAll('\\','/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { LoginPage } from "../../../support/PageObjects/loginPage";
import { HomePage } from "../../../support/PageObjects/homePage";
import { OnlineShop } from "../../../support/PageObjects/onlineShop";

describe(`${scenarioName} - ${module} ` , ()=> {
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const onlineShop = new OnlineShop();
    const userName= "pushingit";
    const password= "123456!"

    beforeEach('Preconditions', ()=>{
        Cypress.session.clearAllSavedSessions();
        //#region Ingresar en Pushing IT
        cy.visit("https://pushing-it.vercel.app");
        loginPage.dblClickLoginPage();
        loginPage.writeUser(userName);
        loginPage.writePassword(password);
        loginPage.clickLoginButton(); 
        //#endregion
        cy.wait(2000);  
        homePage.welcome(userName);
        //#region Dirigirse a Online Shop
        homePage.onlineShop();
        onlineShop.checkTitle();
        //#endregion
    })

    it("Should be able to add a Product and then Delete",()=>{
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data=>{
            //#region Agregar un Producto Nuevo (Dato obtenido desde data.json)
            onlineShop.clickaddNewProductButton();
            onlineShop.verifyCreateProductModalTitle();
            onlineShop.verifyCreateProductModalButton();
            //Complete the Product Modal
            cy.log(`Product Name ${data.productName}`);
            cy.log(`Product Price ${data.productPrice}`);
            cy.log(`Product Image Url ${data.ProductImageUrl}`);
            cy.log(`Product Id ${data.id}`);
            onlineShop.addNewProduct(data.productName,data.productPrice,data.ProductImageUrl,data.id);
            onlineShop.createProductButton();
            cy.log(`Producto Agregado ${data.productName}`);
            cy.wait(2000);
            cy.xpath(`//p[contains(text(),'${data.productName} has been added')]`); 
            onlineShop.closeMessageAlert();
            //#region  Buscar el product por su ID en el search
            onlineShop.dropdoownSearching();
            onlineShop.enterProductId(data.id);
            cy.log(`Busqueda del producto por su ID ${data.id}`);
            //#region Eliminar el producto
            onlineShop.deletingProducTrashIcon(data.id);
            cy.xpath("//header[contains(.,'Deleting Product')]");
            cy.xpath(`//p[contains(.,'Are you sure you want to delete ${data.productName}')]`); 
            onlineShop.deletingProduct();
            cy.xpath(`//p[contains(text(),'${data.productName} has been deleted')]`);
            onlineShop.closeMessageAlert();
            cy.log(`Producto Eliminado ${data.productName}`);
            //#endregion
            //#region Volver a buscar el producto
            onlineShop.clearProductId();
            onlineShop.dropdoownSearching();
            onlineShop.enterProductId(data.id);
            onlineShop.validateNonProductExist(data.productName);
            cy.log(`Producto No encontrado ${data.productName}`);
            onlineShop.clearProductId();

        });
    })

})