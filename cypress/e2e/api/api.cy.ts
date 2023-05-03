/// <reference types="cypress" />
// About API testing: https://docs.cypress.io/api/commands/request#Method-and-URL
describe('Check https://api.potterdb.com/v1/characters request', () => {
  it('Get 200 status', () => {
    cy.request({
      method: 'GET',
      url: `https://api.potterdb.com/v1/characters`,
    }).as('fetchCharacters');

    cy.get('@fetchCharacters').should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.property('data');
    });
  });
});
