# cy-enter-iframe

A custom Cypress command to handle interactions of elements within an iframe

## Description

`cy-enter-iframe` is a Cypress custom command that simplifies working with iframes in your end to end tests. This plugin provides a reliable way to access and interact with elements inside iframes by returning the iframe's body as a chainable Cypress command.

The command handles common iframe challenges such as:
- Waiting for iframe content to load
- Ensuring iframe visibility
- Accessing the iframe's document content
- Providing a chainable interface for seamless testing

## Installation

Install the package as a development dependency:

```bash
npm install cy-enter-iframe -D
```

Then import or require it in your `cypress/support/e2e.js` file:

```javascript
// ES6 import
import 'cy-enter-iframe';

// or CommonJS require
require('cy-enter-iframe');
```

## Correct Usage

The `enterIframeBody` command should always be used with Cypress's `.within()` command to interact with elements inside the iframe.

### Example 1: Basic iframe interaction

```javascript
cy.enterIframeBody('iframe').within(() => {
  cy.get('#button-inside-iframe').click();
  cy.get('#input-field').type('Hello World');
});
```

### Example 2: Multiple actions within iframe

```javascript
cy.enterIframeBody('#payment-iframe').within(() => {
  cy.get('[data-cy="card-number"]').type('4111111111111111');
  cy.get('[data-cy="expiry"]').type('12/25');
  cy.get('[data-cy="cvv"]').type('123');
  cy.get('[data-cy="submit-payment"]').click();
});
```

### Example 3: Assertions within iframe

```javascript
cy.enterIframeBody('.content-frame').within(() => {
  cy.get('h1').should('contain.text', 'Welcome');
  cy.get('.status').should('have.class', 'active');
  cy.get('ul li').should('have.length', 3);
});
```

## Incorrect Usage

Here are common mistakes to avoid when using this command:

### ❌ Don't use without `.within()`

```javascript
// WRONG - This won't work as expected
cy.enterIframeBody('iframe').get('#button'); // This will search in the main document, not iframe
```

### ❌ Don't chain other commands directly

```javascript
// WRONG - Direct chaining doesn't work
cy.enterIframeBody('iframe').click(); // This tries to click the iframe body itself
```

### ❌ Don't use with multiple iframes without specific selectors

```javascript
// WRONG - Ambiguous when multiple iframes exist
cy.enterIframeBody('iframe').within(() => { // Uses .last() but may not be the intended iframe
  cy.get('#button').click();
});

// CORRECT - Use specific selectors
cy.enterIframeBody('#specific-iframe').within(() => {
  cy.get('#button').click();
});
```

### ❌ Don't forget to wait for iframe content

```javascript
// WRONG - Not waiting for iframe to load content
cy.visit('/page-with-iframe');
cy.enterIframeBody('iframe').within(() => {
  cy.get('#dynamic-content').click(); // May fail if content isn't loaded yet
});

// CORRECT - The command handles this, but you may need additional waits for dynamic content
cy.visit('/page-with-iframe');
cy.enterIframeBody('iframe').within(() => {
  cy.get('#dynamic-content').should('be.visible').click();
});
```

## API

### `cy.enterIframeBody(iFrameSelectorCSS)`

**Parameters:**
- `iFrameSelectorCSS` (string): CSS selector for the iframe element

**Returns:**
- Chainable Cypress command containing the iframe's body element

**Note:** This command will only work when there is ONE iframe matching the selector on the page. If multiple iframes match, it will use the last one found.

## Requirements

- Cypress 10.0.0 or higher
- Node.js 14.0.0 or higher

## License

MIT
