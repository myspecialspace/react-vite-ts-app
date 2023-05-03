/// <reference types="cypress" />

describe('page form', () => {
  it('content', () => {
    cy.visit('/form');

    cy.get('form').should('be.ok');
    cy.get('form input[name="name"]').should('be.ok');
    cy.get('form input[type="date"]').should('be.ok');
    cy.get('form input[type="radio"]').should('be.ok');
    cy.get('form select[name="species"]').should('be.ok');
    cy.get('form select[name="house"]').should('be.ok');
    cy.get('form input[name="animagus"]').should('be.ok');
    cy.get('form input[type="file"]').should('be.ok');
    cy.get('form button[type="submit"]').should('be.ok');
    cy.get('form').submit();
  });
});
