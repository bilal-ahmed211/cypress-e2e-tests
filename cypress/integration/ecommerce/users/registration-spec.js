/// <reference types="cypress" />
import { RegisterPage } from "../../../support/page-objects/registration-page";

describe('User Registration Feature', () => {
    const page = new RegisterPage();
    beforeEach(() => {
        cy.visit("https://demo.nopcommerce.com/");
        page.openRegisterPage();
    });
    it('validate user is navigated to register page', () => {
        cy.get("h1").should("have.text", "Register");
        cy.get("#register-button").should("be.visible").and("have.value", "Register")
    });
    it('validate user cannot register without filling data in mandatory fields', () => {
        page.submitRegistrationForm();
        page.errorMessagesValidation();
    });
    it('validate error message when password & confirm password does not match', () => {
        cy.fixture("users").as("user").then(user => {
            page.fillPersonalInfo(user.register.firstName, user.register.lastName, user.register.email);
            page.fillCompanyName(user.register.companyName);
            page.fillPassword(user.register.password, user.register.confirmPass);
            page.submitRegistrationForm();
            cy.get("#ConfirmPassword-error").should("be.visible").and("contain.text", "The password and confirmation password do not match.");
            
        });
    });
    it('validate user cannot register with existing email', () => {
        cy.fixture("users").as("user").then(user => {
            page.fillPersonalInfo(user.register.firstName, user.register.lastName, user.register.existingEmmail);
            page.fillCompanyName(user.register.companyName);
            page.fillPassword(user.register.password, user.register.confirmPassword);
            page.submitRegistrationForm();
            cy.get("div[class='message-error validation-summary-errors'] > ul > li").should("be.visible").and("contain.text", "The specified email already exists");
        });
    });
    it.skip('validate user can register an account', () => {
        cy.fixture("users").as("user").then(user => {
            page.fillPersonalInfo(user.register.firstName, user.register.lastName, user.register.email);
            page.fillCompanyName(user.register.companyName);
            page.fillPassword(user.register.password, user.register.confirmPassword);
            page.submitRegistrationForm();
            cy.get("div[class='result']").should("be.visible").and("contain.text", "Your registration completed");
            cy.get("input[name='register-continue']").click();
            cy.get("a").contains("Log out").should("be.visible");
        });
    });

})