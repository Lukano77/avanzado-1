const directorioName = __dirname.replaceAll('\\','/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { LoginPage } from "../../../support/PageObjects/loginPage";
import { HomePage } from "../../../support/PageObjects/homePage";
import { OnlineShop } from "../../../support/PageObjects/onlineShop";
import { ShoppingCart } from "../../../support/PageObjects/shoppingCart";
import { Waits } from "../../../waits/waits";


describe(`${scenarioName} - ${module} ` , ()=> {
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const onlineShop = new OnlineShop();

    beforeEach('Preconditions', ()=>{
        Cypress.session.clearAllSavedSessions();
        cy.visit("https://pushing-it.vercel.app");
        loginPage.dblClickLoginPage();
        loginPage.writeUser("pushingit");
        loginPage.writePassword("123456!");
        loginPage.clickLoginButton();   
        homePage.onlineShop();
        onlineShop.checkTitle();
        
    })

    it("Should be allow to delete a product",()=>{
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data=>{

            onlineShop.clickaddNewProduct();
            onlineShop.verifyCreateProductModal();
            cy.log(`Product Name ${data.productName}`);
            cy.log(`Product Price ${data.productPrice}`);
            cy.log(`Product Image Url ${data.ProductImageUrl}`);
            cy.log(`Product Id ${data.id}`);

            onlineShop.addNewProduct(data.productName,data.productPrice,data.ProductImageUrl,data.id);
            onlineShop.createProductButton();
            onlineShop.closeMessageAlert();
            onlineShop.dropdoownSearching();
            onlineShop.enterProductId(data.id);

            onlineShop.deleteProductButton(data.id);
            onlineShop.deletingProductModal();
            onlineShop.closeMessageAlert();
            cy.log(`Producto Eliminado ${data.productName}`);
            onlineShop.clearProductId();
            onlineShop.dropdoownSearching();
            onlineShop.enterProductId(data.id);
            onlineShop.validateNonProductExist();

        });
    })

})