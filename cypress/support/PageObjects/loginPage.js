/// <reference types = "Cypress"/>

export class LoginPage{
    constructor(){
        this.loginPageLink = "#registertoggle"
        this.usernameInput = "#user";
        this.passwordInput = "#pass";
        this.submitButton = "#submitForm";
        this.user = 'user';
        this.registertoggle = 'registertoggle';
        this.submmitForm='submitForm'
    }

    dblClickLoginPage(){
        cy.get(this.loginPageLink).dblclick();
    }
    writeUser(usuario){
        cy.get(this.usernameInput).type(usuario);
    }

    writePassword(password){
        cy.get(this.passwordInput).type(password);
    }

    clickLoginButton(){
        cy.get(this.submitButton).click();
    }


}