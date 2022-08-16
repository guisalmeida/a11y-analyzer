/// <reference types="cypress" />

describe('Example tests', () => {  
  it('Should log any accessibility failures', () => {
    cy.analyseA11y('/');
  })
})
