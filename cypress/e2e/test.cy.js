/// <reference types="cypress" />

describe('Example tests', () => {  
  it('Should log any accessibility failures', () => {
    cy.analyseA11y('https://example.cypress.io');
  })

  it('Should execute ONLY specific elements on the page', () => {
    cy.analyseA11y('https://example.cypress.io', '.container', null);
  })
  
  it('Should exclude specific elements on the page', () => {
    cy.analyseA11y('https://example.cypress.io', { exclude: ['.banner'] }, null);
  })

  it('Should ONLY include rules with serious and critical impacts', () => {
    cy.analyseA11y('https://example.cypress.io', null, { includedImpacts: ['critical', 'serious'] });
  })

  it('Should exclude specific accessibility rules', () => {
    cy.analyseA11y('https://example.cypress.io', null, {
      rules: {
        'color-contrast': { enabled: false }
      }
    });
  })

  it('Should ONLY include rules with these levels of conformance', () => {
    cy.analyseA11y('https://example.cypress.io', null, {
      runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      }
    );
  })
})