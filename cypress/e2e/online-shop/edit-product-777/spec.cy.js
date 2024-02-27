const directorioName = __dirname.replaceAll('\\', '/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { HomePage } from "../../../support/PageObjects/homePage";

describe(`${scenarioName} - ${module} `, () => {
    const homePage = new HomePage();
    before(() => {
        cy.login(Cypress.env().usuario,Cypress.env().password);
        cy.visit('');
        
    })
    it("Should be able to Delete, Add and Edit a Product", () => {
        homePage.welcome(Cypress.env().usuario);
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            cy.request({
                method: "GET",
                url: `${Cypress.env().baseUrlApi}/products?id=${data.product.id}`,
                headers: {
                    Authorization: `Bearer ${Cypress.env().token}`
                }
            }).its('body.products.docs').each((product) => {
                cy.request({
                    method: "DELETE",
                    url: `${Cypress.env().baseUrlApi}/product/${product._id}`,
                    headers: {
                        Authorization: `Bearer ${Cypress.env().token}`
                    }
                });
            });
            cy.request({
                method:"POST",
                url:`${Cypress.env().baseUrlApi}/create-product`,
                body:data.product
            })
        });
    })
})