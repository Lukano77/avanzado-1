//Interceptar la llamada que agrega una area al test y el response
// Completar la tarea. Validar el status response de la llamada que edita la tarea 

import { LoginPage } from "../support/PageObjects/loginPage";
describe('Actividad Complementaria Clase 3', ()=> {
const loginPage = new LoginPage();
it('Actividad complementaria 3', () => {
    cy.visit('https://pushing-it.vercel.app/')
    cy.get('#registertoggle').dblclick()
    cy.get('#user').type('pushingit')
    cy.get('#pass').type('123456!')
    cy.get('#submitForm').click()
    cy.wait(3000)
    cy.get('[data-cy="todolistlink"]').click()
    cy.get('[data-cy="removeAll"]').should('be.visible').click()
    cy.get('[data-cy="task"]').type("Tarea {enter}")
    
    //interceptar el post que agrega la tarea
    cy.intercept('POST','/api/save-task').as('gettask')
    cy.wait('@gettask',{timeout:1000}).then(intercept=>{
        expect(intercept.response.statusCode).to.be.equal(201)
    })
    cy.contains('p', 'Tarea', { timeout: 10000 }).should('be.visible').click()

    cy.intercept('PATCH','/api/task/*').as('edittask')
    cy.wait('@edittask',{timeout:1000}).then(intercept=>{
        expect(intercept.response.statusCode).to.be.equal(202)
    })
    cy.contains('p', 'Tarea', { timeout: 10000 }).should('attr', 'style', 'text-decoration: line-through;')
    //interceptar el put/patch que edita la tarea
});
})