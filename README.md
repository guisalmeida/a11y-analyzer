# cypress-axe

[![npm](https://img.shields.io/npm/v/a11y-analyser.svg)](https://www.npmjs.com/package/cypress-axe)

Test accessibility with in [Cypress](https://cypress.io).

## Installation

1. **Install `a11y-analyser` from npm:**

- For Cypress v10 install latest cypress-axe

```sh
npm install --save-dev cypress-axe
```

1. **Install peer dependencies:**

- For Cypress v10 and above

```sh
npm install --save-dev cypress axe-core cypress-axe
```

1. **Include the commands.**

- For Cypress v10 and above update `cypress/support/e2e.js` file to include the cypress-axe commands by adding:
- For Cypress v9 and below update `cypress/support/index.js` file to include the cypress-axe commands by adding:

```js
import 'a11y-analyser'
```

4. **Add a task to log the messages to the terminal** when Cypress executes the spec files. [Example - configuring log task](https://docs.cypress.io/api/commands/task.html#Usage).


## Commands

### cy.analyseA11y

This will inject the `axe-core` runtime into the page under test. You must run this **after** a call to `cy.visit()` and before you run the `checkA11y` command.

You run this command with `cy.injectAxe()` either in your test, or in a `beforeEach`, as long as the `visit` comes first.

```js
it('Test', () => {
  cy.analyseA11y('http://localhost:8080')
})
```



### Examples

#### Basic usage

```js
// Basic usage
it('Has no detectable a11y violations on load', () => {
  // Test the page at initial load
  cy.checkA11y()
})
```

#### Using the violationCallback argument

The violation callback parameter accepts a function and allows you to add custom behavior when violations are found.

This example adds custom logging to the terminal running Cypress, using `cy.task` and the `violationCallback` argument for `cy.checkA11y`

##### In Cypress plugins file

This registers a `log` task as seen in the [Cypress docs for cy.task](https://docs.cypress.io/api/commands/task.html#Usage) as well as a `table` task for sending tabular data to the terminal.

```js
module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message)

      return null
    },
    table(message) {
      console.table(message)

      return null
    }
  })
}
```

#### In your spec file

Then we create a function that uses our tasks and pass it as the `validationCallback` argument to `cy.checkA11y`

```js
// Define at the top of the spec file or just import it
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

// Then in your test...
it('Logs violations to the terminal', () => {
  cy.checkA11y(null, null, terminalLog)
})
```

This custom logging behavior results in terminal output like this:

![Custom terminal logging with cy.task and validationCallback](terminal_output_example.png)

## Standard Output

When accessibility violations are detected, your test will fail and an entry titled "A11Y ERROR!" will be added to the command log for each type of violation found (they will be above the failed assertion). Clicking on those will reveal more specifics about the error in the DevTools console.

![Cypress and DevTools output for passing and failing axe-core audits](cmd_log.png)

## Authors

The project was created by [Guilherme Almeida](https://guisalmeida.com/).

## Contributors

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

MIT License, see the included [License.md](License.md) file.
