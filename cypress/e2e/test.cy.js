// <reference types="cypress"/>

describe('Todo app', () => {
  // beforeEach(() => {
  //   // cy.injectAxe();
  // })
  
  it('Should log any accessibility failures', () => {
    console.log(cy)
    cy.analyseA11y('/');
  })

  // it('Should exclude specific elements on the page', () => {
  //   cy.checkA11y({ exclude: ['.learn'] });
  // })

  // it('Should execute only specific elements on the page', () => {
  //   cy.checkA11y('.learn');
  // })

  // it('Should only include rules with serious and critical impacts', () => {
  //   cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] });
  // })

  // it.only('Should exclude specific accessibility rules', () => {
  //   cy.checkA11y(null, {
  //     rules: {
  //       'color-contrast': { enabled: false }
  //     }
  //   });
  // })
})
