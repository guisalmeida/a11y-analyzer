# Test Automation for Accessibility Course ([Test Automation University](https://testautomationu.applitools.com/accessibility-testing-tutorial))

This is the github project to use for the Test Automation for Accessibility TAU course. This focuses on how to setup a Cypress project and integrate Cypress-axe as well as Applitools (Contrast Advisor feature).

## Installing dependencies

To install project dependencies, just run `npm i`.

## Cypress Test Runner

To open up the Cypress test runner
On the terminal, please run:  
`npm run cy:run`  
On the browser, please run:  
`npm run cy:open`

## Ways of testing

![Ways of testing](src/images/ways-testing.png)

To include a specific element to test, pass in the `injectAxe` method the selector string of the element that you want to test.

```js
describe('Todo app', () => {
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react');
        cy.injectAxe();
    })

    it('Should execute only specific elements on the page', () => {
        cy.checkA11y('.learn');
    })
})
```

To exclude elements, just put the selectors inside the `injectAxe` method with the property `exclude`.

```js
describe('Todo app', () => {
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react');
        cy.injectAxe();
    })

    it('Should exclude specific elements on the page', () => {
        cy.checkA11y({exclude: ['.learn']});
    })
})
```

## [Applitools for tests with Cypress ^10.0.0](https://github.com/applitools/eyes.sdk.javascript1/tree/master/js/packages/eyes-cypress#cypress-version--10-1)

![Applitools](src/images/applitools.jpeg)

![Applitools-criteria](src/images/applitools-criteria.jpeg)  

### Reason to use another tool
![Applitools-reason](src/images/applitools-reason-use.png)