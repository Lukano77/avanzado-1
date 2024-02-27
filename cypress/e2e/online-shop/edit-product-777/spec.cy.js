const directorioName = __dirname.replaceAll('\\', '/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

import { HomePage } from "../../../support/PageObjects/homePage";

describe(`${scenarioName} - ${module} `, () => {
    const homePage = new HomePage();
    beforeEach(() => {
        cy.request({
            method: "POST",
            url: `${Cypress.env().baseUrlApi}/login`,
            body: {
                username: Cypress.env().usuario,
                password: Cypress.env().password
            },
        }).then(respuesta => {
            window.localStorage.setItem('token', respuesta.body.token);
            window.localStorage.setItem('user', respuesta.body.user.username);
            window.localStorage.setItem('userId', respuesta.body.user_id);
            Cypress.env().token = respuesta.body.token;
        })
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
        });
    })
})