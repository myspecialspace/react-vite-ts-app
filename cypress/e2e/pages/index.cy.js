/// <reference types="cypress" />

describe('pages', () => {
  it('index', () => {
    cy.visit('/');

    cy.get('input[placeholder="Search"]').should('be.ok');
    cy.get('a[href="/"]').should('be.ok');
    cy.get('a[href="/form"]').should('be.ok');
    cy.get('a[href="/about"]').should('be.ok');
  });

  it('index header', () => {
    cy.visit('/');

    cy.get('a[href="/"]').should('be.ok');
    cy.get('a[href="/form"]').should('be.ok');
    cy.get('a[href="/about"]').should('be.ok');
  });

  it('index footer', () => {
    cy.visit('/');

    cy.get('a[href="https://github.com/myspecialspace"]').should('be.ok');
    cy.get('#root').should('contain.text', '©2023');
    cy.get('a[href="https://rs.school/react/"]').should('be.ok');
  });

  it('form', () => {
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

  it('about', () => {
    cy.visit('/about');

    cy.get('#root').should('contain.text', 'GET CLOSER TO THE MAGIC');
    cy.get('#root').should('contain.text', 'Hogwarts School of Witchcraft and Wizardry is a school of magic for students aged eleven to eighteen.');
  });
});
