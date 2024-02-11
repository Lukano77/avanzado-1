const directorioName = __dirname.replaceAll('\\','/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { LoginPage } from "../../../support/PageObjects/loginPage";
import { HomePage } from "../../../support/PageObjects/homePage";
import { OnlineShop } from "../../../support/PageObjects/onlineShop";
import { ShoppingCart } from "../../../support/PageObjects/shoppingCart";


describe(`${scenarioName} - ${module} ` , ()=> {
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const onlineShop = new OnlineShop();
    const shoppingCart = new ShoppingCart();

    beforeEach('Preconditions', ()=>{
        Cypress.session.clearAllSavedSessions();
        cy.visit("https://pushing-it.vercel.app");
        loginPage.dblClickLoginPage();
        loginPage.writeUser("pushingit");
        loginPage.writePassword("123456!");
        loginPage.clickLoginButton();   
        cy.wait(3000);  
        homePage.onlineShop();
        onlineShop.checkTitle();
        
    })


    it("Should be allow to delete a product",()=>{
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data=>{
            data.idProduct = `${data.idProduct}`,
            data.descriptionProduct = `${data.descriptionProduct}`;
            data.ticketId = `${data.ticketId}`;
 
            cy.log(`Add a product ${data.descriptionProduct}`);
            onlineShop.addProduct(data.idProduct);   
            cy.wait(3000);
            onlineShop.closeMessageAlert();
            cy.wait(3000);
            onlineShop.dropdoownSearching();
            onlineShop.enterProductId(data.ticketId);
 
            cy.log(`Eliminar el producto ${data.idProduct}`);
        });
    })

})