/// <reference types="cypress" />

describe('about', () => {
  it('content', () => {
    cy.visit('/about');

    cy.get('#root').should('contain.text', 'GET CLOSER TO THE MAGIC');
    cy.get('#root').should(
      'contain.text',
      'Hogwarts School of Witchcraft and Wizardry is a school of magic for students aged eleven to eighteen.'
    );
  });
});
