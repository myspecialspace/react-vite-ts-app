/// <reference types="cypress" />

describe('pages', () => {
  it('content', () => {
    cy.visit('/');

    cy.get('input[placeholder="Search"]').should('be.ok');
    cy.get('a[href="/"]').should('be.ok');
    cy.get('a[href="/form"]').should('be.ok');
    cy.get('a[href="/about"]').should('be.ok');
  });

  it('header element', () => {
    cy.visit('/');

    cy.get('a[href="/"]').should('be.ok');
    cy.get('a[href="/form"]').should('be.ok');
    cy.get('a[href="/about"]').should('be.ok');
  });

  it('footer element', () => {
    cy.visit('/');

    cy.get('a[href="https://github.com/myspecialspace"]').should('be.ok');
    cy.get('#root').should('contain.text', '©2023');
    cy.get('a[href="https://rs.school/react/"]').should('be.ok');
  });

  it('render list', () => {
    cy.intercept('https://api.potterdb.com/v1/characters*').as('api.characters');
    cy.visit('/');
    cy.wait('@api.characters');

    cy.get('ul li');
  });

  it('character modal open and close', () => {
    cy.intercept('https://api.potterdb.com/v1/characters*').as('api.characters');
    cy.visit('/');
    cy.wait('@api.characters');

    cy.get('ul li').first().click();

    cy.get('#modal').should('not.be.empty');

    cy.get('#modal button[data-test="close"]').click();

    cy.get('#modal').should('be.be.empty');
  });
});
