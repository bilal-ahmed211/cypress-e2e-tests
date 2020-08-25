/// <reference types="cypress" />
import { LoginPage } from "../../support/page-objects/login-page";

describe('User Login Feature', () => {
    const page = new LoginPage();
    beforeEach(() => {
        cy.visit("https://demo.nopcommerce.com/");
        page.openLoginPage();
    });
    it('Verify user is navigated to login page', () => {
        page.validateElements();
    });
    it('Verify user cannot login with blank email and password', () => {
        page.submitLogin();
        cy.get("#Email-error").should("be.visible").and("contain.text", "Please enter your email");
    });
    it('Verify user cannot login with invalid email and valid password', () => {
        cy.fixture("users.json").as("data").then(data => {
            page.typeEmail(data.login.invalidEmail);
            page.typePassword(data.login.password);
            page.submitLogin();
        });
        cy.get("div[class = 'message-error validation-summary-errors']").should("be.visible").and("contain.text", "Login was unsuccessful. Please correct the errors and try again.");
        cy.get("div[class = 'message-error validation-summary-errors'] > ul > li").should("have.text", "abc");
    });
    it('Verify user cannot login with valid email and blank password', () => {
        cy.fixture("users.json").as("data").then(data => {
            page.typeEmail(data.login.email);
            page.submitLogin();
        });
        cy.get("div[class = 'message-error validation-summary-errors']").should("be.visible").and("contain.text", "Login was unsuccessful. Please correct the errors and try again.");
        cy.get("div[class = 'message-error validation-summary-errors'] > ul > li").should("have.text", "The credentials provided are incorrect");
    });
    it('Verify user cannot login with valid email and invalid password', () => {
        cy.fixture("users.json").as("data").then(data => {
            page.typeEmail(data.login.email);
            page.typePassword(data.login.invalidPassword)
            page.submitLogin();
        });
        cy.get("div[class = 'message-error validation-summary-errors']").should("be.visible").and("contain.text", "Login was unsuccessful. Please correct the errors and try again.");
        cy.get("div[class = 'message-error validation-summary-errors'] > ul > li").should("have.text", "The credentials provided are incorrect");
    });
    it('Verify user cannot login with invalid email and password', () => {
        cy.fixture("users.json").as("data").then(data => {
            page.typeEmail(data.login.invalidEmail);
            page.typePassword(data.login.invalidPassword)
            page.submitLogin();
        });
        cy.get("div[class = 'message-error validation-summary-errors'] > ul > li").should("have.text", "No customer account found");
    });
    it.skip('Verify user can successfully login valid email and password', () => {

    });
})