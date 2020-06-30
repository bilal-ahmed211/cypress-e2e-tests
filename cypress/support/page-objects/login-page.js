/// <reference types="cypress" />

export class LoginPage {

    openLoginPage(){
        cy.get("a").contains("Log in").click();
    };
    validateElements(){
        cy.get("h1").should("be.visible").and("contain.text", "Welcome, Please Sign In!");
        cy.get(".buttons > input[value = 'Log in']").should("be.visible").and("have.value", "Log in");
    };
    typeEmail(email){
        const emailField = "#Email";
        cy.get(emailField).type(email);
    };
    typePassword(password){
        const passwordFiled = "#Password";
        cy.get(passwordFiled).type(password);
    };
    submitLogin(){
        cy.get("input").contains("Log in").click();
    };
};