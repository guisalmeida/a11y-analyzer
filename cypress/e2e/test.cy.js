/// <reference types="cypress" />

describe('Todo app', () => {  
  it('Should log any accessibility failures', () => {
    cy.analyseA11y('https://example.cypress.io');
  })

  // it('Should exclude specific elements on the page', () => {
  //   cy.analyseA11y('https://example.cypress.io', { exclude: ['.learn'] });
  // })

  // it('Should execute only specific elements on the page', () => {
  //   cy.analyseA11y('https://example.cypress.io', '.learn');
  // })

  // it('Should only include rules with serious and critical impacts', () => {
  //   cy.analyseA11y('https://example.cypress.io', { includedImpacts: ['critical', 'serious'] });
  // })

  // it.only('Should exclude specific accessibility rules', () => {
  //   cy.analyseA11y('https://example.cypress.io', {
  //     rules: {
  //       'color-contrast': { enabled: false }
  //     }
  //   });
  // })
})
