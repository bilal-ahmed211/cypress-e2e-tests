/// <reference types="cypress" />

export class RegisterPage {

    openRegisterPage(){
        cy.get("a").contains("Register").click();
    };
    fillPersonalInfo(FName, LName, email){
        const firstName = "#FirstName";
        const lastName = "#LastName";
        const emailField = "#Email";
        const maleGender = "#gender-male";
        cy.get(maleGender).check();
        cy.get(firstName).type(FName).get(lastName).type(LName).get(emailField).type(email);
        cy.get("select[name = 'DateOfBirthDay']").select("1");
        cy.get("select[name = 'DateOfBirthMonth']").select("January");
        cy.get("select[name = 'DateOfBirthYear']").select("2000")
    };
    fillCompanyName(company){
        const field = "#Company";
        cy.get(field).type(company)
    };
    fillPassword(password, confirmPassword){
        const passwordField = "#Password";
        const confirmPasswordField = "#ConfirmPassword";
        cy.get(passwordField).type(password).get(confirmPasswordField).type(confirmPassword)
    };
    submitRegistrationForm(){
        const button = "#register-button";
        cy.get(button).click();
    };
    errorMessagesValidation(){
        cy.get("#FirstName-error").should("be.visible").and("contain.text", "First name is required.");
        cy.get("#LastName-error").should("be.visible").and("contain.text", "Last name is required.");
        cy.get("#Email-error").should("be.visible").and("contain.text", "Email is required.");
        cy.get("#Password-error").should("be.visible").and("contain.text", "Password is required.");
        cy.get("#ConfirmPassword-error").should("be.visible").and("contain.text", "Password is required.");
    };
};