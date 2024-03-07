//refactorizar el codigo para tomar el value del input #user despues de haber escrito el usuario invoke('val')
// Asignar el valor a un alias using as
import { LoginPage } from "../support/PageObjects/loginPage";

describe('Actividad Complementaria Clase 2', ()=> {
const loginPage = new LoginPage();

it('Deberia validar que el usuario ingresado se encuentra en el header', () => {
    cy.visit('https://pushing-it.vercel.app/')
    cy.getByDataCy('registertoggle').dblclick();
    cy.getByDataCy('user').should('be.visible').type('pushingit')
    cy.getByValue('pushingit').invoke('val').as('usuario')
    cy.getByDataCy('pass').should('be.visible').type('123456!')
    cy.getByValue('pushingit').invoke('val').then(function (value) { // refactorizar esto para que utilice una function en vez del callback
        expect(value).to.include(this.usuario) //remplazar puhsingit por el alias utilizando this.   
    });
    cy.getByDataCy('submitForm').click()

});
})